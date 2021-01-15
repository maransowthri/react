import Person from "./Person/Person";
import { connect } from "react-redux";

import * as actionTypes from "../../store/actions";

const Persons = (props) => {
  return (
    <>
      <h3>Persons</h3>
      <p>Average Weight: {props.averageWeight}</p>
      {props.persons.map((person) => (
        <Person
          key={person.id}
          name={person.name}
          weight={person.weight}
          removePerson={() => props.onRemovePerson(person.id)}
        />
      ))}
    </>
  );
};

const mapStateToProps = (state) => {
  return { averageWeight: state.weightState.averageWeight };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRemovePerson: (id) =>
      dispatch({ type: actionTypes.REMOVE_PERSON, payload: { id: id } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Persons);
