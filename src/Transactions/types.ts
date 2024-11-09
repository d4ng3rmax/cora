export interface ITransactionItem {
  id: string;
  description: string;
  label: string;
  entry: 'DEBIT' | 'CREDIT';
  amount: number;
  name: string;
  dateEvent: string;
  status: string;
}

export interface ITransactionGroup {
  date: string;
  items: ITransactionItem[];
}

export interface IResponseList {
  results: ITransactionGroup[];
  itemsTotal: number;
}
