import React from "react";
import PropTypes from "prop-types";

const Pagination = props => {
  const { paginate, recordsPerPage, totalRecords } = props;
  const pageNumbers = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className="page-item">
            <button
              type="button"
              onClick={() => paginate(number)}
              className="page-link"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  paginate: PropTypes.func.isRequired,
  recordsPerPage: PropTypes.number.isRequired,
  totalRecords: PropTypes.number.isRequired
};

export default Pagination;
