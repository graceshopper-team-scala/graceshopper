import React, { Component } from 'react';
import { addToCart } from '../store/cart';
import { connect } from 'react-redux';
import CartItems from './CartItems';

const dummyCart = [
  {
    id: 1,
    make: 'toyota',
    model: 'camry',
    description: 'fake car model',
    quantity: 2,
    imageUrl:
      'https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg',
    price: 20000,
  },
  {
    id: 2,
    make: 'honda',
    model: 'civic',
    description: 'a civic for testing',
    quantity: 5,
    imageUrl:
      'https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg',
    price: 15000,
  },
];
export class Cart extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 0,
    };
  }
  componentdidmount() {
    this.props.getCartItems(this.props.match.params.id);
  }
  handleChange(evt) {
    evt.preventdefault();
    this.setState = {
      [evt.target.name]: [evt.target.value],
    };
  }
  render() {
    //const { cart } = this.props;
    const itemTotal = dummyCart.reduce((acc, curr) => {
      return acc + curr.price;
    }, 0);
    return (
      <div className="cartscreen">
        <p> My Cart</p>
        <div>
          <div className="cart-buttons">
            <button> Continue Shopping</button>3<button> Checkout </button>
          </div>
          <CartItems items={dummyCart} />
        </div>
        <div>
          <p>Subtotal ({dummyCart.length}) items</p>
          <p>Total: ${itemTotal}</p>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  cart: state.cart,
});

const mapDispatch = (dispatch) => ({
  getCartItems: () => dispatch(addToCart()),
});

export default connect(mapState, mapDispatch)(Cart);
