#!/usr/bin/env bash
# Claude-Code-Hook: signalisiert der Bridge, dass Claude fertig/idle ist.
# Wird vom Stop-Hook aufgerufen.
BRIDGE_URL="${CLAUDE_MONITOR_URL:-http://localhost:8718/event}"
curl -s -m 2 -X POST "$BRIDGE_URL" \
  -H 'Content-Type: application/json' \
  -d '{"working": false}' >/dev/null 2>&1 || true
exit 0
