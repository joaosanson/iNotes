import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  background-color: ${(props) => props.theme['GREY_700']};
  border: 1px solid ${(props) => props.theme['GREY_500']};
  border-radius: 1rem;

  input {
    height: 5.6rem;
    width: 100%;
    padding: 1.6rem;
    background-color: transparent;
    border: none;
    
    &::placeholder {
      color: ${(props) => props.theme['GREY_400']};
    }

    &::placeholder,
    &:focus {
      font-size: 1.6rem;
    }
    
    &:focus {
      color: ${(props) => props.theme['WHITE']};
      outline: none;
    }
  }

  > svg {
    margin-left: 1.6rem;
  }
  `