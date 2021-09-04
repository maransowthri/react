import styles from "./Button.module.css";

const Button = ({ text, onClick, type }) => {
  return (
    <button onClick={onClick} type={type} className={styles.button}>
      {text}
    </button>
  );
};

export default Button;
