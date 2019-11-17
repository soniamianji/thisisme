import {
  GOOGLE_AUTH_ASYNC,
  CARD_SEARCH_RESULTS_ASYNC,
  SEARCH_MSG,
  JOB_SEARCH_RESULTS_ASYNC
} from "./types";
import { googleAuthentication } from "../SDK/googleSDK";
import searchCards from "../SDK/searchCards";
import { githubBaseUrl, description, location } from "../constantNames/api"

function googleAuthAsync(user) {
  return {
    type: GOOGLE_AUTH_ASYNC,
    user
  };
}

function googleLogin(authCode, cb) {
  return dispatch => {
    googleAuthentication(authCode).then(body => {
      cb();
      dispatch(googleAuthAsync(body))
    }
    );
  };
}

function cardSerachResultsAsync(cards) {
  return {
    type: CARD_SEARCH_RESULTS_ASYNC,
    cards
  };
}

function cardSearchResults(occupation, name, location) {
  return dispatch => {
    searchCards.searchCards(occupation, name, location).then(cards =>
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

function JobSearchResultsAsync(jobs) {
  console.log(jobs)
  return {
    type: JOB_SEARCH_RESULTS_ASYNC,
    jobs
  }
}

function JobSearchResults(desc, loc) {
  return dispatch => {
    fetch(githubBaseUrl + description + desc + location + loc, {
      headers: {
        Accept: "application/json"
      }
    }).then(res => res.json()).then(jobs =>
      jobs.length === 0
        ? dispatch(
          searchMsg({
            msg: "There are no jobs with those search terms."
          })
        )
        :
        dispatch(JobSearchResultsAsync(jobs))
    )
  }
}




export {
  googleAuthAsync,
  googleLogin,
  searchMsg,
  cardSearchResults,
  cardSerachResultsAsync,
  JobSearchResults,
  JobSearchResultsAsync
};
