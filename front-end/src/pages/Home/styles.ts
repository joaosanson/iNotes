import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 25rem auto;
  grid-template-rows: 10.5rem 12.8rem auto 6.4rem;
  grid-template-areas: 
  "brand header"
  "menu search"
  "menu content"
  "newnote content"
  ;
`

export const Brand = styled(Link)`
  grid-area: brand;
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: ${(props) => props.theme['GREEN']};
  font-family: 'Roboto Mono', monospace;
`

export const Menu = styled.ul`
  grid-area: menu;
  border: 1px solid white;
`

export const Search = styled.div`
  grid-area: search;
  border: 1px solid white;
`

export const Content = styled.div`
  grid-area: content;
  border: 1px solid white;
`

export const NewNote = styled(Link)`
  grid-area: newnote;
  border: 1px solid white;
`