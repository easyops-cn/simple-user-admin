import { createProviderClass } from "@easyops/brick-utils";

// eslint-disable-next-line
export interface CreateUserParams {}

export function CreateUser(params: CreateUserParams): Promise<any> {
  return null;
}

customElements.define(
  "user-admin.provider-create-user",
  createProviderClass(CreateUser)
);
