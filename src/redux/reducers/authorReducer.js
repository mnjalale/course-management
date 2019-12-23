import types from "../actions/actionTypes/authorActionTypes";
import initialState from "./initialState";

const authors = (state = initialState.authors, action) => {
  switch (action.type) {
    case types.LOAD_AUTHOR_SUCCESS:
      return action.authors;
    default:
      return state;
  }
};

export default authors;
