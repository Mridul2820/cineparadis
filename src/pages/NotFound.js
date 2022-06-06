import React from 'react';
import styled from 'styled-components';
import NotFound from '../404/NotFound';

const NotFoundPage = () => {
  return <NotFound />;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px 16px;
  min-height: 90vh;
`;

export default NotFoundPage;
