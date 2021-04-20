import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSingleCarThunk } from '../store/singleCar';

class SingleCarScreen extends Component {
  render() {
    const car = this.props.car;

    return (
      <div className="singlecar_screen">
        <img src={car.imageUrl} />
        <h3>{car.name}</h3>
        <h4>{car.make}</h4>
        <h4>{car.model}</h4>
        <p>{car.description}</p>
        <button type="submit">Add to Cart</button>
      </div>
    );
  }
}

const mapState = (state) => ({
  robot: state.car,
});

const mapDispatch = (dispatch = {
  gotSingleCar: (id) => dispatch(getSingleCarThunk(id)),
});

export default connect(mapState, mapDispatch)(SingleCarScreen);
