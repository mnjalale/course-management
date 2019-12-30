import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import appPropTypes from "../../appPropTypes";

const AuthorList = props => {
  const { authors, onDeleteClick } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {authors.map(author => {
          return (
            <tr key={author.id}>
              <td>
                <Link to={`/author/${author.id}`}>{author.name}</Link>
              </td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  type="button"
                  onClick={() => onDeleteClick(author)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

AuthorList.propTypes = {
  authors: appPropTypes.authors.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default AuthorList;
