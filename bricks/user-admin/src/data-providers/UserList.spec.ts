// Ref https://github.com/jsdom/jsdom/issues/1030
import "document-register-element";
import { UserList, UserListParams } from "./UserList";
import { http } from "@easyops/brick-http";

jest.mock("@easyops/brick-http");
jest.spyOn(http, "get").mockResolvedValue({ list: [] });

describe("UserList", () => {
  it.each<[UserListParams, any]>([[{}, { list: [] }]])(
    "UserList(%j) should work",
    async (params, result) => {
      expect(await UserList(params)).toEqual(result);
    }
  );
});
