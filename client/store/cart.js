import { Loop } from "@material-ui/icons";
import axios from "axios";
// Action Types
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CART_RESET = "CART_RESET";
const SET_CART = "SET_CART";


//Guest action types
const GUEST_TO_CART = "GUEST_TO_CART";
const GUEST_CART = "GUEST_CART";


// Action Creators
const addToCart = (cartItem) => ({
  type: ADD_TO_CART,
  cartItem,
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

// Guest action Creators
const guestToCart = (cartItem) => ({
  type: ADD_TO_CART,
  cartItem,
});
export const _guestSetCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};


// Thunk Creators

export const removeFromCart = (vehicleId, orderId) => {
  return async (dispatch) => {
    //change to remove from through table
    try {
      const { data } = await axios.put(`/api/orders/remove_vehicle`, {
        orderId: orderId,
        vehicleId: vehicleId,
      });
      dispatch(_removeFromCart(vehicleId, orderId));
    } catch (error) {
      console.log("Error deleting cars from server", error);
    }
  };
};

export const setCart = (userId) => {
  return async (dispatch) => {
    try {
<<<<<<< HEAD
      const { data } = await axios.get(`api/users/orders/${userId}`);
      dispatch(_setCart(data[0].vehicles));
=======
        const { data } = await axios.get(`api/users/orders/${userId}`);
        dispatch(_setCart(data[0].vehicles));
>>>>>>> 24b576859495a5aa377cf8442c8eee12854dbb12
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

export const cartCheckout = () => {
  return {
    type: SET_CART,
    cart: [],
  };
};

export const addToCartThunk = (orderId, vehicleId, quantity) => {
  return async (dispatch) => {
    try {
      const { data: cart } = await axios.put(`/api/orders/add_vehicle`, {
        orderId,
        vehicleId,
        quantity,
      });
      dispatch(addToCart(cart));
    } catch (error) {
      console.error(error);
    }
  };
};

//guest THINKS

export const guestAddToCartThunk = (vehicleId, quantity) => {
  return async (dispatch) => {
    try {
      const item = {
        vehicleId: vehicleId,
        quantity: quantity,
        vehicle: {},
      };

      let guestCart = JSON.parse(window.localStorage.getItem("GUESTCART"));

      guestCart.push(item);
      window.localStorage.setItem("GUESTCART", JSON.stringify(guestCart));
      dispatch(
        guestToCart(JSON.parse(window.localStorage.getItem("GUESTCART")))
      );
    } catch (error) {
      console.error(error);
    }
  };
};

export const guestSetCart = () => {
  return async (dispatch) => {
    try {
<<<<<<< HEAD
      const { data } = await axios.get(`api/vehicles`);

      let guestCart = JSON.parse(window.localStorage.getItem("GUESTCART"));
      guestCart.map(
        (element) => (element.vehicleId = parseInt(element.vehicleId))
      );

      for (let i = 0; i < data.length; i++) {
        guestCart.map((element) => {
          if (element.vehicleId === data[i].id) {
            element.vehicle = data[i];
          }
        });
      }
=======
>>>>>>> 24b576859495a5aa377cf8442c8eee12854dbb12

      dispatch(
        _guestSetCart(guestCart)
      );
    } catch (error) {
      console.log("Error fetching cars from server", error);
    }
  };
};


//reducer
export default function (state = [], action) {
  switch (action.type) {
    case ADD_TO_CART:
      return action.cartItem;
      
    case REMOVE_FROM_CART:
      const filterCars = state.filter(
        (vehicle) => vehicle.id !== action.vehicleId
      );
      return filterCars;
      
    case SET_CART:
      return action.cart;
      
    case GUEST_TO_CART:
      return state.push(action.cartItem);
      
    case GUEST_CART:
      return action.cart;
<<<<<<< HEAD
=======
      
>>>>>>> 24b576859495a5aa377cf8442c8eee12854dbb12
    default:
      return state;
  }
}
