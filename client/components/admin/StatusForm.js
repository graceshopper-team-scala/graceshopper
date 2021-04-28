import React, { Component } from "react";
import axios from "axios";

export default class StatusForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.order.status,
    };

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
    let newStatus;
    if (this.state.status === "pending") newStatus = "completed";
    else newStatus = "pending";
    const token = window.localStorage.getItem("token");
    await axios.put(
      `/api/orders/admin/${this.props.order.id}/complete`,
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );
    await this.setState({
      status: newStatus,
    });
  }

  render() {
    console.log(this.props);
    const completed = this.state.status === "completed";
    return (
      <form onSubmit={this.handleSubmit}>
        <input name="status" value={this.state.status} />
        <button type="submit">Mark complete</button>
        {/* <div>
            {completed ?
            <span>
                <button disabled type="submit">Mark complete</button>
            </span>
            :
            <span>
            <button type="submit">Mark complete</button>
            </span>

            }
        
        </div> */}
      </form>
    );
  }
}
