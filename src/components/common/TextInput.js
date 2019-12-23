import React from "react";
import PropTypes from "prop-types";

const TextInput = props => {
  const { error, label, name, placeholder, value, onChange } = props;
  let wrapperClass = "form-group";

  if (error.length > 0) {
    wrapperClass += " has-error";
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          className="form-control"
          name={name}
          placeholder={placeholder}
          type="text"
          value={value}
          onChange={onChange}
        />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

TextInput.propTypes = {
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

TextInput.defaultProps = {
  error: "",
  placeholder: "",
  value: ""
};

export default TextInput;
