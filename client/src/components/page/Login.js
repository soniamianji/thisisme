import React, { Component } from "react";
import GoogleAuthorize from "react-google-authorize";
import googleSDK from "../../SDK/googleSDK";

export default class Login extends Component {
  responseGoogle = response => {
    console.log(response);
    const authCode = response.code;

    console.log(authCode);
    googleSDK.googleAuthentication(authCode, (err, account) => {
      if (err.length == 0) {
        console.log("success");
      } else {
        console.log(err);
      }
    });
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
