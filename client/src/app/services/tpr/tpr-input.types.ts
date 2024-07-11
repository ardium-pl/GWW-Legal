export type TPR_input = {
  periodFrom: string;
  periodUntil: string;
  taxID: string;
  fullName: string;
  countryCode: string;
  pkdCode: string;
  taxCategory: 'ZK01' | 'ZK02';
  operatingMargin: number;
  profitMargin: number;
  returnOnAssets: number;
  returnOnEquity: number;
  transactions: Array<Transaction>;
};

export type Transaction = {
  transactionCategory: string;
  subjectMatter: string;
  transactionValue: number;
  currencyCode: string;
  correction: 'KC01' | 'KC02';
  compensation: 'KS01' | 'KS02' | 'KS03';
};

export type TransactionCategories = {
  categoryA: Transaction[];
  categoryB: Transaction[];
  categoryC: Transaction[];
  categoryD: Transaction[];
  categoryE: Transaction[];
  categoryF: Transaction[];
};
