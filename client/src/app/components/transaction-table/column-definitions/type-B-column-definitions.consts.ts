import { ColDef } from 'ag-grid-community/dist/types/core/entities/colDef';
import { INumberCellEditorParams, ISelectCellEditorParams, ITooltipParams } from 'ag-grid-community';

// Utility function to generate reverse mappings
function createReverseMapping(mapping: Record<string, string>): Record<string, string> {
  return Object.keys(mapping).reduce(
    (reverseMapping, key) => {
      reverseMapping[mapping[key]] = key;
      return reverseMapping;
    },
    {} as Record<string, string>
  );
}

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

const ZwolnienieCodeMapping: Record<string, string> = {
  ZW01: 'Transakcja KORZYSTA ze zwolnienia na podstawie art 11-n pkt 1-2',
  ZW02: 'Transakcja NIE KORZYSTA ze zwolenia na podstawie art 11-n pkt 1-2',
};

export const transactionBColDefs: ColDef[] = [
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
      values: Object.values(createReverseMapping(correctionCodeMapping)),
    } as ISelectCellEditorParams,
    valueFormatter: params => correctionCodeMapping[params.value],
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
      values: Object.values(createReverseMapping(compensationCodeMapping)),
    } as ISelectCellEditorParams,
    valueFormatter: params => compensationCodeMapping[params.value],
  },
  {
    field: 'TransakcjaZwolniona',
    headerName: 'Transakcja zwolniona na podst. art. 11n pkt 1-2 ustawy',
    headerTooltip: 'Transakcja zwolniona na podst. art. 11n pkt 1-2 ustawy',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
    editable: false,
    valueFormatter: () => ZwolnienieCodeMapping['ZW01'],
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
