import React from "react";
import { connect } from "react-redux";
import { fetchVehicles } from "../../store/allVehicles";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export class ManageVehicles extends React.Component {
  componentDidMount() {
    this.props.getVehicles();
  }

  render() {
    const vehicles = this.props.vehicles;

    //priceFormatter converts integer price value from DB into dollar currency format
    const priceFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

    return (
      <div>
        <div className="manage-vehicle-header">
          <p className="v-header">Vehicle</p>
          <p className="qty-header">Quantity</p>
          <p className="p-header">Price</p>
          <Button variant="warning" className="add-vehicle">
            {" "}
            Add New Vehicle
          </Button>
        </div>
        <div className="manage-table">
          {vehicles.map((vehicle) => (
            <div className="card-container">
              <div key={vehicle.id} className="manage-card">
                <div className="img-col">
                  <img
                    className="mng-img"
                    src={vehicle.imageUrl}
                    alt={vehicle.model}
                  />
                  <big>{vehicle.vehicleName}</big>
                </div>
                <p className="qty-col">{vehicle.quantity}</p>
                <p className="price-col">
                  {priceFormatter.format(vehicle.price)}
                </p>
              </div>
              <Button variant="danger">
                {" "}
                <i className="fas fa-trash"></i>{" "}
              </Button>
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

export default connect(mapStatetoProps, mapDispatchtoProps)(ManageVehicles);
