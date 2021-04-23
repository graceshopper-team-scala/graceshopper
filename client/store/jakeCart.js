import axios from 'axios';

// ACTION TYPES

const SET_CART = 'SET_CART';
const ADD_NEW_TO_CART = 'ADD_NEW_TO_CART';
const UPDATE_CART = 'UPDATE_CART';

// ACTION CREATORS

const setCart = (cart) => ({
  type: SET_CART,
  cart,
});

const addNewToCart = (cartItem) => ({
  type: ADD_NEW_TO_CART,
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

export const createCartItem = (vehicleName, price, quantity, vehicleId) => {
  return async (dispatch) => {
    try {
      await axios.post(`/api/orders/${userId}`, {
        vehicleId,
        quantity,
      });
      dispatch(addNewToCart({ vehicleName, price, quantity, vehicleId }));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateCartItem = (
  orderId,
  vehicleId,
  quantity,
  price,
  vehicleName
) => {
  return async (dispatch) => {
    try {
      const {
        data: cartItem,
      } = await axios.put(`/api/orders/${userId}/${orderId}`, { quantity });
      dispatch(updateCart(vehicleName, price, vehicleId, cartItem));
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

    case ADD_NEW_TO_CART:
      newState = [...state, action.cartItem];
      if (existedItem(state, action.cartItem)) {
        return state;
      }
      return newState;

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
