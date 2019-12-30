import types from "../actions/actionTypes/authorActionTypes";
import initialState from "./initialState";

const authors = (state = initialState.authors, action) => {
  switch (action.type) {
    case types.CREATE_AUTHOR_SUCCESS: {
      const newState = [...state, { ...action.author }];
      return newState;
    }
    case types.DELETE_AUTHOR_OPTIMISTIC: {
      const newState = state.filter(author => author.id !== action.author.id);
      return newState;
    }
    case types.LOAD_AUTHOR_SUCCESS: {
      return action.authors;
    }
    case types.UPDATE_AUTHOR_SUCCESS: {
      const newState = state.map(author =>
        author.id === action.author.id ? action.author : author
      );
      return newState;
    }
    default:
      return state;
  }
};

export default authors;
