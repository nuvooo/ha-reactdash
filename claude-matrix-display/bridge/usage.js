// Native Token-Verbrauchs-Auswertung – OHNE ccusage/npx.
// Liest dieselbe Quelle wie ccusage: Claude-Codes lokale JSONL-Logs unter
// ~/.claude/projects/**/*.jsonl . Damit braucht die gepackte App kein Node
// und kein zusätzliches Tool.

import { readdirSync, statSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";

const FIVE_H = 5 * 3600 * 1000;
const DAY = 24 * 3600 * 1000;

function claudeDir() {
  const base = process.env.CLAUDE_CONFIG_DIR || path.join(homedir(), ".claude");
  return path.join(base, "projects");
}

function floorHour(ms) {
  const d = new Date(ms);
  d.setMinutes(0, 0, 0);
  return d.getTime();
}

// .jsonl-Dateien einsammeln, die seit `sinceMs` geändert wurden (spart I/O).
function walk(dir, sinceMs, out) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, sinceMs, out);
    else if (e.isFile() && e.name.endsWith(".jsonl")) {
      try {
        if (statSync(p).mtimeMs >= sinceMs) out.push(p);
      } catch {}
    }
  }
}

// Alle Verbrauchs-Einträge { ts, tok } seit `sinceMs`, dedupliziert.
function collect(sinceMs) {
  const files = [];
  walk(claudeDir(), sinceMs, files);
  const seen = new Set();
  const rows = [];
  for (const f of files) {
    let text;
    try {
      text = readFileSync(f, "utf8");
    } catch {
      continue;
    }
    for (const line of text.split("\n")) {
      if (!line) continue;
      let o;
      try {
        o = JSON.parse(line);
      } catch {
        continue;
      }
      const u = o && o.message && o.message.usage;
      if (!u) continue;
      const ts = Date.parse(o.timestamp);
      if (Number.isNaN(ts)) continue;
      // Doppelte (gleiche Nachricht in mehreren Dateien) einmal zählen.
      const id = `${(o.message && o.message.id) || ""}:${o.requestId || ""}`;
      if (id !== ":" && seen.has(id)) continue;
      if (id !== ":") seen.add(id);
      const tok =
        (u.input_tokens || 0) +
        (u.output_tokens || 0) +
        (u.cache_creation_input_tokens || 0) +
        (u.cache_read_input_tokens || 0);
      rows.push({ ts, tok });
    }
  }
  rows.sort((a, b) => a.ts - b.ts);
  return rows;
}

// Aktiver 5h-Block = "Session". Reset = Blockstart + 5h. (Gruppierung analog
// ccusage: neuer Block bei >5h seit Blockstart ODER >5h Lücke.)
export function readSession() {
  const rows = collect(Date.now() - 8 * DAY);
  if (!rows.length) {
    return { usedTokens: 0, resetEpoch: Math.floor(Date.now() / 1000) + 5 * 3600 };
  }
  let curStart = floorHour(rows[0].ts);
  let curSum = 0;
  let curLast = rows[0].ts;
  for (const r of rows) {
    if (r.ts - curStart >= FIVE_H || r.ts - curLast >= FIVE_H) {
      curStart = floorHour(r.ts);
      curSum = 0;
    }
    curSum += r.tok;
    curLast = r.ts;
  }
  return { usedTokens: curSum, resetEpoch: Math.floor((curStart + FIVE_H) / 1000) };
}

// 7-Tage-Summe = "Woche". resetEpoch wird vom Aufrufer (Anker) gesetzt.
export function readWeekly(resetEpoch) {
  const since = Date.now() - 7 * DAY;
  const rows = collect(since - DAY).filter((r) => r.ts >= since);
  let sum = 0;
  for (const r of rows) sum += r.tok;
  return { usedTokens: sum, resetEpoch };
}
