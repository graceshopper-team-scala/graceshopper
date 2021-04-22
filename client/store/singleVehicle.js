import axios from 'axios';

const GET_SINGLE_VEHICLE = 'GET_SINGLE_VEHICLE';

export const getSingleVehicle = (vehicle) => ({
  type: GET_SINGLE_VEHICLE,
  vehicle,
});

export const getSingleVehicleThunk = (id) => async (dispatch) => {
  try {
    const { data: oneVehicle } = await axios.get(`/api/vehicles/${id}`);
    dispatch(getSingleVehicle(oneVehicle));
  } catch (error) {
    console.error(error);
  }
};

const initialState = {
  imageUrl: '',
  make: '',
  model: '',
  description: '',
  price: '',
};

const singleVehicleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_VEHICLE:
      return action.vehicle;
    default:
      return state;
  }
};

export default singleVehicleReducer;
