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

  updateIsError(newData: boolean) {
    this.isError.set(newData);
  }

  getData() {
    return this.allTransactionsData();
  }

  getIsError() {
    return this.isError();
  }

  clearData() {
    this.allTransactionsData.set([]);
    this.isError.set(false);
  }
}
