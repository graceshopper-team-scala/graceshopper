import axios from 'axios';
// Action Types
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CART_RESET = 'CART_RESET';

// Action Creators
const addItem = (id) => ({
  type: ADD_ITEM,
  id,
});

// Thunk Creators
export const addToCart = (id) => {
  return async (dispatch) => {
    try {
      const { data: item } = await axios.get(`/api/vehicles/${id}`);
      dispatch(addItem(item));
    } catch (error) {
      console.log('Error fetching cars from server');
    }
  };
};

//reducer
export default function cartReducer(state = [], action) {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.id];
    default:
      return state;
  }
}
