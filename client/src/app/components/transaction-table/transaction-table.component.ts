import { Component, Input, OnInit, signal } from '@angular/core';
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
import { DropdownCellComponent } from '../dropdown-cell/dropdown-cell.component';
import {
  CategorizedTransaction,
  Transaction,
} from 'app/services/tpr/tpr-input.types';
import { columnTypes } from './column-types';
import {
  TransactionATable,
  TransactionBTable,
} from 'app/services/tpr/tpr-table.types';
import { transactionBColDefs } from './column-definitions/type-B-column-definitions.consts';
import { transactionDColDefs } from './column-definitions/type-D-column-definitions.consts';
import { transactionFColDefs } from './column-definitions/type-F-column-definitions.consts';

@Component({
  selector: 'app-transaction-table',
  standalone: true,
  imports: [AgGridAngular, DropdownCellComponent],
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss'],
})
export class TransactionTableComponent implements OnInit {
  @Input() public transactionType: string = '';
  @Input() public inputData: CategorizedTransaction[] | null = null;
  public data = signal<
    TransactionATable[] | TransactionBTable[] | Transaction[]
  >([]);
  public colDefs: ColDef[] = [];
  public gridApi!: GridApi<TransactionATable>;
  public defaultColDef: ColDef = {
    editable: true,
  };

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
    console.log('onGridReady');
  }

  public columnTypes: {
    [key: string]: ColTypeDef;
  } = columnTypes;

  onCellEditRequest(event: CellEditRequestEvent) {
    const oldData = event.data;
    const field = event.colDef.field;
    const newValue = event.newValue;
    const newData = { ...oldData };
    newData[field!] = event.newValue;
    console.log('onCellEditRequest, updating ' + field + ' to ' + newValue);
    const tx = {
      update: [newData],
    };
    event.api.applyTransaction(tx);
    this.gridApi.redrawRows();
  }

  // getRawData() {
  //   let rawData: any[] = [];
  //   this.gridApi.forEachNode(({ data }) => rawData?.push(data));
  //   console.log(this.data());
  // }

  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => params.data.Id;
}
