import axios from "axios";
import history from "../history";

const TOKEN = "token";
const ID = "id";
const ORDERID = "order_id";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */

export const me = () => async (dispatch, state) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    console.log("user ---> ", res.data);
    const { data: orders } = await axios.get(`api/users/orders/${res.data.id}`);
    //user object is returned
    window.localStorage.setItem(ID, res.data.id);
    if (orders[0] !== undefined)
      window.localStorage.setItem(ORDERID, orders[0].id);

    return dispatch(setAuth(res.data));
  }
};

export const authenticate = (username, password, method, history) => async (
  dispatch
) => {
  try {
    const res = await axios.post(`/auth/${method}`, { username, password });
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
    history.push("/home");
  } catch (authError) {
    history.push("/login");
    return dispatch(setAuth({ error: authError }));
  }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  window.localStorage.removeItem(ID);
  history.push("/login");
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */

export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
