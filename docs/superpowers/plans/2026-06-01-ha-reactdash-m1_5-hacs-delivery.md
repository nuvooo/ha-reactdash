# ha-reactdash — Meilenstein 1.5: HACS Plug-and-Play-Delivery Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`).

**Goal:** Das Panel per HACS installierbar machen und über die HA-UI einrichten (kein YAML, kein Datei-Kopieren). Ein dünner Python-`custom_component` registriert das Panel und liefert das gebaute JS-Bundle aus.

**Architecture:** Repo wird zum HACS-Integration-Repo: `hacs.json` an der Wurzel, Integration unter `custom_components/ha_reactdash/`. Beim Hinzufügen über die UI (Config-Flow) registriert `async_setup_entry` einen statischen Pfad für das Bundle und ruft `panel_custom.async_register_panel` auf. Der Vite-Build kopiert `dist/ha-reactdash.js` in `custom_components/ha_reactdash/frontend/`, das mit eingecheckt und von HACS ausgeliefert wird.

**Tech Stack:** Home Assistant custom integration (Python), HACS, vorhandener Vite-Build.

---

## Datei-Struktur (neu)

- `hacs.json` — HACS-Metadaten (Repo-Wurzel)
- `custom_components/ha_reactdash/const.py` — Konstanten
- `custom_components/ha_reactdash/manifest.json` — Integrations-Manifest
- `custom_components/ha_reactdash/__init__.py` — Setup/Unload: statischer Pfad + Panel-Registrierung
- `custom_components/ha_reactdash/config_flow.py` — UI-Config-Flow (Einzelinstanz, ohne Eingaben)
- `custom_components/ha_reactdash/strings.json` — Config-Flow-Texte
- `custom_components/ha_reactdash/frontend/ha-reactdash.js` — kopiertes Bundle (vom Build)
- `scripts/copy-to-component.mjs` — Build-Hilfsskript (kopiert dist → component)
- Modify: `package.json` — Build-Script ruft das Kopierskript
- Create: `README.md` — HACS-/UI-Installationsanleitung

---

## Task 1: Integration-Metadaten + Build-Wiring

**Files:** `hacs.json`, `custom_components/ha_reactdash/const.py`, `custom_components/ha_reactdash/manifest.json`, `scripts/copy-to-component.mjs`, modify `package.json`.

- [ ] **Step 1: `hacs.json` (Repo-Wurzel)**

```json
{
  "name": "ha-reactdash",
  "homeassistant": "2024.11.0",
  "render_readme": true
}
```

- [ ] **Step 2: `custom_components/ha_reactdash/const.py`**

```python
DOMAIN = "ha_reactdash"
PANEL_URL_PATH = "reactdash"
PANEL_TITLE = "ReactDash"
PANEL_ICON = "mdi:view-dashboard"
WEBCOMPONENT_NAME = "ha-reactdash"
STATIC_URL_BASE = "/ha_reactdash_static"
```

- [ ] **Step 3: `custom_components/ha_reactdash/manifest.json`**

```json
{
  "domain": "ha_reactdash",
  "name": "ha-reactdash",
  "version": "0.1.0",
  "documentation": "https://github.com/nuvooo/ha-reactdash",
  "issue_tracker": "https://github.com/nuvooo/ha-reactdash/issues",
  "codeowners": ["@nuvooo"],
  "config_flow": true,
  "iot_class": "local_push",
  "integration_type": "service",
  "dependencies": ["http", "frontend", "panel_custom"]
}
```

- [ ] **Step 4: `scripts/copy-to-component.mjs`**

```js
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const src = join("dist", "ha-reactdash.js");
const dest = join("custom_components", "ha_reactdash", "frontend", "ha-reactdash.js");
mkdirSync(dirname(dest), { recursive: true });
copyFileSync(src, dest);
console.log("Copied bundle ->", dest);
```

- [ ] **Step 5: `package.json` build script erweitern**

Change the `"build"` script from `"tsc --noEmit && vite build"` to:

```
"build": "tsc --noEmit && vite build && node scripts/copy-to-component.mjs"
```

- [ ] **Step 6: Verifizieren**

Run: `npm run build`
Expected: `dist/ha-reactdash.js` UND `custom_components/ha_reactdash/frontend/ha-reactdash.js` existieren.

Run: `node -e "JSON.parse(require('fs').readFileSync('hacs.json','utf8')); JSON.parse(require('fs').readFileSync('custom_components/ha_reactdash/manifest.json','utf8')); console.log('json ok')"`
Expected: `json ok`

Run: `python -c "import py_compile; py_compile.compile('custom_components/ha_reactdash/const.py', doraise=True); print('py ok')"`
Expected: `py ok`

- [ ] **Step 7: Commit**

```bash
git add hacs.json custom_components/ha_reactdash/const.py custom_components/ha_reactdash/manifest.json scripts/copy-to-component.mjs package.json custom_components/ha_reactdash/frontend/ha-reactdash.js
git commit -m "feat(hacs): add integration metadata and build-to-component wiring"
```

---

## Task 2: Integration-Setup (Panel-Registrierung + Config-Flow)

**Files:** `custom_components/ha_reactdash/__init__.py`, `custom_components/ha_reactdash/config_flow.py`, `custom_components/ha_reactdash/strings.json`.

- [ ] **Step 1: `__init__.py`**

