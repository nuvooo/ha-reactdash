#!/usr/bin/env node
// ESP32 Claude Monitor – Bridge  (Mac / Windows / Linux, läuft auch als
// Standalone-Binary ohne installiertes Node).
//
//   1) Token-Verbrauch nativ aus den Claude-Logs (usage.js, kein ccusage/npx)
//   2) Status (idle / working / waiting) via Claude-Hooks + abgeleitetes "limit"
//   3) Servt den Animations-Editor und pusht Config + Status retained auf MQTT
//
// Als Hook nutzbar:  claude-monitor event <idle|working|waiting>
//   -> sendet den Status an die laufende Instanz und beendet sich sofort.

import { createServer } from "node:http";
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { spawn, execFileSync } from "node:child_process";
import { homedir } from "node:os";
import path from "node:path";
import mqtt from "mqtt";
import { readSession, readWeekly } from "./usage.js";
import { STUDIO_HTML } from "./studio.generated.js";

// Funktioniert in ESM (Dev) und im gebündelten CJS/pkg-Binary.
const APP_DIR = (() => {
  try { return path.dirname(fileURLToPath(import.meta.url)); }
  catch { return typeof __dirname !== "undefined" ? __dirname : process.cwd(); }
})();
const isPkg = typeof process.pkg !== "undefined";
// Im Binary: Config liegt neben der ausführbaren Datei. Im Dev: neben index.js.
const baseDir = isPkg ? path.dirname(process.execPath) : APP_DIR;
const cfgPath = path.join(baseDir, "config.json");
const animPath = path.join(baseDir, "anim_config.json");

// ---- Config (optional – läuft mit Defaults out of the box) ------------------
const DEFAULT_CONFIG = {
  mqtt: { url: "mqtt://localhost:1883", username: "", password: "", topic: "claude/monitor/state", configTopic: "claude/monitor/config", retain: true },
  http: { port: 8718 },
  pollSeconds: 30,
  budgets: { sessionTokens: 250000000, weeklyTokens: 2500000000 },
  weekly: { resetAnchorIso: "2026-06-02T00:00:00Z" },
  limit: { pct: 85 },
  openBrowser: true,
};
function loadConfig() {
  let c = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
  if (existsSync(cfgPath)) {
    try {
      const f = JSON.parse(readFileSync(cfgPath, "utf8"));
      for (const k of Object.keys(f)) {
        c[k] = f[k] && typeof f[k] === "object" && !Array.isArray(f[k]) ? { ...c[k], ...f[k] } : f[k];
      }
    } catch (e) {
      console.error("[bridge] config.json fehlerhaft, nutze Defaults:", e.message);
    }
  }
  return c;
}
let cfg = loadConfig();

// ---- Hook-Modus:  claude-monitor event <status> ----------------------------
function runHook(status) {
  const url = process.env.CLAUDE_MONITOR_URL || `http://localhost:${cfg.http.port}/event`;
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 2000);
  fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }), signal: ctrl.signal })
    .catch(() => {})
    .finally(() => { clearTimeout(t); process.exit(0); });
}

// ---- Autostart beim Login:  claude-monitor autostart <enable|disable> -------
// Plattformübergreifend; zeigt auf die laufende Binärdatei (im Dev auf node).
const AUTOSTART_LABEL = "com.nuvooo.claude-monitor";
function autostartTargetCmd() {
  return isPkg ? `"${process.execPath}"` : `node "${path.join(APP_DIR, "index.js")}"`;
}
function runAutostart(action) {
  const enable = action !== "disable";
  try {
    if (process.platform === "darwin") {
      const dir = path.join(homedir(), "Library", "LaunchAgents");
      const plist = path.join(dir, `${AUTOSTART_LABEL}.plist`);
      if (enable) {
        mkdirSync(dir, { recursive: true });
        writeFileSync(plist, `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>${AUTOSTART_LABEL}</string>
  <key>ProgramArguments</key><array><string>${process.execPath}</string></array>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><false/>
</dict></plist>\n`);
        try { execFileSync("launchctl", ["unload", plist], { stdio: "ignore" }); } catch {}
        try { execFileSync("launchctl", ["load", "-w", plist], { stdio: "ignore" }); } catch {}
      } else {
        try { execFileSync("launchctl", ["unload", "-w", plist], { stdio: "ignore" }); } catch {}
        rmSync(plist, { force: true });
      }
    } else if (process.platform === "win32") {
      const args = enable
        ? ["add", "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run", "/v", "ClaudeMonitor", "/t", "REG_SZ", "/d", autostartTargetCmd(), "/f"]
        : ["delete", "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run", "/v", "ClaudeMonitor", "/f"];
      execFileSync("reg", args, { stdio: "ignore" });
    } else {
      const dir = path.join(homedir(), ".config", "autostart");
      const file = path.join(dir, "claude-monitor.desktop");
      if (enable) {
        mkdirSync(dir, { recursive: true });
        writeFileSync(file, `[Desktop Entry]
Type=Application
Name=Claude Monitor
Exec=${isPkg ? process.execPath : "node " + path.join(APP_DIR, "index.js")}
X-GNOME-Autostart-enabled=true
\n`);
      } else {
        rmSync(file, { force: true });
      }
    }
    console.log(`[autostart] ${enable ? "aktiviert" : "deaktiviert"} (${process.platform})`);
    process.exit(0);
  } catch (e) {
    console.error("[autostart] Fehler:", e.message);
    process.exit(1);
  }
}

