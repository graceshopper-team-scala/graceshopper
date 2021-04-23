import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSingleVehicleThunk } from '../store/singleVehicle';
import { Link } from 'react-router-dom';
import { addToCartThunk } from '../store/cart';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

import '../../public/style.css';

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

    const orderId = window.localStorage.getItem('order_id');

    // console.log('orderId>>>', orderId);
    // console.log('vehicleId>>>', this.props.match.params.id);
    // console.log('quantity>>>', this.state.quantity);

    this.props.addNewToCart(
      orderId,
      this.props.match.params.id,
      this.state.quantity
    );
    alert('Your sweet ride has been added to cart!');
  }

  handleQtyChange(evt) {
    this.setState({ quantity: Number(evt.target.value) });
  }

  render() {
    const { vehicle } = this.props;

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
                  <form onSubmit={this.handleAddCartItem}>
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
  auth: state.auth,
});

const mapDispatch = (dispatch) => ({
  getSingleVehicle: (id) => dispatch(getSingleVehicleThunk(id)),
  addNewToCart: (orderId, vehicleId, quantity) =>
    dispatch(addToCartThunk(orderId, vehicleId, quantity)),
});

export default connect(mapState, mapDispatch)(SingleVehicleScreen);
