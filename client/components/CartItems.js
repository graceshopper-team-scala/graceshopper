import React, { Component } from 'react';
import { SingleCartItem } from './SingleCartItem';

export default class CartItems extends Component {
  constructor() {
    super();
  }

  render() {
    const { items, handleClick } = this.props;
    const orderId = window.localStorage.getItem('order_id');

    return (
      <table className="cart-items">
        <tbody>
          <tr>
            <th></th>
            <th></th>
            <th>Price</th>
          </tr>

          {items.map((item) => {

            {
              /* console.log(item); */
            }
            return (
              <SingleCartItem
                key={item.id}
                vehicle={item}
                item={item.vehicle}
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
