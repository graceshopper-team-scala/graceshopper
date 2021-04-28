import React from "react";
import { connect } from "react-redux";
import { fetchUsers, deleteUser } from "../../store/allUsers";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ManageSingleUserForm from "./ManageSingleUserForm";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
  async handleComplete(orderId) {
    await axios.put(`/api/orders/${orderId}/complete`);
  }

  render() {
    const users = this.props.users;
    return (
      <div>
        <div className="manage-vehicle-header">
          <p className="v-header">User</p>
          <p className="qty-header">Order</p>
          <p className="p-header">Status</p>
        </div>
        <div className="manage-users-table">
          {users.map((user) => (
            <div key={user.id} className="user-accordion">
              <Accordion className="accordion-main">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className="accordion-arrow" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{user.username}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ManageSingleUserForm
                    user={user}
                    deleteUser={this.handleDelete}
                  />
                </AccordionDetails>
              </Accordion>
              <div>
                {" "}
                <Button
                  variant="danger"
                  onClick={() => this.handleDelete(user.id)} ///
                >
                  {" "}
                  <i className="fas fa-trash"></i>{" "}
                </Button>
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
