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

export const _removeFromCart = (vehicle )=> {
  return{
    type: REMOVE_FROM_CART,
    vehicle
  }
}

// Thunk Creators
export const addToCart = (id) => {
  return async (dispatch) => {
    try {
      // const { data: item } = await axios.get(`/api/vehicles/${id}`);
      dispatch(addItem(item));
    } catch (error) {
      console.log('Error fetching cars from server');
    }
  };
};

export const removeFromCart = (vehicle, history) =>{
  return async (dispatch) => {
    //change to remove from through table
    // const {data} =  await axios.delete(`/api/vehicle/${vehicle.id}`);
    dispatch(_removeFromCart(data));
    history.push("/vehicle");
  };
}

//reducer
export default function cartReducer(state = [], action) {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.newItem];
    case REMOVE_FROM_CART:
      return [...state, state.filter((vehicle) => vehicle.id !== action.vehicle.id) ]
    default:
      return state;
  }
}
