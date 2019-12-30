import React from "react";
import PropTypes from "prop-types";

import TextInput from "../common/TextInput";
import appPropTypes from "../../appPropTypes";

const AuthorForm = props => {
  const { author, errors = {}, saving = false, onChange, onSave } = props;

  return (
    <form onSubmit={onSave}>
      <h2>{author.id ? "Edit" : "Add"} Author</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        error={errors.name}
        label="Name"
        name="name"
        placeholder="Enter Name"
        value={author.name}
        onChange={onChange}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

AuthorForm.propTypes = {
  author: appPropTypes.author.isRequired,
  errors: PropTypes.shape({
    name: PropTypes.string
  }).isRequired,
  saving: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default AuthorForm;
