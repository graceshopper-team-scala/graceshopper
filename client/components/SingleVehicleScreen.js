import React, { Component } from "react";
import { connect } from "react-redux";
import { getSingleVehicleThunk } from "../store/singleVehicle";
import { withSnackbar } from "notistack";
import { addToCartThunk, guestAddToCartThunk } from "../store/cart";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import ReactLoading from "react-loading";

class SingleVehicleScreen extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,

      isLoading: true,
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
    this.setState({
      isLoading: false,
    });
  }

  handleAddCartItem(evt) {
    evt.preventDefault();
    const orderId = window.localStorage.getItem("order_id");
<<<<<<< HEAD
    const userId = window.localStorage.getItem("id")
    if (orderId && userId ) {
=======
    if (orderId) {
>>>>>>> 24b576859495a5aa377cf8442c8eee12854dbb12
      this.props.addNewToCart(
        orderId,
        this.props.match.params.id,
        this.state.quantity
      );
    } else {
      this.props.guestAddToCart(
        this.props.match.params.id,
        this.state.quantity
      );
      console.log(this.state);
    }
  }

  handleQtyChange(evt) {
    this.setState({ quantity: Number(evt.target.value) });
  }

  render() {
    const { vehicle } = this.props;

    console.log();

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
                      <select
                        className="vehicle-form-select"
                        onChange={this.handleQtyChange}
                      >
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
  guestAddToCart: (vehicleId, quantity) =>
    dispatch(guestAddToCartThunk(vehicleId, quantity)),
});

export default withSnackbar(
  connect(mapState, mapDispatch)(SingleVehicleScreen)
);
