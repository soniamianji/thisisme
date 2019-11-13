import { GOOGLE_AUTH_ASYNC, CLEAR_USER_STATE } from "./types";
import { googleAuthentication } from "../SDK/googleSDK";

function googleAuthAsync(user) {
  console.log("got it");
  console.log(user);
  return {
    type: GOOGLE_AUTH_ASYNC,
    user
  };
}
function googleLogin(authCode) {
  console.log("dispatching");
  return dispatch => {
    googleAuthentication(authCode).then(body =>
      dispatch(googleAuthAsync(body))
    );
  };
}
function clearUserState() {
  console.log("clearing");
  let user = [];
  return {
    type: CLEAR_USER_STATE,
    user
  };
}
export { googleAuthAsync, googleLogin, clearUserState };
