import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement } from "@easyops/brick-kit";
import { UserAdmin } from "./UserAdmin";

class UserAdminElement extends UpdatingElement {
  connectedCallback(): void {
    this.style.display = "block";
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
          <UserAdmin />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("user-admin.user-admin", UserAdminElement);
