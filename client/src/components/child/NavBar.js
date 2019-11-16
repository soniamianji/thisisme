import AppBar from "@material-ui/core/AppBar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Auth from "../../modules/Auth";
import { withRouter } from "react-router";
import { clearUserState } from "../../actions/authActions";
import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import { GoogleLogout } from "react-google-login";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }
  componentDidMount() {
    if (this.props.result !== null) {
      this.setState({
        name: this.props.result.name
      });
      console.log(this.props.result.name);
    }
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.result !== this.props.result) {
      this.setState({
        name: this.props.result.name
      });
    }
  }

  loginLogoutHandler = () => {
    if (Auth.isUserAuthenticated()) {
      //then log her out
      Auth.deauthenticateUser();
      // this.props.clearUserState();
      this.setState({ name: "" });
      this.props.history.push("/login");
    } else {
      this.props.history.push("/login");
    }
  };
  render() {
    return (
      <div style={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography style={{ flexGrow: 1 }}></Typography>
            {Auth.isUserAuthenticated() ? (
              <Button color="inherit">{this.state.name}</Button>
            ) : (
                ""
              )}
            {Auth.isUserAuthenticated() ? (
              <GoogleLogout
                clientId="706070333351-ivp0aq5jte2mc2gkre5pkllfikanq8nv.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={this.loginLogoutHandler}
              />
            ) : (
                <Button
                  onClick={this.loginLogoutHandler}
                  style={{ color: "white" }}
                >
                  {Auth.isUserAuthenticated() ? "Logout" : "Login"}
                </Button>
              )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  result: PropTypes.array,
  clearUserState: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  result: state.result
});

export default connect(mapStateToProps, { clearUserState })(withRouter(NavBar));
