import { createProviderClass } from "@easyops/brick-utils";
import { http } from "@easyops/brick-http";

// eslint-disable-next-line
export interface CreateUserParams {
  name: string;
  age: number;
  address: string;
}

export async function CreateUser(params: CreateUserParams): Promise<any> {
  const resp = await http.post("http://127.0.0.1:8000", params);
  return resp;
}

customElements.define(
  "user-admin.provider-create-user",
  createProviderClass(CreateUser)
);
