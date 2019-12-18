import authorActionTypes from "./actionTypes/authorActionTypes";
import * as authorApi from "../../api/authorApi";

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
      const authors = await authorApi.getAuthors();
      return dispatch(loadAuthorsSuccess(authors));
    } catch (error) {
      throw new Error(error);
    }
  };
};
