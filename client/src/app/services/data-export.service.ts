import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TPR_input, Transaction } from 'app/services/tpr/tpr-input.types';

@Injectable({
  providedIn: 'root'
})
export class DataExportService {
  private tprDataSubject = new BehaviorSubject<TPR_input[]>([]);
  private transactionDataSubject = new BehaviorSubject<Transaction[]>([]);

  setTPRData(data: TPR_input[]): void {
    this.tprDataSubject.next(data);
  }

  getTPRData() {
    return this.tprDataSubject.asObservable();
  }

  getExportData() {
    return {
      tprData: this.tprDataSubject.getValue(),
    };
  }
}
