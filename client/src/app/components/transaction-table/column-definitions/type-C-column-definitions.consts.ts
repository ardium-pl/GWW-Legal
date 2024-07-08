import { ColDef } from 'ag-grid-community/dist/types/core/entities/colDef';
import {
  INumberCellEditorParams,
  ISelectCellEditorParams,
  ITooltipParams,
} from 'ag-grid-community';
import { min } from 'rxjs';
import { __param } from 'tslib';
import { Parser } from '@angular/compiler';

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
}

const RodzajTransakcjiCodeMapping: Record<string, string> = {
  TK01: 'Transakcja kontrolowana (art. 11k ust. 2 i 2a ustawy)',
  TK02: 'Transakcja inna niż transakcja kontrolowana (art. 11o ust. 1 ustawy)',
}

const MetodyBadaniaCodeMapping: Record<string, string> = {
  MW00: 'Nie dotyczy',
  MW01: 'Metoda porównywalnej ceny niekontrolowanej',
  MW02: 'Metoda ceny odprzedaży',
  MW03: 'Metoda koszt plus',
  MW04: 'Metoda podziału zysku',
  MW05: 'Metoda marży transakcyjnej netto',
  MW06: 'Inna metoda',
}

const KorektaMetodyBadaniaCodeMapping:  Record<string, string> = {
  KP01: 'Nie dokonano korekty porównywalności',
  KP02: 'Dokonano jednej lub większej liczby korekt porównywalności',
}

const ZrodloDanychFinansowychCodeMapping: Record<string, string> = {
  ZD01: 'Dane transakcyjne wewnętrzne – porównywalne transakcje z podmiotami niepowiązanymi',
  ZD02: 'Dane transakcyjne zewnętrzne – bazy danych transakcyjnych',
  ZD03: 'Statystyki bankowe',
  ZD04: 'Oferty otrzymane od instytucji finansowych',
  ZD05: 'Pozostałe źródła danych',
}

const RodzajOprocentowaniaCodeMapping: Record<string, string> = {
  OP01:'Oprocentowanie zmienne',
  OP02:'Oprocentowanie stałe',
  OP03:'Oprocentowanie stałe podlegające zmianom w okresie sprawozdawczym',
  OP04:'Inny sposób kalkulacji oprocentowania',
  OP05:'Brak oprocentowania',
}

const NazwaStopyBazowejCodeMapping: Record<string, string> = {
  SB01: 'WIBOR',
  SB02: 'EURIBOR',
  SB03: 'LIBOR EUR',
  SB04: 'LIBOR USD',
  SB05: 'LIBOR CHF',
  SB06: 'LIBOR GBP',
  SB07: 'LIBOR JPY',
  SB08: 'SARON',
  SB09: 'Inna stopa bazowa',
}

const TerminStopyBazowejCodeMapping: Record<string, string> = {
  TB01: '1 dzień (O/N)',
  TB02: '1 miesiąc',
  TB03: '3 miesiące',
  TB04: '6 miesięcy',
  TB05: '9 miesięcy',
  TB06: '1 rok',
  TB07: 'Inny',
}

const RodzajPrzedzialuCodeMapping:  Record<string, string> = {
  RP01:'Przedział międzykwartylowy',
  RP02:'Przedział pełny',
  RP03:'Inny przedział',
  RP04: 'Jedna wartość',
}

//Reverse code mappings 
const correctionCodeReverseMapping: Record<string, string> = {
  'Podatnik dokonał korekty cen transferowych': 'KC01',
  'Podatnik nie dokonał korekty cen transferowych': 'KC02',
};

const compensationCodeReverseMapping: Record<string, string> = {
  'Korzyści podlegały kompensacie na podstawie § 9 ust. 1 Rozporządzenia TP': 'KS01',
  'Dochód podlegał kompensacie na podstawie § 9 ust. 2 Rozporządzenia TP': 'KS02',
  'Brak kompensaty': 'KS03',
};

const ZwolnienieCodeReverseMapping: Record<string, string> = {
  'Transakcja KORZYSTA ze zwolnienia na podstawie art 11-n pkt 1-2': 'ZW01' ,
  'Transakcja NIE KORZYSTA ze zwolenia na podstawie art 11-n pkt 1-2': 'ZW02'
 }

 const RodzajTransakcjiReverseCodeMapping: Record<string, string> = {
  'Transakcja kontrolowana (art. 11k ust. 2 i 2a ustawy)': 'TK01',
  'Transakcja inna niż transakcja kontrolowana (art. 11o ust. 1 ustawy)': 'TK02',
}

