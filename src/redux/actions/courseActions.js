import courseActionTypes from "./actionTypes/courseActionTypes";
import * as courseApi from "../../api/courseApi";
import * as apiStatusActions from "./apiStatusActions";

const loadCoursesSuccess = courses => {
  return {
    type: courseActionTypes.LOAD_COURSES_SUCCESS,
    courses
  };
};

export const loadCourses = () => {
  return async dispatch => {
    try {
      dispatch(apiStatusActions.beginApiCall());
      const courses = await courseApi.getCourses();
      return dispatch(loadCoursesSuccess(courses));
    } catch (error) {
      dispatch(apiStatusActions.apiCallError());
      throw new Error(error.message);
    }
  };
};

export const createCourseSuccess = course => {
  return {
    type: courseActionTypes.CREATE_COURSE_SUCCESS,
    course
  };
};

export const updateCourseSuccess = course => {
  return {
    type: courseActionTypes.UPDATE_COURSE_SUCCESS,
    course
  };
};

export const saveCourse = course => {
  return async dispatch => {
    try {
      dispatch(apiStatusActions.beginApiCall());
      const savedCourse = await courseApi.saveCourse(course);

      return course.id
        ? dispatch(updateCourseSuccess(savedCourse))
        : dispatch(createCourseSuccess(savedCourse));
    } catch (error) {
      dispatch(apiStatusActions.apiCallError());
      throw new Error(error.message);
    }
  };
};

const deleteCourseOptimistic = course => {
  return {
    type: courseActionTypes.DELETE_COURSE_OPTIMISTIC,
    course
  };
};

export const deleteCourse = course => {
  return async dispatch => {
    try {
      dispatch(deleteCourseOptimistic(course));
      return courseApi.deleteCourse(course.id);
    } catch (error) {
      throw new Error(error.message);
    }
  };
};
