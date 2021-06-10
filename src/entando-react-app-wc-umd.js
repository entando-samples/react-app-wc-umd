import ReactDOM from "react-dom";
import React from "react";

import Root from "./root.component";

class Xrwc extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement("span");
    this.attachShadow({ mode: "open" }).appendChild(mountPoint);

    const name = this.getAttribute("name");
    ReactDOM.render(<Root name={name} />, mountPoint);
  }
}
customElements.define("x-rwc", Xrwc);