const MetodyBadaniaReverseCodeMapping: Record<string, string> = {
  'Nie dotyczy': 'MW00',
  'Metoda porównywalnej ceny niekontrolowanej':'MW01',
  'Metoda ceny odprzedaży' :'MW02',
  'Metoda koszt plus':'MW03',
  'Metoda podziału zysku':'MW04',
  'Metoda marży transakcyjnej netto':'MW05',
  'Inna metoda':'MW06',
}

const KorektaMetodyBadaniaReverseCodeMapping:  Record<string, string> = {
  'Nie dokonano korekty porównywalności': 'KP01',
  'Dokonano jednej lub większej liczby korekt porównywalności': 'KP02',
}

const ZrodloDanychFinansowychReverseCodeMapping: Record<string, string> = {
  'Dane transakcyjne wewnętrzne – porównywalne transakcje z podmiotami niepowiązanymi':'ZD01',
  'Dane transakcyjne zewnętrzne – bazy danych transakcyjnych': 'ZD02',
  'Statystyki bankowe': 'ZD03',
  'Oferty otrzymane od instytucji finansowych': 'ZD04',
  'Pozostałe źródła danych': 'ZD05',
}

const RodzajOprocentowaniaReverseCodeMapping: Record<string, string> = {
  'Oprocentowanie zmienne':'OP01',
  'Oprocentowanie stałe':'OP02',
  'Oprocentowanie stałe podlegające zmianom w okresie sprawozdawczym':'OP03',
  'Inny sposób kalkulacji oprocentowania':'OP04',
  'Brak oprocentowania':'OP05',
}

const NazwaStopyBazowejReverseCodeMapping: Record<string, string> = {
  'WIBOR':'SB01',
  'EURIBOR':'SB02',
  'LIBOR EUR':'SB03',
  'LIBOR USD':'SB04',
  'LIBOR CHF':'SB05',
  'LIBOR GBP':'SB06',
  'LIBOR JPY' : 'SB07',
  'SARON': 'SB08',
  'Inna stopa bazowa' : 'SB09',
}

const TerminStopyBazowejReverseCodeMapping:  Record<string, string> = {
  '1 dzień (O/N)':'TB01',
  '1 miesiąc':'TB02',
  '3 miesiące':'TB03',
  '6 miesięcy':'TB04',
  '9 miesięcy':'TB05',
  '1 rok':'TB06',
  'Inny':'TB07',
}

