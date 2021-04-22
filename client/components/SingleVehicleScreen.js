import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSingleVehicleThunk } from '../store/singleVehicle';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/cart';
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
    // console.log('handAddCart >>> ', this);
    evt.preventDefault();
    this.props.addToCart(this.props.match.params.id, this.state.quantity);
    alert('Your sweet ride has been added to cart!');
  }

  handleQtyChange(evt) {
    this.setState({ quantity: Number(evt.target.value) });
  }

  render() {
    const { vehicle } = this.props;
    console.log('single vehicle props >>> ', this);

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
              {/* <p>
                Qty:
                <select onChange={this.handleQtyChange}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </p> */}
              {/* <p>
                <button onClick={this.handleSubmit}>Add to cart</button>
              </p> */}

              {/* <form onSubmit={this.handleAddCartItem}>
                <select onChange={this.handleQtyChange}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                <button type="submit">Add to cart</button>
              </form> */}

              <Form onSubmit={this.handleAddCartItem}>
                <Form.Control
                  as="select"
                  className="qty_selector"
                  onChange={this.handleQtyChange}
                  style={{ maxWidth: 50 }}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </Form.Control>
                <Button type="submit" variant="success">
                  Add To Cart
                </Button>
              </Form>
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
