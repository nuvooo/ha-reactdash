#!/usr/bin/env bash
# Baut ein macOS-.pkg (muss auf macOS laufen – pkgbuild). Installiert die
# Binärdatei nach /usr/local/bin und einen LaunchAgent für Autostart am Login.
#
#   ./build-pkg.sh [VERSION] [PFAD_ZUR_BINARY]
# Default-Binary: ../../bridge/dist/claude-matrix-macos  (aus npm run pkg:macos)
set -euo pipefail
cd "$(dirname "$0")"

VERSION="${1:-0.2.0}"
BIN="${2:-../../bridge/dist/claude-matrix-macos}"

if [ ! -f "$BIN" ]; then
  echo "Binary nicht gefunden: $BIN  (vorher 'npm run pkg:macos' im bridge/ ausführen)" >&2
  exit 1
fi

ROOT="$(mktemp -d)"
SCRIPTS="$(mktemp -d)"
trap 'rm -rf "$ROOT" "$SCRIPTS"' EXIT

mkdir -p "$ROOT/usr/local/bin" "$ROOT/Library/LaunchAgents"
install -m 0755 "$BIN" "$ROOT/usr/local/bin/claude-matrix"
install -m 0644 com.nuvooo.claude-matrix.plist "$ROOT/Library/LaunchAgents/com.nuvooo.claude-matrix.plist"
install -m 0755 postinstall "$SCRIPTS/postinstall"

OUT="claude-matrix-${VERSION}.pkg"
pkgbuild --root "$ROOT" --scripts "$SCRIPTS" \
  --identifier com.nuvooo.claude-matrix --version "$VERSION" \
  --install-location / "$OUT"
echo "gebaut: $OUT"
