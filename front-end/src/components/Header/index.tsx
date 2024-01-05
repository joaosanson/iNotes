import { Container, Logout, Profile } from "./styles";
import { RiShutDownLine } from "react-icons/ri"

export function Header() {
  return (
    <Container>
      <Profile>
        <img 
          src="https://github.com/holices.png"
          alt="imagem do avatar"
        />

        <div>
          <span>Bem-vindo,</span>
          <strong>Holices Sanson</strong>
        </div>
      </Profile>

      <Logout>
        <RiShutDownLine />
      </Logout>
    </Container>
  )
}