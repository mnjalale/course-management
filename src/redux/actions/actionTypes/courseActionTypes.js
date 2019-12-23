const CREATE_COURSE_SUCCESS = "CREATE_COURSE_SUCCESS";
const LOAD_COURSES_SUCCESS = "LOAD_COURSES_SUCCESS";
const UPDATE_COURSE_SUCCESS = "UPDATE_COURSE_SUCCESS";

// By convention, actions that end in "_SUCCESS" are assumed to have been the result of a completed
// API call. But since we are doing an optimistic delete, we're hiding loading state.
// So this action name deliberately omits the "_SUCCESS" suffix.
// If it had one, our apiCallsInProgress counter would be decremented below zero
// because we're not incrementing the number of apiCallInProgress when the delete request begins.
const DELETE_COURSE_OPTIMISTIC = "DELETE_COURSE_OPTIMISTIC";

export default {
  CREATE_COURSE_SUCCESS,
  DELETE_COURSE_OPTIMISTIC,
  LOAD_COURSES_SUCCESS,
  UPDATE_COURSE_SUCCESS
};

// Note about optimistic actions
