# ha-reactdash — Meilenstein 2a: Design-Fundament Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`).

**Goal:** Tailwind v4 im Shadow DOM zum Laufen bringen, ein Hell/Dunkel-Token-System (folgt dem HA-Theme), und die rohe Strukturliste in ein responsives, gestyltes Kachel-Dashboard verwandeln — inkl. Tap-Toggle für schaltbare Entitäten.

**Architecture:** Tailwind v4 wird über `@tailwindcss/vite` kompiliert; das CSS wird als String (`?inline`) importiert und per `adoptedStyleSheets` in den Shadow-Root injiziert (kein Bleed mit HA). Semantische Farb-Tokens als CSS-Variablen auf `.app` / `.app.dark`, via `@theme inline` als Tailwind-Utilities (`bg-surface`, `text-muted`, …). Dark-Mode folgt `hass.themes.darkMode`. Eigene Tile-/RoomCard-Komponenten (wir besitzen sie) rendern den vorhandenen StructureTree.

**Tech Stack:** Tailwind CSS v4, @tailwindcss/vite, vorhandenes React+Vite+Shadow-DOM-Panel.

---

## Datei-Struktur

- Modify: `package.json` (Tailwind-Deps)
- Modify: `vite.config.ts` (Tailwind-Plugin)
- Create: `src/styles.css` (Tailwind-Import + Tokens hell/dunkel)
- Modify: `src/main.tsx` (CSS in Shadow-Root injizieren; darkMode-Klasse)
- Create: `src/theme/categoryMeta.ts` (Label + Icon-Klasse je Funktionskategorie)
- Create: `src/components/Tile.tsx` (eine Entitäts-Kachel)
- Create: `src/components/RoomCard.tsx` (Raum mit Funktionsgruppen)
- Create: `src/DashboardView.tsx` (ersetzt StructureView optisch)
- Modify: `src/Panel.tsx` (rendert DashboardView, reicht darkMode + hass durch)
- Create: `src/ha/useEntityState.ts` (Live-State + Toggle-Service-Aufruf)

---

## Task 1: Tailwind v4 installieren + Token-Stylesheet

**Files:** modify `package.json`, modify `vite.config.ts`, create `src/styles.css`.

- [ ] **Step 1: Tailwind-Deps installieren**

Run: `npm install -D tailwindcss@^4 @tailwindcss/vite@^4`
Expected: beide Pakete in devDependencies, kein harter Fehler.

- [ ] **Step 2: Vite-Plugin ergänzen**

In `vite.config.ts`: importiere das Plugin und füge es zu `plugins` hinzu (zusätzlich zu `react()`).

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: "src/main.tsx",
      formats: ["es"],
      fileName: () => "ha-reactdash.js",
    },
    rollupOptions: {
      output: { inlineDynamicImports: true },
    },
  },
  test: {
    globals: true,
    environment: "node",
    exclude: ["node_modules/**", ".gstack/**", ".superpowers/**"],
  },
});
```

- [ ] **Step 3: `src/styles.css` anlegen**

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

/* Tailwind-Utilities (bg-surface, text-muted, …) referenzieren Runtime-Variablen,
   damit dieselben Klassen in Hell und Dunkel funktionieren. */
@theme inline {
  --color-bg: var(--c-bg);
  --color-surface: var(--c-surface);
  --color-elevated: var(--c-elevated);
  --color-text: var(--c-text);
  --color-muted: var(--c-muted);
  --color-line: var(--c-line);
  --color-accent: var(--c-accent);
}

:where(.app) {
  --c-bg: #f3f4f6;
  --c-surface: #ffffff;
  --c-elevated: #ffffff;
  --c-text: #111418;
  --c-muted: #8a8f98;
  --c-line: #e6e8ec;
  --c-accent: #3b82f6;
  color: var(--c-text);
  background: var(--c-bg);
}

:where(.app.dark) {
  --c-bg: #0d1424;
  --c-surface: rgba(255, 255, 255, 0.06);
  --c-elevated: #131b2e;
  --c-text: #e8eefc;
  --c-muted: #7d89a6;
  --c-line: rgba(255, 255, 255, 0.08);
  --c-accent: #6ea8ff;
}

:where(.app) * {
  box-sizing: border-box;
}
```

- [ ] **Step 4: Verifizieren**

Run: `npm run build`
Expected: Build erfolgreich, `dist/ha-reactdash.js` erzeugt, Bundle wird ins Component kopiert.

