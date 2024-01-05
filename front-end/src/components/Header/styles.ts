import { Link } from "react-router-dom"
import styled from "styled-components"

export const Container = styled.header`
  grid-area: header;
  width: 100%;
  height: 10.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 6rem 0 11.5rem;
`

export const Profile = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;

  img {
    width: 7rem;
    height: 7rem;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 1.6rem;
    line-height: 2.4rem;

    span {
      font-size: 1.6rem;
      color: ${(props) => props.theme['GREY_400']};
    }

    strong {
      font-size: 1.8rem;
      color: ${(props) => props.theme['WHITE_900']};
      font-weight: 500;
    }
  }
`

export const Logout = styled.button`
  border: none;
  background: none;
  
  svg {
    color: ${(props) => props.theme['GREY_400']};
    font-size: 3rem;
    cursor: pointer;
  }
`