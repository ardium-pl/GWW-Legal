import { computed, Injectable, signal } from '@angular/core';
import { isDefined } from 'simple-bool';
import { CategorizedTransaction, TPRCompanyData, Transaction, TransactionCategories } from './tpr-input.types';

const REQUIRED_TPR_DATA_KEYS: (keyof TPRCompanyData)[] = [
  'countryCode',
  'fullName',
  'operatingMargin',
  'periodFrom',
  'periodUntil',
  'pkdCode',
  'profitMargin',
  'returnOnAssets',
  'returnOnEquity',
  'taxCategory',
  'taxID',
];

@Injectable({
  providedIn: 'root',
})
export class TprCompanyDataService {
  private readonly _data = signal<TPRCompanyData | null>(null);
  public readonly data = this._data.asReadonly();

  public readonly hasData = computed(() => isDefined(this.data()));

  private readonly _error = signal<string | null>(null);
  public readonly error = this._error.asReadonly();

  setError(error: string): void {
    this._error.set(error);
  }
  setData(object: object): void {
    for (const KEY of REQUIRED_TPR_DATA_KEYS) {
      if (KEY in object) continue;
      this._error.set('KEY_MISSING_ERR');
      return;
    }
    this._data.set(object as TPRCompanyData);
  }

  public readonly transactionCategoriesArray = computed<[string, CategorizedTransaction[]][] | null>(() => {
    const categories = new TransactionCategories();
    const clipboardData = this.data();
    if (!clipboardData) return null;

    clipboardData.transactions.forEach((transaction, i) => {
      const newTransaction = addId(transaction, i);
      switch (transaction.transactionCategory) {
        case '1101':
        case '2101': {
          categories.categoryB.push(newTransaction);
          return;
        }
        case '1201':
        case '1202':
        case '1203':
        case '1204':
        case '2201':
        case '2202':
        case '2203':
        case '2204': {
          if (
            transaction.safeHarbour === 'TAK' &&
            (transaction.transactionCategory === '1201' || transaction.transactionCategory === '2201')
          ) {
            categories.categoryD.push(newTransaction);
          } else {
            categories.categoryC.push(newTransaction);
          }
          return;
        }
        case '1401':
        case '2401': {
          categories.categoryE.push(newTransaction);
          return;
        }
        case '1501':
        case '2501': {
          categories.categoryF.push(newTransaction);
          return;
        }
        default: {
          categories.categoryA.push(newTransaction);
          return;
        }
      }
    });
    return Object.entries(categories);
  });
}

export function addId(transaction: Transaction, i: number): CategorizedTransaction {
  return { ...transaction, Id: i };
}
