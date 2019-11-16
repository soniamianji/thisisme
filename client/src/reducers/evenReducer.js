import {
  GOOGLE_AUTH_ASYNC,
  CARD_SEARCH_RESULTS_ASYNC,
  SEARCH_MSG
} from "../actions/types";
import Auth from "../modules/Auth";

const initialState = {
  result: [],
  cards: [],
  msg: {}
};

//check if the data exist in the LS
if (Auth.isUserAuthenticated()) {
  initialState.result = Auth.getToken();
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GOOGLE_AUTH_ASYNC:
      return {
        ...state,
        cards: [],
        msg: {},
        result: action.user
      };

    case CARD_SEARCH_RESULTS_ASYNC:
      return {
        ...state,
        msg: {},
        cards: action.cards
      };
    case SEARCH_MSG:
      return {
        ...state,
        cards: [],
        msg: action.msg
      };
    default:
      return state;
  }
}

export default rootReducer;
