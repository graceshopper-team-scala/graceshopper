import React, { Component } from 'react';
import { addToCart, removeFromCart, setCart } from '../store/cart';
import { connect } from 'react-redux';
import CartItems from './CartItems';


export class Cart extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(id) {

    dummyCart.filter((item) => item.id !== id);
    console.log(dummyCart.filter((item) => item.id === id));
  }

  componentDidMount() {
    // this.props.addCartItems(this.props.match.params.id);
    this.props.getCart(this.props.auth.id)
  }
  handleChange(evt) {
    evt.preventdefault();
    this.setState = {
      [evt.target.name]: [evt.target.value],
    };
  }
  render() {
    const { cart } = this.props;
    console.log(this.props.auth.id);

    const itemTotal = cart.reduce((acc, curr) => {
      return acc + curr.price;
    }, 0);
    return (
      <div className="cartscreen">
        <p> My Cart</p>
        <div>
          <div className="cart-buttons">
            <button> Continue Shopping</button>3<button> Checkout </button>
          </div>
          <CartItems items={cart} handleClick={this.handleClick} />
        </div>
        <div>
          <p>Subtotal ({cart.length}) items</p>
          <p>Total: ${itemTotal}</p>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  cart: state.cart,
  auth: state.auth
});

const mapDispatch = (dispatch) => ({
  addCartItems: () => dispatch(addToCart()),
  removeFromCart: (vehicle) => dispatch(removeFromCart(vehicle)),
  getCart: (userId)=> dispatch(setCart(userId))

});

export default connect(mapState, mapDispatch)(Cart);
