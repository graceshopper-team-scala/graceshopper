import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class CartItems extends Component {
  render() {
    const { items } = this.props;
    return (
      <table className="cart-items">
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
        {items.map((item) => {
          return (
            <tr className="single-cart-item">
              <td>
                <img src={item.imageUrl} />
                <Link to={`/vehicles/${item.id}`}>
                  {item.make} {item.model}{" "}
                </Link>
              </td>
              <td>
                <input value={1} />
              </td>
              <td>{item.price}</td>
            </tr>
          );
        })}
      </table>
    );
  }
}
