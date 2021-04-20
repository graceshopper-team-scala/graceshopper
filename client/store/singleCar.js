import axios from 'axios';

const GET_SINGLE_CAR = 'GET_SINGLE_CAR';

export const getSingleCar = (car) => ({
  type: GET_SINGLE_CAR,
  car,
});

export const getSingleCarThunk = (id) => async (dispatch) => {
  const response = await axios.get(`/api/cars/${id}`);
  dispatch(getSingleCar(reponse.data));
};

const initialState = {};

const singleCarReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SINGLE_CAR:
      return action.car;
    default:
      return state;
  }
};

export default singleCarReducer;
