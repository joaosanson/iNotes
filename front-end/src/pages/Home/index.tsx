import { Header } from "../../components/Header"
import { Input } from "../../components/Input"
import { Brand, Container, Content, Menu, NewNote, Search } from "./styles"

export function Home() {
  return (
    <Container>
      <Brand to='/home'>
        <h1>iNotes</h1>
      </Brand>

      <Header />
      <Menu></Menu>
      <Search>
        <Input 
          placeholder="Pequisar pelo título"
        />
      </Search>
      <Content></Content>
      <NewNote></NewNote>

    </Container>
  )
}