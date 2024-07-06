import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TprDataServiceService {
  readonly allTransactionsData = signal<any[]>([]);
  readonly isError = signal<boolean>(false);

  updateData(newData: any[]) {
    this.allTransactionsData.update((data) => [...data, ...newData]);
  }

  setIsError() {
    this.isError.set(true);
  }

  getData() {
    return this.allTransactionsData();
  }

  getIsError() {
    return this.isError();
  }

  clearData() {
    this.isError.set(false);
    this.allTransactionsData.set([]);
  }
}
