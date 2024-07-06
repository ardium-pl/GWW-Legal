import { ColDef } from 'ag-grid-community/dist/types/core/entities/colDef';
import {
  INumberCellEditorParams,
  ISelectCellEditorParams,
  ITooltipParams,
} from 'ag-grid-community';

export const transactionAColDefs: ColDef[] = [
  {
    field: 'transactionCategory',
    colId: 'Kategoria',
    headerName: 'Kategoria',
    headerTooltip: 'Kategoria',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
  },
  {
    field: 'WynagrodzenieZaRestrukturyzacje',
    headerName: 'Wynagrodzenie za restrukturyzację',
    headerTooltip: 'Wynagrodzenie za restrukturyzację',
    type: 'RestrukturyzacjaType',
    cellEditor: 'agSelectCellEditor',
    cellDataType: 'text',
    cellEditorParams: {
      values: ['RM01', 'RM02', 'RM03', 'RM04', 'RM05'],
    } as ISelectCellEditorParams,
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
    field: 'Wklad',
    headerName: 'Wkład',
    headerTooltip: 'Wkład',
    cellEditor: 'agNumberCellEditor',
    cellDataType: 'number',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
    type: 'A2Type',
  },
  {
    field: 'KodWalutyWkladu',
    headerName: 'Kod waluty wkładu',
    headerTooltip: 'Kod waluty wkładu',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
    type: 'A2Type',
  },
  {
    field: 'WkladOgolny',
    headerName: 'Wkład ogólny',
    headerTooltip: 'Wkład ogólny',
    cellEditor: 'agNumberCellEditor',
    cellDataType: 'number',
    type: 'A2Type',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
  },
  {
    field: 'KodWalutyWkladuOgolnego',
    headerName: 'Kod waluty wkładu ogólnego',
    headerTooltip: 'Kod waluty wkładu ogólnego',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
    type: 'A2Type',
  },
  {
    field: 'Udzial',
    headerName: 'Udział',
    headerTooltip: 'Udział',
    type: 'A2Type',
    cellEditor: 'agSelectCellEditor',
    cellDataType: 'text',
    cellEditorParams: {
      values: ['UD01', 'UD02', 'UD03'],
    } as ISelectCellEditorParams,
  },
  {
    field: 'ProcentUdzialuWZyskach',
    headerName: 'Procent udziału w zyskach',
    headerTooltip: 'Procent udziału w zyskach',
    cellEditor: 'agNumberCellEditor',
    cellDataType: 'number',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
    editable: ({ data }) => {
      return data.transactionCategory === '3101' && data.Udzial === 'UD01';
    },
    cellStyle: ({ data }) =>
      data.transactionCategory !== '3101' || data.Udzial !== 'UD01'
        ? { backgroundColor: 'var(--bg2-light)' }
        : { backgroundColor: '#fff' },
  },
  {
    field: 'ProcentUdzialuWStracie',
    headerName: 'Procent udziału w stracie',
    headerTooltip: 'Procent udziału w stracie',
    cellEditor: 'agNumberCellEditor',
    cellDataType: 'number',
    type: 'A2Type',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
    editable: ({ data }) => {
      return data.transactionCategory === '3101' && data.Udzial === 'UD02';
    },
    cellStyle: ({ data }) =>
      data.transactionCategory !== '3101' || data.Udzial !== 'UD02'
        ? { backgroundColor: 'var(--bg2-light)' }
        : { backgroundColor: '#fff' },
  },
  {
    field: 'ProcentUdzialuWMajatkuLikwidacyjnym',
    headerName: 'Procent udziału w majątku likwidacyjnym',
    headerTooltip: 'Procent udziału w majątku likwidacyjnym',
    cellEditor: 'agNumberCellEditor',
    cellDataType: 'number',
    type: 'A2Type',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
    editable: ({ data }) => {
      return data.transactionCategory === '3101' && data.Udzial === 'UD03';
    },
    cellStyle: ({ data }) =>
      data.transactionCategory !== '3101' || data.Udzial !== 'UD03'
        ? { backgroundColor: 'var(--bg2-light)' }
        : { backgroundColor: '#fff' },
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
    field: 'SposobWeryfikacji',
    headerName: 'Sposób weryfikacji',
    headerTooltip: 'Sposób weryfikacji',
    cellEditor: 'agSelectCellEditor',
    type: 'analysisMethodType',
    cellEditorParams: {
      values: ['SW01', 'SW02', 'SW03', 'SW04'],
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
    editable: ({ data }) =>
      (data.MetodyBadania === 'MW01' ||
        data.MetodyBadania === 'MW02' ||
        data.MetodyBadania === 'MW03' ||
        data.MetodyBadania === 'MW05') &&
      data.Zwolnienie === 'ZW02',
    cellStyle: ({ data }) =>
      data.Zwolnienie !== 'ZW02' ||
      data.MetodyBadania === 'MW04' ||
      data.MetodyBadania === 'MW00' ||
      data.MetodyBadania === 'MW06'
        ? { backgroundColor: 'var(--bg2-light)' }
        : { backgroundColor: '#fff' },
  },
  {
    field: 'KorektaPorownywalnosciProg',
    headerName: 'Korekta porównywalności próg',
    headerTooltip: 'Korekta porównywalności próg',
    cellEditor: 'agNumberCellEditor',
    cellDataType: 'number',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
    editable: ({ data }) =>
      (data.MetodyBadania === 'MW01' ||
        data.MetodyBadania === 'MW02' ||
        data.MetodyBadania === 'MW03' ||
        data.MetodyBadania === 'MW05') &&
      data.Zwolnienie === 'ZW02' &&
      data.KorektaMetodyBadania === 'KP02',
    cellStyle: ({ data }) =>
      data.KorektaMetodyBadania !== 'KP02' ||
      data.MetodyBadania === 'MW04' ||
      data.MetodyBadania === 'MW06' ||
      data.MetodyBadania === 'MW00' ||
      data.Zwolnienie !== 'ZW02'
        ? { backgroundColor: 'var(--bg2-light)' }
        : { backgroundColor: '#fff' },
  },
  {
    field: 'SposobUjeciaCeny',
    headerName: 'Sposób ujęcia ceny',
    headerTooltip: 'Sposób ujęcia ceny',
    cellEditor: 'agSelectCellEditor',
    type: 'analysisMethodType',
    cellEditorParams: {
      values: ['CK01', 'CK02'],
    } as ISelectCellEditorParams,
  },
  {
    field: 'Waluta1',
    headerName: 'Waluta 1',
    headerTooltip: 'Waluta 1',
    type: 'SposobUjeciaCenyType',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
  },
  {
    field: 'CenaMinimalna',
    headerName: 'Cena minimalna',
    headerTooltip: 'Cena minimalna',
    type: 'SposobUjeciaCenyType',
    cellEditor: 'agNumberCellEditor',
    cellDataType: 'number',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
  },
  {
    field: 'CenaMaksymalna',
    headerName: 'Cena maksymalna',
    headerTooltip: 'Cena maksymalna',
    type: 'SposobUjeciaCenyType',
    cellEditor: 'agNumberCellEditor',
    cellDataType: 'number',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
  },
  {
    field: 'Miara1',
    headerName: 'Miara 1',
    headerTooltip: 'Miara 1',
    type: 'SposobUjeciaCenyType',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
  },
  {
    field: 'RodzajPrzedzialu',
    headerName: 'Rodzaj przedziału',
    headerTooltip: 'Rodzaj przedziału',
    cellEditor: 'agSelectCellEditor',
    type: 'PrzedzialType',
    cellEditorParams: {
      values: ['RP01', 'RP02', 'RP03', 'RP04'],
    } as ISelectCellEditorParams,
  },
  {
    field: 'CenaPorownywalnaMin',
    headerName: 'Cena porównywalna min',
    headerTooltip: 'Cena porównywalna min',
    type: 'RodzajPrzedzialuType',
    cellEditor: 'agNumberCellEditor',
    cellDataType: 'number',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
  },
  {
    field: 'CenaPorownywalnaMax',
    headerName: 'Cena porównywalna max',
    headerTooltip: 'Cena porównywalna max',
    type: 'RodzajPrzedzialuType',
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
    type: 'SposobUjeciaCenyType',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
    editable: ({ data }) => {
      return (
        data.Zwolnienie === 'ZW02' &&
        (data.MetodyBadania === 'MW01' ||
          data.MetodyBadania === 'MW02' ||
          data.MetodyBadania === 'MW03' ||
          data.MetodyBadania === 'MW05') &&
        data.RodzajPrzedzialu === 'RP03'
      );
    },
    cellStyle: ({ data }) =>
      data.Zwolnienie !== 'ZW02' ||
      data.MetodyBadania === 'MW00' ||
      data.MetodyBadania === 'MW04' ||
      data.MetodyBadania === 'MW06' ||
      data.RodzajPrzedzialu !== 'RP03'
        ? { backgroundColor: 'var(--bg2-light)' }
        : { backgroundColor: '#fff' },
  },
  {
    field: 'WysokoscCenyPorownywalnej',
    headerName: 'Wysokość ceny porównywalnej 1 ',
    headerTooltip: 'Wysokość ceny porównywalnej 1 ',
    cellEditor: 'agNumberCellEditor',
    cellDataType: 'number',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
    editable: ({ data }) => {
      return (
        data.Zwolnienie === 'ZW02' &&
        data.MetodyBadania === 'MW01' &&
        data.RodzajPrzedzialu === 'RP04'
      );
    },
    cellStyle: ({ data }) =>
      data.Zwolnienie !== 'ZW02' ||
      data.MetodyBadania !== 'MW01' ||
      data.RodzajPrzedzialu !== 'RP04'
        ? { backgroundColor: 'var(--bg2-light)' }
        : { backgroundColor: '#fff' },
  },
  {
    field: 'ProcentMinimalny',
    headerName: 'Procent minimalny',
    headerTooltip: 'Procent minimalny',
    type: 'CK2Type',
    cellEditor: 'agNumberCellEditor',
    cellDataType: 'number',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
  },
  {
    field: 'ProcentMaksymalny',
    headerName: 'Procent maksymalny',
    headerTooltip: 'Procent maksymalny',
    type: 'CK2Type',
    cellEditor: 'agNumberCellEditor',
    cellDataType: 'number',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
  },
  {
    field: 'Miara2',
    headerName: 'Miara 2',
    headerTooltip: 'Miara 2',
    type: 'CK2Type',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
  },
  {
    field: 'DolnaGranica',
    headerName: 'Dolna granica przedziału',
    headerTooltip: 'Dolna granica przedziału',
    type: 'GranicePrzedzialuType',
    cellEditor: 'agNumberCellEditor',
    cellDataType: 'number',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
  },
  {
    field: 'GornaGranica',
    headerName: 'Górna granica przedziału',
    headerTooltip: 'Górna granica przedziału',
    type: 'GranicePrzedzialuType',
    cellEditor: 'agNumberCellEditor',
    cellDataType: 'number',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
  },
  {
    field: 'WysokoscWskaznikaFinansowego',
    headerName: 'Wysokość wskaźnika finansowego ',
    headerTooltip: 'Wysokość wskaźnika finansowego ',
    cellEditor: 'agNumberCellEditor',
    cellDataType: 'number',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
    editable: ({ data }) => {
      return (
        data.Zwolnienie === 'ZW02' &&
        (data.MetodyBadania === 'MW02' ||
          data.MetodyBadania === 'MW03' ||
          data.MetodyBadania === 'MW05') &&
        data.RodzajPrzedzialu === 'RP04'
      );
    },
    cellStyle: ({ data }) =>
      data.Zwolnienie !== 'ZW02' ||
      data.MetodyBadania === 'MW00' ||
      data.MetodyBadania === 'MW01' ||
      data.MetodyBadania === 'MW04' ||
      data.MetodyBadania === 'MW06' ||
      data.RodzajPrzedzialu !== 'RP04'
        ? { backgroundColor: 'var(--bg2-light)' }
        : { backgroundColor: '#fff' },
  },
  {
    field: 'WskaznikFinansowy',
    headerName: 'Wskaźnik finansowy',
    headerTooltip: 'Wskaźnik finansowy',
    cellEditor: 'agSelectCellEditor',
    type: 'MW235Type',
    cellEditorParams: {
      values: [
        'WF01',
        'WF02',
        'WF03',
        'WF04',
        'WF05',
        'WF06',
        'WF07',
        'WF08',
        'WF09',
        'WF10',
        'WF11',
        'WF12',
        'WF13',
        'WF14',
        'WF15',
        'WF16',
        'WF17',
      ],
      valueListMaxHeight: 120,
      valueListMaxWidth: 120,
    } as ISelectCellEditorParams,
  },
  {
    field: 'WynikTransakcji',
    headerName: 'Wynik transakcji',
    headerTooltip: 'Wynik transakcji',
    type: 'MW235Type',
    cellEditor: 'agNumberCellEditor',
    cellDataType: 'number',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
  },
  {
    field: 'RodzajPorownania',
    headerName: 'Rodzaj porównania',
    headerTooltip: 'Rodzaj porównania',
    cellEditor: 'agSelectCellEditor',
    type: 'MW235Type',
    cellEditorParams: {
      values: ['PR01', 'PR02', 'PR03'],
    } as ISelectCellEditorParams,
  },
  {
    field: 'PodmiotBadany',
    headerName: 'Podmiot badany',
    headerTooltip: 'Podmiot badany',
    cellEditor: 'agSelectCellEditor',
    type: 'PR02Type',
    cellEditorParams: {
      values: ['PB01', 'PB02'],
    } as ISelectCellEditorParams,
  },
  {
    field: 'KryteriumGeograficzne',
    headerName: 'Kryterium geograficzne',
    headerTooltip: 'Kryterium geograficzne',
    cellEditor: 'agSelectCellEditor',
    type: 'PR02Type',
    cellEditorParams: {
      values: ['KG01', 'KG02', 'KG03', 'KG04', 'KG05', 'KG06'],
    } as ISelectCellEditorParams,
  },
  {
    field: 'RodzajMetodyPodzialuZysku',
    headerName: 'Rodzaj metody podziału zysku',
    headerTooltip: 'Rodzaj metody podziału zysku',
    cellEditor: 'agSelectCellEditor',
    type: 'MW04Type',
    cellEditorParams: {
      values: ['PZ01', 'PZ02', 'PZ03', 'PZ04'],
    } as ISelectCellEditorParams,
  },
  {
    field: 'Strata',
    headerName: 'Strata',
    headerTooltip: 'Strata',
    cellDataType: 'boolean',
    type: 'MW04Type',
  },
  {
    field: 'ZakladanyZysk',
    headerName: 'Zakładany zysk',
    headerTooltip: 'Zakładany zysk',
    type: 'MW04Type',
    cellEditor: 'agNumberCellEditor',
    cellDataType: 'number',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
  },
  {
    field: 'ZrealizowanyZysk',
    headerName: 'Zrealizowany zysk',
    headerTooltip: 'Zrealizowany zysk',
    type: 'MW04Type',
    cellEditor: 'agNumberCellEditor',
    cellDataType: 'number',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
    editable: ({ data }) => {
      return data.MetodyBadania === 'MW04' && !data.Strata;
    },
    cellStyle: ({ data }) =>
      data.MetodyBadania !== 'MW04' || data.Strata
        ? { backgroundColor: 'var(--bg2-light)' }
        : { backgroundColor: '#fff' },
  },
  {
    field: 'TechWyceny',
    headerName: 'Technika wyceny',
    headerTooltip: 'Technika wyceny',
    type: 'MW06Type',
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: ['TW01', 'TW02', 'TW03', 'TW04', 'TW05', 'TW06', 'TW07'],
    } as ISelectCellEditorParams,
  },
  {
    field: 'WspolczynnikDyskontowy',
    headerName: 'Współczynnik dyskontowy',
    headerTooltip: 'Współczynnik dyskontowy',
    type: 'TechWycenyType',
    cellEditor: 'agNumberCellEditor',
    cellDataType: 'number',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
  },
  {
    field: 'OkresPrognozy',
    headerName: 'Okres prognozy',
    headerTooltip: 'Okres prognozy',
    type: 'TechWycenyType',
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: ['TB01', 'TB02', 'TB03', 'TB04', 'TB05', 'TB06', 'TB07'],
    } as ISelectCellEditorParams,
  },
  {
    field: 'TerminInny',
    headerName: 'Termin inny',
    headerTooltip: 'Termin inny',
    type: 'InnyTerminType',
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: [
        'AZ01',
        'AZ02',
        'AZ03',
        'AZ04',
        'AZ05',
        'AZ06',
        'AZ07',
        'AZ08',
        'AZ09',
      ],
    } as ISelectCellEditorParams,
  },
  {
    field: 'ZrodloDanychZgodnosci',
    headerName: 'Źródło danych zgodności',
    headerTooltip: 'Źródło danych zgodności',
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: [
        'AZ01',
        'AZ02',
        'AZ03',
        'AZ04',
        'AZ05',
        'AZ06',
        'AZ07',
        'AZ08',
        'AZ09',
      ],
    } as ISelectCellEditorParams,
    editable: ({ data }) =>
      data.MetodyBadania === 'MW06' &&
      data.Zwolnienie === 'ZW02' &&
      data.TechWyceny === 'TW07',
    cellStyle: ({ data }) =>
      data.MetodyBadania !== 'MW06' ||
      data.Zwolnienie === 'ZW01' ||
      data.TechWyceny !== 'TW07'
        ? { backgroundColor: 'var(--bg2-light)' }
        : { backgroundColor: '#fff' },
  },
];
