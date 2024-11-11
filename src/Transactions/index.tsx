import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ITransactionGroup, IResponseList, ITransactionItem } from './types';
import FilterButtons from '../components/FilterButtons';
import TransactionsFooter from '../components/TransactionsFooter';
import TransactionGroup from '../components/TransactionGroup';

import "./index.css";

function Transactions() {
  const [transactions, setTransactions] = useState<ITransactionGroup[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'DEBIT' | 'CREDIT'>('DEBIT');
  const navigate = useNavigate();

  const fetchTransactions = useCallback(async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        localStorage.setItem('errorMessage', 'Você precisa estar logado para acessar essa página.');
        navigate('/ibanking', { replace: true });
        return;
      }

      const response = await axios.get<IResponseList>('http://localhost:3000/list', {
        headers: {
          token: token,
        },
      });
      setTransactions(response.data.results);
    } catch (error) {
      setErrorMessage('Erro ao buscar transações. Tente novamente mais tarde.');
    }
  }, [navigate]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/', { replace: true });
    console.log("Usuário deslogado");
  };

  const groupTransactionsByDate = (transactions: ITransactionGroup[]): Record<string, ITransactionItem[]> => {
    return transactions.reduce((groups: Record<string, ITransactionItem[]>, transaction: ITransactionGroup) => {
      const date = transaction.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      if (Array.isArray(transaction.items)) {
        groups[date].push(...transaction.items);
      }
      return groups;
    }, {});
  };

  const groupedTransactions = groupTransactionsByDate(transactions);

  return (
    <main className="transactions-page">
      <div className="content-wrapper">
        <FilterButtons selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="transactions-list">
          {Object.keys(groupedTransactions).length === 0 ? (
            <p>Nenhuma transação encontrada.</p>
          ) : (
            Object.entries(groupedTransactions).map(([date, items]) => (
              <TransactionGroup key={date} date={date} items={items} selectedFilter={selectedFilter} />
            ))
          )}
        </div>
        <TransactionsFooter handleLogout={handleLogout} />
      </div>
    </main>
  );
}

export default Transactions;
