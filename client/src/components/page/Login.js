import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { googleLogin } from "../../actions/authActions";
import Auth from "../../modules/Auth";
import { withRouter } from "react-router";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Paper } from "@material-ui/core";
import styled from "styled-components";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: Auth.isUserAuthenticated()
    }
  }
  componentDidMount() {
    if (Auth.isUserAuthenticated()) {
      this.props.history.push("/profile");
    }
  }

  responseGoogle = async response => {
    if (response.code) {
      const authCode = response.code;
      this.props.googleLogin(authCode, () => {
        this.props.history.push("/profile");
      });
    } else {
      console.log(response);
    }
  };

  render() {
    const StyledPaper = styled(Paper)`
      padding: 38px;
    `;
    const StyledButton = styled(Button)`
      background-color: red;
      color: white;
      text-transform: none;
      width: 250px;
      padding: 11px;
    `;

    return (
      <div style={{ textAlign: "center" }}>
        <Box style={{ width: 400 }} mx="auto" mt="44px">
          <Box style={{ padding: 11 }}>
            <Typography variant="h5" component="h6" style={{ color: "white" }}>
              Sign in to continue
            </Typography>
          </Box>
          <StyledPaper>
            <AccountCircleIcon style={{ fontSize: 150, opacity: 0.5 }} />
            <Box style={{ paddingTop: 22 }}>
              <GoogleLogin
                clientId="706070333351-ivp0aq5jte2mc2gkre5pkllfikanq8nv.apps.googleusercontent.com"
                buttonText="Continue with Google"
                onSuccess={this.responseGoogle}
                responseType="code"
                onFailure={this.responseGoogle}
                accessType="offline"
                render={renderProps => {
                  return (
                    <StyledButton type="button" style={{ color: "white", backgroundColor: "red" }} onClick={renderProps.onClick}>
                      <i
                        className="fab fa-google"
                        style={{ paddingRight: 5 }}
                      ></i>
                      <span> | Continue with Google</span>
                    </StyledButton>
                  );
                }}
              />
              <Button
                size="small"
                style={{ textTransform: "none", marginTop: 18 }}
              >
                Can't Login?
              </Button>
            </Box>
          </StyledPaper>
        </Box>
      </div>
    );
  }
}

Login.propTypes = {
  googleLogin: PropTypes.func.isRequired
};
export default connect(null, { googleLogin })(withRouter(Login));
