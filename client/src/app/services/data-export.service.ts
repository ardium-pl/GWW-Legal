import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TPR_input, Transaction } from 'app/services/tpr/tpr-input.types';

@Injectable({
  providedIn: 'root'
})
export class DataExportService {
  private tprDataSubject = new BehaviorSubject<any>([]);
  tprData$ = this.tprDataSubject.asObservable();

  setTprData(data: any) {
    this.tprDataSubject.next(data);
  }
}