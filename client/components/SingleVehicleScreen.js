import React, { Component } from "react";
import { connect } from "react-redux";
import { getSingleVehicleThunk } from "../store/singleVehicle";
import { Link } from "react-router-dom";
import { addToCart } from "../store/cart";
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
  }

  componentDidMount() {
    this.props.getSingleVehicle(this.props.match.params.id);
  }

  handleAddCartItem(evt) {
    evt.preventDefault();
    this.props.addToCart(this.props.match.params.id, this.state.quantity);
    alert("Your sweet ride has been added to cart!");
  }

  handleQtyChange(evt) {
    this.setState({ quantity: Number(evt.target.value) });
  }

  render() {
    const { vehicle } = this.props;
    console.log("single vehicle props >>> ", this);

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
            <div className="img-desription">
              <img src={vehicle.imageUrl} />
              <div className="img-description-right">
                <p className="vechicle-description">{vehicle.description}</p>
                <div className="vehicle-form">
                  <form onClick={this.handleAddCartItem}>
                    <select className="vehicle-form-select">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                    <Button variant="warning" type="submit">
                      Add to cart
                    </Button>
                  </form>
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
});

const mapDispatch = (dispatch) => ({
  getSingleVehicle: (id) => dispatch(getSingleVehicleThunk(id)),
  addToCart: (id, quantity) => dispatch(addToCart(id, quantity)),
});

export default connect(mapState, mapDispatch)(SingleVehicleScreen);
