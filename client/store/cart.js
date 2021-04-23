import axios from "axios";
// Action Types
const ADD_ITEM = "ADD_ITEM";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CART_RESET = "CART_RESET";
const SET_CART = "SET_CART";

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
export const _setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};

// Thunk Creators
export const addToCart = (id, qty) => {
  return async (dispatch) => {
    try {
      // const { data: item } = await axios.get(`/api/vehicles/${id}`);
      dispatch(addItem(item));
    } catch (error) {
      console.log("Error fetching cars from server");
    }
  };
};

export const removeFromCart = (vehicleId,orderId) => {
  return async (dispatch) => {
    //change to remove from through table
    try {
      const { data } = await axios.put(`/api/orders/remove_vehicle`, {
        orderId: orderId,
        vehicleId: vehicleId,
      });
      console.log('vehicleId---->', vehicleId)
      dispatch(_removeFromCart(vehicleId, orderId));
    } catch (error) {
      console.log("Error deleting cars from server", error);
    }
  };
};
export const setCart = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`api/users/orders/${userId}`);
      dispatch(_setCart(data[0].vehicles));
    } catch (error) {
      console.log("Error fetching cars from server", error);
    }
  };
};

export const cartLogout = () => {
  return {
    type: SET_CART,
    cart: [],
  };
};

//reducer
export default function (state = [], action) {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.newItem];
    case REMOVE_FROM_CART:
      const filterCars= state.filter(
        (vehicle) => vehicle.id !== action.vehicleId
      );
      console.log(filterCars)
      return filterCars
    case SET_CART:
      return action.cart;
    default:
      return state;
  }
}
