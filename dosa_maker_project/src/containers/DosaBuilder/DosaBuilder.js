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
    console.log("[DosaBuilder] constructor");
    super(props);
    this.props.onFetchIngredientsInit();
  }

  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onFetchIngredients();
  }

  modalHandler = () => {
    this.setState((prevState) => {
      return { purchasing: !prevState.purchasing };
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

    if (this.props.loading) {
      summary = <Spinner />;
    }

    return (
      <>
        <Modal click={this.modalHandler} state={this.state.purchasing}>
          {summary}
        </Modal>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ingredient) =>
      dispatch(actions.addIngredient(ingredient)),
    onRemoveIngredient: (ingredient) =>
      dispatch(actions.removeIngredient(ingredient)),
    onFetchIngredients: () => dispatch(actions.fetchIngredients()),
    onFetchIngredientsInit: () => dispatch(actions.fetchIngredientsInit()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(DosaBuilder, axios));
