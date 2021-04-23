import React, { Component } from "react";
import { addToCart, removeFromCart, setCart } from "../store/cart";
import { connect } from "react-redux";
import CartItems from "./CartItems";

export class Cart extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 0,
    };
  }
  componentDidMount() {
    const userId = window.localStorage.getItem("id");
    this.props.getCart(+userId);
  }

  handleChange(evt) {
    evt.preventdefault();
    this.setState = {
      [evt.target.name]: [evt.target.value],
    };
  }
  render() {
    const cart = this.props.cart.vehicles || [];
    const itemTotal = cart.reduce((acc, curr) => {
      return acc + curr.price;
    }, 0);

    return (
      <>
        <div className="cart-container">
          <div className="cart-area">
            <div className="cart-top">
              <p> My Cart</p>
              <button> Continue Shopping</button>
              <button> Checkout </button>
            </div>
            <CartItems items={cart} />
            <div className="cart-total">
              <p>Subtotal ({cart.length}) items</p>
              <p>Total: ${itemTotal}</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => ({
  addCartItems: () => dispatch(addToCart()),
  removeFromCart: (vehicle) => dispatch(removeFromCart(vehicle)),
  getCart: (id) => dispatch(setCart(id)),
});

export default connect(mapState, mapDispatch)(Cart);
