import {
  GOOGLE_AUTH_ASYNC,
  CLEAR_USER_STATE,
  CARD_SEARCH_RESULTS_ASYNC,
  SEARCH_MSG
} from "./types";
import { googleAuthentication } from "../SDK/googleSDK";
import searchCards from "../SDK/searchCards";

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

function cardSerachResultsAsync(cards) {
  return {
    type: CARD_SEARCH_RESULTS_ASYNC,
    cards
  };
}

function cardSearchResults(occupation, name) {
  return dispatch => {
    searchCards.searchCards(occupation, name).then(cards =>
      cards.length === 0
        ? dispatch(
            searchMsg({
              msg: "There are no cards with those search terms."
            })
          )
        : dispatch(cardSerachResultsAsync(cards))
    );
  };
}

function searchMsg(msg) {
  return {
    type: SEARCH_MSG,
    msg
  };
}
export {
  googleAuthAsync,
  googleLogin,
  clearUserState,
  searchMsg,
  cardSearchResults,
  cardSerachResultsAsync
};
