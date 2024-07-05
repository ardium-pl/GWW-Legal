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
import { transactionAColDefs } from './column-definitions/type-A-column-definitions.consts';
import { CategorizedTransaction } from 'app/services/tpr/tpr-input.types';
import { columnTypes } from './column-types';
import {
  TransactionATable,
  TransactionBTable,
  TransactionCTable,
  TransactionDTable,
  TransactionETable,
  TransactionFTable,
} from 'app/services/tpr/tpr-table.types';
import { transactionBColDefs } from './column-definitions/type-B-column-definitions.consts';
import { transactionDColDefs } from './column-definitions/type-D-column-definitions.consts';
import { transactionFColDefs } from './column-definitions/type-F-column-definitions.consts';
import { TprDataServiceService } from 'app/services/tpr/tpr-data-service.service';

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
  public data = signal<
    | TransactionATable[]
    | TransactionBTable[]
    | TransactionCTable[]
    | TransactionDTable[]
    | TransactionETable[]
    | TransactionFTable[]
    | CategorizedTransaction[]
  >([]);
  public colDefs: ColDef[] = [];
  public defaultColDef: ColDef = {
    editable: true,
  };
  private gridApi!: GridApi<any>;

  public ngOnInit(): void {
    this.colDefs = this.getColumnDef(this.transactionType);
    if (this.inputData) {
      this.data.set(this.inputData);
    }
  }

  getColumnDef(transactionType: string) {
    switch (transactionType) {
      case 'A':
        return transactionAColDefs;
      case 'B':
        return transactionBColDefs;
      case 'C':
        return transactionBColDefs;
      case 'D':
        return transactionDColDefs;
      case 'E':
        return transactionBColDefs;
      case 'F':
        return transactionFColDefs;
      default:
        return transactionAColDefs;
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
      this.removeNullUndefined(result);
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
