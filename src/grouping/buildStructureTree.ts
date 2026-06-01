import { categorize } from "./categorize";
import {
  CATEGORY_ORDER,
  type CategoryGroup,
  type FloorNode,
  type FunctionCategory,
  type RoomNode,
  type StructureTree,
} from "./types";
import type { HassArea, HassDevice, HassEntity, HassFloor } from "../ha/types";

export interface BuildInput {
  floors: HassFloor[];
  areas: HassArea[];
  devices: HassDevice[];
  entities: HassEntity[];
  /** Liefert die device_class einer Entität (aus dem Live-State), oder null. */
  deviceClassOf: (entityId: string) => string | null;
  includeHidden: boolean;
}

const UNASSIGNED_AREA_ID = "__unassigned__";
const UNASSIGNED_NAME = "Sonstiges";

function isVisible(entity: HassEntity, includeHidden: boolean): boolean {
  if (includeHidden) return true;
  if (entity.hidden_by !== null) return false;
  if (entity.entity_category !== null) return false;
  return true;
}

function effectiveAreaId(
  entity: HassEntity,
  deviceAreaById: Map<string, string | null>,
): string {
  if (entity.area_id) return entity.area_id;
  if (entity.device_id) {
    const viaDevice = deviceAreaById.get(entity.device_id);
    if (viaDevice) return viaDevice;
  }
  return UNASSIGNED_AREA_ID;
}

function buildGroups(entityIds: string[], input: BuildInput): CategoryGroup[] {
  const byCategory = new Map<FunctionCategory, string[]>();
  for (const entityId of entityIds) {
    const category = categorize(entityId, input.deviceClassOf(entityId));
    const list = byCategory.get(category) ?? [];
    list.push(entityId);
    byCategory.set(category, list);
  }
  const groups: CategoryGroup[] = [];
  for (const category of CATEGORY_ORDER) {
    const ids = byCategory.get(category);
    if (ids && ids.length > 0) {
      groups.push({ category, entityIds: ids });
    }
  }
  return groups;
}

export function buildStructureTree(input: BuildInput): StructureTree {
  const deviceAreaById = new Map<string, string | null>(
    input.devices.map((d) => [d.id, d.area_id]),
  );

  // Entitäten je Raum sammeln.
  const entityIdsByArea = new Map<string, string[]>();
  for (const entity of input.entities) {
    if (!isVisible(entity, input.includeHidden)) continue;
    const areaId = effectiveAreaId(entity, deviceAreaById);
    const list = entityIdsByArea.get(areaId) ?? [];
    list.push(entity.entity_id);
    entityIdsByArea.set(areaId, list);
  }

  // Räume bauen (nur nicht-leere).
  const areaName = new Map<string, string>(
    input.areas.map((a) => [a.area_id, a.name]),
  );
  const areaFloor = new Map<string, string | null>(
    input.areas.map((a) => [a.area_id, a.floor_id]),
  );

  const roomsByFloor = new Map<string | null, RoomNode[]>();
  for (const [areaId, entityIds] of entityIdsByArea) {
    const groups = buildGroups(entityIds, input);
    if (groups.length === 0) continue;
    const name =
      areaId === UNASSIGNED_AREA_ID
        ? UNASSIGNED_NAME
        : areaName.get(areaId) ?? areaId;
    const floorId =
      areaId === UNASSIGNED_AREA_ID ? null : areaFloor.get(areaId) ?? null;
    const room: RoomNode = { areaId, name, groups };
    const list = roomsByFloor.get(floorId) ?? [];
    list.push(room);
    roomsByFloor.set(floorId, list);
  }

  const hasFloors = input.floors.length > 0;

  if (!hasFloors) {
    const rooms = [...roomsByFloor.values()].flat();
    if (rooms.length === 0) return { hasFloors: false, floors: [] };
    return {
      hasFloors: false,
      floors: [{ floorId: null, name: "", rooms }],
    };
  }

  const floors: FloorNode[] = [];
  const sortedFloors = [...input.floors].sort(
    (a, b) => (a.level ?? 0) - (b.level ?? 0),
  );
  for (const floor of sortedFloors) {
    const rooms = roomsByFloor.get(floor.floor_id) ?? [];
    if (rooms.length > 0) {
      floors.push({ floorId: floor.floor_id, name: floor.name, rooms });
    }
  }
  // Räume ohne (oder mit unbekannter) Etage → synthetische Etage am Ende.
  const orphanRooms = [...roomsByFloor.entries()]
    .filter(([fid]) => fid === null || !input.floors.some((f) => f.floor_id === fid))
    .flatMap(([, rooms]) => rooms);
  if (orphanRooms.length > 0) {
    floors.push({ floorId: null, name: UNASSIGNED_NAME, rooms: orphanRooms });
  }

  return { hasFloors: true, floors };
}
