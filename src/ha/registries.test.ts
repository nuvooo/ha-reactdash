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
