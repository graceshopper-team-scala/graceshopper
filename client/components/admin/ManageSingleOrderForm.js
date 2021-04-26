import React, { Component } from 'react';
import Button from "react-bootstrap/Button";
import axios from "axios";


export default class ManageSingleOrderForm extends Component {
  constructor(props) {
    super(props);
    const initialQuantity = this.props.vehicle.order_vehicle.quantity
    this.state = {
      quantity: String(initialQuantity) 
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
   
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  async handleSubmit(evt){
      console.log(evt)
    evt.preventDefault();
    const quantity = evt.target.quantity.value 
    await axios.put("/api/orders/add_vehicle", {
      orderId: this.props.vehicle.order_vehicle.orderId,
      vehicleId: this.props.vehicle.id,
      quantity: parseInt(quantity),
      fromCart: true
    })
  }

//   async handleDelete() {
//     await axios.put("/api/orders/remove_vehicle", {
//         orderId: this.props.vehicle.order_vehicle.orderId,
//         vehicleId: this.props.vehicle.id
//     })
//     await this.setState({
//       vehicles: this.state.vehicles.filter(vehicle=>vehicle.id!==id)
//     })
//   }

  render() {
    console.log(this.props)
    const vehicle = this.props.vehicle
    return (
    <div key={vehicle.id} className="card-container">
    <div key={vehicle.id} className="manage-card">
      <div className="img-col">
        <big>{vehicle.vehicleName}</big>
      </div>
      <form onSubmit={this.handleSubmit}>
      
      <input name="quantity" onChange={this.handleChange} value={this.state.quantity} />

      <button type="submit">Update Quantity</button>
  </form>
      
    </div>
  </div>
    );
  }
}













   