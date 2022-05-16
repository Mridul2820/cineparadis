import React from 'react';
import { Pagination } from '@mui/material';
import styled from 'styled-components';

const CustomPagination = ({ setPage, numOfPages = 10 }) => {
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <PaginationMain>
      <Pagination
        onChange={(e) => handlePageChange(e.target.textContent)}
        count={numOfPages}
        color="secondary"
        hideNextButton
        hidePrevButton
      />
    </PaginationMain>
  );
};

const PaginationMain = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

export default CustomPagination;
