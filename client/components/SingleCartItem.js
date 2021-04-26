import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class SingleCartItem extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
    };
  }
  render() {
<<<<<<< HEAD
    const { vehicle, item, handleClick, orderId } = this.props;
    return (
      <>
        { window.localStorage.getItem('id') ? (
          <tr ke={vehicle.id} className="single-cart-item" key={vehicle.id}>
            <td>
              <img className="cart-img" src={vehicle.imageUrl} />
              <Link to={`/vehicles/${vehicle.id}`} className="cartitem_name">
                {vehicle.make} {vehicle.model}{" "}
              </Link>
            </td>
            <td>
              <select value={vehicle.order_vehicle.quantity}>
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
            </td>
            <td>{vehicle.price}</td>
          </tr>
        ) : (
          <tr ke={vehicle.id} className="single-cart-item" key={vehicle.id}>
          <td>
            <img className="cart-img" src={item.imageUrl} />
            <Link to={`/vehicles/${vehicle.id}`} className="cartitem_name">
              {item.make} {item.model}{" "}
            </Link>
          </td>
          <td>
            <select value={item.quantity}>
=======
    const { vehicle, handleClick, orderId } = this.props;
    return (
      <>
        <tr ke={vehicle.id} className="single-cart-item" key={vehicle.id}>
          <td>
            <img className="cart-img" src={vehicle.imageUrl} />
            <Link to={`/vehicles/${vehicle.id}`} className="cartitem_name">
              {vehicle.make} {vehicle.model}{" "}
            </Link>
          </td>
          <td>
            <select value={vehicle.order_vehicle.quantity}>
>>>>>>> 24b576859495a5aa377cf8442c8eee12854dbb12
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
          </td>
<<<<<<< HEAD
          <td>{item.price}</td>
        </tr>
        )}
      </>
    );
  }
}export default SingleCartItem;
=======
          <td>{vehicle.price}</td>
        </tr>
      </>
    );
  }
}

export default SingleCartItem;
>>>>>>> 24b576859495a5aa377cf8442c8eee12854dbb12
