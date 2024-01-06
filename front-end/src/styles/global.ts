import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    font-size: 62.5%;
  }

  body {
    max-width: 144rem;
    margin: 0 auto;
    height: 100vh;
    background-color: ${(props) => props.theme['GREY_700']};
    color: ${(props) => props.theme['WHITE']};
    font-weight: 400;
    font-size: 1.6rem;
  }

  body, input, a, span {
    font-family: 'Roboto Slab', monospace;
  }
`