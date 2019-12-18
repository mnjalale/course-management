import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import propTypes from "../../modelPropTypes";

import * as authorActions from "../../redux/actions/authorActions";
import * as courseActions from "../../redux/actions/courseActions";
import CourseList from "./CourseList";

const CoursesPage = props => {
  const { authors, courses, actions } = props;

  useEffect(() => {
    if (courses.length === 0) {
      actions.loadCourses();
    }

    if (authors.length === 0) {
      actions.loadAuthors();
    }
  }, [authors, courses, actions]);

  return (
    <>
      <h2>Courses</h2>
      <CourseList courses={courses} />
    </>
  );
};

CoursesPage.propTypes = {
  authors: propTypes.authors.isRequired,
  courses: propTypes.courses.isRequired,
  actions: PropTypes.shape({
    loadAuthors: PropTypes.func.isRequired,
    loadCourses: PropTypes.func.isRequired
  }).isRequired
};

const mapStateToProps = state => {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(a => a.id === course.authorId).name
            };
          }),
    authors: state.authors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch)
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
