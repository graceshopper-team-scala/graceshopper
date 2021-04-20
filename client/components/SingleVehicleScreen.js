import './SingleVehicleScreen.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSingleVehicleThunk } from '../store/singleVehicle';
import { Link } from 'react-router-dom';

class SingleVehicleScreen extends Component {
  componentDidMount() {
    this.props.getSingleVehicle(this.props.match.params.id);
  }

  render() {
    const vehicle = this.props.vehicle;

    return (
      <div className="singlevehicle">
        <div className="vehicle_info">
          <img src={vehicle.imageUrl} />
          <img src={vehicle.logoUrl} />
          <p className="info_name">{vehicle.name}</p>
          <p className="info_make">{vehicle.make}</p>
          <p className="info_model">{vehicle.model}</p>
          <p className="info_description">{vehicle.description}</p>
          <p className="info_price">${vehicle.price}</p>
          <button>
            <Link to={``} className="add_button">
              Add to Cart
            </Link>
          </button>
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
