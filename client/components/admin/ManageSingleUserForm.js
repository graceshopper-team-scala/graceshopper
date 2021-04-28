import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import StatusForm from "./StatusForm";

export default class ManageSingleUserForm extends Component {
  constructor(props) {
    super(props);
    const orders = this.props.user.orders;
    const initialStatus = {};
    orders.forEach((order) => {
      initialStatus[order.id] = order.status;
    });
    //{1: "pending", 3: "completed"}
    this.state = initialStatus;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    await axios.put(`/api/orders/${this.props.user.id}/complete`);
    evt.target.quantity.value = !evt.target.quantity.value;
  }

  render() {
    const user = this.props.user;
    return (
      <div key={user.id} className="user-card-container">
        <div key={user.id} className="manage-card">
          <span className="price-col">
            {user.orders.map((order) => (
              <div key={order.id}>
                <Link
                  to={{
                    pathname: `/manage_users/orders/${order.id}`,
                    state: {
                      vehicles: order.vehicles,
                    },
                  }}
                >
                  <div>{order.id}</div>
                </Link>

                <StatusForm user={user} order={order} />
              </div>
            ))}{" "}
          </span>
        </div>
      </div>
    );
  }
}
