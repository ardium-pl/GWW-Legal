import {
  INumberCellEditorParams,
  ISelectCellEditorParams,
  ITooltipParams,
} from 'ag-grid-community';
import { ColDef } from 'ag-grid-community/dist/types/core/entities/colDef';

export const transactionEColDefs: ColDef[] = [
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
    headerName: 'Kod waluty',
    headerTooltip: 'Kod waluty',
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
    field: 'RodzajWartosciNiematerialnych',
    headerName: 'Rodzaj wartości niematerialnych',
    headerTooltip: 'Rodzaj wartości niematerialnych',
    cellEditor: 'agSelectCellEditor',
    cellDataType: 'text',
    cellEditorParams: {
      values: ['DN01', 'DN02', 'DN03', 'DN04', 'DN05', 'DN06', 'DN07', 'DN08'],
    } as ISelectCellEditorParams,
  },
  {
    field: 'Zwolnienie',
    headerName: 'Zwolnienie',
    headerTooltip: 'Zwolnienie',
    cellEditor: 'agSelectCellEditor',
    cellDataType: 'text',
    cellEditorParams: {
      values: ['ZW01', 'ZW02'],
    } as ISelectCellEditorParams,
  },
  {
    field: 'PodstawaZwolnienia',
    headerName: 'Podstawa zwolnienia',
    headerTooltip: 'Podstawa zwolnienia',
    cellEditor: 'agSelectCellEditor',
    cellDataType: 'text',
    type: 'exemptionType',
    cellEditorParams: {
      values: ['', '11n1', '11n1a', '11n2'],
    } as ISelectCellEditorParams,
  },
  {
    field: 'KodKrajuZwolnienia',
    headerName: 'Kod kraju',
    headerTooltip: 'Kod kraju',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
    type: 'exemptionType',
  },
  {
    field: 'WartoscTransakcjiZwolnienia',
    headerName: 'Wartość transakcji dla kraju',
    headerTooltip: 'Wartość transakcji dla kraju',
    cellEditor: 'agNumberCellEditor',
    cellDataType: 'number',
    type: 'exemptionType',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
  },
  {
    field: 'KodWalutyKraju',
    headerName: 'Kod waluty dla kraju',
    headerTooltip: 'Kod waluty dla kraju',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
    type: 'exemptionType',
  },
  {
    field: 'RodzajTransakcji',
    headerName: 'Rodzaj transakcji',
    headerTooltip: 'Rodzaj transakcji',
    cellEditor: 'agSelectCellEditor',
    type: 'exemptionSecondType',
    cellEditorParams: {
      values: ['TK01', 'TK02'],
    } as ISelectCellEditorParams,
  },
  {
    field: 'KodKrajuTransakcji',
    headerName: 'Kod kraju',
    headerTooltip: 'Kod kraju',
    cellEditor: 'agTextCellEditor',
    type: 'exemptionSecondType',
    cellDataType: 'text',
  },
  {
    field: 'WartośćTransakcjiKraju',
    headerName: 'Wartość transakcji dla kraju',
    headerTooltip: 'Wartość transakcji dla kraju',
    type: 'transactionType',
    cellEditor: 'agNumberCellEditor',
    cellDataType: 'number',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
  },
  {
    field: 'KodWalutyKrajuTransakcji',
    headerName: 'Kod waluty dla kraju',
    headerTooltip: 'Kod waluty dla kraju',
    type: 'transactionType',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
  },
  {
    field: 'MetodyBadania',
    headerName: 'Metoda badania',
    headerTooltip: 'Metoda badania',
    type: 'exemptionSecondType',
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: ['MW00', 'MW01', 'MW02', 'MW03', 'MW04', 'MW05', 'MW06'],
    } as ISelectCellEditorParams,
  },
  {
    field: 'RodzajAnalizy',
    headerName: 'Rodzaj analizy',
    headerTooltip: 'Rodzaj analizy',
    type: 'MetodyBadaniaType',
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: [
        'RA01',
        'RA02',
        'RA03',
        'RA04',
        'RA05',
        'RA06',
        'RA07',
        'RA08',
        'RA09',
      ],
    } as ISelectCellEditorParams,
  },
  {
    field: 'SposobWyrazeniaCeny',
    headerName: 'Sposób wyrażenia ceny',
    headerTooltip: 'Sposób wyrażenia ceny',
    type: 'MetodyBadaniaType',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
  },
  {
    field: 'SposobKalkulacjiOplaty',
    headerName: 'Sposób kalkulacji opłaty',
    headerTooltip: 'Sposób kalkulacji opłaty',
    type: 'MetodyBadaniaType',
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: ['SK01', 'SK02', 'SK03', 'SK04', 'SK05', 'SK06'],
    } as ISelectCellEditorParams,
  },
  {
    field: 'PoziomOplaty',
    headerName: 'Poziom opłaty',
    headerTooltip: 'Poziom opłaty',
    type: 'MetodyBadaniaType',
    cellEditor: 'agNumberCellEditor',
    cellDataType: 'number',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
  },
  {
    field: 'DolnaGranicaPrzedzialu',
    headerName: 'Dolna granica przedziału',
    headerTooltip: 'Dolna granica przedziału',
    type: 'MetodyBadaniaType',
    cellEditor: 'agNumberCellEditor',
    cellDataType: 'number',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
  },
  {
    field: 'GornaGranicaPrzedzialu',
    headerName: 'Górna granica przedziału',
    headerTooltip: 'Górna granica przedziału',
    type: 'MetodyBadaniaType',
    cellEditor: 'agNumberCellEditor',
    cellDataType: 'number',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
  },
  {
    field: 'KorektaPorownywalnosci',
    headerName: 'Korekta porównywalności',
    headerTooltip: 'Korekta porównywalności',
    type: 'exemptionSecondType',
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: ['KP01', 'KP02'],
    } as ISelectCellEditorParams,
  },
  {
    field: 'KorektaPorownywalnosciProg',
    headerName: 'Korekta porównywalności próg',
    headerTooltip: 'Korekta porównywalności próg',
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: ['KP02A', 'KP02B', 'KP02C'],
    } as ISelectCellEditorParams,
    editable: ({ data }) =>
      data.MetodyBadania !== 'MW00' &&
      data.Zwolnienie === 'ZW02' &&
      data.KorektaPorownywalnosci === 'KP02',
    cellStyle: ({ data }) =>
      data.Zwolnienie !== 'ZW02' ||
      data.MetodyBadania === 'MW00' ||
      data.KorektaPorownywalnosci !== 'KP02'
        ? { backgroundColor: 'var(--bg2-light)' }
        : { backgroundColor: '#fff' },
  },
];
