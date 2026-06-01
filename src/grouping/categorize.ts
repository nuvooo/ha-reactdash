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
