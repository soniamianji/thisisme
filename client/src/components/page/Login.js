import React, { Component } from "react";
import GoogleAuthorize from "react-google-authorize";

export default class Login extends Component {
  responseGoogle = response => {
    console.log(response);
  };

  render() {
    return (
      <div>
        <h2>Please Login </h2>
        <GoogleAuthorize
          clientId="706070333351-ivp0aq5jte2mc2gkre5pkllfikanq8nv.apps.googleusercontent.com"
          buttonText="Continue with Google"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
        />
      </div>
    );
  }
}
