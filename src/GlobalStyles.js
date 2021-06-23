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
    body {
        background-color: #fafafa;
    }
    
    a {
        text-decoration: none;
        color: unset;
    }
`

export const Button = styled.button`
    margin: 8px 40px;
    border: 1px solid transparent;
    background-color: #0095f6;
    color: #fff;
    border-radius: 4px;
    padding: 5px 9px;
    cursor: pointer;
    
    &:disabled {
        background-color: rgba(0,149,246,.3);
    }
`

export default GlobalStyle