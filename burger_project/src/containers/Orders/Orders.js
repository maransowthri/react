import React, { useEffect } from "react";
import { connect } from "react-redux";

import classes from "./Orders.module.css";
import axios from "../../axios/axios-orders";
import Order from "../../components/Burger/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import { Redirect } from "react-router-dom";

function Orders(props) {
  const { onFetchOrders, token, userID } = props;

  useEffect(() => {
    onFetchOrders(token, userID);
  }, [onFetchOrders, token, userID]);

  let summary = null;

  if (props.loading) {
    summary = <Spinner />;
  } else {
    if (props.orders) {
      let orders = Object.keys(props.orders).map((key) => {
        return (
          <Order
            key={key}
            ingredients={props.orders[key].ingredients}
            price={props.orders[key].totalPrice}
          />
        );
      });
      summary = <>{orders}</>;
    } else {
      summary = <h3>No orders found.</h3>;
    }
  }

  let redirect = null;
  if (!props.token) {
    props.onSetAlert("Please login to see your orders!");
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
    onSetAlert: (message) => dispatch(actions.setAlert(message)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
