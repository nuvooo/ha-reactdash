# ha-reactdash — Meilenstein 1: Fundament Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ein `panel_custom`-Panel, das in Home Assistant lädt, das `hass`-Objekt erhält, die HA-Registries liest und die adaptiv auto-gruppierte Struktur (Etagen → Räume → Funktionsgruppen → Entitäten) anzeigt.

**Architecture:** React wird in einem Web Component gemountet; HA reicht `hass` als Property herein. Eine Datenschicht (`ha/`) kapselt die Registry-WebSocket-Calls. Eine reine, testgetriebene Grouping-Engine (`grouping/`) baut aus den Registries einen Strukturbaum. M1 rendert diesen minimal (Listen, leichte Inline-Styles) — das Design-System (Tailwind/shadcn) folgt in M2.

**Tech Stack:** React + TypeScript + Vite (ES-Module-Build), Vitest für Tests.

---

## Datei-Struktur (in diesem Meilenstein angelegt)

- `package.json` — Abhängigkeiten + Scripts
- `tsconfig.json` — TypeScript-Konfiguration
- `vite.config.ts` — Build zu einem ES-Modul + Vitest-Konfiguration
- `src/main.tsx` — Web-Component-Registrierung, mountet React ins Shadow DOM
- `src/Panel.tsx` — Wurzel-React-Komponente, erhält `hass`
- `src/ha/types.ts` — TypeScript-Typen der HA-Registry-Objekte
- `src/ha/registries.ts` — Fetch-Funktionen für die vier Registries
- `src/ha/registries.test.ts` — Tests der Fetch-Funktionen
- `src/ha/useRegistries.ts` — React-Hook, der Registries + States bündelt
- `src/grouping/types.ts` — Typen des Strukturbaums + Funktionskategorien
- `src/grouping/categorize.ts` — Entität → Funktionskategorie
- `src/grouping/categorize.test.ts` — Tests der Kategorisierung
- `src/grouping/buildStructureTree.ts` — Registries → Strukturbaum
- `src/grouping/buildStructureTree.test.ts` — Tests der Engine
- `src/StructureView.tsx` — minimale Darstellung des Strukturbaums

---

## Task 1: Projektgerüst

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vite.config.ts`
- Create: `index.html` (nur für lokalen Dev-Check)

- [ ] **Step 1: package.json anlegen**

Create `package.json`:

```json
{
  "name": "ha-reactdash",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "^5.6.3",
    "vite": "^5.4.11",
    "vitest": "^2.1.8"
  }
}
```

- [ ] **Step 2: tsconfig.json anlegen**

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2021",
    "lib": ["ES2021", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "types": ["vitest/globals"]
  },
  "include": ["src"]
}
```

- [ ] **Step 3: vite.config.ts anlegen**

Create `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
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
  },
});
```

- [ ] **Step 4: index.html für lokalen Dev-Check anlegen**

Create `index.html`:

```html
<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <title>ha-reactdash dev</title>
  </head>
  <body>
    <ha-reactdash></ha-reactdash>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Abhängigkeiten installieren**

Run: `npm install`
Expected: `node_modules/` wird erstellt, kein Fehler.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json tsconfig.json vite.config.ts index.html
git commit -m "chore: scaffold vite + react + typescript project"
```

---

## Task 2: HA-Registry-Datenschicht (TDD)

**Files:**
- Create: `src/ha/types.ts`
- Create: `src/ha/registries.ts`
- Test: `src/ha/registries.test.ts`

- [ ] **Step 1: Registry-Typen anlegen**

Create `src/ha/types.ts`:

```ts
export interface HassFloor {
  floor_id: string;
  name: string;
  level: number | null;
}

export interface HassArea {
  area_id: string;
  name: string;
  floor_id: string | null;
}

export interface HassDevice {
  id: string;
  area_id: string | null;
}

export interface HassEntity {
  entity_id: string;
  device_id: string | null;
  area_id: string | null;
  hidden_by: string | null;
  entity_category: string | null;
}

/** Minimale Sicht auf hass.connection, die wir brauchen (testbar). */
export interface RegistryConnection {
  sendMessagePromise<T>(message: { type: string }): Promise<T>;
}
```

