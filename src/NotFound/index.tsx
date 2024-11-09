import { useNavigate } from 'react-router-dom';

import "./index.css";

function NotFound() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <main id="not-found">
      <h1>Página Não Encontrada</h1>
      <p>A página que você está tentando acessar não existe.</p>
      <button onClick={handleGoBack}>Voltar para a Página Inicial</button>
    </main>
  );
}

export default NotFound;
