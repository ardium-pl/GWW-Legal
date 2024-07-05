import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TprDataServiceService {
  readonly allData = signal<any[]>([]);

  updateData(newData: any[]) {
    this.allData.update((data) => [...data, ...newData]);
  }

  getData() {
    return this.allData();
  }

  clearData() {
    return this.allData.set([]);
  }
}