- [ ] **Step 2: Failing test schreiben**

Create `src/ha/registries.test.ts`:

```ts
import { describe, it, expect, vi } from "vitest";
import { fetchRegistries } from "./registries";
import type { RegistryConnection } from "./types";

function mockConnection(byType: Record<string, unknown>): RegistryConnection {
  return {
    sendMessagePromise: vi.fn((msg: { type: string }) =>
      Promise.resolve(byType[msg.type]),
    ) as RegistryConnection["sendMessagePromise"],
  };
}

describe("fetchRegistries", () => {
  it("ruft alle vier Registry-Typen ab und bündelt sie", async () => {
    const conn = mockConnection({
      "config/floor_registry/list": [{ floor_id: "eg", name: "EG", level: 0 }],
      "config/area_registry/list": [{ area_id: "wz", name: "Wohnzimmer", floor_id: "eg" }],
      "config/device_registry/list": [{ id: "d1", area_id: "wz" }],
      "config/entity_registry/list": [
        { entity_id: "light.wz", device_id: "d1", area_id: null, hidden_by: null, entity_category: null },
      ],
    });

    const result = await fetchRegistries(conn);

    expect(result.floors).toHaveLength(1);
    expect(result.areas[0].name).toBe("Wohnzimmer");
    expect(result.devices[0].id).toBe("d1");
    expect(result.entities[0].entity_id).toBe("light.wz");
  });
});
```

- [ ] **Step 3: Test ausführen, Fehlschlag bestätigen**

Run: `npm test -- src/ha/registries.test.ts`
Expected: FAIL — `fetchRegistries` ist nicht definiert (Import-Fehler).

- [ ] **Step 4: Implementierung schreiben**

Create `src/ha/registries.ts`:

```ts
import type {
  HassArea,
  HassDevice,
  HassEntity,
  HassFloor,
  RegistryConnection,
} from "./types";

export interface Registries {
  floors: HassFloor[];
  areas: HassArea[];
  devices: HassDevice[];
  entities: HassEntity[];
}

export async function fetchRegistries(
  conn: RegistryConnection,
): Promise<Registries> {
  const [floors, areas, devices, entities] = await Promise.all([
    conn.sendMessagePromise<HassFloor[]>({ type: "config/floor_registry/list" }),
    conn.sendMessagePromise<HassArea[]>({ type: "config/area_registry/list" }),
    conn.sendMessagePromise<HassDevice[]>({ type: "config/device_registry/list" }),
    conn.sendMessagePromise<HassEntity[]>({ type: "config/entity_registry/list" }),
  ]);
  return { floors, areas, devices, entities };
}
```

- [ ] **Step 5: Test ausführen, Erfolg bestätigen**

Run: `npm test -- src/ha/registries.test.ts`
Expected: PASS (1 Test).

- [ ] **Step 6: Commit**

```bash
git add src/ha/types.ts src/ha/registries.ts src/ha/registries.test.ts
git commit -m "feat(ha): add registry types and fetchRegistries"
```

---

## Task 3: Funktions-Kategorisierung (TDD)

**Files:**
- Create: `src/grouping/types.ts`
- Create: `src/grouping/categorize.ts`
- Test: `src/grouping/categorize.test.ts`

- [ ] **Step 1: Strukturbaum-Typen anlegen**

Create `src/grouping/types.ts`:

```ts
export type FunctionCategory =
  | "light"
  | "climate"
  | "media"
  | "cover"
  | "switch"
  | "security"
  | "sensor"
  | "other";

/** Kanonische Reihenfolge der Funktionsgruppen je Raum. */
export const CATEGORY_ORDER: FunctionCategory[] = [
  "light",
  "climate",
  "media",
  "cover",
  "switch",
  "security",
  "sensor",
  "other",
];

export interface CategoryGroup {
  category: FunctionCategory;
  entityIds: string[];
}

export interface RoomNode {
  areaId: string;
  name: string;
  groups: CategoryGroup[];
}

export interface FloorNode {
  /** null = synthetische Etage, wenn keine Etagen definiert sind. */
  floorId: string | null;
  name: string;
  rooms: RoomNode[];
}

export interface StructureTree {
  hasFloors: boolean;
  floors: FloorNode[];
}
```

