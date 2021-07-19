import ReactDOM from "react-dom";
import React from "react";
import WCStyle from './App.style.css';
import './index.css'
import App from './App';

const template = document.createElement('template');
template.innerHTML=`
<style>
    ${WCStyle.toString()}
</style>
<span></span>`

class Xrwc extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const name = this.getAttribute("name");
    ReactDOM.render(<App name={name} />, this.shadowRoot.querySelector("span"));


  }
}
customElements.define("x-rwc", Xrwc);
