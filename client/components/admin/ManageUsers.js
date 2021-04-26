import React from "react";
import { connect } from "react-redux";
import { fetchUsers, deleteUser } from "../../store/allUsers";
import Button from "react-bootstrap/Button";
import ManageUserVehicles from "./ManageSingleOrder";
import axios from "axios";

import { Link } from "react-router-dom";

export class ManageUsers extends React.Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
  }
  componentDidMount() {
    this.props.getUsers();
  }
  handleDelete(id) {
    this.props.removeUser(id);
  }
  async handleComplete(orderId){
    await axios.put(`/api/orders/${orderId}/complete`)
  }
  render() {
    const users = this.props.users;
    console.log(users) 

    //priceFormatter converts integer price value from DB into dollar currency format
    // const priceFormatter = new Intl.NumberFormat("en-US", {
    //   style: "currency",
    //   currency: "USD",
    //   maximumFractionDigits: 0,
    // });

    return (
      <div>
        <div className="manage-vehicle-header">
          <p className="v-header">User</p>
          <p className="qty-header">Order</p>
          <p className="p-header">Status</p>
          <Button variant="warning" className="add-vehicle">
            {" "}
            Add User
          </Button>
        </div>
        <div className="manage-table">
          {users.map((user) => (
            <div key={user.id} className="card-container">
            <div key={user.id} className="manage-card">
            <p className="img-col">{user.username}</p>
            <p className="price-col">
            {user.orders.map(order => (
              <div>
              <Link to={{
                  pathname: `/manage_users/orders/${order.id}`,
                  state: {
                    vehicles: order.vehicles
                  }}}>
              <div>{order.id}</div>
              </Link>
              <div>{order.status}</div> 
              <Button variant="warning" 
              className="add-vehicle"
              onClick={()=> this.handleComplete(order.id)}
              >
            {" "}
            Change Status
          </Button>
              </div>
            ))} </p>

              {/* <p className="price-col">
                  <Button variant="warning" 
                    className="add-vehicle"
                    onClick={()=> this.handleComplete(order.id)}
                    >
                    {" "}
                    Change Status
                  </Button>
              </p> */}
           
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
    users: state.users,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    getUsers: () => dispatch(fetchUsers()),
    removeUser: (id) => dispatch(deleteUser(id)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(ManageUsers);
