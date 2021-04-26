import axios from "axios";

// Action Types
const GOT_USERS = "GOT_USERS";
const REMOVED_USERS = "REMOVED_USER";
// Action Creators
const gotUsers = (users) => ({
  type: GOT_USERS,
  users,
});

const removedUser = (user) => ({
  type: REMOVED_USERS,
  user,
});

// Thunk Creators
export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const { data: users } = await axios.get("/api/users/admin");
      dispatch(gotUsers(users));
    } catch (error) {
      console.log("Error fetching users from server");
    }
  };
};


export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      const { data: user } = await axios.delete(`/api/users/${id}`);
      dispatch(removedUser(user));
    } catch (error) {
      console.log("Error fetching users from server");
    }
  };
};

//reducer
export default function usersReducer(state = [], action) {
  switch (action.type) {
    case GOT_USERS:
      return action.users;
    case REMOVED_USERS:
      return state.filter((user) => user.id !== action.user.id);
    default:
      return state;
  }
}