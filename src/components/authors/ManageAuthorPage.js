import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

import AuthorForm from "./AuthorForm";
import appPropTypes from "../../appPropTypes";
import * as authorActions from "../../redux/actions/authorActions";
import Spinner from "../common/Spinner";

const newAuthor = {
  id: null,
  name: ""
};

const initialError = {
  name: ""
};

const ManageAuthorPage = props => {
  const {
    author: initialAuthor,
    authors,
    history,
    loadAuthors,
    loading,
    saveAuthor
  } = props;

  const [author, setAuthor] = useState({ ...initialAuthor });
  const [errors, setErrors] = useState({ ...initialError });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (authors.length === 0 && !loading) {
      loadAuthors();
    } else {
      setAuthor(initialAuthor);
    }
  }, [authors, initialAuthor, loadAuthors, loading]);

  const handleChange = event => {
    const { name: property, value } = event.target;
    const updatedAuthor = {
      ...author,
      [property]: value
    };
    setAuthor(updatedAuthor);
  };

  const formIsValid = () => {
    const { name } = author;

    const validationError = {};

    if (!name) {
      validationError.name = "Name is required.";
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
    saveAuthor(author)
      .then(() => {
        toast.success("Author saved successfully.");
        history.push("/authors");
      })
      .catch(error => {
        setErrors({ onSave: error.message });
      })
      .finally(() => {
        setSaving(false);
      });
  };

  return authors.length === 0 ? (
    <Spinner />
  ) : (
    <AuthorForm
      author={author}
      errors={errors}
      saving={saving}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
};

ManageAuthorPage.propTypes = {
  author: appPropTypes.author.isRequired,
  authors: appPropTypes.authors.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  saveAuthor: PropTypes.func.isRequired
};

const getAuthorById = (authors, id) => {
  return authors.find(c => c.id === parseInt(id, 10)) || null;
};

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const author =
    id && state.authors.length > 0
      ? getAuthorById(state.authors, id)
      : newAuthor;

  return {
    author,
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
};

const mapDispatchToProps = {
  loadAuthors: authorActions.loadAuthors,
  saveAuthor: authorActions.saveAuthor
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);
