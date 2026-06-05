#!/usr/bin/env node
// ESP32 Claude Monitor – Bridge  (Mac / Windows / Linux)
//
// Drei Aufgaben:
//   1) Token-Verbrauch via ccusage -> MQTT (Session = 5h-Block, Woche = 7 Tage)
//   2) Status (idle / working / waiting) via Claude-Code-Hooks (HTTP)
//      + abgeleiteter Zustand "limit", wenn der Verbrauch eine Schwelle reißt.
//   3) Servt den Animations-Editor und pusht dessen Config retained auf MQTT,
//      sodass der ESP32 das Aussehen je Zustand ohne Reflash übernimmt.

import { exec } from "node:child_process";
import { promisify } from "node:util";
import http from "node:http";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import mqtt from "mqtt";

const execAsync = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ---- Config -----------------------------------------------------------------
const cfgPath = path.join(__dirname, "config.json");
let cfg;
try {
  cfg = JSON.parse(readFileSync(cfgPath, "utf8"));
} catch {
  console.error(`[bridge] ${cfgPath} fehlt. config.example.json kopieren und anpassen.`);
  process.exit(1);
}

const POLL_MS = (cfg.pollSeconds ?? 30) * 1000;
const SESSION_BUDGET = cfg.budgets?.sessionTokens ?? 250_000_000;
const WEEKLY_BUDGET = cfg.budgets?.weeklyTokens ?? 2_500_000_000;
const LIMIT_PCT = cfg.limit?.pct ?? 85; // ab hier -> Zustand "limit"
const STATE_TOPIC = cfg.mqtt.topic ?? "claude/monitor/state";
const CONFIG_TOPIC = cfg.mqtt.configTopic ?? "claude/monitor/config";
const HOOK_STATUS = new Set(["idle", "working", "waiting"]);
const PREVIEW_STATUS = new Set(["idle", "working", "waiting", "limit"]);

// ---- Animations-Config (vom Editor, persistiert) ---------------------------
const animPath = path.join(__dirname, "anim_config.json");
const DEFAULT_ANIM = {
  version: 1,
  states: {
    idle:    { label: "IDLE",     bodyColor: "#2B2D42", eyeColor: "#6C72A8", eyeShape: "circle", eyeAnim: "blink", mouth: "flat",  spinner: false, spinnerColor: "#3DDC97", antenna: false, antennaColor: "#FFB347", bob: true,  speed: 35, labelColor: "#6C72A8" },
    working: { label: "WORKING",  bodyColor: "#2B2D42", eyeColor: "#3DDC97", eyeShape: "circle", eyeAnim: "scan",  mouth: "smile", spinner: true,  spinnerColor: "#3DDC97", antenna: true,  antennaColor: "#3DDC97", bob: true,  speed: 80, labelColor: "#3DDC97" },
    waiting: { label: "CONFIRM?", bodyColor: "#402B2D", eyeColor: "#FFB347", eyeShape: "square", eyeAnim: "pulse", mouth: "o",     spinner: false, spinnerColor: "#FFB347", antenna: true,  antennaColor: "#FFB347", bob: false, speed: 55, labelColor: "#FFB347" },
    limit:   { label: "LIMIT!",   bodyColor: "#3A1620", eyeColor: "#FF5C5C", eyeShape: "square", eyeAnim: "pulse", mouth: "flat",  spinner: false, spinnerColor: "#FF5C5C", antenna: true,  antennaColor: "#FF5C5C", bob: false, speed: 90, labelColor: "#FF5C5C" },
  },
};
let anim = existsSync(animPath) ? JSON.parse(readFileSync(animPath, "utf8")) : DEFAULT_ANIM;
// Sicherstellen, dass "limit" existiert (ältere gespeicherte Configs nachrüsten)
if (anim.states && !anim.states.limit) anim.states.limit = DEFAULT_ANIM.states.limit;

