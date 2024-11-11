import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ITransactionGroup, IResponseList, ITransactionItem } from './types';
import { formatDate, formatFullDate } from '../utils/utils';

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
    console.log("Usuário deslogado")
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
        <div className="transaction-filters">
          <button className={`filter-button ${selectedFilter === 'DEBIT' ? 'active' : ''}`} onClick={() => setSelectedFilter('DEBIT')}>
            Débito
          </button>
          <button className={`filter-button ${selectedFilter === 'CREDIT' ? 'active' : ''}`} onClick={() => setSelectedFilter('CREDIT')}>
            Crédito
          </button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="transactions-list">
          {Object.keys(groupedTransactions).length === 0 ? (
            <p>Nenhuma transação encontrada.</p>
          ) : (
            Object.entries(groupedTransactions).map(([date, items], index) => {
              const filteredItems = items.filter(
                (item) => item.entry === selectedFilter
              );

              if (filteredItems.length === 0) {
                return null;
              }

              return (
                <div key={index} className="transaction-group-wrapper">
                  <div className="transaction-timeline">
                    <div className="transaction-line"></div>
                    <div className="transaction-header">
                      <h2 className="transaction-date">
                        {formatFullDate(date)}
                      </h2>
                      <span className="transaction-day-balance">
                        saldo do dia <strong>R$ 3.780,08</strong>
                      </span>
                    </div>
                    <div className="transaction-line"></div>
                  </div>
                  <div className="transaction-container">
                    <table className="transaction-table">
                      <tbody>
                        {filteredItems.map((item) => (
                          <tr key={item.id}>
                            <td>
                              {item.entry === 'DEBIT' ? (
                                <span className="icon-debit">&#8592;</span>
                              ) : (
                                <span className="icon-credit">&#8594;</span>
                              )}
                              <span className={`transaction-name ${item.entry === 'DEBIT' ? 'debit' : 'credit'}`}>{item.name}</span>
                            </td>
                            <td>{item.description}</td>
                            <td>{formatDate(item.dateEvent)}</td>
                            <td className={`transaction-balance ${item.entry === 'DEBIT' ? 'debit' : 'credit'}`}>
                              {item.entry === 'DEBIT' ? '-' : '+'} R$ {(item.amount / 100).toFixed(2).replace('.', ',')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })
          )}
        </div>
        <footer className="transactions-footer">
          <a href="/" className="footer-link">Home</a>
          <button onClick={handleLogout} className="footer-link">Logout</button>
        </footer>
      </div>
    </main>
  );
}

export default Transactions;
