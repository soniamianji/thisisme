import Auth from "../modules/Auth";
const sendRequest = require("./sendRequests");
const jwt = require("jsonwebtoken");

const account = {
  email: "",
  name: "",
  id: "",
  img: "",
  accessToken: "",
  userStyle: ""
};

const googleAuthentication = async function(authCode) {
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
      let decoded = jwt.decode(body.id_token);
      console.log(decoded);
      account.email = decoded.email;
      account.name = decoded.name;
      account.id = decoded.id;
      account.img = decoded.img;
      account.userStyle = decoded.userStyle;
      Auth.authenticateUser(JSON.stringify(account));
      break;

    case 201:
      body = await response.json();
      account.accessToken = body.access_token;
      let decodedToken = jwt.decode(body.id_token);
      account.email = decodedToken.email;
      account.name = decodedToken.name;
      account.id = decodedToken.id;
      account.img = decodedToken.img;
      account.userStyle = decodedToken.userStyle;

      Auth.authenticateUser(JSON.stringify(account));

      break;
    case 400:
      body = await response.json();
      break;

    case 500:
      errors = ["backendError"];
      break;

    default:
      errors = ["unknown response code"];
  }

  return account;
};

export { googleAuthentication };
