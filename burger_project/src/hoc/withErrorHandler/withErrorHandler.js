import React, { Component } from "react";

import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
      };
      this.reqInterceptors = axios.interceptors.request.use(
        (req) => req,
        (err) => {
          this.setState({ error: err });
          return Promise.reject(err);
        }
      );

      this.resInterceptors = axios.interceptors.response.use(
        (res) => res,
        (err) => {
          this.setState({ error: err });
          return Promise.reject(err);
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.response.eject(this.resInterceptors);
    }

    render() {
      return (
        <>
          <Modal
            show={this.state.error}
            close={() => {
              this.setState({ error: null });
            }}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
};

export default withErrorHandler;
