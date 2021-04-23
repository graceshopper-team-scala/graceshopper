import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSingleVehicleThunk } from '../store/singleVehicle';
import { Link } from 'react-router-dom';
import { createCartItem } from '../store/cart';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

import '../../public/style.css';

class SingleVehicleScreen extends Component {
  constructor() {
    super();
    this.state = {
      vehicles: [],
    };

    this.handleAddCartItem = this.handleAddCartItem.bind(this);
    this.handleQtyChange = this.handleQtyChange.bind(this);
  }

  componentDidMount() {
    this.props.getSingleVehicle(this.props.match.params.id);
  }

  handleAddCartItem(evt) {
    // console.log('handAddCart >>> ', this);
    evt.preventDefault();
    this.props.addNewToCart(
      // this.props.match.params.userId,
      // this.state.quantity
      this.props.auth.id,
      this.state.vehicles
    );
    alert('Your sweet ride has been added to cart!');
  }

  handleQtyChange(evt) {
    this.setState({ quantity: Number(evt.target.value) });
  }

  render() {
    const { vehicle } = this.props;
    // console.log('single vehicle props >>> ', this);

    return (
      <div className="singlevehicle">
        <div className="halfWidth midLeftMargin">
          <div className="top_info">
            <div>
              <img className="logo-img" src={vehicle.logoUrl} />
              <span className="top_make">{vehicle.vehicleName}</span>
            </div>
            <span className="top_price">${vehicle.price}</span>
          </div>
          <div className="vehicle-card">
            <div className="img-desription">
              <img src={vehicle.imageUrl} />
              <div className="img-description-right">
                <p className="vechicle-description">{vehicle.description}</p>
                <form>
                  <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                  <button onClick={this.handleAddCartItem} type="submit">
                    Add to cart
                  </button>
                </form>
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
  addNewToCart: (userId, vehicle) => dispatch(createCartItem(userId, vehicle)),
});

export default connect(mapState, mapDispatch)(SingleVehicleScreen);
