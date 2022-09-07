import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
    font-family: sans-serif;
  }
  body {
    margin: 0;
    width:  100%;
    height: 100%;

  }
  
`;

export default GlobalStyle;