// src/pages/Home.js
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Bem-vindo ao Sistema de Pagamento</h1>
      <ul>
        <li><Link to="/pagamento">Fazer Pagamento</Link></li>
        <li><Link to="/historico">Ver Histórico</Link></li>
      </ul>
    </div>
  );
}
