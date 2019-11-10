import { GOOGLE_AUTH_ASYNC } from "../actions/types";

const initialState = {
  result: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GOOGLE_AUTH_ASYNC:
      return {
        ...state,
        result: action.user
      };

    default:
      return state;
  }
}

export default rootReducer;
