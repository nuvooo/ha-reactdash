export type FunctionCategory =
  | "light"
  | "climate"
  | "media"
  | "cover"
  | "switch"
  | "security"
  | "sensor"
  | "other";

/** Kanonische Reihenfolge der Funktionsgruppen je Raum. */
export const CATEGORY_ORDER: FunctionCategory[] = [
  "light",
  "climate",
  "media",
  "cover",
  "switch",
  "security",
  "sensor",
  "other",
];

export interface CategoryGroup {
  category: FunctionCategory;
  entityIds: string[];
}

export interface RoomNode {
  areaId: string;
  name: string;
  groups: CategoryGroup[];
}

export interface FloorNode {
  /** null = synthetische Etage, wenn keine Etagen definiert sind. */
  floorId: string | null;
  name: string;
  rooms: RoomNode[];
}

export interface StructureTree {
  hasFloors: boolean;
  floors: FloorNode[];
}
