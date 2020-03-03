// Ref https://github.com/jsdom/jsdom/issues/1030
import "document-register-element";
import { CreateUser, CreateUserParams } from "./CreateUser";

describe("CreateUser", () => {
  it.each<[CreateUserParams, any]>([[{}, null]])(
    "CreateUser(%j) should work",
    async (params, result) => {
      expect(await CreateUser(params)).toEqual(result);
    }
  );
});
