import { GOOGLE_AUTH_ASYNC, CLEAR_USER_STATE } from "../actions/types";
import Auth from "../modules/Auth";

const initialState = {
  result: []
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
        result: action.user
      };
    case CLEAR_USER_STATE:
      return {
        ...state,
        result: action.user
      };

    default:
      return state;
  }
}

export default rootReducer;
