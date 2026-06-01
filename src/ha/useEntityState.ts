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
