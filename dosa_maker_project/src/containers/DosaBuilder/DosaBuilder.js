import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "../../axios/axios-orders";
import DosaIngredients from "../../components/Dosa/DosaIngredients/DosaIngredients";
import DosaControls from "../../components/Dosa/DosaControls/DosaControls";
import OrderSummary from "../../components/Dosa/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

class DosaBuilder extends Component {
  constructor(props) {
    super(props);
    this.props.onFetchIngredients(this.props.preserveIngredients);
  }

  state = {
    purchasing: false,
  };

  modalHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState((prevState) => {
        return { purchasing: !prevState.purchasing };
      });
    } else {
      this.props.onSetPreserveIngredients();
      this.props.history.push("/login");
    }
  };

  orderedHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    let dosa = null;
    let summary = null;

    if (this.props.ingredients) {
      const disabledIngredients = Object.keys(this.props.ingredients).reduce(
        (prev, next) => {
          prev[next] = this.props.ingredients[next] === 0;
          return prev;
        },
        {}
      );
      dosa = (
        <>
          <DosaControls
            isAuthenticated={this.props.isAuthenticated}
            totalPrice={this.props.totalPrice}
            addIngredient={this.props.onAddIngredient}
            removeIngredient={this.props.onRemoveIngredient}
            modalHandler={this.modalHandler}
            disabledIngredients={disabledIngredients}
          />
        </>
      );
      summary = (
        <OrderSummary
          totalPrice={this.props.totalPrice}
          ingredients={this.props.ingredients}
          orderedHandler={this.orderedHandler}
          modalHandler={this.modalHandler}
        />
      );
    } else {
      dosa = <Spinner />;
    }

    if (this.props.loading) {
      summary = <Spinner />;
    }

    return (
      <>
        <Modal click={this.modalHandler} state={this.state.purchasing}>
          {summary}
        </Modal>
        <DosaIngredients ingredients={this.props.ingredients} />
        {dosa}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.dosaBuilder.ingredients,
    totalPrice: state.dosaBuilder.totalPrice,
    loading: state.dosaBuilder.loading,
    isAuthenticated: state.auth.token !== null,
    preserveIngredients: state.dosaBuilder.preserveIngredients,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingredient) =>
      dispatch(actions.addIngredient(ingredient)),
    onRemoveIngredient: (ingredient) =>
      dispatch(actions.removeIngredient(ingredient)),
    onFetchIngredients: (preserveIngredients) =>
      dispatch(actions.fetchIngredients(preserveIngredients)),
    onSetPreserveIngredients: () => dispatch(actions.setPreserveingredients()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(DosaBuilder, axios));
