import { INumberCellEditorParams, ISelectCellEditorParams, ITooltipParams } from 'ag-grid-community';
import { ColDef } from 'ag-grid-community/dist/types/core/entities/colDef';
import { getCellClass } from '../column-types';

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
    cellClass: ({ data }) => getCellClass(data.IdentyfikatorKontrahenta !== 'NIP'),
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
    cellClass: ({ data }) => getCellClass(data.IdentyfikatorKontrahenta !== 'PESEL'),
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
