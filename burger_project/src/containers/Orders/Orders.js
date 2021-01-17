import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./Orders.module.css";
import axios from "../../axios/axios-orders";
import Order from "../../components/Burger/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
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
        summary = (
          <>
            <h3>Your Orders</h3>
            {orders}
          </>
        );
      } else {
        summary = <h3>No orders found.</h3>;
      }
    }
    return <div className={classes.Orders}>{summary}</div>;
  }
}

const mapStateToProps = (state) => {
  return { orders: state.order.orders, loading: state.order.loading };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
