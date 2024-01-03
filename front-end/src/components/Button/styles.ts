import styled from "styled-components"

export const ButtonContainer = styled.div`
  width: 100%;
  height: 5.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme['BACKGROUND_800']};
  background-color: ${(props) => props.theme['GREEN']};
  border-radius: 1rem;
  font-weight: 400;
  cursor: pointer;
  margin-top: 1.6rem;

  &:disabled {
    opacity: 0.5;
  }
`