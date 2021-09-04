import styles from "./Backdrop.module.css";

const Backdrop = ({ onClick }) => {
  return <div onClick={onClick} className={styles.backdrop}></div>;
};

export default Backdrop;
