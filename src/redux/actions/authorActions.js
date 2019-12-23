import authorActionTypes from "./actionTypes/authorActionTypes";
import * as authorApi from "../../api/authorApi";
import * as apiStatusActions from "./apiStatusActions";

const loadAuthorsSuccess = authors => {
  return {
    type: authorActionTypes.LOAD_AUTHOR_SUCCESS,
    authors
  };
};

export const createAuthor = () => {};

export const loadAuthors = () => {
  return async dispatch => {
    try {
      dispatch(apiStatusActions.beginApiCall());
      const authors = await authorApi.getAuthors();
      return dispatch(loadAuthorsSuccess(authors));
    } catch (error) {
      dispatch(apiStatusActions.apiCallError());
      throw new Error(error);
    }
  };
};
