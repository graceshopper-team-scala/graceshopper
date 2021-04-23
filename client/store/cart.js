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

export const _removeFromCart = (vehicle) => {
  return {
    type: REMOVE_FROM_CART,
    vehicle,
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

export const removeFromCart = (id, history) => {
  return async (dispatch) => {
    //change to remove from through table

    // const {data} =  await axios.put(`/api/orders/${id}`, {
    //   vehicles:
    // });

    // dispatch(_removeFromCart(data));
    history.push("/vehicle");
  };
};
export const setCart = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`api/users/orders/${userId}`);
      const pending = data.filter((item) => item.status === "pending");
      console.log("thunk data -->", pending);
      dispatch(_setCart(pending[0]));
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
      return [
        ...state,
        state.filter((vehicle) => vehicle.id !== action.vehicle.id),
      ];
    case SET_CART:
      return action.cart;
    default:
      return state;
  }
}
