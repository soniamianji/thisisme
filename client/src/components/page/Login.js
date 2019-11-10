import React, { Component } from "react";
import GoogleAuthorize from "react-google-authorize";
import googleSDK from "../../SDK/googleSDK";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { googleLogin } from "../../actions/authActions";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  responseGoogle = response => {
    const authCode = response.code;
    console.log(authCode);

    this.props.googleLogin(authCode);
    // googleSDK.googleAuthentication(authCode, (err, account) => {
    //   if (err.length == 0) {
    //     console.log("success");
    //   } else {
    //     console.log(err);
    //   }
    // });
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
export default connect(
  null,
  { googleLogin }
)(Login);
