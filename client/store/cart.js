import axios from 'axios';
// Action Types
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CART_RESET = 'CART_RESET';

// Action Creators
const addItem = (newItem) => ({
  type: ADD_ITEM,
  newItem,
});

// Thunk Creators
export const addToCart = (id) => {
  return async (dispatch, getSate) => {
    try {
      const { data: item } = await axios.get(`/api/vehicles/${id}`);
      dispatch(addItem(item));
      localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems));
    } catch (error) {
      console.log('Error fetching cars from server');
    }
  };
};

//reducer
export default function cartReducer(state = { cartItems: [] }, action) {
  switch (action.type) {
    case ADD_ITEM:
      const existItem = state.cartItems.find(
        (x) => x.vehicle === newItem.vehicle
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.vehicle === existItem.vehicle ? newItem : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    default:
      return state;
  }
}
