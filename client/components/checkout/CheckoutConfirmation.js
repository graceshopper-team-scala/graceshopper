import { connect } from "react-redux";
import React from "react";
import Button from "react-bootstrap/Button";

export function CheckoutConfirmation(props) {
  if (!props.isCheckout) {
    props.history.push("/home");
    return <></>;
  }
  const handleClick = () => {
    props.history.push("/vehicles");
  };
  return (
    <div className="checkout-confirmation">
      <div className="conf-container">
        <h1>Order confirmed!</h1>
        <h3>Your beautiful vehicles are on the way!</h3>
        <Button variant="warning" onClick={handleClick}>
          {" "}
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}

const mapState = (state) => {
  return {
    isCheckout: state.checkout.isReady,
  };
};

export default connect(mapState)(CheckoutConfirmation);