- [ ] **Step 2: Failing test schreiben**

Create `src/grouping/categorize.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { categorize } from "./categorize";

describe("categorize", () => {
  it("ordnet Domains den Kategorien zu", () => {
    expect(categorize("light.kueche", null)).toBe("light");
    expect(categorize("climate.wz", null)).toBe("climate");
    expect(categorize("media_player.sonos", null)).toBe("media");
    expect(categorize("cover.rollo", null)).toBe("cover");
    expect(categorize("switch.steckdose", null)).toBe("switch");
    expect(categorize("fan.bad", null)).toBe("switch");
    expect(categorize("lock.tuer", null)).toBe("security");
    expect(categorize("sensor.temp", null)).toBe("sensor");
  });

  it("nutzt device_class von binary_sensor zur Sicherheits-Einordnung", () => {
    expect(categorize("binary_sensor.fenster", "window")).toBe("security");
    expect(categorize("binary_sensor.tuer", "door")).toBe("security");
    expect(categorize("binary_sensor.bewegung", "motion")).toBe("sensor");
    expect(categorize("binary_sensor.x", null)).toBe("sensor");
  });

  it("fällt für unbekannte Domains auf 'other' zurück", () => {
    expect(categorize("weather.home", null)).toBe("other");
    expect(categorize("foobar.baz", null)).toBe("other");
  });
});
```

- [ ] **Step 3: Test ausführen, Fehlschlag bestätigen**

Run: `npm test -- src/grouping/categorize.test.ts`
Expected: FAIL — `categorize` ist nicht definiert.

- [ ] **Step 4: Implementierung schreiben**

Create `src/grouping/categorize.ts`:

```ts
import type { FunctionCategory } from "./types";

const SECURITY_BINARY_CLASSES = new Set([
  "door",
  "window",
  "garage_door",
  "lock",
  "safety",
  "smoke",
  "gas",
  "moisture",
  "tamper",
]);

const DOMAIN_MAP: Record<string, FunctionCategory> = {
  light: "light",
  climate: "climate",
  media_player: "media",
  cover: "cover",
  switch: "switch",
  fan: "switch",
  input_boolean: "switch",
  lock: "security",
  alarm_control_panel: "security",
  sensor: "sensor",
};

export function categorize(
  entityId: string,
  deviceClass: string | null,
): FunctionCategory {
  const domain = entityId.split(".")[0];

  if (domain === "binary_sensor") {
    if (deviceClass && SECURITY_BINARY_CLASSES.has(deviceClass)) {
      return "security";
    }
    return "sensor";
  }

  return DOMAIN_MAP[domain] ?? "other";
}
```

- [ ] **Step 5: Test ausführen, Erfolg bestätigen**

Run: `npm test -- src/grouping/categorize.test.ts`
Expected: PASS (3 Tests).

- [ ] **Step 6: Commit**

```bash
git add src/grouping/types.ts src/grouping/categorize.ts src/grouping/categorize.test.ts
git commit -m "feat(grouping): add structure types and categorize()"
```

---

## Task 4: Grouping-Engine `buildStructureTree` (TDD)

**Files:**
- Create: `src/grouping/buildStructureTree.ts`
- Test: `src/grouping/buildStructureTree.test.ts`

Diese Engine bekommt zusätzlich pro Entität die `device_class` (aus dem Live-State-Attribut), damit `categorize` die Sicherheits-Sensoren erkennt. Die Eingabe ist bewusst entkoppelt von `hass`, damit sie rein testbar bleibt.

- [ ] **Step 1: Failing test schreiben**

