import { selector } from "recoil";
import {
  currentUserIDState,
  currentUserIDStateAsync,
  todoListFilterState,
  todoListState,
} from "./atoms";

const tableOfUsers = [
  { name: "Karan" },
  { name: "Kalees" },
  { name: "Maran" },
  { name: "Mahesh" },
];

export const filteredTodoListState = selector({
  key: "filteredTodoListState",
  get: ({ get }) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    switch (filter) {
      case "Show Completed":
        return list.filter((item) => item.isComplete);
      case "Show Uncompleted":
        return list.filter((item) => !item.isComplete);
      default:
        return list;
    }
  },
});

export const todoListStatsState = selector({
  key: "todoListStatsState",
  get: ({ get }) => {
    const todoList = get(todoListState);
    const totalNum = todoList.length;
    const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted =
      totalNum === 0 ? 0 : (totalCompletedNum / totalNum) * 100;

    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
  },
});

export const currentUserNameState = selector({
  key: "CurrentUserName",
  get: ({ get }) => {
    return tableOfUsers[get(currentUserIDState)].name;
  },
});

export const currentUserNameQuery = selector({
  key: "CurrentUserNameAsync",
  get: async ({ get }) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${get(
        currentUserIDStateAsync
      )}`
    );
    const jsonRes = await res.json();
    const userName = await jsonRes.name;
    return userName;
  },
});
