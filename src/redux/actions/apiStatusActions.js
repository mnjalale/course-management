import types from "./actionTypes/apiStatusActionTypes";

export const apiCallError = () => {
  return {
    type: types.API_CALL_ERROR
  };
};

export const beginApiCall = () => {
  return {
    type: types.BEGIN_API_CALL
  };
};
