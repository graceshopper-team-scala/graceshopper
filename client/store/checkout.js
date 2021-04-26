import axios from "axios";
// Action Types
const CHECKED_OUT = "CHECKED_OUT";
const SET_CHECKOUT_ITEMS = "SET_CHECKOUT_ITEMS";

// Action Creators
export const checkedOut = () => {
  return {
    type: CHECKED_OUT,
    checkout: [],
  };
};
export const gotItems = (items) => {
  return {
    type: SET_CHECKOUT_ITEMS,
    items,
  };
};

// Thunk Creators
export const checkOut = (orderId, vehicles) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`api/orders/${orderId}/complete`, {
        vehicles,
      });
      dispatch(checkedOut(data));
    } catch (error) {
      console.log("Error fetching cars from server", error);
    }
  };
};

export const setCheckout = (userId) => {
  return async (dispatch) => {
    try {
      console.log("user ID redux --->", userId);
      const { data } = await axios.get(
        `http://localhost:8080/api/users/orders/${userId}`
      );
      console.log(data);
      dispatch(gotItems(data[0].vehicles || []));
    } catch (error) {
      console.log("Error fetching cars from server - checkout", error);
    }
  };
};
//reducer
export default function (state = [], action) {
  switch (action.type) {
    case CHECKED_OUT:
      return action.checkout;
    case SET_CHECKOUT_ITEMS:
      return action.items;
    default:
      return state;
  }
}