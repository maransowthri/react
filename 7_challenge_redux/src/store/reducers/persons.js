import * as actionTypes from "../actions";

const initialState = {
  persons: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PERSON:
      const names = ["Karan", "Kalees", "Maran", "Mahesh", "Kavinath"];
      const newPerson = {
        id: Math.random(),
        name: names[Math.abs(Math.floor(Math.random() * 10 - 5))],
        weight: Math.abs(Math.floor(Math.random() * 100 - 60)),
      };
      const addedPersons = [...state.persons];
      addedPersons.push(newPerson);
      return {
        ...state,
        persons: addedPersons,
      };

    case actionTypes.REMOVE_PERSON:
      let removedPersons = state.persons.filter(
        (person) => person.id !== action.payload.id
      );
      return {
        ...state,
        persons: removedPersons,
      };

    default:
      return state;
  }
};

export default reducer;
