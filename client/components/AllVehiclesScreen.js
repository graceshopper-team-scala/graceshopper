import React from 'react';
import { connect } from 'react-redux';
import { fetchVehicles } from '../store/allVehicles';
import { Link } from 'react-router-dom';


// Notice that we're exporting the AllRobots component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllVehicles extends React.Component {
  componentDidMount() {
    this.props.getVehicles();
  }

  render() {
    const vehicles = this.props.vehicles;
    return (
      <div>
        <div>
        {vehicles.map((vehicle) => (
          <div key={vehicle.id}>
            <h3>
              <div>
              <Link to={`/vehicles/${vehicle.id}`}>{vehicle.name}</Link>
              </div>
            </h3>
            <Link to={`/vehicles/${vehicle.id}`}>
              <div>
              <img src={vehicle.imageUrl} alt={vehicle.name} />
              </div>
            </Link>
          </div>
        ))}
        </div>
      </div>
    );
  }
}



const mapStatetoProps = (state) => {
  return {
    vehicles: state.vehicles,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    getVehicles: () => dispatch(fetchVehicles()),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(AllVehicles);