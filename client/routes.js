import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/home";
import UserHome from "./components/userHome";
import SingleVehicleScreen from "./components/SingleVehicleScreen";
import { me } from "./store";
import AllVehiclesScreen from "./components/AllVehiclesScreen";
import Cart from "./components/Cart";
import ManageVehicles from "./components/admin/ManageVehicles";
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;

    return (
      <div>
        <Switch>
          <Route exact path="/" exact component={Home} />
          <Route path="/Home" exact component={Home} />
          <Route path="/login" component={Login} />
          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
              {isLoggedIn && isAdmin && (
                <Switch>
                  {/* Routes placed here are only available after logging in */}
                  <Route path="/home" component={UserHome} />
                  <Route path="/vehicles" component={AllVehiclesScreen} />
                  <Route path="/manage_vehicles" component={ManageVehicles} />
                  <Route path="/users" component={AllVehiclesScreen} />
                </Switch>
              )}
              <Route
                exact
                path="/vehicles/:id"
                component={SingleVehicleScreen}
              />
              <Route path="/vehicles" component={AllVehiclesScreen} />
              <Route path="/cart" component={Cart} />
            </Switch>
          )}

          <Route path="/signup" component={Signup} />
          <Route exact path="/vehicles/:id" component={SingleVehicleScreen} />
          <Route path="/vehicles" component={AllVehiclesScreen} />
          <Route path="/cart" component={Cart} />
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
