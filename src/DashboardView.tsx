import type { StructureTree } from "./grouping/types";
import { RoomCard } from "./components/RoomCard";

interface HassState {
  state: string;
  attributes: { friendly_name?: string; device_class?: string };
}
interface HassLike {
  states: Record<string, HassState>;
  callService: (domain: string, service: string, data: { entity_id: string }) => Promise<unknown>;
}

export function DashboardView({ hass, tree }: { hass: HassLike; tree: StructureTree }) {
  return (
    <div className="mx-auto max-w-screen-xl p-4">
      <h1 className="mb-4 text-2xl font-bold text-text">ReactDash</h1>
      {tree.floors.map((floor) => (
        <section key={floor.floorId ?? "synthetic"} className="mb-8">
          {tree.hasFloors && floor.name && (
            <h2 className="mb-3 text-lg font-semibold text-muted">{floor.name}</h2>
          )}
          <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
            {floor.rooms.map((room) => (
              <RoomCard key={room.areaId} hass={hass} room={room} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
