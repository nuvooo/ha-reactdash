import { createRoot, type Root } from "react-dom/client";
import { Panel } from "./Panel";
import styles from "./styles.css?inline";

interface HassLike {
  states: Record<string, unknown>;
  connection: unknown;
  themes?: { darkMode?: boolean };
}

class HaReactDash extends HTMLElement {
  private root?: Root;
  private mountPoint?: HTMLDivElement;
  private _hass?: HassLike;

  connectedCallback() {
    if (!this.shadowRoot) {
      const shadow = this.attachShadow({ mode: "open" });
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(styles);
      shadow.adoptedStyleSheets = [sheet];
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
    const dark = this._hass?.themes?.darkMode === true;
    this.root?.render(<Panel hass={this._hass} dark={dark} />);
  }
}

if (!customElements.get("ha-reactdash")) {
  customElements.define("ha-reactdash", HaReactDash);
}
