import React, { Component } from "react";
import { connect } from "react-redux";
import Order from "./Order/Order";
import classes from "./Orders.module.css";
import axios from "../../axios/axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import { Redirect } from "react-router-dom";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userID);
  }
  render() {
    let orders = null;
    if (this.props.orders) {
      orders = Object.keys(this.props.orders).map((key) => (
        <Order
          key={key}
          price={this.props.orders[key].totalPrice.toFixed(2)}
          ingredients={this.props.orders[key].ingredients}
        />
      ));
    }

    return (
      <>
        {!this.props.isAuthenticated ? <Redirect to="/login" /> : null}
        <div className={classes.Orders}>
          {this.props.loading ? (
            <Spinner />
          ) : (
            <>
              <h1>Your Orders</h1>
              {orders}
            </>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userID: state.auth.userID,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userID) =>
      dispatch(actions.fetchOrders(token, userID)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
