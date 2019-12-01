import {
  GOOGLE_AUTH_ASYNC,
  CARD_SEARCH_RESULTS_ASYNC,
  SEARCH_MSG,
  JOB_SEARCH_RESULTS_ASYNC,
  USER_CARD_ASYNC,
  CLEAR_SEARCH_RESULT,
  CLEAR_USER,
  JOB_SEARCH_FROM_ARBETS_ASYNC
} from "../actions/types";
import Auth from "../modules/Auth";

const initialState = {
  account: {},
  usercard: {},
  cards: [],
  jobs: [],
  jobsFromAF: [],
  msg: {}
};

//check if the data exist in the LS
if (Auth.isUserAuthenticated()) {
  initialState.account = Auth.getToken();
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GOOGLE_AUTH_ASYNC:
      return {
        ...state,
        cards: [],
        msg: {},
        account: action.account
      };

    case USER_CARD_ASYNC:
      return {
        ...state,
        cards: [],
        msg: {},
        usercard: action.user
      };

    case CARD_SEARCH_RESULTS_ASYNC:
      return {
        ...state,
        msg: {},
        cards: action.cards
      };
    case CLEAR_SEARCH_RESULT:
      return {
        ...state,
        msg: {},
        cards: [],
        jobs: [],
        jobsFromAF: []
      };
    case CLEAR_USER:
      return {
        ...state,
        account: {},
        usercard: {},
      }
    case SEARCH_MSG:
      return {
        ...state,
        cards: [],
        jobs: [],
        msg: action.msg
      };
    case JOB_SEARCH_RESULTS_ASYNC:
      return {
        ...state,
        msg: {},
        jobs: action.jobs
      };
    case JOB_SEARCH_FROM_ARBETS_ASYNC:
      return {
        ...state,
        jobsFromAF: action.jobs
      };
    default:
      return state;
  }
}

export default rootReducer;
