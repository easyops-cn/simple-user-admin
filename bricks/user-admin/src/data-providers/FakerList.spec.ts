// Ref https://github.com/jsdom/jsdom/issues/1030
import "document-register-element";
import { FakerList, FakerListParams } from "./FakerList";
import { http } from "@easyops/brick-http";

jest.mock("@easyops/brick-http");
jest.spyOn(http, "get").mockResolvedValue({ data: [] });

describe("FakerList", () => {
  it.each<[FakerListParams, any]>([[{}, { list: [] }]])(
    "FakerList(%j) should work",
    async (params, result) => {
      expect(await FakerList(params)).toEqual(result);
    }
  );
});
