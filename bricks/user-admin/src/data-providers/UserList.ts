import { createProviderClass } from "@easyops/brick-utils";

// eslint-disable-next-line
export interface UserListParams {}

export function UserList(params: UserListParams): Promise<any> {
  return null;
}

customElements.define(
  "user-admin.provider-user-list",
  createProviderClass(UserList)
);
