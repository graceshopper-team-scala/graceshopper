import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class CartItems extends Component {
  render() {
    const { items, handleClick, } = this.props;
    console.log(items);
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
              <tr className="single-cart-item" key={item.vehicle.id}>
                <td>
                  <img className="cart-img" src={item.vehicle.imageUrl} />
                  <Link to={`/vehicles/${item.id}`} className="cartitem_name">
                    {item.vehicle.make} {item.vehicle.model}{" "}
                  </Link>
                </td>
                <td>
                  <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                  <button
                    className="remove"
                    onClick={() => handleClick(item.id, orderId)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
                <td>{item.vehicle.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
