#!/usr/bin/env bash
# Löst  claude-matrix-display/  als eigenständiges Repo heraus (mit History)
# und pusht es in dein neues, leeres GitHub-Repo.
#
# Voraussetzung – LEERES GitHub-Repo anlegen (OHNE README/License/.gitignore):
#     https://github.com/new   ->  Name: claude-matrix-display
#
# Dann in deinem ha-reactdash-Klon (mit Push-Rechten, NICHT in der Sandbox):
#     git fetch origin
#     git checkout claude/esp32-robot-token-display-WU6dG
#     ./extract-claude-matrix-display.sh git@github.com:nuvooo/claude-matrix-display.git
set -euo pipefail

REMOTE="${1:?URL des neuen leeren Repos angeben, z.B. git@github.com:nuvooo/claude-matrix-display.git}"
PREFIX="claude-matrix-display"
BRANCH="claude-matrix-standalone"

git rev-parse --is-inside-work-tree >/dev/null
[ -d "$PREFIX" ] || { echo "Bitte im ha-reactdash-Wurzelverzeichnis ausführen (Ordner '$PREFIX' fehlt)." >&2; exit 1; }

# Branch mit NUR diesem Unterordner erzeugen, auf die Repo-Wurzel umgeschrieben
# (die komplette Git-History des Ordners bleibt erhalten):
git branch -D "$BRANCH" 2>/dev/null || true
git subtree split --prefix="$PREFIX" -b "$BRANCH"

# In das neue Repo als 'main' pushen:
git push "$REMOTE" "$BRANCH:main"

cat <<EOF

Fertig – '$REMOTE' ist befüllt (Branch main, mit History).

Release (Installer für mac/win/linux) auslösen:
    git clone $REMOTE && cd claude-matrix-display
    git tag v0.2.0 && git push origin v0.2.0

Der CI-Workflow (.github/workflows/release.yml) baut dann pro OS Binary + Installer
und hängt sie ans Release.

Ohne History (Alternative): einfach den Ordner kopieren, 'git init', commit, push.
EOF
