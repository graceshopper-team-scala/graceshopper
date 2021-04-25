import React from "react";
import { connect } from "react-redux";
import { fetchVehicles, deleteVehicle } from "../../store/allVehicles";
import Button from "react-bootstrap/Button";

export class ManageVehicles extends React.Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    this.props.getVehicles();
  }
  handleDelete(id) {
    this.props.removeVehicle(id);
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
            Add Vehicle
          </Button>
        </div>
        <div className="manage-table">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="card-container">
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
              <Button
                variant="danger"
                onClick={() => this.handleDelete(vehicle.id)}
              >
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
    removeVehicle: (id) => dispatch(deleteVehicle(id)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(ManageVehicles);
