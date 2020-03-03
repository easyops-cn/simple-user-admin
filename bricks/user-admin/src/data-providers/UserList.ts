import { createProviderClass } from "@easyops/brick-utils";
import { http } from "@easyops/brick-http";

// eslint-disable-next-line
export interface UserListParams {}

export async function UserList(params: UserListParams): Promise<any> {
  const resp = await http.get("http://127.0.0.1:8000/list");
  return resp;
}

customElements.define(
  "user-admin.provider-user-list",
  createProviderClass(UserList)
);
