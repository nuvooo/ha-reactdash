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
