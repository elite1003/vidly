import React from "react";
import _ from "lodash";
import PropTypes from 'prop-types';


const Pagination = (props) => {
  const { pageSize, totalCount, onPageChange, currentPage } = props;
  const noOfPages = Math.ceil(totalCount / pageSize);
  if (noOfPages === 1) return null;
  const pages = _.range(1, noOfPages + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={page === currentPage ? "page-item active" : "page-item"}
            key={page}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = { 
  currentPage: PropTypes.number.isRequired, 
  totalCount: PropTypes.number.isRequired, 
  pageSize: PropTypes.number.isRequired, 
  onPageChange: PropTypes.func.isRequired
}

export default Pagination;
