/* eslint-disable no-undef */
import fetchMock from "fetch-mock";
import configureMockstroe from "redux-mock-store";
import thunk from "redux-thunk";
import * as courseActions from "./courseActions";
import apiStatusActionTypes from "./actionTypes/apiStatusActionTypes";
import courseActionTypes from "./actionTypes/courseActionTypes";
import { courses } from "../../../tools/mockData";

// Test an async action
const middleware = [thunk];
const mockStore = configureMockstroe(middleware);

describe("Async Actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe("Load Courses Thunk", () => {
    it("should create BEGIN_API_CALL and LOAD_COURSES_SUCCESS when loading courses", () => {
      fetchMock.mock("*", {
        body: courses,
        headers: { "content-type": "application/json" }
      });

      const expectedActions = [
        { type: apiStatusActionTypes.BEGIN_API_CALL },
        { type: courseActionTypes.LOAD_COURSES_SUCCESS, courses }
      ];

      const store = mockStore({ courses: [] });
      return store.dispatch(courseActions.loadCourses()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

describe("createCourseSuccess", () => {
  it("should create a CREATE_COURSE_SUCCESS action", () => {
    // arrange
    const course = courses[0];
    const expectedAction = {
      type: courseActionTypes.CREATE_COURSE_SUCCESS,
      course
    };

    // act
    const action = courseActions.createCourseSuccess(course);

    // assert
    expect(action).toEqual(expectedAction);
  });
});
