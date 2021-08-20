import { atom } from "recoil";

export const todoListState = atom({
  key: "todoListState",
  default: [],
});

export const todoListFilterState = atom({
  key: "todoListFilterState",
  default: "Show All",
});

export const currentUserIDState = atom({
  key: "CurrentUserID",
  default: 1,
});

export const currentUserIDStateAsync = atom({
  key: "CurrentUserIDAsync",
  default: 1,
});
