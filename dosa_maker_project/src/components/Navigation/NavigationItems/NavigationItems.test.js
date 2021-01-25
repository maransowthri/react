import React from "react";
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";

configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it("Should show 3 Navigation Items", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it("should only display login if user is authenticated", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(
      wrapper.contains(
        <NavigationItem to="/logout">
          <h3>Logout</h3>
        </NavigationItem>
      )
    ).toEqual(true);
  });
});
