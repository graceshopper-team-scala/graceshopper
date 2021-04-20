import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSingleVehicleThunk } from '../store/singleVehicle';

class SingleVehicleScreen extends Component {
  render() {
    const vehicle = this.props.vehicle;

    return (
      <div className="singlevehicle_screen">
        <img src={vehicle.imageUrl} />
        <h3>{vehicle.name}</h3>
        <h4>{vehicle.make}</h4>
        <h4>{vehicle.model}</h4>
        <p>{vehicle.description}</p>
        <button type="submit">Add to Cart</button>
      </div>
    );
  }
}

const mapState = (state) => ({
  robot: state.vehicle,
});

const mapDispatch = (dispatch = {
  gotSingleVehicle: (id) => dispatch(getSingleVehicleThunk(id)),
});

export default connect(mapState, mapDispatch)(SingleVehicleScreen);
