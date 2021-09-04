import ReactDOM from "react-dom";
import Backdrop from "../Backdrop/Backdrop";
import Button from "../Button/Button";

import styles from "./Modal.module.css";

const ModalOverlay = ({ classNames, message, onClose }) => {
  return (
    <div className={classNames}>
      <h3>ERROR!</h3>
      <p>{message}</p>
      <Button text="Close" onClick={onClose} />
    </div>
  );
};

const Model = ({ message, openModel, onClose }) => {
  const classNames =
    styles.model + " " + (openModel ? styles.open : styles.close);
  const backdropPortal = ReactDOM.createPortal(
    <Backdrop onClick={onClose} />,
    document.getElementById("backdrop-root")
  );
  const modalPortal = ReactDOM.createPortal(
    <ModalOverlay
      classNames={classNames}
      message={message}
      onClose={onClose}
    />,
    document.getElementById("overlay-root")
  );
  return (
    <>
      {backdropPortal}
      {modalPortal}
    </>
  );
};

export default Model;
