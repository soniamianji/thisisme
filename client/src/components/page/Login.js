import React, { Component } from "react";
import GoogleAuthorize from "react-google-authorize";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { googleLogin } from "../../actions/authActions";
import Auth from "../../modules/Auth";
import { withRouter } from "react-router";

class Login extends Component {
  componentDidMount() {
    if (Auth.isUserAuthenticated()) {
      this.props.history.push("/");
    }
  }

  responseGoogle = response => {
    const authCode = response.code;
    console.log(authCode);
    this.props.googleLogin(authCode);
    this.props.history.push("/");
    //set the state of navbar comp to name
  };

  render() {
    return (
      <div>
        <h2>Please Login </h2>
        <GoogleAuthorize
          clientId="706070333351-ivp0aq5jte2mc2gkre5pkllfikanq8nv.apps.googleusercontent.com"
          buttonText="Continue with Google"
          onSuccess={this.responseGoogle}
          responseType="code"
          onFailure={this.responseGoogle}
        />
      </div>
    );
  }
}

Login.propTypes = {
  googleLogin: PropTypes.func.isRequired
};
export default connect(null, { googleLogin })(withRouter(Login));
