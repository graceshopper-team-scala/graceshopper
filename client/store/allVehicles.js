import axios from 'axios';

// Action Types
const GOT_VEHICLES = 'GOT_VEHICLES';


// Action Creators
const gotVehicles = (vehicle) => ({
  type: GOT_VEHICLES,
  vehicles,
});


// Thunk Creators
export const fetchVehicles = () => {
  return async (dispatch) => {
    try {
      const { data: vehicles } = await axios.get('/api/vehicles');
      dispatch(gotVehicles(vehicles));
    } catch (error) {
      console.log('Error fetching cars from server');
    }
  };
};


//reducer
export default function vehiclesReducer(state = [], action) {
  switch (action.type) {
    case GOT_VEHICLES:
      return action.vehicles;
    default:
      return state;
  }
}
