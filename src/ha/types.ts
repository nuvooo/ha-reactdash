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
