import React, { Component } from "react";
import { Link } from "react-router-dom";
export class SingleCartItem extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
    };
  }
  render() {
    const { vehicle, handleClick, orderId } = this.props;
    return (
      <>
        <tr ke={vehicle.id} className="single-cart-item" key={vehicle.id}>
          <td className="cart-item-row">
            <img className="cart-img" src={vehicle.imageUrl || ""} />
            <div className="cart-item-col">
              <Link
                to={`/vehicles/${vehicle.id || ""}`}
                className="cartitem_name"
              >
                {vehicle.make || ""} {vehicle.model || ""}{" "}
              </Link>
              <div className="cart-item-modify">
                <select value={vehicle.order_vehicle.quantity || 0}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                <button
                  className="remove"
                  onClick={() => handleClick(vehicle.id, orderId)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </td>
          <td></td>
          <td>{vehicle.price}</td>
        </tr>
      </>
    );
  }
}

export default SingleCartItem;
