const sendRequest = require("./sendRequests");
const jwt = require("jsonwebtoken");
const account = {
  email: "",
  name: "",
  id: "",
  accessToken: ""
};

// //parse userInfo localstorage
const userInfo = JSON.parse(localStorage.getItem("this-is-me-user"));
module.exports.userInfo = userInfo;

module.exports.googleAuthentication = async function(authCode) {
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
    console.log(errors);
    return;
  }
  let errors = [];
  let body;
  switch (response.status) {
    case 200:
      body = await response.json();
      account.accessToken = body.access_token;
      const decoded = jwt.decode(body.id_token);
      account.email = decoded.email;
      account.name = decoded.name;
      account.id = decoded.id;
      localStorage.setItem("this-is-me-user", JSON.stringify(account));
      break;

    case 201:
      body = await response.json();
      account.accessToken = body.access_token;
      decoded = jwt.decode(body.id_token);
      account.email = decoded.email;
      account.name = decoded.name;
      account.id = decoded.id;
      localStorage.setItem("this-is-me-user", JSON.stringify(account));
      break;
    case 400:
      body = await response.json();

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

  return account;
};
