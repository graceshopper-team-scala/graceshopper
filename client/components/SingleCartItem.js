import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export class SingleCartItem extends Component {
  constructor() {
    super();
    this.state = {
      quantity: {},
      // guest cart should equal to whatever in local storage, we can manipulated to the local state to force render and then set it to local storage to it by parsing into a string.
      // change the state of cart that correspond to local storage
    };
    this.handleQtyChange = this.handleQtyChange.bind(this);
  }

  handleQtyChange(evt) {
    this.setState({ quantity: Number(evt.target.value) });
  }

  render() {
    const { vehicle, handleClick, orderId } = this.props;
    // console.log('vehicle---->', vehicle);

    const priceFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });

    console.log('selected >>> ', this.state.quantity);
    return (
      <>
        <tr className="single-cart-item" key={vehicle.id}>
          <td>
            <img className="cart-img" src={vehicle.imageUrl} />
            <Link to={`/vehicles/${vehicle.id}`} className="cartitem_name">
              {vehicle.make} {vehicle.model}{' '}
            </Link>
          </td>
          <td>
            <select
              value={vehicle.order_vehicle.quantity}
              onChange={this.handleQtyChange}
            >
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
          <td>{priceFormatter.format(vehicle.price)}</td>
        </tr>
      </>
    );
  }
}
export default SingleCartItem;
