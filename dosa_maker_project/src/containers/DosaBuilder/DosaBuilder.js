import React, { Component } from "react";
import { connect } from "react-redux";

import axios from "../../axios/axios-orders";
import DosaIngredients from "../../components/Dosa/DosaIngredients/DosaIngredients";
import DosaControls from "../../components/Dosa/DosaControls/DosaControls";
import OrderSummary from "../../components/Dosa/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions";

class DosaBuilder extends Component {
  state = {
    modalState: false,
    loading: false,
  };

  modalHandler = () => {
    this.setState((prevState) => {
      return { modalState: !prevState.modalState };
    });
  };

  orderedHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    let dosa = null;
    let summary = null;

    if (this.props.ingredients) {
      dosa = (
        <>
          <DosaIngredients ingredients={this.props.ingredients} />
          <DosaControls
            totalPrice={this.props.totalPrice}
            addIngredient={this.props.onAddIngredient}
            removeIngredient={this.props.onRemoveIngredient}
            modalHandler={this.modalHandler}
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

    if (this.state.loading) {
      summary = <Spinner />;
    }

    return (
      <>
        <Modal click={this.modalHandler} state={this.state.modalState}>
          {summary}
        </Modal>
        {dosa}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { ingredients: state.ingredients, totalPrice: state.totalPrice };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingredient) =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        payload: { ingredient: ingredient },
      }),
    onRemoveIngredient: (ingredient) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        payload: { ingredient: ingredient },
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(DosaBuilder, axios));
