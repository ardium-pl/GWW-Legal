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
import {
  defaultData,
  transactionAColDefs,
} from './column-definitions/type-A-column-definitions.consts';
import { DropdownCellComponent } from '../dropdown-cell/dropdown-cell.component';
import {
  Transaction,
  TransactionTableInput,
} from 'app/services/tpr/tpr-input.types';
import { columnTypes } from './column-types';
import {
  TransactionATable,
  TransactionBTable,
} from 'app/services/tpr/tpr-table.types';
import { transactionBColDefs } from './column-definitions/type-B-column-definitions.consts';

@Component({
  selector: 'app-transaction-table',
  standalone: true,
  imports: [AgGridAngular, DropdownCellComponent],
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss'],
})
export class TransactionTableComponent implements OnInit {
  @Input() public transactionType: string = '';
  @Input() public inputData: Transaction[] | null = null;
  public data = signal<
    TransactionATable[] | TransactionBTable[] | TransactionTableInput[]
  >([defaultData]);
  public colDefs: ColDef[] = [];
  public gridApi!: GridApi<TransactionATable>;
  public defaultColDef: ColDef = {
    filter: true,
    enableCellChangeFlash: true,
    editable: true,
  };

  public ngOnInit(): void {
    console.log(this.transactionType);
    this.colDefs = this.getColumnDef(this.transactionType);
    if (this.inputData) {
      const modifiedInputData: TransactionTableInput[] = this.inputData.map(
        (transaction) => {
          const newTransaction = {
            Kategoria: transaction.transactionCategory,
            Przedmiot: transaction.subjectMatter,
            Wartosc: transaction.transactionValue,
            KodWaluty: transaction.currencyCode,
            Korekta: transaction.correction,
            Kompensata: transaction.compensation,
          };
          return newTransaction;
        },
      );
      this.data.set(modifiedInputData);
    }
  }

  getColumnDef(transactionType: string) {
    switch (transactionType) {
      case 'A':
        return transactionAColDefs;
      case 'B':
        return transactionBColDefs;
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
    const newValue = event.newValue;
    const newData = { ...oldData };
    newData[field!] = event.newValue;
    console.log('onCellEditRequest, updating ' + field + ' to ' + newValue);
    const tx = {
      update: [newData],
    };
    event.api.applyTransaction(tx);
    this.gridApi.redrawRows();
    this.getRawData();
  }

  getRawData() {
    let rawData: any[] = [];
    this.gridApi.forEachNode(({ data }) => rawData?.push(data));
    console.log(rawData);
  }

  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => params.data.id;
}
