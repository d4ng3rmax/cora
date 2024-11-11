import React, { Dispatch, SetStateAction } from 'react';

interface FilterButtonsProps {
  selectedFilter: "DEBIT" | "CREDIT";
  setSelectedFilter: Dispatch<SetStateAction<"DEBIT" | "CREDIT">>;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ selectedFilter, setSelectedFilter }) => {
  return (
    <div className="transaction-filters">
      <button
        className={`filter-button ${selectedFilter === 'DEBIT' ? 'active' : ''}`}
        onClick={() => setSelectedFilter('DEBIT')}
      >
        Débito
      </button>
      <button
        className={`filter-button ${selectedFilter === 'CREDIT' ? 'active' : ''}`}
        onClick={() => setSelectedFilter('CREDIT')}
      >
        Crédito
      </button>
    </div>
  );
};

export default FilterButtons;