// ---- Animations-Config ------------------------------------------------------
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
if (anim.states && !anim.states.limit) anim.states.limit = DEFAULT_ANIM.states.limit;

// ---- Laufzeit-Status --------------------------------------------------------
let hookStatus = "idle";
let lastSession = { usedPct: 0, usedTokens: 0, resetEpoch: 0 };
let lastWeekly = { usedPct: 0, usedTokens: 0, resetEpoch: 0 };
const HOOK_STATUS = new Set(["idle", "working", "waiting"]);
const PREVIEW_STATUS = new Set(["idle", "working", "waiting", "limit"]);

function derivedStatus() {
  const mx = Math.max(lastSession.usedPct, lastWeekly.usedPct);
  return mx >= (cfg.limit?.pct ?? 85) ? "limit" : hookStatus;
}
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

// ---- MQTT -------------------------------------------------------------------
let mqttClient = null;
function publishAnim() {
  if (mqttClient) mqttClient.publish(cfg.mqtt.configTopic, JSON.stringify(anim), { retain: true });
}
function publishState(statusVal) {
  if (!mqttClient) return;
  const payload = { status: statusVal, session: lastSession, weekly: lastWeekly, ts: Math.floor(Date.now() / 1000) };
  mqttClient.publish(cfg.mqtt.topic, JSON.stringify(payload), { retain: cfg.mqtt.retain ?? true });
}
function connectMqtt() {
  if (mqttClient) { try { mqttClient.end(true); } catch {} }
  mqttClient = mqtt.connect(cfg.mqtt.url, {
    username: cfg.mqtt.username || undefined,
    password: cfg.mqtt.password || undefined,
    reconnectPeriod: 3000,
  });
  mqttClient.on("connect", () => {
    console.log(`[bridge] MQTT verbunden: ${cfg.mqtt.url}`);
    publishAnim();
    publishState(derivedStatus());
  });
  mqttClient.on("error", (e) => console.error("[bridge] MQTT-Fehler:", e.message));
}

// ---- Token-Poll -------------------------------------------------------------
function pollAndPublish() {
  try {
    const s = readSession();
    const w = readWeekly(nextWeeklyResetEpoch());
    lastSession = { usedPct: clampPct(s.usedTokens, cfg.budgets.sessionTokens), usedTokens: s.usedTokens, resetEpoch: s.resetEpoch };
    lastWeekly = { usedPct: clampPct(w.usedTokens, cfg.budgets.weeklyTokens), usedTokens: w.usedTokens, resetEpoch: w.resetEpoch };
  } catch (e) {
    console.error("[bridge] usage-Fehler:", e.message);
  }
  const st = derivedStatus();
  publishState(st);
}

// ---- HTTP -------------------------------------------------------------------
function send(res, code, body, type = "application/json") {
  res.writeHead(code, { "Content-Type": type });
  res.end(body);
}
function readBody(req) {
  return new Promise((resolve) => { let b = ""; req.on("data", (c) => (b += c)); req.on("end", () => resolve(b)); });
}
function editorHtml() {
  // Dev: live aus der Datei. Binary: eingebettetes STUDIO_HTML.
  try { return readFileSync(path.join(APP_DIR, "..", "studio", "index.html"), "utf8"); } catch {}
  return STUDIO_HTML;
}
// Einstellungen, die der Editor anzeigen/ändern darf.
function publicSettings() {
  return {
    mqtt: { url: cfg.mqtt.url, username: cfg.mqtt.username, topic: cfg.mqtt.topic, configTopic: cfg.mqtt.configTopic },
    budgets: cfg.budgets, weekly: cfg.weekly, limit: cfg.limit, pollSeconds: cfg.pollSeconds,
  };
}

