import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSingleVehicleThunk } from '../store/singleVehicle';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/cart';

import '../../public/style.css';

class SingleVehicleScreen extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getSingleVehicle(this.props.match.params.id);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.addToCart(
      this.props.match.params.vehicleId,
      this.state.quantity
    );
    alert('Your sweet ride has been added to cart!');
  }

  render() {
    const { vehicle } = this.props;

    return (
      <div className="singlevehicle">
        <div className="halfWidth midLeftMargin">
          <div className="top_info">
            <span className="top_logo">
              <img src={vehicle.logoUrl} />
            </span>
            <span className="top_make">{vehicle.make}</span>
            <span className="top_model">{vehicle.model}</span>
            <span className="top_price">${vehicle.price}</span>
          </div>
          <div className="left_img">
            <img src={vehicle.imageUrl} />
          </div>
          <div className="left_info">
            <p className="left_description">{vehicle.description}</p>
          </div>
          <div className="vehiclescreen_right">
            <div className="right_info">
              <p>
                Price: <span>${vehicle.price}</span>
              </p>
              <p>
                Status: <span>In Stock</span>
              </p>
              <p>
                Qty:
                <select>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </p>
              <p>
                <button onClick={this.handleSubmit}>Add to cart</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  vehicle: state.vehicle,
});

const mapDispatch = (dispatch) => ({
  getSingleVehicle: (id) => dispatch(getSingleVehicleThunk(id)),
  addToCart: (vehicleId, quantity) => dispatch(addToCart(vehicleId, quantity)),
});

export default connect(mapState, mapDispatch)(SingleVehicleScreen);
