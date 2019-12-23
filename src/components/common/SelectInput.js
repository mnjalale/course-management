/* eslint-disable jsx-a11y/no-onchange */
import React from "react";
import PropTypes from "prop-types";

const SelectInput = props => {
  const {
    displayMember,
    error,
    itemsSource,
    label,
    name,
    placeholder,
    value,
    valueMember,
    onChange
  } = props;
  let wrapperClass = "form-group";

  if (error && error.length > 0) {
    wrapperClass += " has-error";
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <select
          className="form-control"
          name={name}
          value={value}
          onChange={onChange}
        >
          {placeholder ? (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          ) : (
            <option value="" />
          )}

          {itemsSource.map(item => (
            <option key={item[valueMember]} value={item[valueMember]}>
              {item[displayMember]}
            </option>
          ))}
        </select>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

SelectInput.propTypes = {
  displayMember: PropTypes.string.isRequired,
  error: PropTypes.string,
  itemsSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  valueMember: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

SelectInput.defaultProps = {
  value: "",
  error: "",
  placeholder: ""
};

export default SelectInput;
