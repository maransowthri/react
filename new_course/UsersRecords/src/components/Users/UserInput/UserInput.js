import { useRef, useState } from "react";
import Button from "../../UI/Button/Button";
import Input from "../../UI/Input/Input";
import Model from "../../UI/Modal/Modal";

import styles from "./UserInput.module.css";

const UserInput = ({ onAddUser }) => {
  const usernameRef = useRef("");
  const ageRef = useRef("");
  const [error, setError] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredUsername = usernameRef.current.value;
    const enteredAge = ageRef.current.value;
    if (enteredAge.trim().length === 0 || enteredUsername.trim().length === 0) {
      setError("Username or age cannot be empty");
      return;
    }

    if (+enteredAge < 0) {
      setError("Age should not be negative");
      return;
    }

    onAddUser(enteredUsername, enteredAge);
    usernameRef.current.value = "";
    ageRef.current.value = "";
  };

  const clearError = () => {
    setError("");
  };

  return (
    <>
      {error && (
        <Model
          message={error}
          onClose={clearError}
          openModel={error.length > 0}
        />
      )}
      <form onSubmit={submitHandler} className={styles.form}>
        <Input
          label="Username"
          id="username"
          type="text"
          inputRef={usernameRef}
        />
        <Input label="Age(Years)" id="age" type="number" inputRef={ageRef} />
        <Button type="submit" text="Add User" />
      </form>
    </>
  );
};

export default UserInput;
