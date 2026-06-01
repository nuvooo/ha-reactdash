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
