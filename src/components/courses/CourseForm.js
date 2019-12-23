import React from "react";
import PropTypes from "prop-types";

import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import appPropTypes from "../../appPropTypes";

const CourseForm = props => {
  const {
    authors,
    course,
    errors = {},
    saving = false,
    onChange,
    onSave
  } = props;

  return (
    <form onSubmit={onSave}>
      <h2>{course.id ? "Edit" : "Add"} Course</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        error={errors.title}
        label="Title"
        name="title"
        placeholder="Enter Title"
        value={course.title}
        onChange={onChange}
      />

      <SelectInput
        displayMember="name"
        error={errors.authorId}
        itemsSource={authors}
        label="Author"
        name="authorId"
        placeholder="Select Author"
        value={course.authorId || ""}
        valueMember="id"
        onChange={onChange}
      />

      <TextInput
        error={errors.category}
        label="Category"
        name="category"
        placeholder="Enter Category"
        value={course.category}
        onChange={onChange}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

CourseForm.propTypes = {
  authors: appPropTypes.authors.isRequired,
  course: appPropTypes.course.isRequired,
  errors: PropTypes.shape({
    authorId: PropTypes.string,
    category: PropTypes.string,
    title: PropTypes.string
  }).isRequired,
  saving: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default CourseForm;
