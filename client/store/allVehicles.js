import axios from "axios";

// Action Types
const GOT_VEHICLES = "GOT_VEHICLES";
const REMOVED_VEHICLE = "REMOVED_VEHICLE";
// Action Creators
const gotVehicles = (vehicles) => ({
  type: GOT_VEHICLES,
  vehicles,
});

const removedVehicle = (vehicle) => ({
  type: REMOVED_VEHICLE,
  vehicle,
});

// Thunk Creators
export const fetchVehicles = () => {
  return async (dispatch) => {
    try {
      const { data: vehicles } = await axios.get("/api/vehicles");
      dispatch(gotVehicles(vehicles));
    } catch (error) {
      console.log("Error fetching cars from server");
    }
  };
};


export const deleteVehicle = (id) => {
  return async (dispatch) => {
    try {
      const { data: vehicle } = await axios.delete(`/api/vehicles/${id}`);
      dispatch(removedVehicle(vehicle));
    } catch (error) {
      console.log("Error fetching cars from server");
    }
  };
};

//reducer
export default function vehiclesReducer(state = [], action) {
  switch (action.type) {
    case GOT_VEHICLES:
      return action.vehicles;
    case REMOVED_VEHICLE:
      return state.filter((vehicle) => vehicle.id !== action.vehicle.id);
    default:
      return state;
  }
}
