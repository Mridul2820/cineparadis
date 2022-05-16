import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    html {
        scroll-behavior: smooth;
    }

    body {
        background-color: #fafafa;
    }
    
    a {
        text-decoration: none;
        color: unset;
    }
`;

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
  font-weight: 600;
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
  padding: 20px 40px;
  margin: 0 auto;

  @media only screen and (max-width: 480px) {
    padding: 20px 10px;
  }
`;

export const ContentList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default GlobalStyle;