Create `src/grouping/buildStructureTree.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { buildStructureTree, type BuildInput } from "./buildStructureTree";

const base: BuildInput = {
  floors: [],
  areas: [],
  devices: [],
  entities: [],
  deviceClassOf: () => null,
  includeHidden: false,
};

describe("buildStructureTree", () => {
  it("gruppiert mit Etagen: Etage → Raum → Funktionsgruppen", () => {
    const tree = buildStructureTree({
      ...base,
      floors: [{ floor_id: "eg", name: "Erdgeschoss", level: 0 }],
      areas: [{ area_id: "wz", name: "Wohnzimmer", floor_id: "eg" }],
      devices: [],
      entities: [
        { entity_id: "light.wz", device_id: null, area_id: "wz", hidden_by: null, entity_category: null },
        { entity_id: "sensor.wz_temp", device_id: null, area_id: "wz", hidden_by: null, entity_category: null },
      ],
    });

    expect(tree.hasFloors).toBe(true);
    expect(tree.floors).toHaveLength(1);
    expect(tree.floors[0].name).toBe("Erdgeschoss");
    const wz = tree.floors[0].rooms[0];
    expect(wz.name).toBe("Wohnzimmer");
    // light vor sensor laut CATEGORY_ORDER
    expect(wz.groups.map((g) => g.category)).toEqual(["light", "sensor"]);
    expect(wz.groups[0].entityIds).toEqual(["light.wz"]);
  });

  it("ist adaptiv: ohne Etagen → synthetische Etage, hasFloors=false", () => {
    const tree = buildStructureTree({
      ...base,
      areas: [{ area_id: "wz", name: "Wohnzimmer", floor_id: null }],
      entities: [
        { entity_id: "light.wz", device_id: null, area_id: "wz", hidden_by: null, entity_category: null },
      ],
    });

    expect(tree.hasFloors).toBe(false);
    expect(tree.floors).toHaveLength(1);
    expect(tree.floors[0].floorId).toBeNull();
    expect(tree.floors[0].rooms[0].name).toBe("Wohnzimmer");
  });

  it("leitet den Raum über die Device-Area ab, wenn die Entität keine Area hat", () => {
    const tree = buildStructureTree({
      ...base,
      areas: [{ area_id: "kue", name: "Küche", floor_id: null }],
      devices: [{ id: "d1", area_id: "kue" }],
      entities: [
        { entity_id: "light.kue", device_id: "d1", area_id: null, hidden_by: null, entity_category: null },
      ],
    });

    expect(tree.floors[0].rooms[0].name).toBe("Küche");
    expect(tree.floors[0].rooms[0].groups[0].entityIds).toEqual(["light.kue"]);
  });

  it("sammelt Entitäten ohne Raum in 'Sonstiges'", () => {
    const tree = buildStructureTree({
      ...base,
      entities: [
        { entity_id: "light.flur", device_id: null, area_id: null, hidden_by: null, entity_category: null },
      ],
    });

    const room = tree.floors[0].rooms[0];
    expect(room.areaId).toBe("__unassigned__");
    expect(room.name).toBe("Sonstiges");
  });

  it("blendet versteckte und diagnostische Entitäten standardmäßig aus", () => {
    const tree = buildStructureTree({
      ...base,
      areas: [{ area_id: "wz", name: "Wohnzimmer", floor_id: null }],
      entities: [
        { entity_id: "light.sichtbar", device_id: null, area_id: "wz", hidden_by: null, entity_category: null },
        { entity_id: "sensor.versteckt", device_id: null, area_id: "wz", hidden_by: "user", entity_category: null },
        { entity_id: "sensor.diag", device_id: null, area_id: "wz", hidden_by: null, entity_category: "diagnostic" },
      ],
    });

    const ids = tree.floors[0].rooms[0].groups.flatMap((g) => g.entityIds);
    expect(ids).toEqual(["light.sichtbar"]);
  });

  it("lässt leere Räume weg", () => {
    const tree = buildStructureTree({
      ...base,
      areas: [{ area_id: "leer", name: "Leerer Raum", floor_id: null }],
      entities: [],
    });

    expect(tree.floors).toHaveLength(0);
  });

  it("nutzt device_class für Sicherheits-Einordnung", () => {
    const tree = buildStructureTree({
      ...base,
      areas: [{ area_id: "wz", name: "Wohnzimmer", floor_id: null }],
      entities: [
        { entity_id: "binary_sensor.fenster", device_id: null, area_id: "wz", hidden_by: null, entity_category: null },
      ],
      deviceClassOf: (id) => (id === "binary_sensor.fenster" ? "window" : null),
    });

    expect(tree.floors[0].rooms[0].groups[0].category).toBe("security");
  });
});
```

