import React, { Component } from "react";
import { Link } from "react-router-dom";
import { SingleCartItem } from "./SingleCartItem";

export default class CartItems extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { items, handleClick } = this.props;
    const orderId = window.localStorage.getItem("order_id");

    return (
      <table className="cart-items">
        <tbody>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
          {items.map((item) => {
            return (
              <SingleCartItem
                key={item.id}
                vehicle={item}
                handleClick={handleClick}
                orderId={orderId}
              />
            );
          })}
        </tbody>
      </table>
    );
  }
}
