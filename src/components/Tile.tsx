import { canToggle, entityName, entityState, isOn, toggle } from "../ha/useEntityState";

interface HassState {
  state: string;
  attributes: { friendly_name?: string; device_class?: string };
}
interface HassLike {
  states: Record<string, HassState>;
  callService: (domain: string, service: string, data: { entity_id: string }) => Promise<unknown>;
}

export function Tile({ hass, entityId, icon }: { hass: HassLike; entityId: string; icon: string }) {
  const on = isOn(hass, entityId);
  const clickable = canToggle(entityId);
  const name = entityName(hass, entityId);
  const state = entityState(hass, entityId);

  return (
    <button
      type="button"
      disabled={!clickable}
      onClick={() => toggle(hass, entityId)}
      className={[
        "flex items-center gap-3 rounded-2xl p-3 text-left w-full transition",
        "bg-surface border border-line",
        clickable ? "hover:brightness-105 cursor-pointer" : "cursor-default",
      ].join(" ")}
    >
      <span
        className={[
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg",
          on ? "bg-accent/20" : "bg-bg",
        ].join(" ")}
      >
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium text-text">{name}</span>
        <span className="block truncate text-xs text-muted">{on ? "An" : state}</span>
      </span>
    </button>
  );
}
