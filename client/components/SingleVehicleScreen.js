import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSingleVehicleThunk } from '../store/singleVehicle';
import { Link } from 'react-router-dom';

import '../../public/style.css';

class SingleVehicleScreen extends Component {
  componentDidMount() {
    this.props.getSingleVehicle(this.props.match.params.id);
  }

  render() {
    const { vehicle } = this.props;

    return (
      <div className="singlevehicle">
        <div className="left_img">
          <img src={vehicle.imageUrl} />
        </div>

        <div className="vehiclescreen_top">
          <div className="top_info">
            <div className="top_logo">
              <img src={vehicle.logoUrl} />
            </div>
            <h2 className="top_make">{vehicle.make}</h2>
            <h2 className="top_model">{vehicle.model}</h2>
            <p className="top_price">${vehicle.price}</p>
          </div>
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
              Qty
              <select>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </p>
            <p>
              <button type="button">Add to cart</button>
            </p>
          </div>
        </div>

        <div className="vehiclescreen_bottom">
          <div className="bottom_info">
            <p className="bottom_description">{vehicle.description}</p>
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
});

export default connect(mapState, mapDispatch)(SingleVehicleScreen);
