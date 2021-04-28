import axios from "axios";
import history from "../history";
// Action Types
const CHECKED_OUT = "CHECKED_OUT";
const SET_CHECKOUT_ITEMS = "SET_CHECKOUT_ITEMS";
const ORDERID = "order_id";

// Action Creators
export const checkedOut = () => {
  history.push("/confirmation");
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
export const checkOut = (orderId, vehicles, token) => {
  return async (dispatch) => {
    try {
      const { data: order } = await axios.put(
        `api/orders/${orderId}/complete`,
        {
          vehicles,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      window.localStorage.setItem(ORDERID, order.id);
      dispatch(checkedOut());
    } catch (error) {
      console.log("Error fetching cars from server", error);
    }
  };
};

export const setCheckout = (token) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/users/orders`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(gotItems(data[0].vehicles || []));
    } catch (error) {
      console.log("Error fetching cars from server - checkout", error);
    }
  };
};
//reducer
const initialState = {
  isReady: false,
  vehicles: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case CHECKED_OUT:
      return { ...state, vehicles: action.checkout, isReady: true };
    case SET_CHECKOUT_ITEMS:
      return {
        ...state,
        vehicles: action.items,
        isReady: true,
      };
    default:
      return state;
  }
}
