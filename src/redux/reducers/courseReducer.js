import types from "../actions/actionTypes/courseActionTypes";
import initialState from "./initialState";

const sortCourses = (a, b) => (a.title > b.title ? 1 : -1);

const courseReducer = (state = initialState.courses, action) => {
  switch (action.type) {
    case types.CREATE_COURSE_SUCCESS: {
      const newState = [...state, { ...action.course }];
      newState.sort(sortCourses);
      return newState;
    }
    case types.DELETE_COURSE_OPTIMISTIC: {
      const newState = state.filter(course => course.id !== action.course.id);
      newState.sort(sortCourses);
      return newState;
    }
    case types.LOAD_COURSES_SUCCESS: {
      const newState = action.courses;
      newState.sort(sortCourses);
      return newState;
    }
    case types.UPDATE_COURSE_SUCCESS: {
      const newState = state.map(course =>
        course.id === action.course.id ? action.course : course
      );
      newState.sort(sortCourses);
      return newState;
    }
    default:
      return state;
  }
};

export default courseReducer;
