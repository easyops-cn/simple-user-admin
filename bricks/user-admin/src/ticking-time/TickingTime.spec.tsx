import React from "react";
import { shallow } from "enzyme";
import { TickingTime } from "./TickingTime";

describe("TickingTime", () => {
  it("should work", () => {
    const wrapper = shallow(<TickingTime />);
    expect(wrapper.find("div").text()).toBe("USER_ADMIN works!");
  });
});
