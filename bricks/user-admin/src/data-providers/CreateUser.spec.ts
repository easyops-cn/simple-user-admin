// Ref https://github.com/jsdom/jsdom/issues/1030
import "document-register-element";
import { CreateUser, CreateUserParams } from "./CreateUser";
import { http } from "@easyops/brick-http";

jest.mock("@easyops/brick-http");
jest.spyOn(http, "post").mockResolvedValue({});

describe("CreateUser", () => {
  it.each<[CreateUserParams, any]>([[{} as any, {}]])(
    "CreateUser(%j) should work",
    async (params, result) => {
      expect(await CreateUser(params)).toEqual(result);
    }
  );
});
