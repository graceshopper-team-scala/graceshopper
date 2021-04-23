import axios from 'axios';

// ACTION TYPES

const SET_CART = 'SET_CART';
const ADD_TO_CART = 'ADD_TO_CART';
const UPDATE_CART = 'UPDATE_CART';

// ACTION CREATORS

const setCart = (cart) => ({
  type: SET_CART,
  cart,
});

const addToCart = (cartItem) => ({
  type: ADD_TO_CART,
  cartItem,
});

const updateCart = (cartItem) => ({
  type: UPDATE_CART,
  cartItem,
});

// THUNKS

export const fetchCart = () => {
  return async (dispatch) => {
    try {
      const { data: cart } = await axios.get('/api/orders');
      dispatch(setCart(cart));
    } catch (error) {
      console.error(error);
    }
  };
};

export const addToCart = (orderId, vehicleId, quantity) => {
  return async (dispatch) => {
    try {
      const { data: cart } = await axios.put(`/api/orders/add_vehicle`, {
        orderId,
        vehicleId,
        quantity,
      });
      dispatch(addNewToCart(cart));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateCartItem = (vehicles) => {
  return async (dispatch) => {
    try {
      const { data: cartItem } = await axios.put(`/api/orders/${orderId}`, {
        quantity,
      });
      dispatch(updateCart(vehicles));
    } catch (error) {
      console.error(error);
    }
  };
};

// some() method tests whether at least one element in the array passes the test implemented by the provided function. It returns true if, in the array, it finds an element for which the provided function returns true; otherwise it returns false. It doesn't modify the array.

const existedItem = (cart, newItem) => {
  return cart.some((item) => item.cart.vehicleId === newItem.cart.vehicleId);
};

// REDUCERS

export default function cartReducer(state = [], action) {
  let newState;
  switch (action.type) {
    case SET_CART:
      return action.cart;

    case ADD_TO_CART:
      return action.cartItem;

    case UPDATE_CART:
      newState = state.map((item) => {
        if (item.cart.id === action.cartItem.cart.id) {
          return action.cartItem;
        }
        return item;
      });
      return newState;

    default:
      return state;
  }
}