```python
from __future__ import annotations

import os

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import (
    DOMAIN,
    PANEL_ICON,
    PANEL_TITLE,
    PANEL_URL_PATH,
    STATIC_URL_BASE,
    WEBCOMPONENT_NAME,
)


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Register the static asset path and the custom sidebar panel."""
    domain_data = hass.data.setdefault(DOMAIN, {})

    if not domain_data.get("static_registered"):
        frontend_dir = os.path.join(os.path.dirname(__file__), "frontend")
        await hass.http.async_register_static_paths(
            [StaticPathConfig(STATIC_URL_BASE, frontend_dir, False)]
        )
        domain_data["static_registered"] = True

    await panel_custom.async_register_panel(
        hass,
        frontend_url_path=PANEL_URL_PATH,
        webcomponent_name=WEBCOMPONENT_NAME,
        module_url=f"{STATIC_URL_BASE}/ha-reactdash.js",
        sidebar_title=PANEL_TITLE,
        sidebar_icon=PANEL_ICON,
        require_admin=False,
    )
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Remove the panel when the integration is unloaded."""
    frontend.async_remove_panel(hass, PANEL_URL_PATH)
    return True
```

- [ ] **Step 2: `config_flow.py`**

```python
from __future__ import annotations

from typing import Any

from homeassistant.config_entries import ConfigFlow, ConfigFlowResult

from .const import DOMAIN, PANEL_TITLE


class HaReactDashConfigFlow(ConfigFlow, domain=DOMAIN):
    """Single-instance UI config flow — no user input required."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> ConfigFlowResult:
        await self.async_set_unique_id(DOMAIN)
        self._abort_if_unique_id_configured()
        return self.async_create_entry(title=PANEL_TITLE, data={})
```

- [ ] **Step 3: `strings.json`**

```json
{
  "config": {
    "step": {
      "user": {
        "title": "ha-reactdash",
        "description": "Fügt das ReactDash-Panel zu Home Assistant hinzu."
      }
    },
    "abort": {
      "already_configured": "ha-reactdash ist bereits eingerichtet."
    }
  }
}
```

- [ ] **Step 4: Verifizieren**

Run: `python -c "import ast,glob; [ast.parse(open(f,encoding='utf-8').read()) for f in glob.glob('custom_components/ha_reactdash/*.py')]; print('py parse ok')"`
Expected: `py parse ok`

Run: `node -e "JSON.parse(require('fs').readFileSync('custom_components/ha_reactdash/strings.json','utf8')); console.log('json ok')"`
Expected: `json ok`

- [ ] **Step 5: Commit**

```bash
git add custom_components/ha_reactdash/__init__.py custom_components/ha_reactdash/config_flow.py custom_components/ha_reactdash/strings.json
git commit -m "feat(hacs): register panel via custom integration with UI config flow"
```

---

## Task 3: README mit HACS-/UI-Installationsanleitung

**Files:** `README.md`.

- [ ] **Step 1: `README.md`**

````markdown
# ha-reactdash

Selbst-gruppierendes Visualisierungs-Panel für Home Assistant. Baut dein Dashboard
automatisch aus deinen Räumen/Etagen — out of the box, ohne manuelle Kartenkonfiguration.

## Installation über HACS (empfohlen, Plug-and-Play)

1. In Home Assistant: **HACS → oben rechts ⋮ → Custom repositories**.
2. Repository-URL `https://github.com/nuvooo/ha-reactdash` eintragen, Kategorie **Integration**, hinzufügen.
3. **ha-reactdash** in HACS suchen und **installieren**.
4. Home Assistant **neu starten**.
5. **Einstellungen → Geräte & Dienste → Integration hinzufügen → ha-reactdash**.
6. Fertig — **ReactDash** erscheint in der Seitenleiste.

## Manuelle Installation (Alternative)

Siehe [`INSTALL.md`](./INSTALL.md): gebautes `dist/ha-reactdash.js` nach
`config/www/ha-reactdash/` kopieren und einen `panel_custom`-Eintrag setzen.

## Entwicklung

```bash
npm install
npm test
npm run build   # erzeugt dist/ und kopiert das Bundle in die Integration
```

## Status

Meilenstein 1: adaptive Auto-Gruppierung (Etagen → Räume → Funktionsgruppen).
Design-System, Smart-Controls, adaptives Layout und Suche folgen in weiteren Meilensteinen.
````

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add README with HACS plug-and-play install guide"
```

---

## Task 4: Build, Push, manuelle HACS-Abnahme

- [ ] **Step 1:** `npm run build` und `npm test` (14 grün) abschließend ausführen.
- [ ] **Step 2:** Sicherstellen, dass `custom_components/ha_reactdash/frontend/ha-reactdash.js` aktuell und committet ist.
- [ ] **Step 3:** `git push` (Branch `main`).
- [ ] **Step 4 (manuell, Nutzer):** In HA über HACS als Custom-Repo (Integration) hinzufügen, installieren, neu starten, Integration hinzufügen, Panel öffnen. Erwartet: ReactDash erscheint und zeigt die auto-gruppierte Struktur.

---

## Selbst-Review (gegen Ziel)
- HACS-erkennbar → `hacs.json` (Wurzel) + `custom_components/ha_reactdash/manifest.json` (Task 1).
- Panel ohne YAML registriert → `panel_custom.async_register_panel` in `async_setup_entry` (Task 2).
- JS ausgeliefert → statischer Pfad `STATIC_URL_BASE` auf `frontend/` (Task 2), Bundle dorthin kopiert (Task 1).
- UI-Setup → Config-Flow mit Einzelinstanz (Task 2).
- Doppelregistrierung des statischen Pfads bei Reload vermieden → `static_registered`-Flag (Task 2).
- Sauberes Entladen → `frontend.async_remove_panel` (Task 2).
- Anleitung → README (Task 3).
Keine Platzhalter; Konstanten in `const.py` werden konsistent in `__init__.py`/`config_flow.py` referenziert.
