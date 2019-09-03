import React, { useState, useEffect } from "react";
import { Pagination as PageSemantic } from "semantic-ui-react";
import { PAGE_COUNT } from "../App/constants";
import './pagination.css';

function Pagination(props) {
  const { userCount, changePage } = props;
  const totalPages = userCount / PAGE_COUNT;

  return (
    <div className="pagination-container">
      <PageSemantic
        defaultActivePage={1}
        totalPages={totalPages}
        onPageChange={(e, data) => changePage(data.activePage)}
      />
    </div>
  );
}

export default Pagination;
