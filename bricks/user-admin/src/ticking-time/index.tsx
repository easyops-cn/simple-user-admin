import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement, property } from "@easyops/brick-kit";
import { TickingTime } from "./TickingTime";

class TickingTimeElement extends UpdatingElement {
  @property({ type: Boolean })
  isPause: boolean;

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
          <TickingTime isPause={this.isPause} />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("user-admin.ticking-time", TickingTimeElement);