function startServer() {
  const server = createServer(async (req, res) => {
    if (req.method === "GET" && (req.url === "/" || req.url === "/index.html"))
      return send(res, 200, editorHtml(), "text/html; charset=utf-8");

    if (req.method === "GET" && req.url === "/config") return send(res, 200, JSON.stringify(anim));
    if (req.method === "GET" && req.url === "/settings") return send(res, 200, JSON.stringify(publicSettings()));
    if (req.method === "GET" && req.url === "/status")
      return send(res, 200, JSON.stringify({ status: derivedStatus(), session: lastSession, weekly: lastWeekly, mqtt: !!(mqttClient && mqttClient.connected) }));

    if (req.method === "POST" && req.url === "/config") {
      try { anim = JSON.parse(await readBody(req)); writeFileSync(animPath, JSON.stringify(anim, null, 2)); publishAnim(); return send(res, 200, JSON.stringify({ ok: true })); }
      catch { return send(res, 400, JSON.stringify({ error: "bad json" })); }
    }

    if (req.method === "POST" && req.url === "/settings") {
      try {
        const incoming = JSON.parse(await readBody(req));
        // Felder selektiv übernehmen (Passwort nur wenn mitgeschickt).
        if (incoming.mqtt) cfg.mqtt = { ...cfg.mqtt, ...incoming.mqtt };
        if (incoming.budgets) cfg.budgets = { ...cfg.budgets, ...incoming.budgets };
        if (incoming.weekly) cfg.weekly = { ...cfg.weekly, ...incoming.weekly };
        if (incoming.limit) cfg.limit = { ...cfg.limit, ...incoming.limit };
        if (incoming.pollSeconds) cfg.pollSeconds = incoming.pollSeconds;
        writeFileSync(cfgPath, JSON.stringify(cfg, null, 2));
        connectMqtt(); // mit neuen MQTT-Daten neu verbinden
        return send(res, 200, JSON.stringify({ ok: true }));
      } catch { return send(res, 400, JSON.stringify({ error: "bad json" })); }
    }

    // Hook-Event (idle/working/waiting). "limit" wird nie hier gesetzt.
    if (req.method === "POST" && req.url === "/event") {
      try {
        const { status: s } = JSON.parse((await readBody(req)) || "{}");
        if (HOOK_STATUS.has(s)) { hookStatus = s; publishState(derivedStatus()); }
        return send(res, 204, "");
      } catch { return send(res, 400, JSON.stringify({ error: "bad json" })); }
    }

    // Vorschau-Button (erzwingt einen Zustand am Gerät, auch "limit").
    if (req.method === "POST" && req.url === "/preview") {
      try {
        const { status: s } = JSON.parse((await readBody(req)) || "{}");
        if (PREVIEW_STATUS.has(s)) publishState(s);
        return send(res, 204, "");
      } catch { return send(res, 400, JSON.stringify({ error: "bad json" })); }
    }

    send(res, 404, "not found", "text/plain");
  });

  const PORT = cfg.http.port;
  server.listen(PORT, () => {
    const url = `http://localhost:${PORT}/`;
    console.log(`[bridge] Editor:  ${url}`);
    console.log(`[bridge] Hooks ->  ${url}event  (claude-monitor event <status>)`);
    if (cfg.openBrowser) openBrowser(url);
  });
}

function openBrowser(url) {
  const p = process.platform;
  const cmd = p === "darwin" ? "open" : p === "win32" ? "cmd" : "xdg-open";
  const args = p === "win32" ? ["/c", "start", "", url] : [url];
  try {
    const child = spawn(cmd, args, { detached: true, stdio: "ignore" });
    child.on("error", () => {}); // z.B. xdg-open fehlt -> still ignorieren
    child.unref();
  } catch {}
}

// ---- Start ------------------------------------------------------------------
function main() {
  connectMqtt();
  startServer();
  pollAndPublish();
  setInterval(pollAndPublish, (cfg.pollSeconds ?? 30) * 1000);
  process.on("SIGINT", () => { if (mqttClient) mqttClient.end(() => process.exit(0)); else process.exit(0); });
}

if (process.argv[2] === "event") runHook(process.argv[3]);
else if (process.argv[2] === "autostart") runAutostart(process.argv[3]);
else main();
