import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Todo from './Todo';
import { Login } from "./IBanking/Login";
import Transactions from './Transactions';
import NotFound from './NotFound';

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('authToken');

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ibanking" element={<Login />} />
        <Route path="/todo" element={<Todo />} />
        <Route
          path="/transactions"
          element={
            isAuthenticated ? (
              <Transactions />
            ) : (
              <>
                {localStorage.setItem('errorMessage', 'Você precisa estar logado para acessar essa página.')}
                <Navigate to="/ibanking" />
              </>
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
