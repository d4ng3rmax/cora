import React from 'react';
import { ITransactionItem } from '../Transactions/types';
import { formatFullDate, formatDate } from '../utils/utils';

interface TransactionGroupProps {
  date: string;
  items: ITransactionItem[];
  selectedFilter: 'DEBIT' | 'CREDIT';
}

const TransactionGroup: React.FC<TransactionGroupProps> = ({ date, items, selectedFilter }) => {
  const filteredItems = items.filter(item => item.entry === selectedFilter);

  if (filteredItems.length === 0) {
    return null;
  }

  return (
    <div className="transaction-group-wrapper">
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
};

export default TransactionGroup;
