import { ColDef } from 'ag-grid-community/dist/types/core/entities/colDef';
import {
  INumberCellEditorParams,
  ISelectCellEditorParams,
  ITooltipParams,
} from 'ag-grid-community';

export const transactionCColDefs: ColDef[] = [
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
    field: 'Zadluzenie',
    headerName: 'Zadłużenie',
    headerTooltip: 'Zadłużenie',
    cellDataType: 'number',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
  },
  {
    field: 'KodWalutyZadluzenia',
    headerName: 'Kod waluty zadłużenia',
    headerTooltip: 'Kod waluty zadłużenia',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
  },
  {
    field: 'WysokoscOdsetekMemorialowo',
    headerName: 'Wysokość odsetek memoriałowo',
    headerTooltip: 'Wysokość odsetek memoriałowo',
    cellDataType: 'number',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
  },
  {
    field: 'KodWalutyOdsetekMemorialowych',
    headerName: 'Kod waluty odsetek memoriałowych',
    headerTooltip: 'Kod waluty odsetek memoriałowych',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
  },
  {
    field: 'WysokoscOdsetekKasowo',
    headerName: 'Wysokość odsetek kasowo',
    headerTooltip: 'Wysokość odsetek kasowo',
    cellDataType: 'number',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
  },
  {
    field: 'KodWalutyOdsetekKasowych',
    headerName: 'Kod waluty odsetek kasowych',
    headerTooltip: 'Kod waluty odsetek kasowych',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
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
    cellEditor: 'agTextCellEditor',
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
    field: 'ZrodloDanychFinansowych',
    headerName: 'Źródło danych finansowych',
    headerTooltip: 'Źródło danych finansowych',
    type: 'MetodyBadaniaType',
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: ['ZD01', 'ZD02', 'ZD03', 'ZD04', 'ZD05'],
    } as ISelectCellEditorParams,
  },
  {
    field: 'KorektaMetodyBadania',
    headerName: 'Korekta dla metody badania',
    headerTooltip: 'Korekta dla metody badania',
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: ['KP01', 'KP02'],
    } as ISelectCellEditorParams,
    type: 'MetodyBadaniaType',
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
      data.correctionMetodyBadania === 'KP02',
    cellStyle: ({ data }) =>
      data.MetodyBadania === 'MW00' ||
      data.Zwolnienie !== 'ZW02' ||
      data.correctionMetodyBadania !== 'KP02'
        ? { backgroundColor: 'var(--bg2-light)' }
        : { backgroundColor: '#fff' },
  },
  {
    field: 'RodzajOprocentowania',
    headerName: 'Rodzaj oprocentowania',
    headerTooltip: 'Rodzaj oprocentowania',
    type: 'MetodyBadaniaType',
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: ['OP01', 'OP02', 'OP03', 'OP04', 'OP05'],
    } as ISelectCellEditorParams,
  },
  {
    field: 'Marza',
    headerName: 'Marża',
    headerTooltip: 'Marża',
    cellEditor: 'agNumberCellEditor',
    cellDataType: 'number',
    type: 'RodzajOprocentowania1Type',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
  },
  {
    field: 'NazwaStopyBazowej',
    headerName: 'Nazwa stopy bazowej',
    headerTooltip: 'Nazwa stopy bazowej',
    type: 'RodzajOprocentowania1Type',
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: [
        'SB01',
        'SB02',
        'SB03',
        'SB04',
        'SB05',
        'SB06',
        'SB07',
        'SB08',
        'SB09',
      ],
    } as ISelectCellEditorParams,
  },
  {
    field: 'InnaSB',
    headerName: 'InnaSB',
    headerTooltip: 'InnaSB',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
    editable: ({ data }) =>
      data.MetodyBadania !== 'MW00' &&
      data.Zwolnienie === 'ZW02' &&
      data.RodzajOprocentowania === 'OP01' &&
      data.NazwaStopyBazowej === 'SB09',
    cellStyle: ({ data }) =>
      data.Zwolnienie !== 'ZW02' ||
      data.MetodyBadania === 'MW00' ||
      data.RodzajOprocentowania !== 'OP01' ||
      data.NazwaStopyBazowej !== 'SB09'
        ? { backgroundColor: 'var(--bg2-light)' }
        : { backgroundColor: '#fff' },
  },
  {
    field: 'TerminStopyBazowej',
    headerName: 'Termin stopy bazowej',
    headerTooltip: 'Termin stopy bazowej',
    type: 'RodzajOprocentowania1Type',
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: ['TB01', 'TB02', 'TB03', 'TB04', 'TB05', 'TB06', 'TB07'],
    } as ISelectCellEditorParams,
  },
  {
    field: 'Okres',
    headerName: 'Okres',
    headerTooltip: 'Okres',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
    editable: ({ data }) =>
      data.MetodyBadania !== 'MW00' &&
      data.Zwolnienie === 'ZW02' &&
      data.RodzajOprocentowania === 'OP01' &&
      data.TerminStopyBazowej === 'TB07',
    cellStyle: ({ data }) =>
      data.Zwolnienie !== 'ZW02' ||
      data.MetodyBadania === 'MW00' ||
      data.RodzajOprocentowania !== 'OP01' ||
      data.TerminStopyBazowej !== 'TB07'
        ? { backgroundColor: 'var(--bg2-light)' }
        : { backgroundColor: '#fff' },
  },
  {
    field: 'PoziomOprocentowania',
    headerName: 'Poziom oprocentowania',
    headerTooltip: 'Poziom oprocentowania',
    cellEditor: 'agNumberCellEditor',
    cellDataType: 'number',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
    editable: ({ data }) =>
      data.MetodyBadania !== 'MW00' &&
      data.Zwolnienie === 'ZW02' &&
      data.RodzajOprocentowania === 'OP02',
    cellStyle: ({ data }) =>
      data.Zwolnienie !== 'ZW02' ||
      data.MetodyBadania === 'MW00' ||
      data.RodzajOprocentowania !== 'OP02'
        ? { backgroundColor: 'var(--bg2-light)' }
        : { backgroundColor: '#fff' },
  },
  {
    field: 'PoziomOprocentowaniaMinimalny',
    headerName: 'Poziom oprocentowania minimalny',
    headerTooltip: 'Poziom oprocentowania minimalny',
    cellEditor: 'agNumberCellEditor',
    cellDataType: 'number',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
    type: 'RodzajOprocentowania3Type',
  },
  {
    field: 'PoziomOprocentowaniaMaksymalny',
    headerName: 'Poziom oprocentowania maksymalny',
    headerTooltip: 'Poziom oprocentowania maksymalny',
    cellEditor: 'agNumberCellEditor',
    cellDataType: 'number',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
    type: 'RodzajOprocentowania3Type',
  },
  {
    field: 'RodzajPrzedzialu',
    headerName: 'Rodzaj przedziału',
    headerTooltip: 'Rodzaj przedziału',
    type: 'MetodyBadaniaType',
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: ['RP01', 'RP02', 'RP03'],
    } as ISelectCellEditorParams,
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
    editable: ({ data }) =>
      data.MetodyBadania !== 'MW00' &&
      data.Zwolnienie === 'ZW02' &&
      data.RodzajPrzedzialu !== 'RP02',
    cellStyle: ({ data }) =>
      data.Zwolnienie !== 'ZW02' ||
      data.MetodyBadania === 'MW00' ||
      data.RodzajPrzedzialu === 'RP02'
        ? { backgroundColor: 'var(--bg2-light)' }
        : { backgroundColor: '#fff' },
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
    field: 'OpisPrzedzialu',
    headerName: 'Opis przedziału',
    headerTooltip: 'Opis przedziału',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
    editable: ({ data }) =>
      data.MetodyBadania !== 'MW00' &&
      data.Zwolnienie === 'ZW02' &&
      data.RodzajPrzedzialu === 'RP03',
    cellStyle: ({ data }) =>
      data.Zwolnienie !== 'ZW02' ||
      data.MetodyBadania === 'MW00' ||
      data.RodzajPrzedzialu !== 'RP03'
        ? { backgroundColor: 'var(--bg2-light)' }
        : { backgroundColor: '#fff' },
  },
];
