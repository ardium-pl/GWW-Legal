import { Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  CellEditRequestEvent,
  ColDef,
  ColTypeDef,
  GetRowIdFunc,
  GetRowIdParams,
  GridApi,
  GridReadyEvent,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { TprDataService } from 'app/services/tpr/tpr-data.service';
import { CategorizedTransaction } from 'app/services/tpr/tpr-input.types';
import { getColumnDefUtil, getKeysToCheck } from 'app/utils/get-column-def.util';
import { isDefined } from 'simple-bool';
import { columnTypes } from './column-types';

@Component({
  selector: 'app-transaction-table',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TransactionTableComponent {
  private readonly tprDataService = inject(TprDataService);
  public readonly transactionType = input<string>('');
  public readonly inputData = input.required<CategorizedTransaction[]>();
  public readonly defaultKeys = computed(() => getKeysToCheck(this.transactionType()));
  public readonly colDefs = computed(() => getColumnDefUtil(this.transactionType()));
  public readonly defaultColDef: ColDef = {
    editable: true,
  };
  private gridApi!: GridApi<any>;

  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
    this.getRawData();
  }

  public columnTypes: {
    [key: string]: ColTypeDef;
  } = columnTypes;

  onCellEditRequest(event: CellEditRequestEvent) {
    const oldData = event.data;
    const field = event.colDef.field;
    const newData = { ...oldData };
    newData[field!] = event.newValue;
    const tx = {
      update: [this.resetValuesForNonEditableColumns(newData)],
    };
    event.api.applyTransaction(tx);
    this.gridApi.redrawRows();
    this.getRawData();
  }

  public sendData() {
    this.tprDataService.appendTransactionData(this.getRawData());
  }

  getRawData(): any[] {
    let rawData: any[] = [];
    this.gridApi.forEachNode(({ data }) => {
      this.checkIfValid(data);
      rawData.push(data);
    });
    return rawData;
  }

  checkIfValid(result: any) {
    const colDefs = this.gridApi.getColumnDefs();
    const objectKeys = Object.keys(result);
    let keysToCheck: string[] = [];
    if (result.correction === 'KC01') {
      keysToCheck.push('WartoscKorekty', 'KodWalutyKorekty');
    }
    keysToCheck = [...keysToCheck, ...this.defaultKeys()];

    this.tprDataService.setIsError(false);
    colDefs &&
      colDefs.forEach((colDef: any) => {
        const isEditable = typeof colDef.editable === 'function' ? colDef.editable({ data: result }) : colDef.editable;
        if (!isEditable) return;
        //sprawdzenie czy wymagane pola są uzupełnione
        const isObjectIncomplete = keysToCheck.some(key => {
          return !objectKeys.some(objectKey => {
            const keyValid = objectKey === key;
            const hasValue = result[objectKey] !== null;
            return keyValid && hasValue;
          });
        });
        if (isObjectIncomplete) {
          this.tprDataService.setIsError(true);
          return;
        }
        for (const key of objectKeys) {
          if (!isDefined(result[key]) || result[key] === '') {
            this.tprDataService.setIsError(true);
            return;
          }
        }
      });
  }

  public readonly getRowId: GetRowIdFunc = (params: GetRowIdParams) => params.data.Id;

  public resetValuesForNonEditableColumns(oldData: any) {
    const newRow: any = { ...oldData };
    const colDefs = this.gridApi.getColumnDefs();
    colDefs &&
      colDefs.forEach((colDef: any) => {
        if (colDef.editable && typeof colDef.editable === 'function') {
          const isEditable = colDef.editable({ data: oldData });
          if (!isEditable) {
            delete newRow[colDef.field];
          }
        }
      });
    return newRow;
  }
}
