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
  taxExemptionCode: 'ZW01' | 'ZW02'
  korektaCenTransferowych: string;

  // byklejakiepole: 'MW00' | "MW01" | 'MW02';
};

// type MW00 = {
//   pole00: string;
// }
// type MW01 = {
//   pole01: string;
// }
// type MW02 = {
//   pole02: string;
// }

// function isMW00<T extends Transaction>(obj: T): obj is T & MW00 {
//   return obj.byklejakiepole === 'MW00';
// }
// function isMW01<T extends Transaction>(obj: T): obj is T & MW01 {
//   return obj.byklejakiepole === 'MW01';
// }
// function isMW02<T extends Transaction>(obj: T): obj is T & MW02 {
//   return obj.byklejakiepole === 'MW02';
// }

// const transaction = {
//   transactionCategory: 'fdsfsdf',
//   subjectMatter: 'fsdfsd',
//   transactionValue: 6,
//   currencyCode: 'string',
//   correction: 'KC01',
//   compensation: 'KS01',
//   safeHarbour: 'dsfsdfsd',
//   taxExemptionCode: 'ZW01',
//   korektaCenTransferowych: "fsdfdsfds",
//   byklejakiepole: 'MW00',

//   pole00: 'dsfsd'
// } as Transaction;

// function test() {
//   let translations: any = {
//     kategoria: transaction.transactionCategory,
//     // ...
//   };

//   if (isMW00(transaction)) {
//     translations = {
//       ...translations,
//       cenaKoncowa: transaction.pole00,
//     }
//   } else if (isMW01(transaction)) {
//     translations = {
//       ...translations,
//       cenaKoncowa: transaction.pole01,
//     }
//   } else if (isMW02(transaction)) {
//     translations = {
//       ...translations,
//       cenaKoncowa: transaction.pole02,
//     }
//   }
//   return translations;
// }



export type TransactionD = Transaction & {
  Nrnip: string;
  NIPKontr1?: string;
  PESELKontr1?: string;
  NrIdKontr1?: string;
  KodKrajuWydania1?: string;
}

export type TransactionCategories = {
  categoryA: Transaction[];
  categoryB: Transaction[];
  categoryC: Transaction[];
  categoryD: Transaction[];
  categoryE: Transaction[];
  categoryF: Transaction[];
};
