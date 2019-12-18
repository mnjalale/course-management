import courseActionTypes from "./actionTypes/courseActionTypes";
import * as courseApi from "../../api/courseApi";

export const createCourse = course => {
  return {
    type: courseActionTypes.CREATE_COURSE,
    course
  };
};

const loadCoursesSuccess = courses => {
  return {
    type: courseActionTypes.LOAD_COURSES_SUCCESS,
    courses
  };
};

export const loadCourses = () => {
  return async dispatch => {
    try {
      const courses = await courseApi.getCourses();
      return dispatch(loadCoursesSuccess(courses));
    } catch (error) {
      throw new Error(error.message);
    }
  };
};
