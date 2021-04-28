import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";

export class SingleCartItem extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
    };
    this.handleQtyChange = this.handleQtyChange.bind(this);
  }
  componentDidMount() {
    this.setState({ quantity: this.props.vehicle.order_vehicle.quantity });
  }

  async handleQtyChange(evt) {
    this.setState({ quantity: +evt.target.value });
    let token = window.localStorage.getItem("token");
    if (!token) {
      let guestCart = JSON.parse(window.localStorage.getItem("GUESTCART"));
      guestCart[0].quantity = Number(evt.target.value);
      window.localStorage.setItem("GUESTCART", JSON.stringify(guestCart));
    } else {
      await axios.put(`/api/orders/add_vehicle`, {
        orderId: +this.props.orderId,
        vehicleId: this.props.vehicle.id,
        quantity: +evt.target.value,
        fromCart: true,
      });
    }

    this.setState({ quantity: evt.target.value });
  }

  render() {
    const { vehicle, handleClick, orderId } = this.props;

    const priceFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

    return (
      <>
        <tr className="single-cart-item" key={vehicle.id}>
          <td className="cart-item-row">
            <img className="cart-img" src={vehicle.imageUrl} />
            <div className="cart-item-col">
              <Link to={`/vehicles/${vehicle.id}`} className="cart-item-name">
                {vehicle.make} {vehicle.model}{" "}
              </Link>
              <div className="cart-item-modify">
                <select
                  value={this.state.quantity}
                  onChange={this.handleQtyChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                <Button
                  className="remove"
                  variant="danger"
                  onClick={() => handleClick(vehicle.id, orderId)}
                >
                  <i className="fas fa-trash"></i>
                </Button>
              </div>
            </div>
          </td>
          <td></td>
          <td>{priceFormatter.format(vehicle.price)}</td>
        </tr>
      </>
    );
  }
}
export default SingleCartItem;
