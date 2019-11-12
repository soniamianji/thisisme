import { GOOGLE_AUTH_ASYNC } from "./types";
import { googleAuthentication } from "../SDK/googleSDK";

function googleAuthAsync(user) {
  return {
    type: GOOGLE_AUTH_ASYNC,
    user
  };
}
function googleLogin(authCode) {
  return dispatch => {
    googleAuthentication(authCode).then(body =>
      dispatch(googleAuthAsync(body))
    );
  };
}

export { googleAuthAsync, googleLogin };
