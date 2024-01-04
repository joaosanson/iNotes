import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

export const Form = styled.form`
  width: 34rem;
  display: flex;
  flex-direction: column; 
  align-items: center;

  h1 {
    font-size: 6.4rem;
    font-family: 'Roboto Mono', monospace;
    color: ${(props) => props.theme['GREEN']};
  }

  h2 {
    margin: 4.8rem auto;
  }

  p {
    font-size: 1.4rem;
    color: ${(props) => props.theme['WHITE']};
  }

  a {
    margin-top: 12.4rem;
    color: ${(props) => props.theme['GREEN']};
    text-decoration: none;
  }
`