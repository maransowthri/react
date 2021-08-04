import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("Auth Reducer", () => {
  it("Should return initial state if invalid action passed", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userID: null,
      error: null,
      loading: false,
      showAlert: false,
      alertMessage: "",
    });
  });

  it("should return token upon login", () => {
    expect(
      reducer(undefined, {
        type: actionTypes.AUTH_SUCCESS,
        payload: { token: "secret", userID: "kmaran" },
      })
    ).toEqual({
      token: "secret",
      userID: "kmaran",
      error: null,
      loading: false,
      showAlert: false,
      alertMessage: "",
    });
  });
});