// ---- Laufzeit-Status --------------------------------------------------------
let hookStatus = "idle"; // von den Claude-Hooks gesetzt
let lastSession = { usedPct: 0, usedTokens: 0, resetEpoch: 0 };
let lastWeekly = { usedPct: 0, usedTokens: 0, resetEpoch: 0 };

// "limit" hat Vorrang vor dem Hook-Status, damit die Warnung sichtbar bleibt.
function derivedStatus() {
  const mx = Math.max(lastSession.usedPct, lastWeekly.usedPct);
  return mx >= LIMIT_PCT ? "limit" : hookStatus;
}

// ---- MQTT -------------------------------------------------------------------
const mqttClient = mqtt.connect(cfg.mqtt.url, {
  username: cfg.mqtt.username || undefined,
  password: cfg.mqtt.password || undefined,
  reconnectPeriod: 3000,
});
mqttClient.on("connect", () => console.log(`[bridge] MQTT verbunden: ${cfg.mqtt.url}`));
mqttClient.on("error", (e) => console.error("[bridge] MQTT-Fehler:", e.message));

function publishAnim() {
  mqttClient.publish(CONFIG_TOPIC, JSON.stringify(anim), { retain: true });
  console.log(`[bridge] anim-config publiziert -> ${CONFIG_TOPIC}`);
}
function publishState(statusVal) {
  const payload = { status: statusVal, session: lastSession, weekly: lastWeekly, ts: Math.floor(Date.now() / 1000) };
  mqttClient.publish(STATE_TOPIC, JSON.stringify(payload), { retain: cfg.mqtt.retain ?? true });
  return payload;
}

// ---- Token-Helpers ----------------------------------------------------------
function clampPct(used, budget) {
  if (!budget || budget <= 0) return 0;
  return Math.max(0, Math.min(100, Math.round((used / budget) * 100)));
}
function nextWeeklyResetEpoch() {
  const anchorMs = Date.parse(cfg.weekly?.resetAnchorIso ?? "2026-06-02T00:00:00Z");
  const weekMs = 7 * 24 * 3600 * 1000;
  const now = Date.now();
  if (Number.isNaN(anchorMs)) return Math.floor((now + weekMs) / 1000);
  const cycles = Math.ceil((now - anchorMs) / weekMs);
  return Math.floor((anchorMs + cycles * weekMs) / 1000);
}
function sumBlockTokens(b) {
  const t = b.tokenCounts ?? b;
  return (
    (t.inputTokens ?? b.inputTokens ?? 0) +
    (t.outputTokens ?? b.outputTokens ?? 0) +
    (t.cacheCreationInputTokens ?? b.cacheCreationTokens ?? 0) +
    (t.cacheReadInputTokens ?? b.cacheReadTokens ?? 0)
  );
}
async function runCcusage(args) {
  const { stdout } = await execAsync(`${cfg.ccusageCmd} ${args}`, { maxBuffer: 16 * 1024 * 1024 });
  return JSON.parse(stdout);
}
async function readSession() {
  const out = await runCcusage("blocks --active --json");
  const blocks = out.blocks ?? out.data ?? [];
  const active = blocks.find((b) => b.isActive) ?? blocks[0];
  if (!active) return { usedPct: 0, usedTokens: 0, resetEpoch: Math.floor(Date.now() / 1000) + 5 * 3600 };
  const usedTokens = sumBlockTokens(active);
  const endIso = active.endTime ?? active.blockEnd;
  const resetEpoch = endIso ? Math.floor(Date.parse(endIso) / 1000) : Math.floor(Date.now() / 1000) + 5 * 3600;
  return { usedPct: clampPct(usedTokens, SESSION_BUDGET), usedTokens, resetEpoch };
}
async function readWeekly() {
  const since = new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString().slice(0, 10).replace(/-/g, "");
  const out = await runCcusage(`daily --since ${since} --json`);
  const s = out.summary ?? {};
  const usedTokens =
    s.totalTokens ??
    (s.totalInputTokens ?? 0) + (s.totalOutputTokens ?? 0) + (s.totalCacheCreationTokens ?? 0) + (s.totalCacheReadTokens ?? 0);
  return { usedPct: clampPct(usedTokens, WEEKLY_BUDGET), usedTokens, resetEpoch: nextWeeklyResetEpoch() };
}

