import React, { Component } from 'react';
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";


export default class StatusForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        status: this.props.order.status
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  async handleSubmit(evt){
    evt.preventDefault();
    let newStatus;
    if(this.state.status==='pending') newStatus="completed"
    else newStatus="pending"
    await axios.put(`/api/orders/${this.props.user.id}/complete`)
    await this.setState({
        status: newStatus
    })
}

  

  render() {
    console.log(this.props)
    const user = this.props.user
    const order = this.props.order
    return (
        <form onSubmit={this.handleSubmit}>
        <input name = "status" value={this.state.status} />
        <button type="submit">Update Status</button>
        </form>
    );
  }
}


