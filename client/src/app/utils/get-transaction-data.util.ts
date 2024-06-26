import { WritableSignal } from '@angular/core';
import {
  TPR_input,
  TransactionCategories,
} from 'app/services/tpr/tpr-input.types';

export const GetTransactionDataUtil = (
  clipboardData: TPR_input,
  transactionData: WritableSignal<TransactionCategories>,
  itterable: WritableSignal<any>,
): void => {
  clipboardData.transactions.map((transaction) => {
    switch (transaction.transactionCategory) {
      case '1101':
      case '2101':
        transactionData.update((data) => {
          data.categoryB = [...data.categoryB, transaction];
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
          data.categoryC = [...data.categoryC, transaction];
          return data;
        });
        break;
      case '1301':
      case '2301':
        transactionData.update((data) => {
          data.categoryD = [...data.categoryD, transaction];
          return data;
        });
        break;
      case '1401':
      case '2401':
        transactionData.update((data) => {
          data.categoryE = [...data.categoryE, transaction];
          return data;
        });
        break;
      case '1501':
      case '2501':
        transactionData.update((data) => {
          data.categoryF = [...data.categoryF, transaction];
          return data;
        });
        break;
      default:
        transactionData.update((data) => {
          data.categoryA = [...data.categoryA, transaction];
          return data;
        });
        break;
    }
  });
  itterable.set(Object.entries({ ...transactionData() }));
};
