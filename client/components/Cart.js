import React, { Component } from "react";
import { removeFromCart, setCart } from "../store/cart";
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
  }
  componentDidMount() {
    const userId = window.localStorage.getItem("id");
    this.props.getCart(+userId);
    this.setState({
      isLoading: false,
    });
  }
  handleChange(evt) {
    evt.preventdefault();
    this.setState = {
      [evt.target.name]: [evt.target.value],
    };
  }
  handleClick(vehicleId, orderId) {
    this.props.removeFromCart(vehicleId, orderId);
  }
  handleContinue() {
    this.props.history.push("/vehicles");
  }
  render() {
    const cart = this.props.cart || [];
    const itemTotal = cart.reduce((acc, curr) => {
      return acc + curr.price;
    }, 0);

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
                <Button variant="warning"> Checkout </Button>
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
});

export default connect(mapState, mapDispatch)(Cart);
