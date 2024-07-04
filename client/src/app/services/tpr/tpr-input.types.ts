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
  safeHarbour: string;
  korektaCenTransferowych: string;
};

export type CategorizedTransaction = Transaction & { Id: number };

export type TransactionCategories = {
  categoryA: CategorizedTransaction[];
  categoryB: CategorizedTransaction[];
  categoryC: CategorizedTransaction[];
  categoryD: CategorizedTransaction[];
  categoryE: CategorizedTransaction[];
  categoryF: CategorizedTransaction[];
};
