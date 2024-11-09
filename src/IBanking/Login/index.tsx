import { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logoFullImage from '../../assets/logo-full.svg';
import arrowRightImage from '../../assets/arrow-right.svg';

import "./index.css";

function Login() {
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedErrorMessage = localStorage.getItem('errorMessage');
    if (storedErrorMessage) {
      setErrorMessage(storedErrorMessage);
      localStorage.removeItem('errorMessage');
    }
  }, []);

  const handleChangeCPF = (e: ChangeEvent<HTMLInputElement>) => {
    setCpf(e.target.value);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleAuth = async () => {
    setErrorMessage(null);

    try {
      const response = await axios.post('http://localhost:3000/auth', {
        cpf,
        password,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem('authToken', token);
        console.log('Successfully authenticated!');
        setTimeout(() => {
          window.location.href = '/transactions';
        }, 100);
      }
    } catch (error) {
      setErrorMessage('Erro ao tentar autenticar. Verifique as credenciais.');
    }
  };

  return (
    <main id="login">
      <img src={logoFullImage} alt="Cora" title="Cora" />
      <h1>Fazer Login</h1>
      <div className="login__inputs">
        <input
          id="cpf"
          type="text"
          value={cpf}
          placeholder="Insira seu CPF"
          onChange={handleChangeCPF}
        />
        <input
          id="password"
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={handleChangePassword}
        />
      </div>
      {errorMessage && <p className="login__error">{errorMessage}</p>}
      <button onClick={handleAuth}>
        Continuar
        <img src={arrowRightImage} alt="Left Arrow" />
      </button>
    </main>
  );
}

export { Login };
