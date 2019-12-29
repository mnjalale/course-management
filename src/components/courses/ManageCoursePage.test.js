/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
import React from "react";
import { mount } from "enzyme";
import { authors, courses, newCourse } from "../../../tools/mockData";
import { ManageCoursePage } from "./ManageCoursePage";

const render = args => {
  const defaultProps = {
    authors,
    courses,
    history: { push: jest.fn() },
    saveCourse: jest.fn(),
    loadAuthors: jest.fn(),
    loadCourses: jest.fn(),
    course: newCourse,
    match: {}
  };
  const props = { ...defaultProps, ...args };
  return mount(<ManageCoursePage {...props} />);
};

it("sets error when attempting to save an empty title field", () => {
  const wrapper = render();
  wrapper.find("form").simulate("submit");
  const error = wrapper.find(".alert").first();
  expect(error.text()).toBe("Title is required.");
});
