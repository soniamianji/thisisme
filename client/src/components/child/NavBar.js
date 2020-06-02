import AppBar from "@material-ui/core/AppBar";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Auth from "../../modules/Auth";
import { withRouter } from "react-router";
import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import { GoogleLogout } from "react-google-login";
import { NavLink } from "react-router-dom";
import { clearUser } from "../../actions/authActions"
import styled from "styled-components";


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      anchorEl: null,
      open: false
    };
  }

  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
      open: true
    })
  };

  handleClose = () => {
    this.setState({
      open: false
    })

  }

  componentDidMount() {
    if (this.props.account !== null) {
      this.setState({
        name: this.props.account.name
      });
    }
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.account !== this.props.account) {
      this.setState({
        name: this.props.account.name
      });
    }
  }

  loginLogoutHandler = () => {
    if (Auth.isUserAuthenticated()) {
      //then log her out
      Auth.deauthenticateUser();
      this.props.clearUser();
      localStorage.removeItem("jobs");
      localStorage.removeItem("profilejobs");
      this.setState({ name: "" });
      this.props.history.push("/login");
    } else {
      this.props.history.push("/login");
    }
  };
  render() {
    const StyledButton = styled(Button)`
    color: white;
    text-transform: none;
    padding: 11px;
  `;

    return (
      <div style={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: "#272727" }} elevation={0} >

          <Toolbar>
            <Button color="inherit" ><NavLink exact to="/" activeClassName="active" style={{ textDecoration: "none", color: "white", marginRight: '0.5rem' }} >Jobs<span></span></NavLink></Button>
            <Button color="inherit" ><NavLink to="/searchusers" activeClassName="active" style={{ textDecoration: "none", color: "white", marginRight: '0.5rem' }}> Users<span></span></NavLink></Button>

            <Typography style={{ flexGrow: 1 }}></Typography>
            {Auth.isUserAuthenticated() ? (
              <Button color="inherit" ><NavLink to="/profile" activeClassName="active" style={{ textDecoration: "none", color: "white" }} >{this.state.name}<span></span></NavLink></Button>
            ) : (
                ""
              )}
            {Auth.isUserAuthenticated() ? (
              <GoogleLogout
                clientId="706070333351-ivp0aq5jte2mc2gkre5pkllfikanq8nv.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={this.loginLogoutHandler}
                render={renderProps => {
                  return (
                    <StyledButton type="button" style={{ color: "white" }} onClick={renderProps.onClick}>
                      <i
                        className="fab fa-google"
                        style={{ paddingRight: 5 }}
                      ></i>
                      <span> | Logout</span>
                    </StyledButton>
                  );
                }}
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
        </AppBar >
      </div >
    );
  }
}

NavBar.propTypes = {
  account: PropTypes.object,
};

const mapStateToProps = state => ({
  account: state.account
});

export default connect(mapStateToProps, { clearUser })(withRouter(NavBar));
