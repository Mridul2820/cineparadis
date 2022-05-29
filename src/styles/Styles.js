import styled from 'styled-components';

export const Button = styled.button`
  margin: 8px;
  border: 1px solid transparent;
  background-color: #0095f6;
  color: #fff;
  border-radius: 4px;
  padding: 5px 9px;
  cursor: pointer;

  &:disabled {
    background-color: rgba(0, 149, 246, 0.3);
  }
`;

export const PageTitle = styled.h1`
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  font-size: 2vw;
  font-weight: 700;
  margin-bottom: 0;
  color: #222;

  @media only screen and (max-width: 956px) {
    font-size: 4vw;
  }

  @media only screen and (max-width: 480px) {
    font-size: 25px;
  }
`;

export const Container = styled.div`
  padding: 40px 40px 20px 40px;
  margin: 0 auto;
  min-height: calc(100vh - 122px);

  @media only screen and (max-width: 480px) {
    padding: 20px 10px;
  }
`;

export const ContentList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
