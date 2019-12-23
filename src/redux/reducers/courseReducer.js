import types from "../actions/actionTypes/courseActionTypes";
import initialState from "./initialState";

const courseReducer = (state = initialState.courses, action) => {
  switch (action.type) {
    case types.CREATE_COURSE_SUCCESS: {
      const newState = [...state, { ...action.course }];
      return newState;
    }
    case types.DELETE_COURSE_OPTIMISTIC: {
      const newState = state.filter(course => course.id !== action.course.id);
      return newState;
    }
    case types.LOAD_COURSES_SUCCESS: {
      return action.courses;
    }
    case types.UPDATE_COURSE_SUCCESS: {
      const newState = state.map(course =>
        course.id === action.course.id ? action.course : course
      );
      return newState;
    }
    default:
      return state;
  }
};

export default courseReducer;
