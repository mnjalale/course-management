import courseActionTypes from "../actions/actionTypes/courseActionTypes";
import initialState from "./initialState";

const courseReducer = (state = initialState.courses, action) => {
  switch (action.type) {
    case courseActionTypes.CREATE_COURSE: {
      const newState = [...state, action.course];
      return newState;
    }
    case courseActionTypes.LOAD_COURSES_SUCCESS: {
      return action.courses;
    }
    default:
      return state;
  }
};

export default courseReducer;
