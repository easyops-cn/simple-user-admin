import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement } from "@easyops/brick-kit";
import { TickingTime } from "./TickingTime";

class TickingTimeElement extends UpdatingElement {
  connectedCallback(): void {
    // Don't override user's style settings.
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <TickingTime />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("user-admin.ticking-time", TickingTimeElement);
