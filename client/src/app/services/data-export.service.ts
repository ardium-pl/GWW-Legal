import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TPR_input, Transaction } from 'app/services/tpr/tpr-input.types';

@Injectable({
  providedIn: 'root'
})
export class DataExportService {
  private tprDataSubject = new BehaviorSubject<TPR_input[] | Transaction[]>([]);
  tprData$ = this.tprDataSubject.asObservable();

  setTprData(data: TPR_input[] | Transaction[]) {
    this.tprDataSubject.next(data);
  }
}