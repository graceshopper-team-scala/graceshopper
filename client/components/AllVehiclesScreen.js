import React from 'react';
import { connect } from 'react-redux';
import { fetchVehicles } from '../store/allVehicles';
import { Link } from 'react-router-dom';

export class AllVehicles extends React.Component {
  componentDidMount() {
    this.props.getVehicles();
  }

  render() {
    const vehicles = this.props.vehicles;

    //priceFormatter converts integer price value from DB into dollar currency format
    const priceFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });

    return (
      <div>
        <div className="Allcards">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="Card">
              <Link to={`/vehicles/${vehicle.id}`}>
                <div className="Card-image">
                  <img src={vehicle.imageUrl} alt={vehicle.model} />
                </div>
              </Link>
              <div className="Card-data">
                <Link to={`/vehicles/${vehicle.id}`}>
                  {vehicle.make} {vehicle.model}
                </Link>
                <div>{priceFormatter.format(vehicle.price)}</div>
              </div>
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
