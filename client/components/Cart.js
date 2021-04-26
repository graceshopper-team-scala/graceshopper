import React, { Component } from "react";
import { createCartItem, removeFromCart, setCart, guestSetCart } from "../store/cart";

import { connect } from "react-redux";
import CartItems from "./CartItems";
import Button from "react-bootstrap/Button";
import ReactLoading from "react-loading";

export class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleContinue = this.handleContinue.bind(this);
    this.goToCheckout = this.goToCheckout.bind(this);
  }
  componentDidMount() {
    const userId = window.localStorage.getItem("id");

    if(userId){
      this.props.getCart(+userId);
    }else{
      this.props.guestCart();
    }
    this.props.getCart(+userId);
    this.setState({
      isLoading: false,
    });

  }
  handleClick(vehicleId, orderId) {
    this.props.removeFromCart(vehicleId, orderId);
  }
  handleContinue() {
    this.props.history.push("/vehicles");
  }
  goToCheckout() {
    this.props.history.push("/checkout");
  }
  render() {
    const cart = this.props.cart || [];
    cart.map((element) => element.vehicleId = parseInt(element.vehicleId))
    const itemTotal = cart.reduce((acc, curr) => {
      return acc + curr.price;
    }, 0);
    console.log('---->',cart)

    console.log(cart);
    if (this.state.isLoading) {
      return (
        <div className="loading-screen">
          <ReactLoading
            type={"spokes"}
            color={"#ffc107"}
            height={500}
            width={250}
          />
        </div>
      );
    }
    return (
      <>
        <div className="cart-container">
          <div className="cart-area">
            <div className="cart-top">
              <p> My Cart</p>
              <div>
                <Button variant="warning" onClick={this.handleContinue}>
                  {" "}
                  Continue Shopping
                </Button>
                <Button variant="warning" onClick={this.goToCheckout}>
                  {" "}
                  Checkout{" "}
                </Button>
              </div>
            </div>
            <CartItems items={cart} handleClick={this.handleClick} />
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
  removeFromCart: (vehicleId, orderId) =>
    dispatch(removeFromCart(vehicleId, orderId)),
  getCart: (id) => dispatch(setCart(id)),
  guestCart: () => dispatch(guestSetCart()),
});

export default connect(mapState, mapDispatch)(Cart);
