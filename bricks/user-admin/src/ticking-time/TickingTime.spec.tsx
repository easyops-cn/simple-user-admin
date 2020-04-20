import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import { TickingTime } from "./TickingTime";

describe("TickingTime", () => {
  it("should work", () => {
    Date.now = jest.fn(() => +new Date("2020-04-20 14:35:15"));
    const wrapper = mount(<TickingTime />);

    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(wrapper.find("div").text()).toBe("2020-04-20 14:35:18");

    wrapper.setProps({ isPause: true });
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(wrapper.find("div").text()).toBe("2020-04-20 14:35:18");
  });
});
