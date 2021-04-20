import axios from 'axios';

const GET_SINGLE_VEHICLE = 'GET_SINGLE_VEHICLE';

export const getSingleVehicle = (vehicle) => ({
  type: GET_SINGLE_VEHICLE,
  vehicle,
});

export const getSingleVehicleThunk = (id) => async (dispatch) => {
  const response = await axios.get(`/api/vehicles/${id}`);
  dispatch(getSingleVehicle(reponse.data));
};

const initialState = {};

const singleVehicleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_VEHICLE:
      return action.vehicle;
    default:
      return state;
  }
};

export default singleVehicleReducer;
