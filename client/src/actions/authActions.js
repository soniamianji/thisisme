import {
  GOOGLE_AUTH_ASYNC,
  USER_CARD_ASYNC
} from "./types";
import { googleAuthentication } from "../SDK/googleSDK";
import { getUserCard } from "../SDK/userCards";

function googleAuthAsync(account) {
  return {
    type: GOOGLE_AUTH_ASYNC,
    account
  };
}

function googleLogin(authCode, cb) {
  return dispatch => {
    googleAuthentication(authCode).then(account => {
      cb();
      dispatch(googleAuthAsync(account))
    }
    );
  };
}

function getUserCardAsync(user) {
  return {
    type: USER_CARD_ASYNC,
    user
  }
}

function fetchUserCard(id) {
  return dispatch => {
    getUserCard(id).then(user => {
      dispatch(getUserCardAsync(user))
    })
  }
}





export {
  googleAuthAsync,
  googleLogin,
  getUserCardAsync,
  fetchUserCard
};
