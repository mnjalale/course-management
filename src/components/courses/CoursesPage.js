import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

import appPropTypes from "../../appPropTypes";
import * as authorActions from "../../redux/actions/authorActions";
import * as courseActions from "../../redux/actions/courseActions";
import CourseList from "./CourseList";
import Spinner from "../common/Spinner";

const CoursesPage = props => {
  const [redirectToAddCoursePage, setRedirectToAddCoursePage] = useState(false);
  const {
    authors,
    courses,
    deleteCourse,
    loadAuthors,
    loadCourses,
    loading
  } = props;

  useEffect(() => {
    if (authors.length === 0 && !loading) {
      loadAuthors();
    }

    if (courses.length === 0 && !loading) {
      loadCourses();
    }
  }, [authors, courses, loadAuthors, loadCourses, loading]);

  const handleDeleteCourse = async course => {
    try {
      toast.success("Course deleted.");
      await deleteCourse(course);
    } catch (error) {
      toast.error(`Delete failed. ${error.message}`, { autoClose: false });
    }
  };

  return (
    <>
      {redirectToAddCoursePage && <Redirect to="/course" />}

      <h2>Courses</h2>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <button
            className="btn btn-primary add-course"
            style={{ marginBottom: 20 }}
            type="button"
            onClick={() => setRedirectToAddCoursePage(true)}
          >
            Add Course
          </button>
          <CourseList courses={courses} onDeleteClick={handleDeleteCourse} />
        </>
      )}
    </>
  );
};

CoursesPage.propTypes = {
  authors: appPropTypes.authors.isRequired,
  courses: appPropTypes.courses.isRequired,
  deleteCourse: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    authors: state.authors,
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(a => a.id === course.authorId).name
            };
          }),
    loading: state.apiCallsInProgress > 0
  };
};

const mapDispatchToProps = {
  deleteCourse: courseActions.deleteCourse,
  loadAuthors: authorActions.loadAuthors,
  loadCourses: courseActions.loadCourses
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
