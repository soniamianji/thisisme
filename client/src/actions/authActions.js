import { GOOGLE_AUTH_ASYNC } from "./types";
import googleSDK from "../SDK/googleSDK";

function googleAuthAsync(user) {
  return {
    type: GOOGLE_AUTH_ASYNC,
    user
  };
}
function googleLogin(authCode) {
  return dispatch => {
    googleSDK
      .googleAuthentication(authCode)
      .then(body => dispatch(googleAuthAsync(body)));
  };
}

export { googleAuthAsync, googleLogin };
