import { createRoot, type Root } from "react-dom/client";
import { Panel } from "./Panel";

interface HassLike {
  states: Record<string, unknown>;
  connection: unknown;
}

class HaReactDash extends HTMLElement {
  private root?: Root;
  private mountPoint?: HTMLDivElement;
  private _hass?: HassLike;

  connectedCallback() {
    if (this.root) return;
    const shadow = this.attachShadow({ mode: "open" });
    this.mountPoint = document.createElement("div");
    shadow.appendChild(this.mountPoint);
    this.root = createRoot(this.mountPoint);
    this.renderApp();
  }

  set hass(value: HassLike) {
    this._hass = value;
    this.renderApp();
  }

  get hass(): HassLike | undefined {
    return this._hass;
  }

  private renderApp() {
    this.root?.render(<Panel hass={this._hass} />);
  }
}

if (!customElements.get("ha-reactdash")) {
  customElements.define("ha-reactdash", HaReactDash);
}
