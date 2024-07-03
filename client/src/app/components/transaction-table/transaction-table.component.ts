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
import { transactionAColDefs } from './table.consts';
import { DropdownCellComponent } from '../dropdown-cell/dropdown-cell.component';
import {
  Transaction,
  TransactionTable,
  TransactionTableInput,
} from 'app/services/tpr/tpr-input.types';
import { columnTypes } from './column-types';

@Component({
  selector: 'app-transaction-table',
  standalone: true,
  imports: [AgGridAngular, DropdownCellComponent],
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss'],
})
export class TransactionTableComponent implements OnInit {
  @Input() public inputData: Transaction[] | null = null;
  public data = signal<TransactionTable[] | TransactionTableInput[]>([
    {
      Kategoria: '',
      Przedmiot: '',
      Wartosc: 0,
      KodWaluty: '',
      Korekta: 'KC01',
      WartoscKorekty: 0,
      KodWalutyKorekty: '',
      Kompensata: 'KS01',
      Zwolnienie: 'ZW01',
      PodstawaZwolnienia: '11n1',
      KodKrajuZwolnienia: '',
      WartoscTransakcjiZwolnienia: 0,
      KodWalutyKraju: '',
      RodzajTransakcji: 'TK01',
      KodKrajuTransakcji: '',
      WartośćTransakcjiKraju: 0,
      KodWalutyKrajuTransakcji: '',
      MetodyBadania: 'MW01',
      SposobWeryfikacji: 'SW01',
      KorektaMetodyBadania: 'KP01',
      KorektaPorownywalnosciProg: 0,
      SposobUjeciaCeny: 'CK01',
      Waluta1: '',
      CenaMinimalna: 0,
      CenaMaksymalna: 0,
      Miara1: '',
      RodzajPrzedzialu: 'RP01',
      CenaPorownywalnaMin: 0,
      CenaPorownywalnaMax: 0,
      OpisPrzedzialu: '',
      WysokoscCenyPorownywalnej: 0,
      ProcentMinimalny: 0,
      ProcentMaksymalny: 0,
      Miara2: '',
      DolnaGranica: 0,
      GornaGranica: 0,
      WysokoscWskaznikaFinansowego: 0,
      WskaznikFinansowy: 'WF01',
      WynikTransakcji: 0,
      RodzajPorownania: 'PR01',
      PodmiotBadany: 'PB01',
      KryteriumGeograficzne: 'KG01',
      RodzajMetodyPodzialuZysku: 'PZ01',
      Strata: false,
      ZakladanyZysk: 0,
      ZrealizowanyZysk: 0,
      TechWyceny: 'TW01',
      WspolczynnikDyskontowy: 0,
      OkresPrognozy: 'TB01',
      TerminInny: 'AZ01',
      ZrodloDanychZgodnosci: 'AZ01',
    },
  ]);
  public colDefs: ColDef[] = transactionAColDefs;
  public gridApi!: GridApi<TransactionTable>;
  public defaultColDef: ColDef = {
    filter: true,
    enableCellChangeFlash: true,
    editable: true,
  };

  public ngOnInit(): void {
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
  }

  getRawData() {
    let rawData: TransactionTable[] | null = null;
    this.gridApi.forEachNode(({ data }) => data && rawData?.push(data));
  }

  public getRowId: GetRowIdFunc = (params: GetRowIdParams) => params.data.id;
}
