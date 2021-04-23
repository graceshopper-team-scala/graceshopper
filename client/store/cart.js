import axios from 'axios';
// Action Types
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CART_RESET = 'CART_RESET';
const SET_CART = 'SET_CART';
const ADD_NEW_TO_CART = 'ADD_NEW_TO_CART';
const UPDATE_CART = 'UPDATE_CART';

// Action Creators
const addItem = (id) => ({
  type: ADD_ITEM,
  id,
});

export const _removeFromCart = (vehicleId, orderId) => {
  return {
    type: REMOVE_FROM_CART,
    vehicleId,
    orderId,
  };
};
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

// Thunk Creators
export const fetchCart = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`api/users/orders/${userId}`);
      dispatch(setCart(data[0]));
    } catch (error) {
      console.log('Error fetching cars from server', error);
    }
  };
};

export const createCartItem = (vehicles) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/orders/`, {
        vehicles,
      });
      dispatch(addNewToCart(response.data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateCartItem = (orderId, vehicles) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/api/orders/${orderId}`, {
        vehicles,
      });
      dispatch(updateCart(response.vehicles));
    } catch (error) {
      console.error('Error updating cart in thunk!');
    }
  };
};

export const removeFromCart = (vehicleId, orderId) => {
  return async (dispatch) => {
    //change to remove from through table
    try {
      const { data } = await axios.put(`/api/orders/remove_vehicle`, {
        orderId: orderId,
        vehicleId: vehicleId,
      });
      console.log('vehicleId---->', vehicleId);
      dispatch(_removeFromCart(vehicleId, orderId));
    } catch (error) {
      console.log('Error deleting cars from server', error);
    }
  };
};
export const setCart = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`api/users/orders/${userId}`);
      dispatch(_setCart(data[0].vehicles));
    } catch (error) {
      console.log('Error fetching cars from server', error);
    }
  };
};

export const cartLogout = () => {
  return {
    type: SET_CART,
    cart: [],
  };
};

// some() method tests whether at least one element in the array passes the test implemented by the provided function. It returns true if, in the array, it finds an element for which the provided function returns true; otherwise it returns false. It doesn't modify the array.

const existedItem = (cart, newItem) => {
  return cart.some((item) => item.cart.vehicleId === newItem.cart.vehicleId);
};

//reducer
export default function (state = [], action) {
  switch (action.type) {
    case REMOVE_FROM_CART:
      const filterCars = state.filter(
        (vehicle) => vehicle.id !== action.vehicleId
      );
      console.log(filterCars);
      return filterCars;
    case SET_CART:
      return action.cart;

    case ADD_NEW_TO_CART:
      newState = [...state, action.cartItem];
      // if (existedItem(state, action.cartItem)) {
      //   return state;
      // }
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
