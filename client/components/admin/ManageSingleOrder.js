import React from "react";
import { connect } from "react-redux";
import { fetchVehicles, deleteVehicle } from "../../store/allVehicles";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ManageSingleOrderForm from "./ManageSingleOrderForm"


export default class ManageSingleOrder extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      vehicles: []
    }

    this.handleDelete = this.handleDelete.bind(this);
    // this.handleQuantity = this.handleQuantity.bind(this);
    // this.handleChange = this.handleChange.bind(this);
  }
async componentDidMount() {
    await this.setState({
      vehicles: this.props.location.state.vehicles
    })
  }
  async handleDelete(id) {
    console.log('!!!!! hit!')
    await axios.put("/api/orders/remove_vehicle", {
        orderId: this.props.match.params.orderId,
        vehicleId: id
    })
    await this.setState({
      vehicles: this.state.vehicles.filter(vehicle=>vehicle.id!==id)
    })
  }

  

  render() {
    const vehicles = this.state.vehicles
    return (
      <div>
        <div className="manage-vehicle-header">
          <p className="v-header">Vehicle</p>
          <p className="qty-header">Quantity</p>
          <Button variant="warning" className="add-vehicle">
            {" "}
            Add Vehicle
          </Button>
        </div>
        <div className="manage-table">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="card-container">

              
              {/* <div key={vehicle.id} className="manage-card">
                <div className="img-col">
                  <big>{vehicle.vehicleName}</big>
                </div>
                <form>
                
                <input name="quantity" value={vehicle.order_vehicle.quantity} />

                <button type="submit">Update Quantity</button>
            </form>
                
              </div>
              <Button
                variant="danger"
                onClick={() => this.handleDelete(vehicle.id)}
              >
                {" "}
                <i className="fas fa-trash"></i>{" "}
              </Button> */}

              <ManageSingleOrderForm vehicle={vehicle}/>
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

// const mapStatetoProps = (state) => {
//   return {
//     vehicles: state.vehicles,
//   };
// };

// const mapDispatchtoProps = (dispatch) => {
//   return {
//     getVehicles: () => dispatch(fetchVehicles()),
//     removeVehicle: (id) => dispatch(deleteVehicle(id)),
//   };
// };

// export default connect(mapStatetoProps, mapDispatchtoProps)(ManageUserVehicles);