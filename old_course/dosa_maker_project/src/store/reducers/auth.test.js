import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import reducer from "./auth";

configure({ adapter: new Adapter() });

describe("reducers/[Auth.js]", () => {
  it("should return initial state if action is undefined", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userID: null,
      loading: false,
      error: "",
    });
  });
});
