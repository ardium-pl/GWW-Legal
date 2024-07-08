import { ColDef } from 'ag-grid-community/dist/types/core/entities/colDef';
import {
  INumberCellEditorParams,
  ISelectCellEditorParams,
  ITooltipParams,
} from 'ag-grid-community';

// User friendly code mappings
const correctionCodeMapping: Record<string, string> = {
  KC01: 'Podatnik dokonał korekty cen transferowych',
  KC02: 'Podatnik nie dokonał korekty cen transferowych',
};

const compensationCodeMapping: Record<string, string> = {
  KS01: 'Korzyści podlegały kompensacie na podstawie § 9 ust. 1 Rozporządzenia TP',
  KS02: 'Dochód podlegał kompensacie na podstawie § 9 ust. 2 Rozporządzenia TP',
  KS03: 'Brak kompensaty',
};

const exemptionCodeMapping: Record<string, string> = {
  ZW01: 'Transakcja KORZYSTA ze zwolnienia na podstawie art 11-n pkt 1-2',
};

// Reverse user frendly code mappings
const correctionCodeReverseMapping: Record<string, string> = {
  'Podatnik dokonał korekty cen transferowych': 'KC01',
  'Podatnik nie dokonał korekty cen transferowych': 'KC02',
};

const compensationCodeReverseMapping: Record<string, string> = {
  'Korzyści podlegały kompensacie na podstawie § 9 ust. 1 Rozporządzenia TP': 'KS01',
  'Dochód podlegał kompensacie na podstawie § 9 ust. 2 Rozporządzenia TP': 'KS02',
  'Brak kompensaty': 'KS03',
};

const exemptionCodeReverseMapping: Record<string, string> = {
  'Transakcja KORZYSTA ze zwolnienia na podstawie art 11-n pkt 1-2': 'ZW01',
};

export const transactionFColDefs: ColDef[] = [
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
      values: Object.values(correctionCodeMapping),
    } as ISelectCellEditorParams,
    valueFormatter: params => correctionCodeMapping[params.value],
    valueParser: params => correctionCodeReverseMapping[params.newValue],
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
      values: Object.values(compensationCodeMapping),
    } as ISelectCellEditorParams,
    valueFormatter: params => compensationCodeMapping[params.value],
    valueParser: params => compensationCodeReverseMapping[params.newValue],
  },
  {
    field: 'TransakcjaZwolniona',
    headerName: 'Transakcja zwolniona na podst. art. 11n pkt 1-2 ustawy',
    headerTooltip: 'Transakcja zwolniona na podst. art. 11n pkt 1-2 ustawy',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
    editable: false,
    valueFormatter: () => exemptionCodeMapping['ZW01'],
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
    field: 'KodKraju',
    headerName: 'Kod kraju',
    headerTooltip: 'Kod kraju',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
  },
  {
    field: 'WartoscTransakcjiKraju',
    headerName: 'Wartość transakcji dla kraju',
    headerTooltip: 'Wartość transakcji dla kraju',
    cellEditor: 'agNumberCellEditor',
    cellDataType: 'number',
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
  },
];
