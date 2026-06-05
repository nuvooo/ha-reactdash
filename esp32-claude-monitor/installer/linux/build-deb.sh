#!/usr/bin/env bash
# Baut ein .deb aus der pkg-Binärdatei. Installiert nach /usr/local/bin und
# richtet systemweiten Autostart (/etc/xdg/autostart) beim grafischen Login ein.
#
#   ./build-deb.sh [VERSION] [PFAD_ZUR_BINARY]
# Default-Binary: ../../bridge/dist/claude-monitor-linux  (aus npm run pkg:linux)
set -euo pipefail
cd "$(dirname "$0")"

VERSION="${1:-0.2.0}"
BIN="${2:-../../bridge/dist/claude-monitor-linux}"

if [ ! -f "$BIN" ]; then
  echo "Binary nicht gefunden: $BIN  (vorher 'npm run pkg:linux' im bridge/ ausführen)" >&2
  exit 1
fi

ROOT="$(mktemp -d)"
trap 'rm -rf "$ROOT"' EXIT
mkdir -p "$ROOT/DEBIAN" "$ROOT/usr/local/bin" "$ROOT/etc/xdg/autostart"

install -m 0755 "$BIN" "$ROOT/usr/local/bin/claude-monitor"

cat > "$ROOT/etc/xdg/autostart/claude-monitor.desktop" <<'EOF'
[Desktop Entry]
Type=Application
Name=Claude Monitor
Comment=ESP32 Claude Monitor – Bridge & Editor
Exec=/usr/local/bin/claude-monitor
X-GNOME-Autostart-enabled=true
EOF

cat > "$ROOT/DEBIAN/control" <<EOF
Package: claude-monitor
Version: $VERSION
Section: utils
Priority: optional
Architecture: amd64
Maintainer: nuvooo <noreply@users.noreply.github.com>
Description: ESP32 Claude Monitor – Bridge + Animations-Editor
 Liest den Claude-Token-Verbrauch, publiziert Status/Tokens per MQTT an einen
 ESP32-C6 und stellt den Animations-Editor unter http://localhost:8718 bereit.
 Startet automatisch beim grafischen Login.
EOF

OUT="claude-monitor_${VERSION}_amd64.deb"
dpkg-deb --build --root-owner-group "$ROOT" "$OUT"
echo "gebaut: $OUT"
