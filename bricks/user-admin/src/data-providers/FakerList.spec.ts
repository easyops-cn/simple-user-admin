// Ref https://github.com/jsdom/jsdom/issues/1030
import "document-register-element";
import { FakerList, FakerListParams } from "./FakerList";

describe("FakerList", () => {
  it.each<[FakerListParams, any]>([[{}, null]])(
    "FakerList(%j) should work",
    async (params, result) => {
      expect(await FakerList(params)).toEqual(result);
    }
  );
});
