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
    // Shadow root is attached only once; HA may disconnect/reconnect the panel
    // as the user navigates, so reuse the existing shadow root on reconnect.
    if (!this.shadowRoot) {
      const shadow = this.attachShadow({ mode: "open" });
      this.mountPoint = document.createElement("div");
      shadow.appendChild(this.mountPoint);
    }
    if (!this.root && this.mountPoint) {
      this.root = createRoot(this.mountPoint);
    }
    this.renderApp();
  }

  disconnectedCallback() {
    this.root?.unmount();
    this.root = undefined;
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
