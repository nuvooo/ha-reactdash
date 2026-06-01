interface HassLike {
  states: Record<string, unknown>;
  connection: unknown;
}

export function Panel({ hass }: { hass?: HassLike }) {
  if (!hass) {
    return <div style={{ padding: 16, fontFamily: "sans-serif" }}>Verbinde…</div>;
  }
  const count = Object.keys(hass.states ?? {}).length;
  return (
    <div style={{ padding: 16, fontFamily: "sans-serif" }}>
      <h1>ha-reactdash</h1>
      <p>Verbunden — {count} Entitäten.</p>
    </div>
  );
}
