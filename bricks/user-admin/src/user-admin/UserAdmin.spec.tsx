import React from "react";
import { shallow } from "enzyme";
import { UserAdmin } from "./UserAdmin";

describe("UserAdmin", () => {
  it("should work", () => {
    const wrapper = shallow(<UserAdmin />);
    expect(wrapper.find("div").text()).toBe("USER_ADMIN works!");
  });
});
