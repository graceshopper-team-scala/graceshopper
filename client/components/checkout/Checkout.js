import React, { Component } from "react";
import { connect } from "react-redux";
import { checkOut, setCheckout } from "../../store/checkout";
import { cartCheckout } from "../../store/cart";
import Button from "react-bootstrap/Button";

export class Checkout extends Component {
  constructor() {
    super();
    this.handleComplete = this.handleComplete.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
  }
  componentDidMount() {
    const userId = window.localStorage.getItem("id");
    this.props.fetchCart(userId);
  }

  handleComplete(vehicles) {
    const orderId = window.localStorage.getItem("order_id");
    this.props.checkOutCart(orderId, vehicles);
    this.props.cleartCart();
  }
  handleGoBack() {
    this.props.history.push("./cart");
  }
  render() {
    const vehicles = this.props.vehicles || [];
    const total =
      vehicles.reduce((acc, curr) => {
        return acc + curr.price;
      }, 0) || 0;
    return (
      <div>
        <div className="checkout-header">
          <big>Checkout Cart</big>
          <Button onClick={this.handleGoBack}>Return To Cart</Button>
          <Button onClick={() => this.handleComplete(vehicles)}>
            Confirm Checkout
          </Button>
        </div>
        <div className="checkout-items">
          {vehicles.map((vehicle) => {
            return (
              <div key={vehicle.id} className="checkout-item">
                <p>{vehicle.vehicleName}</p>
                <p>{vehicle.quantity}</p>
                <p>{vehicle.price}</p>
              </div>
            );
          })}
        </div>
        <div checkout="checkout-total">
          <big>Total: {total}</big>
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    vehicles: state.checkout.vehicles,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => ({
  checkOutCart: (id, items) => dispatch(checkOut(id, items)),
  fetchCart: (id) => dispatch(setCheckout(id)),
  cleartCart: () => dispatch(cartCheckout()),
});
export default connect(mapState, mapDispatch)(Checkout);