Run: `node -e "const s=require('fs').readFileSync('dist/ha-reactdash.js','utf8'); if(!s.includes('--c-bg')) throw new Error('tailwind tokens NOT inlined into bundle'); console.log('css inlined ok')"`
Expected: `css inlined ok`. (Das beweist, dass das kompilierte CSS im Bundle landet — Voraussetzung für Task 2.)

WICHTIG: Falls dieser Check fehlschlägt (CSS nicht im Bundle), bedeutet das, dass `?inline` das Tailwind-CSS noch nicht enthält — STOPP und melde es als BLOCKED mit der Build-Ausgabe; Task 2 hängt davon ab. (Das `?inline`-Importieren passiert erst in Task 2; dieser Check prüft hier nur grob, dass Tailwind überhaupt kompiliert wird, indem `styles.css` schon importiert wird — siehe Step 5.)

- [ ] **Step 5: `styles.css` testweise importieren, damit Tailwind kompiliert**

Damit der Token-Check in Step 4 greift, muss `styles.css` importiert werden. Falls noch nicht durch Task 2 geschehen, füge in `src/main.tsx` ganz oben vorübergehend `import "./styles.css";` hinzu — ODER führe Step 4 erst nach Task 2 aus. Reihenfolge-Hinweis: Wenn du Task 1 und Task 2 zusammen umsetzt, führe den Token-Check (Step 4) am Ende von Task 2 aus. Andernfalls den temporären Import hier setzen und in Task 2 durch den `?inline`-Import ersetzen.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json vite.config.ts src/styles.css
git commit -m "feat(theme): add tailwind v4 with light/dark design tokens"
```

---

## Task 2: CSS in den Shadow-Root injizieren + Dark-Mode-Klasse

**Files:** modify `src/main.tsx`.

- [ ] **Step 1: `main.tsx` aktualisieren**

Ersetze den vollständigen Inhalt von `src/main.tsx` durch:

```tsx
import { createRoot, type Root } from "react-dom/client";
import { Panel } from "./Panel";
import styles from "./styles.css?inline";

interface HassLike {
  states: Record<string, unknown>;
  connection: unknown;
  themes?: { darkMode?: boolean };
}

class HaReactDash extends HTMLElement {
  private root?: Root;
  private mountPoint?: HTMLDivElement;
  private _hass?: HassLike;

  connectedCallback() {
    if (!this.shadowRoot) {
      const shadow = this.attachShadow({ mode: "open" });
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(styles);
      shadow.adoptedStyleSheets = [sheet];
      this.mountPoint = document.createElement("div");
      shadow.appendChild(this.mountPoint);
    }
    if (!this.root && this.mountPoint) {
      this.root = createRoot(this.mountPoint);
    }
    this.renderApp();
  }

  disconnectedCallback() {
    this.root?.unmount();
    this.root = undefined;
  }

  set hass(value: HassLike) {
    this._hass = value;
    this.renderApp();
  }

  get hass(): HassLike | undefined {
    return this._hass;
  }

  private renderApp() {
    const dark = this._hass?.themes?.darkMode === true;
    this.root?.render(<Panel hass={this._hass} dark={dark} />);
  }
}

if (!customElements.get("ha-reactdash")) {
  customElements.define("ha-reactdash", HaReactDash);
}
```

- [ ] **Step 2: Build + Inlining-Check**

Run: `npm run build`
Expected: erfolgreich.

Run: `node -e "const s=require('fs').readFileSync('dist/ha-reactdash.js','utf8'); if(!s.includes('--c-bg')||!s.includes('--c-text')) throw new Error('tailwind CSS not inlined'); console.log('css inlined ok')"`
Expected: `css inlined ok`.

Falls FEHLER: `?inline` liefert das kompilierte Tailwind nicht. Fallback-Strategie (dann anwenden und im Report vermerken): (a) sicherstellen, dass `@tailwindcss/vite` VOR `react()` steht ist nicht nötig; (b) alternativ `styles.css` über einen separaten `vite build`-CSS-Einstieg kompilieren und als `?raw` einbinden; (c) als letzte Option PostCSS-Tailwind nutzen und das Ergebnis als String einlesen. Wenn keiner greift: BLOCKED melden.

- [ ] **Step 3: Commit**

```bash
git add src/main.tsx
git commit -m "feat(theme): inject compiled tailwind into shadow root, follow HA dark mode"
```

---

## Task 3: Kategorie-Meta + Tile + RoomCard + DashboardView

**Files:** create `src/theme/categoryMeta.ts`, `src/components/Tile.tsx`, `src/components/RoomCard.tsx`, `src/DashboardView.tsx`.

- [ ] **Step 1: `src/theme/categoryMeta.ts`**

```ts
import type { FunctionCategory } from "../grouping/types";

