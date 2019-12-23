import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import CourseForm from "./CourseForm";
import appPropTypes from "../../appPropTypes";
import * as authorActions from "../../redux/actions/authorActions";
import * as courseActions from "../../redux/actions/courseActions";
import Spinner from "../common/Spinner";

const newCourse = {
  id: null,
  title: "",
  authorId: null,
  category: ""
};

const initialError = {
  authorId: "",
  category: "",
  title: ""
};

const ManageCoursePage = props => {
  const {
    authors,
    course: initialCourse,
    courses,
    history,
    loadAuthors,
    loadCourses,
    loading,
    saveCourse
  } = props;

  const [course, setCourse] = useState({ ...initialCourse });
  const [errors, setErrors] = useState({ ...initialError });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0 && !loading) {
      loadCourses();
    } else {
      setCourse(initialCourse);
    }

    if (authors.length === 0 && !loading) {
      loadAuthors();
    }
  }, [authors, courses, initialCourse, loadAuthors, loadCourses, loading]);

  const handleChange = event => {
    const { name: property, value } = event.target;
    const updatedCourse = {
      ...course,
      [property]: property === "authorId" ? parseInt(value, 10) : value
    };
    setCourse(updatedCourse);
  };

  const formIsValid = () => {
    const { authorId, category, title } = course;

    const validationError = {};

    if (!authorId) {
      validationError.authorId = "Author is required.";
    }

    if (!category || !category.trim()) {
      validationError.category = "Category is required.";
    }

    if (!title || !title.trim()) {
      validationError.title = "Title is required.";
    }

    setErrors(validationError);

    return Object.keys(validationError).length === 0;
  };

  const handleSave = event => {
    event.preventDefault();

    if (!formIsValid()) {
      return;
    }

    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success("Course saved successfully.");
        history.push("/courses");
      })
      .catch(error => {
        setErrors({ onSave: error.message });
      })
      .finally(() => {
        setSaving(false);
      });
  };

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      authors={authors}
      course={course}
      errors={errors}
      saving={saving}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
};

ManageCoursePage.propTypes = {
  authors: appPropTypes.authors.isRequired,
  course: appPropTypes.course.isRequired,
  courses: appPropTypes.courses.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  saveCourse: PropTypes.func.isRequired
};

const getCourseBySlug = (courses, slug) => {
  return courses.find(c => c.slug === slug) || null;
};

const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.match.params;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;

  return {
    authors: state.authors,
    course,
    courses: state.courses,
    loading: state.apiCallsInProgress > 0
  };
};

const mapDispatchToProps = {
  loadAuthors: authorActions.loadAuthors,
  loadCourses: courseActions.loadCourses,
  saveCourse: courseActions.saveCourse
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
