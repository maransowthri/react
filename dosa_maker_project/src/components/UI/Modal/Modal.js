import classes from "./Modal.module.css";
import BackDrop from "../BackDrop/BackDrop";

const Modal = (props) => {
  return (
    <>
      <BackDrop state={props.state ? "true" : null} />
      <div
        className={[
          classes.Modal,
          props.state ? classes.Open : classes.Close,
        ].join(" ")}
      >
        {props.children}
      </div>
    </>
  );
};

export default Modal;
