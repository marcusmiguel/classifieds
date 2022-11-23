import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
    font-family: sans-serif;
  }
  html{
    font-size: 22px;
  }
  body {
    margin: 0;
    width:  100%;
    height: 100%;
    ::-webkit-scrollbar {
      width: 15px;
      height: 15px;
    }
    ::-webkit-scrollbar-track {
      border: 1px solid rgba(0,0,0,.2);
      background: rgba(253,253,253,1);
      border-top-right-radius: .25rem; 
      border-bottom-right-radius: .25rem; 
    }
    ::-webkit-scrollbar-thumb {
      border-radius: .25rem;
      background: white;
      box-shadow: inset 0 0 1px 1px rgba(0,0,0,.6);
    }
  }
`;

export default GlobalStyle;