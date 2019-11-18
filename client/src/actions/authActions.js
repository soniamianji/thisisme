import {
  GOOGLE_AUTH_ASYNC,
  CARD_SEARCH_RESULTS_ASYNC,
  SEARCH_MSG,
  JOB_SEARCH_RESULTS_ASYNC,
  USER_CARD_ASYNC
} from "./types";
import { googleAuthentication } from "../SDK/googleSDK";
import searchCards from "../SDK/searchCards";
import { getUserCard } from "../SDK/userCards";
import { githubBaseUrl, description, location } from "../constantNames/api"

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
  JobSearchResultsAsync,
  getUserCardAsync,
  fetchUserCard
};
