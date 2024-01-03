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
    width: 100%;
    height: 100vh;
    background-color: ${(props) => props.theme['BACKGROUND_800']};
    color: ${(props) => props.theme['WHITE']};
    font-weight: 400;
    font-size: 1.6rem;
  }

  body, input, a, span {
    font-family: 'Roboto Slab', monospace;
  }
`