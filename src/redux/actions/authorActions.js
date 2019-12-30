import authorActionTypes from "./actionTypes/authorActionTypes";
import * as authorApi from "../../api/authorApi";
import * as apiStatusActions from "./apiStatusActions";

const loadAuthorsSuccess = authors => {
  return {
    type: authorActionTypes.LOAD_AUTHOR_SUCCESS,
    authors
  };
};

export const createAuthorSuccess = author => {
  return {
    type: authorActionTypes.CREATE_AUTHOR_SUCCESS,
    author
  };
};

export const updateAuthorSuccess = author => {
  return {
    type: authorActionTypes.UPDATE_AUTHOR_SUCCESS,
    author
  };
};

export const saveAuthor = author => {
  return async dispatch => {
    try {
      dispatch(apiStatusActions.beginApiCall());
      const savedAuthor = await authorApi.saveAuthor(author);

      return author.id
        ? dispatch(updateAuthorSuccess(savedAuthor))
        : dispatch(createAuthorSuccess(savedAuthor));
    } catch (error) {
      dispatch(apiStatusActions.apiCallError());
      throw new Error(error.message);
    }
  };
};

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

const deleteAuthorOptimistic = author => {
  return {
    type: authorActionTypes.DELETE_AUTHOR_OPTIMISTIC,
    author
  };
};

export const deleteAuthor = author => {
  return async dispatch => {
    try {
      dispatch(deleteAuthorOptimistic(author));
      return authorApi.deleteAuthor(author.id);
    } catch (error) {
      throw new Error(error.message);
    }
  };
};
