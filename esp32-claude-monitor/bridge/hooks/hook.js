#!/usr/bin/env node
// Plattformübergreifender Claude-Code-Hook (Mac / Windows / Linux).
// Aufruf:  node hook.js <idle|working|waiting>
// Schickt den Status an die laufende Bridge. Schlägt der Request fehl
// (Bridge aus), wird das still ignoriert, damit Claude nie blockiert.

const status = process.argv[2];
if (!["idle", "working", "waiting"].includes(status)) {
  process.exit(0); // ungültig -> nichts tun
}

const url = process.env.CLAUDE_MONITOR_URL || "http://localhost:8718/event";

const ctrl = new AbortController();
const t = setTimeout(() => ctrl.abort(), 2000);

fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ status }),
  signal: ctrl.signal,
})
  .catch(() => {})
  .finally(() => {
    clearTimeout(t);
    process.exit(0);
  });