const RodzajPrzedzialuReverseCodeMapping:  Record<string, string> = {
  RP01:'Przedział międzykwartylowy',
  RP02:'Przedział pełny',
  RP03:'Inny przedział',
  RP04: 'Jedna wartość',
}


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
      values: Object.values(ZwolnienieCodeMapping),
    } as ISelectCellEditorParams,
    valueFormatter: params => ZwolnienieCodeMapping[params.value],
    valueParser: params => ZwolnienieCodeReverseMapping[params.newValue]
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
      values: Object.values(RodzajTransakcjiCodeMapping),
    } as ISelectCellEditorParams,
    valueFormatter: params => RodzajTransakcjiCodeMapping[params.value],
    valueParser: params => RodzajTransakcjiReverseCodeMapping[params.newValue],
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
    cellEditorParams:{
      values: Object.values(MetodyBadaniaCodeMapping),
    } as ISelectCellEditorParams,
    valueFormatter: params => MetodyBadaniaCodeMapping[params.value],
    valueParser: params => MetodyBadaniaReverseCodeMapping[params.newValue],
  },
  {
    field: 'ZrodloDanychFinansowych',
    headerName: 'Źródło danych finansowych',
    headerTooltip: 'Źródło danych finansowych',
    type: 'MetodyBadaniaType',
    cellEditor: 'agSelectCellEditor',
    cellEditorParams:{
      values: Object.values(ZrodloDanychFinansowychCodeMapping),
    } as ISelectCellEditorParams,
    valueFormatter: params => ZrodloDanychFinansowychCodeMapping[params.value],
    valueParser: params => ZrodloDanychFinansowychReverseCodeMapping[params.newValue],
  },
  {
    field: 'KorektaMetodyBadania',
    headerName: 'Korekta dla metody badania',
    headerTooltip: 'Korekta dla metody badania',
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: Object.values(KorektaMetodyBadaniaCodeMapping),
    } as ISelectCellEditorParams,
    valueFormatter: params => KorektaMetodyBadaniaCodeMapping[params.value],
    valueParser: params => KorektaMetodyBadaniaReverseCodeMapping[params.newValue],
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
      data.KorektaMetodyBadania === 'KP02',
    cellStyle: ({ data }) =>
      data.MetodyBadania === 'MW00' ||
        data.Zwolnienie !== 'ZW02' ||
        data.KorektaMetodyBadania !== 'KP02'
        ? { backgroundColor: 'var(--bg2-light)' }
        : { backgroundColor: '#fff' },
  },
  {
    field: 'RodzajOprocentowania',
    headerName: 'Rodzaj oprocentowania',
    headerTooltip: 'Rodzaj oprocentowania',
    type: 'MetodyBadaniaType',
    cellEditor: 'agSelectCellEditor',
    cellEditorParams:{
      values: Object.values(RodzajOprocentowaniaCodeMapping),
    } as ISelectCellEditorParams,
    valueFormatter: params => RodzajOprocentowaniaCodeMapping[params.value],
    valueParser: params => RodzajOprocentowaniaReverseCodeMapping[params.newValue]
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
      values: Object.values(NazwaStopyBazowejCodeMapping),
    } as ISelectCellEditorParams,
    valueFormatter: params => NazwaStopyBazowejCodeMapping[params.value],
    valueParser: params => NazwaStopyBazowejReverseCodeMapping[params.newValue]
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
      values: Object.values(TerminStopyBazowejCodeMapping),
    } as ISelectCellEditorParams,
    valueFormatter: params => TerminStopyBazowejCodeMapping[params.value],
    valueParser: params => TerminStopyBazowejReverseCodeMapping[params.newValue],
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
      values: Object.values(RodzajOprocentowaniaCodeMapping),
    } as ISelectCellEditorParams,
    valueFormatter: params => RodzajOprocentowaniaCodeMapping[params.value],
    valueParser: params => RodzajPrzedzialuReverseCodeMapping[params.newValue],
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
      data.Zwolnienie === 'ZW02'&&
      data.RodzajPrzedzialu !== 'RP04',
    cellStyle: ({ data }) =>
      data.Zwolnienie !== 'ZW02' ||
        data.MetodyBadania === 'MW00' ||
        data.RodzajPrzedzialu === 'RP04'
        ? { backgroundColor: 'var(--bg2-light)' }
        : { backgroundColor: '#fff' },
  },
  {
    field: 'GornaGranicaPrzedzialu',
    headerName: 'Górna granica przedziału',
    headerTooltip: 'Górna granica przedziału',
    editable: ({ data }) =>
      data.MetodyBadania !== 'MW00' &&
      data.Zwolnienie === 'ZW02'&&
      data.RodzajPrzedzialu !== 'RP04',
    cellStyle: ({ data }) =>
      data.Zwolnienie !== 'ZW02' ||
        data.MetodyBadania === 'MW00' ||
        data.RodzajPrzedzialu === 'RP04'
        ? { backgroundColor: 'var(--bg2-light)' }
        : { backgroundColor: '#fff' },
    cellEditor: 'agNumberCellEditor',
    cellDataType: 'number',
    cellEditorParams: {
      min: 0,
    } as INumberCellEditorParams,
  },
  {
    field: 'WysokoscWskaznikaFinansowego',
    headerName: 'Wysokość wskaźnika finansowego %',
    headerTooltip: 'Wysokość wskaźnika finansowego %',
    cellEditor: 'agNumberCellEditor',
    cellDataType: 'number',
    editable: ({ data }) =>
      data.MetodyBadania !== 'MW00' &&
      data.Zwolnienie === 'ZW02' &&
      data.RodzajPrzedzialu === 'RP04',
    cellStyle: ({ data }) =>
      data.Zwolnienie !== 'ZW02' ||
        data.MetodyBadania === 'MW00' ||
        data.RodzajPrzedzialu !== 'RP04'
        ? { backgroundColor: 'var(--bg2-light)' }
        : { backgroundColor: '#fff' },
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