interface CategoryMeta {
  label: string;
  icon: string; // emoji placeholder for M2a; MDI icons folgen in M2b
}

export const CATEGORY_META: Record<FunctionCategory, CategoryMeta> = {
  light: { label: "Licht", icon: "💡" },
  climate: { label: "Klima", icon: "🌡️" },
  media: { label: "Medien", icon: "🎵" },
  cover: { label: "Rollos", icon: "🪟" },
  switch: { label: "Schalter", icon: "🔌" },
  security: { label: "Sicherheit", icon: "🔒" },
  sensor: { label: "Sensoren", icon: "📈" },
  other: { label: "Sonstiges", icon: "⚙️" },
};
```

- [ ] **Step 2: `src/ha/useEntityState.ts`**

```ts
interface HassState {
  state: string;
  attributes: { friendly_name?: string; device_class?: string };
}

interface HassLike {
  states: Record<string, HassState>;
  callService: (domain: string, service: string, data: { entity_id: string }) => Promise<unknown>;
}

const TOGGLE_DOMAINS = new Set(["light", "switch", "fan", "input_boolean"]);

export function entityName(hass: HassLike, entityId: string): string {
  return hass.states[entityId]?.attributes.friendly_name ?? entityId;
}

export function entityState(hass: HassLike, entityId: string): string {
  return hass.states[entityId]?.state ?? "unavailable";
}

export function isOn(hass: HassLike, entityId: string): boolean {
  return entityState(hass, entityId) === "on";
}

export function canToggle(entityId: string): boolean {
  return TOGGLE_DOMAINS.has(entityId.split(".")[0]);
}

export function toggle(hass: HassLike, entityId: string): void {
  if (!canToggle(entityId)) return;
  void hass.callService("homeassistant", "toggle", { entity_id: entityId });
}
```

- [ ] **Step 3: `src/components/Tile.tsx`**

```tsx
import { canToggle, entityName, entityState, isOn, toggle } from "../ha/useEntityState";

interface HassState {
  state: string;
  attributes: { friendly_name?: string; device_class?: string };
}
interface HassLike {
  states: Record<string, HassState>;
  callService: (domain: string, service: string, data: { entity_id: string }) => Promise<unknown>;
}

export function Tile({ hass, entityId, icon }: { hass: HassLike; entityId: string; icon: string }) {
  const on = isOn(hass, entityId);
  const clickable = canToggle(entityId);
  const name = entityName(hass, entityId);
  const state = entityState(hass, entityId);

  return (
    <button
      type="button"
      disabled={!clickable}
      onClick={() => toggle(hass, entityId)}
      className={[
        "flex items-center gap-3 rounded-2xl p-3 text-left w-full transition",
        "bg-surface border border-line",
        clickable ? "hover:brightness-105 cursor-pointer" : "cursor-default",
      ].join(" ")}
    >
      <span
        className={[
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg",
          on ? "bg-accent/20" : "bg-bg",
        ].join(" ")}
      >
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium text-text">{name}</span>
        <span className="block truncate text-xs text-muted">{on ? "An" : state}</span>
      </span>
    </button>
  );
}
```

- [ ] **Step 4: `src/components/RoomCard.tsx`**

```tsx
import type { RoomNode } from "../grouping/types";
import { CATEGORY_META } from "../theme/categoryMeta";
import { Tile } from "./Tile";

interface HassState {
  state: string;
  attributes: { friendly_name?: string; device_class?: string };
}
interface HassLike {
  states: Record<string, HassState>;
  callService: (domain: string, service: string, data: { entity_id: string }) => Promise<unknown>;
}