- [ ] **Step 2: Test ausführen, Fehlschlag bestätigen**

Run: `npm test -- src/grouping/buildStructureTree.test.ts`
Expected: FAIL — `buildStructureTree` ist nicht definiert.

- [ ] **Step 3: Implementierung schreiben**

Create `src/grouping/buildStructureTree.ts`:

```ts
import { categorize } from "./categorize";
import {
  CATEGORY_ORDER,
  type CategoryGroup,
  type FloorNode,
  type FunctionCategory,
  type RoomNode,
  type StructureTree,
} from "./types";
import type { HassArea, HassDevice, HassEntity, HassFloor } from "../ha/types";

export interface BuildInput {
  floors: HassFloor[];
  areas: HassArea[];
  devices: HassDevice[];
  entities: HassEntity[];
  /** Liefert die device_class einer Entität (aus dem Live-State), oder null. */
  deviceClassOf: (entityId: string) => string | null;
  includeHidden: boolean;
}

const UNASSIGNED_AREA_ID = "__unassigned__";
const UNASSIGNED_NAME = "Sonstiges";

function isVisible(entity: HassEntity, includeHidden: boolean): boolean {
  if (includeHidden) return true;
  if (entity.hidden_by !== null) return false;
  if (entity.entity_category !== null) return false;
  return true;
}

function effectiveAreaId(
  entity: HassEntity,
  deviceAreaById: Map<string, string | null>,
): string {
  if (entity.area_id) return entity.area_id;
  if (entity.device_id) {
    const viaDevice = deviceAreaById.get(entity.device_id);
    if (viaDevice) return viaDevice;
  }
  return UNASSIGNED_AREA_ID;
}

function buildGroups(entityIds: string[], input: BuildInput): CategoryGroup[] {
  const byCategory = new Map<FunctionCategory, string[]>();
  for (const entityId of entityIds) {
    const category = categorize(entityId, input.deviceClassOf(entityId));
    const list = byCategory.get(category) ?? [];
    list.push(entityId);
    byCategory.set(category, list);
  }
  const groups: CategoryGroup[] = [];
  for (const category of CATEGORY_ORDER) {
    const ids = byCategory.get(category);
    if (ids && ids.length > 0) {
      groups.push({ category, entityIds: ids });
    }
  }
  return groups;
}

export function buildStructureTree(input: BuildInput): StructureTree {
  const deviceAreaById = new Map<string, string | null>(
    input.devices.map((d) => [d.id, d.area_id]),
  );

  // Entitäten je Raum sammeln.
  const entityIdsByArea = new Map<string, string[]>();
  for (const entity of input.entities) {
    if (!isVisible(entity, input.includeHidden)) continue;
    const areaId = effectiveAreaId(entity, deviceAreaById);
    const list = entityIdsByArea.get(areaId) ?? [];
    list.push(entity.entity_id);
    entityIdsByArea.set(areaId, list);
  }

  // Räume bauen (nur nicht-leere).
  const areaName = new Map<string, string>(
    input.areas.map((a) => [a.area_id, a.name]),
  );
  const areaFloor = new Map<string, string | null>(
    input.areas.map((a) => [a.area_id, a.floor_id]),
  );

  const roomsByFloor = new Map<string | null, RoomNode[]>();
  for (const [areaId, entityIds] of entityIdsByArea) {
    const groups = buildGroups(entityIds, input);
    if (groups.length === 0) continue;
    const name =
      areaId === UNASSIGNED_AREA_ID
        ? UNASSIGNED_NAME
        : areaName.get(areaId) ?? areaId;
    const floorId =
      areaId === UNASSIGNED_AREA_ID ? null : areaFloor.get(areaId) ?? null;
    const room: RoomNode = { areaId, name, groups };
    const list = roomsByFloor.get(floorId) ?? [];
    list.push(room);
    roomsByFloor.set(floorId, list);
  }

  const hasFloors = input.floors.length > 0;

  if (!hasFloors) {
    const rooms = [...roomsByFloor.values()].flat();
    if (rooms.length === 0) return { hasFloors: false, floors: [] };
    return {
      hasFloors: false,
      floors: [{ floorId: null, name: "", rooms }],
    };
  }

  const floors: FloorNode[] = [];
  const sortedFloors = [...input.floors].sort(
    (a, b) => (a.level ?? 0) - (b.level ?? 0),
  );
  for (const floor of sortedFloors) {
    const rooms = roomsByFloor.get(floor.floor_id) ?? [];
    if (rooms.length > 0) {
      floors.push({ floorId: floor.floor_id, name: floor.name, rooms });
    }
  }
  // Räume ohne (oder mit unbekannter) Etage → synthetische Etage am Ende.
  const orphanRooms = [...roomsByFloor.entries()]
    .filter(([fid]) => fid === null || !input.floors.some((f) => f.floor_id === fid))
    .flatMap(([, rooms]) => rooms);
  if (orphanRooms.length > 0) {
    floors.push({ floorId: null, name: UNASSIGNED_NAME, rooms: orphanRooms });
  }

  return { hasFloors: true, floors };
}
```

