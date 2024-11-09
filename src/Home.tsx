import logoImage from "./assets/logo.svg";
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import "./App.css";

function App() {
  const [logoutMessage, setLogoutMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedLogoutMessage = localStorage.getItem('logoutMessage');
    if (storedLogoutMessage) {
      setLogoutMessage(storedLogoutMessage);
      localStorage.removeItem('logoutMessage');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.setItem('logoutMessage', 'Você foi deslogado com sucesso.');
    navigate('/');
  };

  return (
    <main id="page">
      <div>
        <img src={logoImage} alt="Cora" title="Cora"></img>
        <h1>Hey There &#128075;</h1>
        <h2>Tenha um ótimo teste!!!</h2>
        <p>
          <strong>Vamos começar?</strong> Como você faria os botões abaixo
          abrirem as suas respectivas páginas? (Comece pela{" "}
          <strong>TODO LIST</strong>, pois nela contem os próximos passos)
        </p>
        <p className="disclaimer">
          &#9888; Você pode encontrar alguns <strong>erros</strong> no meio do
          caminho, não desanime e fique atento para conseguir{" "}
          <strong>visualizar</strong> e <strong>renderizar</strong> as páginas.
        </p>
        <ul className="buttons">
          <li>
            <Link to="/todo">TO-DO LIST</Link>
          </li>
          <li>
            <Link to="/transactions">IBANKING</Link>
          </li>
          <li>
            <Link
              to="/"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
              className="logout-link"
            >
              LOGOUT
            </Link>
          </li>
        </ul>
        {logoutMessage && (
          <p className="logout-message">{logoutMessage}</p>
        )}
      </div>
    </main>
  );
}

export default App;
