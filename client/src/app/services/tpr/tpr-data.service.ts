import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TprDataService {
  private readonly _allTransactionsData = signal<any[]>([]);
  public readonly allTransactionTable = this._allTransactionsData.asReadonly();

  private readonly _isError = signal<boolean>(false);
  public readonly isError = this._isError.asReadonly();

  appendTransactionData(newData: any[]) {
    this._allTransactionsData.update(data => [...data, ...newData]);
  }
  setIsError(state: boolean) {
    this._isError.set(state);
  }
  reset() {
    this._isError.set(false);
    this._allTransactionsData.set([]);
  }
}
