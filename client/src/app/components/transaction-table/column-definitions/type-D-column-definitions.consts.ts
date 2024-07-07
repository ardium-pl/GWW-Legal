import { ColDef } from 'ag-grid-community/dist/types/core/entities/colDef';
import {
  INumberCellEditorParams,
  ISelectCellEditorParams,
  ITooltipParams,
} from 'ag-grid-community';

export const transactionDColDefs: ColDef[] = [
  {
    field: 'transactionCategory',
    colId: 'Kategoria',
    headerName: 'Kategoria',
    headerTooltip: 'Kategoria',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
  },
  {
    field: 'subjectMatter',
    colId: 'Przedmiot',
    headerName: 'Przedmiot',
    headerTooltip: 'Przedmiot',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
    tooltipValueGetter: (p: ITooltipParams) => p.value,
  },
  {
    field: 'transactionValue',
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
    field: 'currencyCode',
    headerName: 'Kod waluty transakcji',
    headerTooltip: 'Kod waluty transakcji',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
  },
  {
    field: 'correction',
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
    field: 'compensation',
    headerName: 'Kompensata',
    headerTooltip: 'Kompensata',
    cellEditor: 'agSelectCellEditor',
    cellDataType: 'text',
    cellEditorParams: {
      values: ['KS01', 'KS02', 'KS03'],
    } as ISelectCellEditorParams,
  },
  {
    field: 'Kapital',
    headerName: 'Kapitał',
    headerTooltip: 'Kapitał',
    cellEditor: 'agNumberCellEditor',
    cellDataType: 'number',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
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
    field: 'WysokoscOdsetekMiesiecznych',
    headerName: 'Wysokość odsetek memoriałowych',
    headerTooltip: 'Wysokość odsetek memoriałowych',
    cellDataType: 'number',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
  },
  {
    field: 'KodWalutyOdsetekMiesiecznych',
    headerName: 'Kod waluty odsetek memoriałowych',
    headerTooltip: 'Kod waluty odsetek memoriałowych',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
  },
  {
    field: 'WysokoscOdsetekKwartalnych',
    headerName: 'Wysokość odsetek kasowych',
    headerTooltip: 'Wysokość odsetek kasowych',
    cellDataType: 'number',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
  },
  {
    field: 'KodWalutyOdsetekKwartalnych',
    headerName: 'Kod waluty odsetek kasowych',
    headerTooltip: 'Kod waluty odsetek kasowych',
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
