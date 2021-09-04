import styles from "./Input.module.css";

const Input = ({ label, type, onChange, value, id, inputRef }) => {
  return (
    <div className={styles.input}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        onChange={onChange}
        value={value}
        ref={inputRef}
      />
    </div>
  );
};

export default Input;
