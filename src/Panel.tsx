import { useStructureTree } from "./ha/useRegistries";
import { DashboardView } from "./DashboardView";
import type { RegistryConnection } from "./ha/types";

// TODO(M2b): centralize one HassLike type in src/ha/types.ts and drop these casts.
interface HassLike {
  states: Record<string, unknown>;
  connection: unknown;
}

interface HassTyped {
  states: Record<
    string,
    { state: string; attributes: { friendly_name?: string; device_class?: string } }
  >;
  connection: RegistryConnection;
  callService: (
    domain: string,
    service: string,
    data: { entity_id: string },
  ) => Promise<unknown>;
}

export function Panel({ hass, dark }: { hass?: HassLike; dark?: boolean }) {
  const tree = useStructureTree(hass as never);
  const wrapper = `app${dark ? " dark" : ""} min-h-screen`;

  if (!hass) {
    return (
      <div className={wrapper}>
        <div className="p-4 text-muted">Verbinde…</div>
      </div>
    );
  }
  if (!tree) {
    return (
      <div className={wrapper}>
        <div className="p-4 text-muted">Lade Struktur…</div>
      </div>
    );
  }
  return (
    <div className={wrapper}>
      <DashboardView hass={hass as unknown as HassTyped} tree={tree} />
    </div>
  );
}
