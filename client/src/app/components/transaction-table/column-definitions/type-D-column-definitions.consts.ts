import { ColDef } from 'ag-grid-community/dist/types/core/entities/colDef';
import {
  INumberCellEditorParams,
  ISelectCellEditorParams,
} from 'ag-grid-community';

export const transactionDColDefs: ColDef[] = [
  {
    field: 'Kategoria',
    colId: 'Kategoria',
    headerName: 'Kategoria',
    headerTooltip: 'Kategoria',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
  },
  {
    field: 'Przedmiot',
    colId: 'Przedmiot',
    headerName: 'Przedmiot',
    headerTooltip: 'Przedmiot',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
  },
  {
    field: 'Wartosc',
    colId: 'Wartosc',
    headerName: 'Wartość transakcji',
    headerTooltip: 'Wartość transakcji',
    cellEditor: 'agNumberCellEditor',
    cellDataType: 'number',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
  },
  {
    field: 'KodWaluty',
    headerName: 'Kod waluty transakcji',
    headerTooltip: 'Kod waluty transakcji',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
  },
  {
    field: 'Korekta',
    headerName: 'Korekta',
    headerTooltip: 'Korekta',
    cellEditor: 'agSelectCellEditor',
    cellDataType: 'text',
    cellEditorParams: {
      values: ['KC01', 'KC02'],
    } as ISelectCellEditorParams,
  },
  {
    field: 'WartoscKorekty',
    headerName: 'Wartość korekty',
    headerTooltip: 'Wartość korekty',
    cellEditor: 'agNumberCellEditor',
    type: 'correctionType',
    cellDataType: 'number',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
  },
  {
    field: 'KodWalutyKorekty',
    headerName: 'Kod waluty korekty',
    headerTooltip: 'Kod waluty korekty',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
    type: 'correctionType',
  },
  {
    field: 'BrakKorektyCT5',
    headerName: 'Brak Korekty',
    headerTooltip: 'Brak Korekty',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
    type: 'correctionType',
    editable: false,
    valueFormatter: () => 'ZW01',
    cellStyle: ({ data }) =>
      data.Korekta !== 'KC02'
        ? { backgroundColor: 'var(--bg2-light)' }
        : { backgroundColor: '#fff' },
  },
  {
    field: 'Kompensata',
    headerName: 'Kompensata',
    headerTooltip: 'Kompensata',
    cellEditor: 'agSelectCellEditor',
    cellDataType: 'text',
    cellEditorParams: {
      values: ['KS01', 'KS02', 'KS03'],
    } as ISelectCellEditorParams,
  },
  {
    field: 'KodWalutyKapitalu',
    headerName: 'Kod waluty kapitału',
    headerTooltip: 'Kod waluty kapitału',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
  },
  {
    field: 'KodWalutyZadluzenia',
    headerName: 'Kod waluty zadłużenia',
    headerTooltip: 'Kod waluty zadłużenia',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
  },
  {
    field: 'KodWalutyOdsetekMiesiecznych',
    headerName: 'Kod waluty odsetek miesięcznych',
    headerTooltip: 'Kod waluty odsetek miesięcznych',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
  },
  {
    field: 'KodWalutyOdsetekKwartalnych',
    headerName: 'Kod waluty odsetek kwartalnych',
    headerTooltip: 'Kod waluty odsetek kwartalnych',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
  },
  {
    field: 'TransakcjaZwolniona',
    headerName: 'Transakcja zwolniona na podst. art. 11n pkt 1-2 ustawy',
    headerTooltip: 'Transakcja zwolniona na podst. art. 11n pkt 1-2 ustawy',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
    editable: false,
    valueFormatter: () => 'ZW01',
  },
  {
    field: 'PodstawaZwolnienia',
    headerName: 'Podstawa zwolnienia',
    headerTooltip: 'Podstawa zwolnienia',
    cellEditor: 'agSelectCellEditor',
    cellDataType: 'text',
    cellEditorParams: {
      values: ['', '11n1', '11n1a', '11n2'],
    } as ISelectCellEditorParams,
  },
  {
    field: 'Kraj',
    headerName: 'Kraj',
    headerTooltip: 'Kraj',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
  },
  {
    field: 'NazwaKontrahenta',
    headerName: 'Nazwa kontrahenta',
    headerTooltip: 'Nazwa kontrahenta',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
  },
  {
    field: 'WartoscTransakcjiZKontrahentem',
    headerName: 'Wartość transakcji z kontrahentem',
    headerTooltip: 'Wartość transakcji z kontrahentem',
    cellDataType: 'number',
    cellEditor: 'agNumberCellEditor',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
  },
  {
    field: 'KodWalutyTransakcjiZKontrahentem',
    headerName: 'Kod waluty transakcji z kontrahentem',
    headerTooltip: 'Kod waluty transakcji z kontrahentem',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
  },
  {
    field: 'IdentyfikatorKontrahenta',
    headerName: 'Identyfikator kontrahenta',
    headerTooltip: 'Identyfikator kontrahenta',
    cellEditor: 'agSelectCellEditor',
    cellDataType: 'text',
    cellEditorParams: {
      values: ['NIP', 'PESEL', 'NrId'],
    } as ISelectCellEditorParams,
  },
  {
    field: 'Nip',
    headerName: 'NIP',
    headerTooltip: 'NIP',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
    editable: ({ data }) => {
      return data.IdentyfikatorKontrahenta === 'NIP';
    },
    cellStyle: ({ data }) =>
      data.IdentyfikatorKontrahenta !== 'NIP'
        ? { backgroundColor: 'var(--bg2-light)' }
        : { backgroundColor: '#fff' },
  },
  {
    field: 'Pesel',
    headerName: 'PESEL',
    headerTooltip: 'PESEL',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
    editable: ({ data }) => {
      return data.IdentyfikatorKontrahenta === 'PESEL';
    },
    cellStyle: ({ data }) =>
      data.IdentyfikatorKontrahenta !== 'PESEL'
        ? { backgroundColor: 'var(--bg2-light)' }
        : { backgroundColor: '#fff' },
  },
  {
    field: 'NrId',
    headerName: 'Numer Id',
    headerTooltip: 'Numer Id',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
    type: 'NrIdType',
  },
  {
    field: 'KodKrajuWydania',
    headerName: 'Kod kraju wydania',
    headerTooltip: 'Kod kraju wydania',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
    type: 'NrIdType',
  },
];
