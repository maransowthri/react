import * as actionTypes from "../actions";

const initialState = {
  persons: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PERSON:
      const newPerson = {
        id: Math.random(),
        name: action.payload.name,
        weight: action.payload.weight,
      };
      return {
        ...state,
        persons: state.persons.concat(newPerson),
      };

    case actionTypes.REMOVE_PERSON:
      return {
        ...state,
        persons: state.persons.filter(
          (person) => person.id !== action.payload.id
        ),
      };

    default:
      return state;
  }
};

export default reducer;
