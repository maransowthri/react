import * as actionTypes from "./actionTypes";

export const incCounter = () => {
  return { type: actionTypes.INC_COUNTER };
};

export const decCounter = () => {
  return { type: actionTypes.DEC_COUNTER };
};

export const addCounter = (value) => {
  return { type: actionTypes.ADD_COUNTER, payload: { value } };
};

export const subCounter = (value) => {
  return { type: actionTypes.SUB_COUNTER, payload: { value } };
};