- [ ] **Step 4: Test ausführen, Erfolg bestätigen**

Run: `npm test -- src/grouping/buildStructureTree.test.ts`
Expected: PASS (7 Tests).

- [ ] **Step 5: Gesamte Test-Suite ausführen**

Run: `npm test`
Expected: PASS — alle Tests aus Tasks 2–4 grün.

- [ ] **Step 6: Commit**

```bash
git add src/grouping/buildStructureTree.ts src/grouping/buildStructureTree.test.ts
git commit -m "feat(grouping): add buildStructureTree engine (adaptive grouping)"
```

---

## Task 5: Web-Component-Panel-Shell

**Files:**
- Create: `src/Panel.tsx`
- Create: `src/main.tsx`

- [ ] **Step 1: Panel-Komponente anlegen (zeigt zunächst Verbindungsstatus)**

Create `src/Panel.tsx`:

```tsx
interface HassLike {
  states: Record<string, unknown>;
  connection: unknown;
}

export function Panel({ hass }: { hass?: HassLike }) {
  if (!hass) {
    return <div style={{ padding: 16, fontFamily: "sans-serif" }}>Verbinde…</div>;
  }
  const count = Object.keys(hass.states ?? {}).length;
  return (
    <div style={{ padding: 16, fontFamily: "sans-serif" }}>
      <h1>ha-reactdash</h1>
      <p>Verbunden — {count} Entitäten.</p>
    </div>
  );
}
```

- [ ] **Step 2: Web Component registrieren und React ins Shadow DOM mounten**

Create `src/main.tsx`:

```tsx
import { createRoot, type Root } from "react-dom/client";
import { Panel } from "./Panel";

interface HassLike {
  states: Record<string, unknown>;
  connection: unknown;
}

class HaReactDash extends HTMLElement {
  private root?: Root;
  private mountPoint?: HTMLDivElement;
  private _hass?: HassLike;

  connectedCallback() {
    if (this.root) return;
    const shadow = this.attachShadow({ mode: "open" });
    this.mountPoint = document.createElement("div");
    shadow.appendChild(this.mountPoint);
    this.root = createRoot(this.mountPoint);
    this.renderApp();
  }

  set hass(value: HassLike) {
    this._hass = value;
    this.renderApp();
  }

  get hass(): HassLike | undefined {
    return this._hass;
  }

  private renderApp() {
    this.root?.render(<Panel hass={this._hass} />);
  }
}

if (!customElements.get("ha-reactdash")) {
  customElements.define("ha-reactdash", HaReactDash);
}
```

