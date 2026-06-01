import type { StructureTree } from "./grouping/types";

const box: React.CSSProperties = { fontFamily: "sans-serif", padding: 16 };

export function StructureView({ tree }: { tree: StructureTree }) {
  return (
    <div style={box}>
      <h1>ha-reactdash</h1>
      {tree.floors.map((floor) => (
        <section key={floor.floorId ?? "synthetic"} style={{ marginBottom: 24 }}>
          {tree.hasFloors && floor.name && <h2>{floor.name}</h2>}
          {floor.rooms.map((room) => (
            <div key={room.areaId} style={{ margin: "8px 0", paddingLeft: 8 }}>
              <h3 style={{ margin: "4px 0" }}>{room.name}</h3>
              {room.groups.map((group) => (
                <div key={group.category} style={{ paddingLeft: 12 }}>
                  <strong>{group.category}</strong>: {group.entityIds.join(", ")}
                </div>
              ))}
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
