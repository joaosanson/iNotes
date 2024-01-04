import { FiMail, FiLock } from "react-icons/fi"
import { Link } from "react-router-dom";

import { Input } from "../../components/Input";
import { Container, Form } from "./styles";
import { Button } from "../../components/Button";

export function SignIn() {
  return (
    <Container>
      <Form>
          <h1>iNotes</h1>
          <p>Sua agenda dinâmica.</p>
          <h2>Faça seu login</h2>

          <Input 
            placeholder="E-mail"
            type="text"
            icon={FiMail}
          />

          <Input 
            placeholder="Senha"
            type="password"
            icon={FiLock}
          />

          <Button
            title='Entrar'
          />

          <Link to="/register">
            Criar conta
          </Link>
      </Form>
    </Container>
  )
}