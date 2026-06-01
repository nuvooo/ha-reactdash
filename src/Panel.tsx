import { useStructureTree } from "./ha/useRegistries";
import { StructureView } from "./StructureView";
import type { RegistryConnection } from "./ha/types";

// TODO(M2): centralize one HassLike type in src/ha/types.ts and drop this cast.
interface HassLike {
  states: Record<string, unknown>;
  connection: unknown;
}

interface HassLikeTyped {
  states: Record<string, { attributes?: { device_class?: string } }>;
  connection: RegistryConnection;
}

export function Panel({ hass }: { hass?: HassLike; dark?: boolean }) {
  const tree = useStructureTree(hass as HassLikeTyped | undefined);

  if (!hass) {
    return <div style={{ padding: 16, fontFamily: "sans-serif" }}>Verbinde…</div>;
  }
  if (!tree) {
    return <div style={{ padding: 16, fontFamily: "sans-serif" }}>Lade Struktur…</div>;
  }
  return <StructureView tree={tree} />;
}
