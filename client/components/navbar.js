import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export function ButtonAppBar({ handleClick, isLoggedIn }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}
          component={Link}
          to="/home">
            GraceHopper Motors
          </Typography>

          <Button color="inherit" component={Link} to="/vehicles">
            All Vehicles
          </Button>

          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>

          <Button color="inherit" component={Link} to="/signup">
            Sign Up
          </Button>

          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            component={Link}
            to="/cart"
          >
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};
const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(ButtonAppBar);
