import { Injectable, signal } from '@angular/core';
import { TPR_input } from './tpr-input.types';

@Injectable({
  providedIn: 'root',
})
export class TprDataServiceService {
  readonly allTransactionsData = signal<any[]>([]);
  readonly allData = signal<TPR_input | null>(null);

  updateData(newData: any[]) {
    this.allTransactionsData.update((data) => [...data, ...newData]);
  }

  updateAllData(newData: TPR_input | null) {
    this.allData.set(newData);
  }

  getData() {
    return this.allTransactionsData();
  }

  getAllData() {
    return this.allData();
  }

  clearData() {
    this.allTransactionsData.set([]);
    this.allData.set(null);
  }
}
