import { WritableSignal } from '@angular/core';
import {
  CategorizedTransaction,
  TPR_input,
  Transaction,
  TransactionCategories,
} from 'app/services/tpr/tpr-input.types';

export const GetTransactionDataUtil = (
  clipboardData: TPR_input,
  transactionData: WritableSignal<TransactionCategories>,
  itterable: WritableSignal<any>,
): void => {
  clipboardData.transactions.map((transaction, i) => {
    switch (transaction.transactionCategory) {
      case '1101':
      case '2101':
        transactionData.update((data) => {
          const newTransaction = addId(transaction, i);
          data.categoryB = [...data.categoryB, newTransaction];
          return data;
        });
        break;
      case '1201':
      case '1202':
      case '1203':
      case '1204':
      case '2201':
      case '2202':
      case '2203':
      case '2204':
        transactionData.update((data) => {
          const newTransaction = addId(transaction, i);
          const isD = transaction.safeHarbour === 'TAK';
          if (
            isD &&
            (transaction.transactionCategory === '1201' ||
              transaction.transactionCategory === '2201')
          ) {
            data.categoryD = [...data.categoryD, newTransaction];
          } else {
            data.categoryC = [...data.categoryC, newTransaction];
          }
          return data;
        });
        break;
      case '1401':
      case '2401':
        transactionData.update((data) => {
          const newTransaction = addId(transaction, i);
          data.categoryE = [...data.categoryE, newTransaction];
          return data;
        });
        break;
      case '1501':
      case '2501':
        transactionData.update((data) => {
          const newTransaction = addId(transaction, i);
          data.categoryF = [...data.categoryF, newTransaction];
          return data;
        });
        break;
      default:
        transactionData.update((data) => {
          const newTransaction = addId(transaction, i);
          data.categoryA = [...data.categoryA, newTransaction];
          return data;
        });
        break;
    }
  });
  itterable.set(Object.entries({ ...transactionData() }));
};

function addId(transaction: Transaction, i: number): CategorizedTransaction {
  return { ...transaction, Id: i };
}
