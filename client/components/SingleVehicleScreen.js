import React, { Component } from "react";
import { connect } from "react-redux";
import { getSingleVehicleThunk } from "../store/singleVehicle";
import { withSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { addToCartThunk } from "../store/cart";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

import "../../public/style.css";

class SingleVehicleScreen extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
    };

    this.handleAddCartItem = this.handleAddCartItem.bind(this);
    this.handleQtyChange = this.handleQtyChange.bind(this);
    this.handleSnackbar = this.handleSnackbar.bind(this);
  }

  handleSnackbar() {
    this.key = this.props.enqueueSnackbar(
      "Your Vehicle was added to the cart!",
      {
        variant: "success",
      }
    );
  }
  componentDidMount() {
    this.props.getSingleVehicle(this.props.match.params.id);
  }

  handleAddCartItem(evt) {
    evt.preventDefault();

    const orderId = window.localStorage.getItem("order_id");

    this.props.addNewToCart(
      orderId,
      this.props.match.params.id,
      this.state.quantity
    );
  }

  handleQtyChange(evt) {
    this.setState({ quantity: Number(evt.target.value) });
  }

  render() {
    const { vehicle } = this.props;
    console.log(this.props);
    return (
      <div className="singlevehicle">
        <div className="container">
          <div className="top-info">
            <div>
              <img className="logo-img" src={vehicle.logoUrl} />
              <span className="vehicle-name">{vehicle.vehicleName}</span>
            </div>
            <span className="vehicle-price">${vehicle.price}</span>
          </div>
          <div className="vehicle-card">
            <div className="img-description">
              <img src={vehicle.imageUrl} />
              <img className="logo-img logo-footer" src={vehicle.logoUrl} />
              {/* <img
                src="https://www.vhv.rs/dpng/d/412-4128277_sold-out-banner-png-png-download-sold-out.png"
                alt="sold out banner"
              /> */}
              <div className="img-description-right">
                <p className="vechicle-description">{vehicle.description}</p>
                <div className="vehicle-form">
                  {vehicle.quantity < 5 ? (
                    <div className="single-car-sold-out">
                      {" "}
                      <big> SOLD OUT </big>
                    </div>
                  ) : (
                    <form onSubmit={this.handleAddCartItem}>
                      <select className="vehicle-form-select">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                      <Button
                        variant="warning"
                        type="submit"
                        onClick={this.handleSnackbar}
                      >
                        Add to cart
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SingleVehicleScreen.propTypes = {
  vehicle: PropTypes.object,
};

const mapState = (state) => ({
  vehicle: state.vehicle,
  auth: state.auth,
});

const mapDispatch = (dispatch) => ({
  getSingleVehicle: (id) => dispatch(getSingleVehicleThunk(id)),
  addNewToCart: (userId, vehicleId, quantity) =>
    dispatch(addToCartThunk(userId, vehicleId, quantity)),
});

export default withSnackbar(
  connect(mapState, mapDispatch)(SingleVehicleScreen)
);