- [ ] **Step 3: Build ausführen**

Run: `npm run build`
Expected: `dist/ha-reactdash.js` wird erzeugt, kein TypeScript-Fehler.

- [ ] **Step 4: Commit**

```bash
git add src/Panel.tsx src/main.tsx
git commit -m "feat: web component panel shell mounting React in shadow DOM"
```

---

## Task 6: Registries laden und Struktur rendern

**Files:**
- Create: `src/ha/useRegistries.ts`
- Create: `src/StructureView.tsx`
- Modify: `src/Panel.tsx`

- [ ] **Step 1: Hook anlegen, der Registries lädt und den Strukturbaum baut**

Create `src/ha/useRegistries.ts`:

```ts
import { useEffect, useState } from "react";
import { fetchRegistries } from "./registries";
import type { RegistryConnection } from "./types";
import { buildStructureTree } from "../grouping/buildStructureTree";
import type { StructureTree } from "../grouping/types";

interface HassLike {
  states: Record<string, { attributes?: { device_class?: string } }>;
  connection: RegistryConnection;
}

export function useStructureTree(hass: HassLike | undefined): StructureTree | null {
  const [tree, setTree] = useState<StructureTree | null>(null);

  useEffect(() => {
    if (!hass) return;
    let cancelled = false;
    fetchRegistries(hass.connection).then((reg) => {
      if (cancelled) return;
      const built = buildStructureTree({
        floors: reg.floors,
        areas: reg.areas,
        devices: reg.devices,
        entities: reg.entities,
        deviceClassOf: (id) => hass.states[id]?.attributes?.device_class ?? null,
        includeHidden: false,
      });
      setTree(built);
    });
    return () => {
      cancelled = true;
    };
  }, [hass]);

  return tree;
}
```

- [ ] **Step 2: Minimale Struktur-Ansicht anlegen**

Create `src/StructureView.tsx`:

```tsx
import type { StructureTree } from "./grouping/types";

const box: React.CSSProperties = { fontFamily: "sans-serif", padding: 16 };

export function StructureView({ tree }: { tree: StructureTree }) {
  return (
    <div style={box}>
      <h1>ha-reactdash</h1>
      {tree.floors.map((floor) => (
        <section key={floor.floorId ?? "synthetic"} style={{ marginBottom: 24 }}>
          {tree.hasFloors && floor.name && <h2>{floor.name}</h2>}
          {floor.rooms.map((room) => (
            <div key={room.areaId} style={{ margin: "8px 0", paddingLeft: 8 }}>
              <h3 style={{ margin: "4px 0" }}>{room.name}</h3>
              {room.groups.map((group) => (
                <div key={group.category} style={{ paddingLeft: 12 }}>
                  <strong>{group.category}</strong>: {group.entityIds.join(", ")}
                </div>
              ))}
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Panel auf Hook + Ansicht umstellen**

Replace the full contents of `src/Panel.tsx` with:

```tsx
import { useStructureTree } from "./ha/useRegistries";
import { StructureView } from "./StructureView";
import type { RegistryConnection } from "./ha/types";

interface HassLike {
  states: Record<string, { attributes?: { device_class?: string } }>;
  connection: RegistryConnection;
}

