import { createProviderClass } from "@easyops/brick-utils";
import { http } from "@easyops/brick-http";

// eslint-disable-next-line
export interface UserListParams {}

const prefix = "/api/gateway";

export async function UserList(params: UserListParams): Promise<any> {
  const resp = await http.get(`${prefix}/user-list.demo.get/list`);
  return resp;
}

customElements.define(
  "user-admin.provider-user-list",
  createProviderClass(UserList)
);
