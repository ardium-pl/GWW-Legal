import { Component, Input } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  CellClassParams,
  CellEditRequestEvent,
  ColDef,
  ColTypeDef,
  EditableCallbackParams,
  GetRowIdFunc,
  GetRowIdParams,
  GridApi,
  GridReadyEvent,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { transactionFColDefs } from './table.consts';
import { DropdownCellComponent } from '../dropdown-cell/dropdown-cell.component';
import {
  Transaction,
  TransactionTable,
} from 'app/services/tpr/tpr-input.types';
import { columnTypes } from './column-types';

@Component({
  selector: 'app-form-table',
  standalone: true,
  imports: [AgGridAngular, DropdownCellComponent],
  templateUrl: './form-table.component.html',
  styleUrls: ['./form-table.component.scss'],
})
export class FormTableComponent {
  public data: TransactionTable[] | null = [
    {
      KategoriaA: 'string',
      PrzedmiotA: 'string',
      WartoscA: 10,
      KodWaluty: 'string',
      Korekta: 'KC02',
      WartoscKorekty: 10,
      KodWalutyKorekty: 'string',
      Kompensata: 'KS01',
      Zwolnienie: 'ZW01',
      PodstawaZwolnienia: '11n1',
      KodKrajuZwolnienia: 'string',
      WartoscTransakcjiZwolnienia: 10,
      KodWalutyKraju: 'string',
      RodzajTransakcji: 'TK01',
      KodKrajuTransakcji: 'string',
      WartośćTransakcjiKraju: 10,
      KodWalutyKrajuTransakcji: 'string',
      MetodyBadania: 'MW02',
      SposobWeryfikacji: 'SW03',
      KorektaMetodyBadania: 'KP02',
      KorektaPorownywalnosciProg: 10,
    },
  ];
  public colDefs: ColDef[] = transactionFColDefs;
  public gridApi!: GridApi<TransactionTable>;
  public defaultColDef: ColDef = {
    filter: true,
    enableCellChangeFlash: true,
    editable: true,
  };

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
    this.gridApi.redrawRows();
    // this.gridApi.setColumnsVisible(['KategoriaA'], false);
    if (event.colDef.field === 'Korekta') {
      event.newValue === 'KC01'
        ? this.gridApi.applyColumnState({
            state: [
              { colId: 'WartoscKorekty', hide: false },
              { colId: 'KodWalutyKorekty', hide: false },
            ],
          })
        : this.gridApi.applyColumnState({
            state: [
              { colId: 'WartoscKorekty', hide: true },
              { colId: 'KodWalutyKorekty', hide: true },
            ],
          });
    }

    event.api.applyTransaction(tx);
  }

  getRowData() {
    let rawData: TransactionTable[] | null = null;
    this.gridApi.forEachNode(({ data }) => data && rawData?.push(data));
  }

  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => params.data.id;
}
