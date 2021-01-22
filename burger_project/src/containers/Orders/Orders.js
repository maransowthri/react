import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./Orders.module.css";
import axios from "../../axios/axios-orders";
import Order from "../../components/Burger/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import { Redirect } from "react-router-dom";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userID);
  }

  render() {
    let summary = null;

    if (this.props.loading) {
      summary = <Spinner />;
    } else {
      if (this.props.orders) {
        let orders = Object.keys(this.props.orders).map((key) => {
          return (
            <Order
              key={key}
              ingredients={this.props.orders[key].ingredients}
              price={this.props.orders[key].totalPrice}
            />
          );
        });
        summary = <>{orders}</>;
      } else {
        summary = <h3>No orders found.</h3>;
      }
    }

    let redirect = null;
    if (!this.props.token) {
      redirect = <Redirect to="/login" />;
    }

    return (
      <>
        {redirect}
        <div className={classes.Orders}>
          <h3>Your Orders</h3>
          {summary}
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