export function RoomCard({ hass, room }: { hass: HassLike; room: RoomNode }) {
  return (
    <section className="rounded-3xl bg-elevated border border-line p-4 shadow-sm">
      <h3 className="mb-3 text-base font-semibold text-text">{room.name}</h3>
      <div className="flex flex-col gap-4">
        {room.groups.map((group) => (
          <div key={group.category}>
            <div className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
              {CATEGORY_META[group.category].label}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {group.entityIds.map((id) => (
                <Tile key={id} hass={hass} entityId={id} icon={CATEGORY_META[group.category].icon} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: `src/DashboardView.tsx`**

```tsx
import type { StructureTree } from "./grouping/types";
import { RoomCard } from "./components/RoomCard";

interface HassState {
  state: string;
  attributes: { friendly_name?: string; device_class?: string };
}
interface HassLike {
  states: Record<string, HassState>;
  callService: (domain: string, service: string, data: { entity_id: string }) => Promise<unknown>;
}

export function DashboardView({ hass, tree }: { hass: HassLike; tree: StructureTree }) {
  return (
    <div className="mx-auto max-w-screen-xl p-4">
      <h1 className="mb-4 text-2xl font-bold text-text">ReactDash</h1>
      {tree.floors.map((floor) => (
        <section key={floor.floorId ?? "synthetic"} className="mb-8">
          {tree.hasFloors && floor.name && (
            <h2 className="mb-3 text-lg font-semibold text-muted">{floor.name}</h2>
          )}
          <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
            {floor.rooms.map((room) => (
              <RoomCard key={room.areaId} hass={hass} room={room} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
```

- [ ] **Step 6: Build**

Run: `npm run build`
Expected: erfolgreich, keine TS-Fehler.

- [ ] **Step 7: Commit**

```bash
git add src/theme/categoryMeta.ts src/ha/useEntityState.ts src/components/Tile.tsx src/components/RoomCard.tsx src/DashboardView.tsx
git commit -m "feat(ui): styled tile/room-card dashboard with tap-toggle"
```

---

## Task 4: Panel auf DashboardView umstellen (mit App-Wrapper + Dark-Klasse)

**Files:** modify `src/Panel.tsx`.

- [ ] **Step 1: `Panel.tsx` ersetzen**

```tsx
import { useStructureTree } from "./ha/useRegistries";
import { DashboardView } from "./DashboardView";
import type { RegistryConnection } from "./ha/types";

// TODO(M2b): centralize one HassLike type in src/ha/types.ts and drop these casts.
interface HassLike {
  states: Record<string, unknown>;
  connection: unknown;
}

interface HassTyped {
  states: Record<string, { state: string; attributes: { friendly_name?: string; device_class?: string } }>;
  connection: RegistryConnection;
  callService: (domain: string, service: string, data: { entity_id: string }) => Promise<unknown>;
}

export function Panel({ hass, dark }: { hass?: HassLike; dark?: boolean }) {
  const tree = useStructureTree(hass as never);
  const wrapper = `app${dark ? " dark" : ""} min-h-screen`;

  if (!hass) {
    return <div className={wrapper}><div className="p-4 text-muted">Verbinde…</div></div>;
  }
  if (!tree) {
    return <div className={wrapper}><div className="p-4 text-muted">Lade Struktur…</div></div>;
  }
  return (
    <div className={wrapper}>
      <DashboardView hass={hass as unknown as HassTyped} tree={tree} />
    </div>
  );
}
```

- [ ] **Step 2: Build + Tests**

Run: `npm run build` — erfolgreich, keine TS-Fehler.
Run: `npm test` — 14 Tests weiterhin grün (Logik unverändert).

- [ ] **Step 3: Bundle ins Component sicherstellen + Commit**

Der Build kopiert bereits nach `custom_components/ha_reactdash/frontend/ha-reactdash.js`.

```bash
git add src/Panel.tsx dist/ha-reactdash.js custom_components/ha_reactdash/frontend/ha-reactdash.js
git commit -m "feat(ui): render styled dashboard with app theme wrapper"
```

- [ ] **Step 4: Push**

```bash
git push origin main
```

- [ ] **Step 5 (manuell, Nutzer):** In HA (HACS-Installation aktualisieren oder Datei neu laden), Panel öffnen. Erwartet: gestyltes Kachel-Dashboard, Räume als Karten, Funktionsgruppen mit Labels, Licht/Schalter per Tap schaltbar, Dark-Mode folgt dem HA-Theme.

---

## Selbst-Review (gegen Ziel)
- Tailwind im Shadow DOM → `?inline` + `adoptedStyleSheets` (Task 2), Inlining-Check verifiziert (Task 2 Step 2).
- Hell/Dunkel-Tokens, folgt HA-Theme → `styles.css` Tokens + `dark`-Klasse aus `hass.themes.darkMode` (Task 1/2/4).
- Responsives Kachel-Grid → `auto-fill minmax(280px,1fr)` (Task 3 DashboardView).
- Funktionsgruppen mit Labels/Icons → `categoryMeta` + RoomCard (Task 3).
- Tap-Toggle für schaltbare Entitäten → `useEntityState.toggle` via `callService` (Task 3).
- Keine Logik gebrochen → 14 Tests bleiben grün (Task 4).

**Bewusst NICHT in M2a (folgt M2b):** Dimmen/Farbe, Klima-/Media-/Cover-Controls, Detail-Dialoge, MDI-Icons statt Emoji, Command-Bar/Suche, manueller Theme-Toggle, shadcn-Dialog/cmdk.
