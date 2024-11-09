import logoImage from "./assets/logo.svg";
import { Link, useNavigate } from 'react-router-dom';

import "./App.css";

function App() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    console.log('User logged out successfully');

    navigate('/ibanking');
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
            <Link to="/ibanking" onClick={handleLogout} className="logout-link">
              LOGOUT
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}

export default App;
