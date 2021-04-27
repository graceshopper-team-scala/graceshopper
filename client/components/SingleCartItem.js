import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class SingleCartItem extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
    };
    this.handleQtyChange = this.handleQtyChange.bind(this);
  }
  componentDidMount(){
    this.setState({quantity: this.props.vehicle.order_vehicle.quantity})
  }
  handleQtyChange(evt) {
    let token = window.localStorage.getItem('token');
    if(!token){let guestCart = JSON.parse(window.localStorage.getItem('GUESTCART'));
    guestCart[0].quantity = Number(evt.target.value);
    window.localStorage.setItem('GUESTCART', JSON.stringify(guestCart));}

    this.setState({quantity: +evt.target.value })
  }

  render() {
    const { vehicle, handleClick, orderId } = this.props;

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
              value={this.state.quantity}
              onChange={ this.handleQtyChange}
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
