import types from "../actions/actionTypes/apiStatusActionTypes";
import initialState from "./initialState";

const actionTypeEndsInSuccess = type => {
  return type.substring(type.length - 8) === "_SUCCESS";
};

const apiCallsStatusReducer = (
  state = initialState.apiCallsInProgress,
  action
) => {
  if (action.type === types.BEGIN_API_CALL) {
    const newState = state + 1;
    return newState;
  }

  if (
    action.type === types.API_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)
  ) {
    const newState = state - 1;
    return newState;
  }

  return state;
};

export default apiCallsStatusReducer;
