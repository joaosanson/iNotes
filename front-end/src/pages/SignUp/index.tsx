import { Link } from "react-router-dom";
import { Container, Form } from "./styles";
import { Input } from "../../components/Input";
import { FiLock, FiMail, FiUser } from "react-icons/fi";
import { Button } from "../../components/Button";

export function SignUp() {
  return (
    <Container>
      <Form>
        <h1>iNotes</h1>
        <p>Sua agenda dinâmica.</p>
        <h2>Crie sua conta</h2>

        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
        />

        <Input
          placeholder="E-mail"
          type="email"
          icon={FiMail}
        />

        <Input
          placeholder="Senha"
          type="password"
          icon={FiLock}
        />

        <Button
          title="Cadastrar"
        />

        <Link to="/">
          Voltar para o login
        </Link>
      </Form>
    </Container>
  )
}