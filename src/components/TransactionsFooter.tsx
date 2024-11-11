import React from 'react';

interface TransactionsFooterProps {
  handleLogout: () => void;
}

const TransactionsFooter: React.FC<TransactionsFooterProps> = ({ handleLogout }) => {
  return (
    <footer className="transactions-footer">
      <a href="/" className="footer-link">Home</a>
      <button onClick={handleLogout} className="footer-link">Logout</button>
    </footer>
  );
};

export default TransactionsFooter;
