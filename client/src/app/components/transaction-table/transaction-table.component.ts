import { Component, Input, OnInit, inject, signal } from '@angular/core';
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
import { CategorizedTransaction } from 'app/services/tpr/tpr-input.types';
import { columnTypes } from './column-types';
import { TprDataServiceService } from 'app/services/tpr/tpr-data-service.service';
import { getColumnDefUtil } from 'app/utils/get-column-def.util';

@Component({
  selector: 'app-transaction-table',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss'],
})
export class TransactionTableComponent implements OnInit {
  private readonly tprDataServiceService = inject(TprDataServiceService);
  @Input() public transactionType: string = '';
  @Input() public inputData: CategorizedTransaction[] = [];
  public data = signal<CategorizedTransaction[]>([]);
  public defaultKeys = signal<string[]>([]);
  public colDefs: ColDef[] = [];
  public defaultColDef: ColDef = {
    editable: true,
  };
  private gridApi!: GridApi<any>;

  public ngOnInit(): void {
    this.colDefs = getColumnDefUtil(this.transactionType, this.defaultKeys);
    if (this.inputData) {
      this.data.set(this.inputData);
    }
  }

  onGridReady(params: GridReadyEvent<any>) {
    this.gridApi = params.api;
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
  }

  public sendData() {
    this.tprDataServiceService.updateData(this.getRawData());
  }

  getRawData(): any[] {
    let rawData: any[] = [];
    this.gridApi.forEachNode(({ data }) => {
      const result: any = data;
      this.checkIfValid(result);
      rawData.push(result);
    });
    return rawData;
  }

  removeNullUndefined(obj: any) {
    for (const key in obj) {
      if (obj[key] === null || obj[key] === undefined) {
        delete obj[key];
      }
    }
  }

  checkIfValid(result: any) {
    const colDefs = this.gridApi.getColumnDefs();
    colDefs &&
      colDefs.forEach((colDef: any) => {
        const isEditable =
          typeof colDef.editable === 'function'
            ? colDef.editable({ data: result })
            : colDef.editable;
        if (isEditable) {
          const keysToCheck = this.defaultKeys();
          if (result.correction === 'KC01') {
            keysToCheck.push('WartoscKorekty', 'KodWalutyKorekty');
          }
          const objectKeys = Object.keys(result);
          const isObjectIncomplete = keysToCheck.some((key) => {
            return !objectKeys.some((objectKey) => {
              const keyValid = objectKey === key;
              const hasValue = result[objectKey] !== null;
              return keyValid && hasValue;
            });
          });
          if (isObjectIncomplete) {
            this.tprDataServiceService.updateIsError(true);
          } else {
            for (const key in keysToCheck) {
              if (
                result[keysToCheck[key]] === null ||
                result[keysToCheck[key]] === undefined ||
                result[keysToCheck[key]] === ''
              ) {
                this.tprDataServiceService.updateIsError(true);
              }
            }
          }
        } else {
          this.removeNullUndefined(result);
        }
      });
  }

  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => params.data.Id;

  public resetValuesForNonEditableColumns(oldData: any) {
    const newRow: any = { ...oldData };
    const colDefs = this.gridApi.getColumnDefs();
    colDefs &&
      colDefs.forEach((colDef: any) => {
        if (colDef.editable && typeof colDef.editable === 'function') {
          const isEditable = colDef.editable({ data: oldData });
          if (!isEditable) {
            newRow[colDef.field] = null;
          }
        }
      });
    return newRow;
  }
}
