import { FiMail, FiLock } from "react-icons/fi"
import { Link } from "react-router-dom";

import { Input } from "../../components/Input";
import { Container, Form } from "./styles";
import { useState } from "react";
import { Button } from "../../components/Button";

export function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

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
            onChange={e => setEmail(e.target.value)}
          />

          <Input 
            placeholder="Senha"
            type="password"
            icon={FiLock}
            onChange={e => setPassword(e.target.value)}
          />

          <Button title='Entrar' />

          <Link to="/register">
            Criar conta
          </Link>
      </Form>
    </Container>
  )
}