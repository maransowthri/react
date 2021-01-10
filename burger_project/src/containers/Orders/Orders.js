import React, { Component } from "react";

import classes from "./Orders.module.css";
import axios from "../../axios/axios-orders";
import Order from "../../components/Burger/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: null,
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get("orders.json")
      .then((res) => {
        this.setState({ orders: res.data, loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }

  render() {
    let summary = null;
    if (this.state.loading) {
      summary = <Spinner />;
    }
    if (this.state.orders) {
      let orders = Object.keys(this.state.orders).map((key) => {
        return (
          <Order
            key={key}
            ingredients={this.state.orders[key].ingredients}
            price={this.state.orders[key].price}
          />
        );
      });
      summary = (
        <>
          <h3>Your Orders</h3>
          {orders}
        </>
      );
    }
    return <div className={classes.Orders}>{summary}</div>;
  }
}

export default withErrorHandler(Orders, axios);
