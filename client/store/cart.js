import axios from "axios";
// Action Types
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const CART_RESET = "CART_RESET";
const SET_CART = "SET_CART";

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
      if (userId) {
        const { data } = await axios.get(`api/users/orders/${userId}`);
        dispatch(_setCart(data[0].vehicles));
      } else {
        dispatch(
          _setCart(JSON.parse(window.localStorage.getItem("GUESTCART")))
        );
      }
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

export const addToCartThunk = (orderId, vehicleId, quantity) => {
  return async (dispatch) => {
    try {
      if (orderId) {
        const { data: cart } = await axios.put(`/api/orders/add_vehicle`, {
          orderId,
          vehicleId,
          quantity,
        });
        dispatch(addToCart(cart));
      } else {
        const item = { vehicleId: vehicleId, quantity: quantity };
        window.localStorage.setItem("GUESTCART", JSON.stringify(item));

        let guestCart = JSON.parse(window.localStorage.getItem("GUESTCART"));
        console.log("guestCart----->", guestCart);
      }
    } catch (error) {
      console.error(error);
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
    default:
      return state;
  }
}
