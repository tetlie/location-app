import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`

  * {
    box-sizing: border-box;
  }

  html {
    font-size: 20px;
    line-height:  1.5;
  }

  body {
    font-family: "Roboto", Helvetica, Sans-Serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

`;
 
export default GlobalStyle;