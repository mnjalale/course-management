import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

import appPropTypes from "../../appPropTypes";
import * as authorActions from "../../redux/actions/authorActions";
import * as courseActions from "../../redux/actions/courseActions";
import AuthorList from "./AuthorList";
import Spinner from "../common/Spinner";

const AuthorsPage = props => {
  const [redirectToAddAuthorPage, setRedirectToAddAuthorPage] = useState(false);
  const {
    authors,
    courses,
    deleteAuthor,
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

  const handleDeleteAuthor = async author => {
    try {
      // Check if author has course. If they do, don't delete
      if (courses.some(c => c.authorId === author.id)) {
        toast.error("The author has a course and cannot be deleted!");
        return;
      }

      toast.success("Author deleted.");
      await deleteAuthor(author);
    } catch (error) {
      toast.error(`Delete failed. ${error.message}`, { autoClose: false });
    }
  };

  return (
    <>
      {redirectToAddAuthorPage && <Redirect to="/author" />}

      <h2>Authors</h2>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <button
            className="btn btn-primary add-course"
            style={{ marginBottom: 20 }}
            type="button"
            onClick={() => setRedirectToAddAuthorPage(true)}
          >
            Add Author
          </button>
          <AuthorList authors={authors} onDeleteClick={handleDeleteAuthor} />
        </>
      )}
    </>
  );
};

AuthorsPage.propTypes = {
  authors: appPropTypes.authors.isRequired,
  courses: appPropTypes.courses.isRequired,
  deleteAuthor: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    authors: state.authors,
    courses: state.courses,
    loading: state.apiCallsInProgress > 0
  };
};

const mapDispatchToProps = {
  deleteAuthor: authorActions.deleteAuthor,
  loadAuthors: authorActions.loadAuthors,
  loadCourses: courseActions.loadCourses
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