export function Panel({ hass }: { hass?: HassLike }) {
  const tree = useStructureTree(hass);

  if (!hass) {
    return <div style={{ padding: 16, fontFamily: "sans-serif" }}>Verbinde…</div>;
  }
  if (!tree) {
    return <div style={{ padding: 16, fontFamily: "sans-serif" }}>Lade Struktur…</div>;
  }
  return <StructureView tree={tree} />;
}
```

- [ ] **Step 4: Typen-Build prüfen**

Run: `npm run build`
Expected: `dist/ha-reactdash.js` wird erzeugt, kein TypeScript-Fehler.

- [ ] **Step 5: Gesamte Test-Suite ausführen**

Run: `npm test`
Expected: PASS — alle bisherigen Tests grün.

- [ ] **Step 6: Commit**

```bash
git add src/ha/useRegistries.ts src/StructureView.tsx src/Panel.tsx
git commit -m "feat: load registries and render auto-grouped structure tree"
```

---

## Task 7: Installation in Home Assistant & manuelle Abnahme

**Files:**
- Create: `INSTALL.md`

- [ ] **Step 1: Build erzeugen**

Run: `npm run build`
Expected: `dist/ha-reactdash.js` existiert.

- [ ] **Step 2: Installationsanleitung schreiben**

Create `INSTALL.md`:

````markdown
# ha-reactdash — Installation (Meilenstein 1)

1. Build erzeugen:

   ```bash
   npm install
   npm run build
   ```

2. Die Datei `dist/ha-reactdash.js` nach Home Assistant kopieren, in den Ordner
   `config/www/ha-reactdash/`. (Den Ordner `www` ggf. anlegen — er wird unter der
   URL `/local/` ausgeliefert.)

   Ziel: `config/www/ha-reactdash/ha-reactdash.js`

3. In `configuration.yaml` ergänzen:

   ```yaml
   panel_custom:
     - name: ha-reactdash
       sidebar_title: ReactDash
       sidebar_icon: mdi:view-dashboard
       url_path: reactdash
       module_url: /local/ha-reactdash/ha-reactdash.js
   ```

4. Home Assistant neu starten (oder „YAML-Konfiguration neu laden", falls verfügbar).

5. In der Seitenleiste erscheint **ReactDash**. Öffnen.
````

- [ ] **Step 3: Manuelle Abnahme in Home Assistant**

Durchführen (manuell, kein automatischer Test):
1. `dist/ha-reactdash.js` wie in `INSTALL.md` nach `config/www/ha-reactdash/` kopieren.
2. `panel_custom`-Eintrag setzen, HA neu starten.
3. Panel **ReactDash** in der Seitenleiste öffnen.

Erwartetes Ergebnis:
- Das Panel lädt ohne Konsolenfehler.
- Es werden Räume mit ihren Funktionsgruppen und Entitäts-IDs angezeigt.
- Sind Etagen definiert, erscheinen Etagen-Überschriften; sonst nur Räume.
- Entitäten ohne Raum erscheinen unter „Sonstiges".

- [ ] **Step 4: Commit**

```bash
git add INSTALL.md
git commit -m "docs: add HA installation guide for milestone 1"
```

---

## Selbst-Review (gegen die Spec)

- **panel_custom + hass-Property** → Task 5 (Web Component empfängt `hass`).
- **Shadow DOM** → Task 5 (`attachShadow`). Tailwind-Injektion folgt in M2 (bewusst).
- **Datenschicht `ha/`** → Task 2 (Registry-Fetch), Task 6 (Hook).
- **Adaptive Auto-Gruppierung** → Task 4 (Etagen/keine Etagen, Device-Area-Fallback, „Sonstiges", versteckt/diagnostisch aus, leere Räume weg).
- **Funktions-Klassifizierung** → Task 3 (`categorize`, Sicherheits-device_class).
- **Minimale Darstellung** → Task 6 (`StructureView`).
- **Out-of-the-box-Erststart + Installations-Snippet** → Task 7.

**Bewusst NICHT in M1** (folgt in späteren Meilensteinen, siehe Spec): Design-System Tailwind/shadcn, Smart-Control-Renderer mit Tile/Detail, kontext-adaptives Layout, Command-Bar/Suche, Theme-Toggle, Live-Registry-Updates (M1 lädt einmalig beim Mount).

Keine Platzhalter; Typnamen (`StructureTree`, `RoomNode`, `CategoryGroup`, `FunctionCategory`, `BuildInput`, `RegistryConnection`, `fetchRegistries`, `buildStructureTree`, `categorize`, `useStructureTree`) sind über alle Tasks konsistent.
