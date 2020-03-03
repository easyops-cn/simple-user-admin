// Ref https://github.com/jsdom/jsdom/issues/1030
import "document-register-element";
import { UserList, UserListParams } from "./UserList";

describe("UserList", () => {
  it.each<[UserListParams, any]>([[{}, null]])(
    "UserList(%j) should work",
    async (params, result) => {
      expect(await UserList(params)).toEqual(result);
    }
  );
});
