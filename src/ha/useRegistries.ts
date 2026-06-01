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
    }).catch((err) => {
      if (!cancelled) console.error("ha-reactdash: registry fetch failed", err);
    });
    return () => {
      cancelled = true;
    };
  }, [hass]);

  return tree;
}
