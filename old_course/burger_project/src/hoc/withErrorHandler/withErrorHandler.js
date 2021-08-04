import React from "react";
import useErrorHandler from "../../hooks/errorHandler";

import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useErrorHandler(axios);

    return (
      <>
        <Modal show={error} close={() => setError(null)}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withErrorHandler;
