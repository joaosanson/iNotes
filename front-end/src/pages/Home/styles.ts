import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  max-width: 100%;
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
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: ${(props) => props.theme['GREEN']};
  font-family: 'Roboto Mono', monospace;
`

export const Menu = styled.ul`
  grid-area: menu;
`

export const Search = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: search;
  padding: 0 6.4rem;
  background-color: ${(props) => props.theme['GREY_700']};
`

export const Content = styled.div`
  grid-area: content;
  background-color: ${(props) => props.theme['GREY_700']};

`

export const NewNote = styled(Link)`
  grid-area: newnote;
  background-color: ${(props) => props.theme['BACKGROUND_800']};
`