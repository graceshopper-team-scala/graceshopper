import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSingleVehicleThunk } from '../store/singleVehicle';

class SingleVehicleScreen extends Component {
  componentDidMount() {
    this.props.getSingleVehicle(this.props.match.params.id);
  }

  render() {
    const vehicle = this.props.vehicle;
    console.log(this.props);
    return (
      <div className="singlevehicle_screen">
        <img src={vehicle.imageUrl} />
        <img src={vehicle.logoUrl} />
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
  vehicle: state.vehicle,
});

const mapDispatch = (dispatch) => ({
  getSingleVehicle: (id) => dispatch(getSingleVehicleThunk(id)),
});

export default connect(mapState, mapDispatch)(SingleVehicleScreen);
