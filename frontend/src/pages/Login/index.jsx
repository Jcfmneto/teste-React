import "./style.css";
import api from "../services/api.js";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const inputEmail = useRef();
  const inputSenha = useRef();
  const navigate = useNavigate();

  async function loginUsuario() {
    try {
      const TokenJWT = await api.post("/login", {
        email: inputEmail.current.value,
        senha: inputSenha.current.value
      });

      const token = TokenJWT.data?.accessToken;

      if (token) {
        sessionStorage.setItem("token", token);
        navigate("/home");
      }
    } catch (error) {
      console.error("Erro no login:", error.response?.data || error.message);
      alert("Email ou senha inválidos.");
    }
  }

  return (
    <div className="container">
      <form className="form" onSubmit={(e) => { e.preventDefault(); loginUsuario(); }}>
        <h1>Login</h1>
        <input placeholder="Email" name="email" type="text" ref={inputEmail} />
        <input placeholder="Senha" name="senha" type="password" ref={inputSenha} />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
