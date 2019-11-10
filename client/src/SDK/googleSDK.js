const sendRequest = require("./sendRequests");
const jwtDecode = require("jwt-decode");

const account = {
  email: "",
  name: "",
  accessToken: ""
};

// //parse info localstorage
const userInfo = JSON.parse(localStorage.getItem("this-is-me-user"));
module.exports.userInfo = userInfo;

module.exports.googleAuthentication = async function(authCode, callback) {
  let response;
  let bodyTosend = {
    code: authCode,
    redirect_uri: "postmessage"
  };

  try {
    response = await sendRequest.sendRequest(
      "POST",
      "/googleRoute",
      bodyTosend
    );
  } catch (errors) {
    callback(errors);
    return;
  }

  let errors = [];
  let body;

  switch (response.status) {
    case 200:
      body = await response.body;

      // account.accessToken = body.access_token;
      // const payload = jwtDecode(body.id_token);
      // account.email = payload.email;
      // account.name = payload.username;
      // account.idToken = payload;
      // localStorage.setItem("this-is-me-user", JSON.stringify(account));
      break;

    case 201:
      body = await response.body;
      break;
    case 400:
      body = await response.body;

      switch (body.error) {
        default:
          errors = [body.error];
      }
    case 500:
      errors = ["backendError"];
      break;

    default:
      errors = ["unknown response code"];
  }

  callback(errors, account);
};
