import { Header } from "../../components/Header"
import { Brand, Container, Content, Menu, NewNote, Search } from "./styles"

export function Home() {
  return (
    <Container>
      <Brand to='/home'>
        <h1>iNotes</h1>
      </Brand>

      <Header></Header>
      <Menu></Menu>
      <Search></Search>
      <Content></Content>
      <NewNote></NewNote>

    </Container>
  )
}