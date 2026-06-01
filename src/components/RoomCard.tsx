import type { RoomNode } from "../grouping/types";
import { CATEGORY_META } from "../theme/categoryMeta";
import { Tile } from "./Tile";

interface HassState {
  state: string;
  attributes: { friendly_name?: string; device_class?: string };
}
interface HassLike {
  states: Record<string, HassState>;
  callService: (domain: string, service: string, data: { entity_id: string }) => Promise<unknown>;
}

export function RoomCard({ hass, room }: { hass: HassLike; room: RoomNode }) {
  return (
    <section className="rounded-3xl bg-elevated border border-line p-4 shadow-sm">
      <h3 className="mb-3 text-base font-semibold text-text">{room.name}</h3>
      <div className="flex flex-col gap-4">
        {room.groups.map((group) => (
          <div key={group.category}>
            <div className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
              {CATEGORY_META[group.category].label}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {group.entityIds.map((id) => (
                <Tile key={id} hass={hass} entityId={id} icon={CATEGORY_META[group.category].icon} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
