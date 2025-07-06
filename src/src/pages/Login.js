import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const usuarios = [
    { email: "cliente@teste.com", senha: "1234", tipo: "cliente" },
    { email: "admin@teste.com", senha: "12345", tipo: "admin" }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const usuario = usuarios.find(
      (u) => u.email === email && u.senha === senha
    );

    if (usuario) {
      alert(`Login como ${usuario.tipo}`);
      navigate("/"); // Redireciona para página inicial ou dashboard
    } else {
      setErro("E-mail ou senha inválidos.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.titulo}>Login</h2>
        {erro && <p style={styles.erro}>{erro}</p>}
        <input
          style={styles.input}
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit" style={styles.botao}>
          Entrar
        </button>
        <button
          type="button"
          onClick={() => alert("Função ainda não implementada.")}
          style={styles.esqueci}
        >
          Esqueci minha senha
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#f5f6fa",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  form: {
    backgroundColor: "#fff",
    padding: 32,
    borderRadius: 8,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    width: "300px",
    display: "flex",
    flexDirection: "column"
  },
  titulo: {
    textAlign: "center",
    marginBottom: 20
  },
  input: {
    padding: 10,
    marginBottom: 15,
    borderRadius: 4,
    border: "1px solid #ccc"
  },
  botao: {
    padding: 10,
    backgroundColor: "#4a90e2",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
    marginBottom: 10
  },
  esqueci: {
    background: "none",
    border: "none",
    color: "#4a90e2",
    cursor: "pointer",
    fontSize: 14
  },
  erro: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center"
  }
};
