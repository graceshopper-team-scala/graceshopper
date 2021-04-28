import axios from "axios";
import history from "../history";
// Action Types
const CHECKED_OUT = "CHECKED_OUT";
const SET_CHECKOUT_ITEMS = "SET_CHECKOUT_ITEMS";
const ORDERID = "order_id";
const SET_CHECKOUT = "SET_CHECKOUT";



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
export const _setCheckout = (cart) => {
  return {
    type: SET_CHECKOUT,
    cart,
  };
};

// Thunk Creators
export const checkOut = (orderId, vehicles, token) => {
  return async (dispatch) => {
    try {
      console.log("token -->", token);
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
export const guesTCheckOut = () => {
  return async (dispatch) => {
    try {
      window.localStorage.setItem("GUESTCART", '[]');
      dispatch(checkedOut());
    } catch (error) {
      console.log("Error fetching cars from server", error);
    }
  };
};

export const guestCheckOut = () => {
  return async (dispatch) => {
    try {
      let guestCart = JSON.parse(window.localStorage.getItem("GUESTCART"));
      guestCart.map(
        (element) => (element.vehicleId = parseInt(element.vehicleId))
      );
      const cart = [];
      for (let element of guestCart) {
        let { data: singlecar } = await axios.get(
          `/api/vehicles/${element.vehicleId}`
        );
        singlecar = {
          ...singlecar,
          order_vehicle: { quantity: element.quantity },
        };
        cart.push(singlecar);
        dispatch(guestSetCheckout(cart))
      }
      console.log(cart);
    } catch (error) {
      console.log("Error fetching cars from server", error);
    }
  };
};
export const guestSetCheckout = () => {
  return async (dispatch) => {
    try {

      let guestCart = JSON.parse(window.localStorage.getItem("GUESTCART"));
      guestCart.map(
        (element) => (element.vehicleId = parseInt(element.vehicleId))
      );
      const cart = [];
      for (let element of guestCart) {
        let { data: singlecar } = await axios.get(
          `/api/vehicles/${element.vehicleId}`
        );
        singlecar = {
          ...singlecar,
          order_vehicle: { quantity: element.quantity },
        };
        cart.push(singlecar);
      }

      dispatch(_setCheckout(cart));
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
      console.log(data[0].vehicles);
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
    case SET_CHECKOUT:
      return {
        ...state,
        vehicles: action.cart,
        isReady: true,
      }
    default:
      return state;
  }
}
