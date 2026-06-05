#!/usr/bin/env node
// ESP32 Claude Monitor – Bridge
//
// Fuehrt zwei Signale zusammen und publiziert sie per MQTT an den ESP32:
//   1) Token-Verbrauch via ccusage (aktiver 5h-Block = Session, 7-Tage = Woche)
//   2) Working/Idle via HTTP-Events, die Claude-Code-Hooks schicken
//
// Kein offizielles Limit-API existiert -> Prozente werden gegen kalibrierbare
// Budgets gerechnet (siehe config.json / README).

import { exec } from "node:child_process";
import { promisify } from "node:util";
import http from "node:http";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import mqtt from "mqtt";

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ---- Config laden -----------------------------------------------------------
const cfgPath = path.join(__dirname, "config.json");
let cfg;
try {
  cfg = JSON.parse(readFileSync(cfgPath, "utf8"));
} catch (e) {
  console.error(`[bridge] Konnte ${cfgPath} nicht lesen. config.example.json kopieren und anpassen.`);
  process.exit(1);
}

const POLL_MS = (cfg.pollSeconds ?? 30) * 1000;
const SESSION_BUDGET = cfg.budgets?.sessionTokens ?? 250_000_000;
const WEEKLY_BUDGET = cfg.budgets?.weeklyTokens ?? 2_500_000_000;

// ---- Laufzeit-Status --------------------------------------------------------
let working = false; // wird von den Claude-Hooks gesetzt
let lastPublished = "";

// ---- MQTT -------------------------------------------------------------------
const mqttClient = mqtt.connect(cfg.mqtt.url, {
  username: cfg.mqtt.username || undefined,
  password: cfg.mqtt.password || undefined,
  reconnectPeriod: 3000,
});
mqttClient.on("connect", () => console.log(`[bridge] MQTT verbunden: ${cfg.mqtt.url}`));
mqttClient.on("error", (err) => console.error("[bridge] MQTT-Fehler:", err.message));

// ---- Helpers ----------------------------------------------------------------
function clampPct(used, budget) {
  if (!budget || budget <= 0) return 0;
  return Math.max(0, Math.min(100, Math.round((used / budget) * 100)));
}

// Naechster Wochen-Reset: Anker + n*7 Tage, der in der Zukunft liegt.
function nextWeeklyResetEpoch() {
  const anchorMs = Date.parse(cfg.weekly?.resetAnchorIso ?? "2026-06-02T00:00:00Z");
  const weekMs = 7 * 24 * 3600 * 1000;
  const now = Date.now();
  if (Number.isNaN(anchorMs)) return Math.floor((now + weekMs) / 1000);
  const cycles = Math.ceil((now - anchorMs) / weekMs);
  return Math.floor((anchorMs + cycles * weekMs) / 1000);
}

function sumBlockTokens(block) {
  // Feldnamen variieren je nach ccusage-Version/Befehl -> defensiv summieren.
  const t = block.tokenCounts ?? block;
  return (
    (t.inputTokens ?? block.inputTokens ?? 0) +
    (t.outputTokens ?? block.outputTokens ?? 0) +
    (t.cacheCreationInputTokens ?? block.cacheCreationTokens ?? 0) +
    (t.cacheReadInputTokens ?? block.cacheReadTokens ?? 0)
  );
}

// ---- ccusage abfragen -------------------------------------------------------
async function runCcusage(args) {
  const cmd = `${cfg.ccusageCmd} ${args}`;
  const { stdout } = await execAsync(cmd, { maxBuffer: 16 * 1024 * 1024 });
  return JSON.parse(stdout);
}

async function readSession() {
  // Aktiver 5h-Block = "Session"-Fenster. blockEnd = Reset-Zeitpunkt.
  const out = await runCcusage("blocks --active --json");
  const blocks = out.blocks ?? out.data ?? [];
  const active = blocks.find((b) => b.isActive) ?? blocks[0];
  if (!active) {
    return { usedPct: 0, usedTokens: 0, resetEpoch: Math.floor(Date.now() / 1000) + 5 * 3600 };
  }
  const usedTokens = sumBlockTokens(active);
  const endIso = active.endTime ?? active.blockEnd;
  const resetEpoch = endIso
    ? Math.floor(Date.parse(endIso) / 1000)
    : Math.floor(Date.now() / 1000) + 5 * 3600;
  return { usedPct: clampPct(usedTokens, SESSION_BUDGET), usedTokens, resetEpoch };
}

async function readWeekly() {
  // 7-Tage-Aggregat ueber die taeglichen Reports.
  const since = new Date(Date.now() - 7 * 24 * 3600 * 1000)
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, "");
  const out = await runCcusage(`daily --since ${since} --json`);
  const summary = out.summary ?? {};
  const usedTokens =
    summary.totalTokens ??
    (summary.totalInputTokens ?? 0) +
      (summary.totalOutputTokens ?? 0) +
      (summary.totalCacheCreationTokens ?? 0) +
      (summary.totalCacheReadTokens ?? 0);
  return {
    usedPct: clampPct(usedTokens, WEEKLY_BUDGET),
    usedTokens,
    resetEpoch: nextWeeklyResetEpoch(),
  };
}

// ---- Publish ----------------------------------------------------------------
async function buildAndPublish({ force = false } = {}) {
  let session, weekly;
  try {
    [session, weekly] = await Promise.all([readSession(), readWeekly()]);
  } catch (e) {
    console.error("[bridge] ccusage-Fehler:", e.message);
    return;
  }
  const payload = { working, session, weekly, ts: Math.floor(Date.now() / 1000) };
  const json = JSON.stringify(payload);

  // working-Feld haeufig publishen, Tokens nur bei Aenderung -> Vergleich ohne ts.
  const cmp = JSON.stringify({ ...payload, ts: 0 });
  if (!force && cmp === lastPublished) return;
  lastPublished = cmp;

  mqttClient.publish(cfg.mqtt.topic, json, { retain: cfg.mqtt.retain ?? true });
  console.log(`[bridge] publish ${cfg.mqtt.topic}:`, json);
}

// working/idle aendert sich -> sofort publishen (nur Flag, ohne ccusage-Roundtrip)
function publishWorkingNow() {
  if (!lastPublished) return buildAndPublish({ force: true });
  const prev = JSON.parse(lastPublished);
  prev.working = working;
  prev.ts = Math.floor(Date.now() / 1000);
  lastPublished = JSON.stringify({ ...prev, ts: 0 });
  mqttClient.publish(cfg.mqtt.topic, JSON.stringify(prev), { retain: cfg.mqtt.retain ?? true });
  console.log(`[bridge] publish (working=${working})`);
}

// ---- HTTP-Endpoint fuer Claude-Hooks ---------------------------------------
// POST /event  Body: {"working": true|false}
const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/event") {
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", () => {
      try {
        const { working: w } = JSON.parse(body || "{}");
        if (typeof w === "boolean" && w !== working) {
          working = w;
          publishWorkingNow();
        }
        res.writeHead(204).end();
      } catch {
        res.writeHead(400).end("bad json");
      }
    });
    return;
  }
  res.writeHead(404).end();
});
server.listen(cfg.http?.port ?? 8718, () =>
  console.log(`[bridge] Hook-Endpoint: http://localhost:${cfg.http?.port ?? 8718}/event`)
);

// ---- Loop -------------------------------------------------------------------
mqttClient.once("connect", () => {
  buildAndPublish({ force: true });
  setInterval(() => buildAndPublish(), POLL_MS);
});

process.on("SIGINT", () => {
  mqttClient.end(() => process.exit(0));
});
