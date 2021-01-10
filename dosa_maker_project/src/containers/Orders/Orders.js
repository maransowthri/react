import React, { Component } from "react";
import Order from "./Order/Order";
import classes from "./Orders.module.css";
import axios from "../../axios/axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";

export default class Orders extends Component {
  state = {
    loading: false,
    orders: null,
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get("/orders.json")
      .then((res) => {
        this.setState({ orders: res.data, loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }
  render() {
    let orders = null;
    if (this.state.orders) {
      orders = Object.keys(this.state.orders).map((key) => (
        <Order
          key={key}
          price={this.state.orders[key].price.toFixed(2)}
          ingredients={this.state.orders[key].ingredients}
        />
      ));
    }

    return (
      <div className={classes.Orders}>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <>
            <h1>Your Orders</h1>
            {orders}
          </>
        )}
      </div>
    );
  }
}