// ---- Poll-Schleife ----------------------------------------------------------
async function pollAndPublish() {
  try {
    const [s, w] = await Promise.all([readSession(), readWeekly()]);
    lastSession = s;
    lastWeekly = w;
  } catch (e) {
    console.error("[bridge] ccusage-Fehler:", e.message);
  }
  const st = derivedStatus();
  publishState(st);
  console.log(`[bridge] state -> ${st} (session ${lastSession.usedPct}% / weekly ${lastWeekly.usedPct}%)`);
}

// ---- HTTP-Server: Editor + Endpoints ---------------------------------------
function send(res, code, body, type = "application/json") {
  res.writeHead(code, { "Content-Type": type });
  res.end(body);
}
function readBody(req) {
  return new Promise((resolve) => {
    let b = "";
    req.on("data", (c) => (b += c));
    req.on("end", () => resolve(b));
  });
}

const server = http.createServer(async (req, res) => {
  // Editor ausliefern
  if (req.method === "GET" && (req.url === "/" || req.url === "/index.html")) {
    try {
      const html = readFileSync(path.join(__dirname, "..", "studio", "index.html"));
      return send(res, 200, html, "text/html; charset=utf-8");
    } catch {
      return send(res, 500, "studio/index.html nicht gefunden");
    }
  }

  // Aktuelle Animations-Config laden (Editor liest sie beim Start)
  if (req.method === "GET" && req.url === "/config") {
    return send(res, 200, JSON.stringify(anim));
  }

  // Animations-Config speichern + an Gerät pushen
  if (req.method === "POST" && req.url === "/config") {
    try {
      anim = JSON.parse(await readBody(req));
      writeFileSync(animPath, JSON.stringify(anim, null, 2));
      publishAnim();
      return send(res, 200, JSON.stringify({ ok: true }));
    } catch {
      return send(res, 400, JSON.stringify({ error: "bad json" }));
    }
  }

  // Status-Event von den Claude-Hooks (idle/working/waiting). "limit" wird
  // NICHT hier gesetzt, sondern von der Bridge aus dem Verbrauch abgeleitet.
  if (req.method === "POST" && req.url === "/event") {
    try {
      const { status: s } = JSON.parse((await readBody(req)) || "{}");
      if (HOOK_STATUS.has(s)) {
        hookStatus = s;
        const eff = derivedStatus();
        publishState(eff);
        console.log(`[bridge] hook ${s} -> ${eff}`);
      }
      return send(res, 204, "");
    } catch {
      return send(res, 400, JSON.stringify({ error: "bad json" }));
    }
  }

  // Vorschau-Button im Editor: zeigt den Zustand EINMALIG erzwungen am Gerät
  // (auch "limit"), ohne den Hook-Status zu verändern. Beim nächsten Poll
  // greift wieder die normale Ableitung.
  if (req.method === "POST" && req.url === "/preview") {
    try {
      const { status: s } = JSON.parse((await readBody(req)) || "{}");
      if (PREVIEW_STATUS.has(s)) {
        publishState(s);
        console.log(`[bridge] preview -> ${s}`);
      }
      return send(res, 204, "");
    } catch {
      return send(res, 400, JSON.stringify({ error: "bad json" }));
    }
  }

  send(res, 404, "not found", "text/plain");
});

const PORT = cfg.http?.port ?? 8718;
server.listen(PORT, () => {
  console.log(`[bridge] Editor:  http://localhost:${PORT}/`);
  console.log(`[bridge] Hooks ->  http://localhost:${PORT}/event`);
});

// ---- Loop -------------------------------------------------------------------
mqttClient.once("connect", () => {
  publishAnim();
  pollAndPublish();
  setInterval(() => pollAndPublish(), POLL_MS);
});

process.on("SIGINT", () => mqttClient.end(() => process.exit(0)));
