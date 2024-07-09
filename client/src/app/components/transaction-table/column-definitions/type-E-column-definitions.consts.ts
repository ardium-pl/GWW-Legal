import { Parser } from '@angular/compiler';
import {
  INumberCellEditorParams,
  ISelectCellEditorParams,
  ITooltipParams,
} from 'ag-grid-community';
import { ColDef } from 'ag-grid-community/dist/types/core/entities/colDef';

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

const RodzajWartosciNiematerialnychCodeMapping: Record<string, string> = {
  DN01: 'Marka / znak towarowy',
  DN02: 'Patent',
  DN03: 'Wiedza techniczna lub organizacyjna (know-how) w zakresie produkcji',
  DN04: 'Wiedza techniczna lub organizacyjna (know-how) w zakresie innym niż produkcja',
  DN05: 'Franczyza (pakiet wartości niematerialnych obejmujący w szczególności DN01 oraz DN03 lub DN04)',
  DN06: 'Oprogramowanie',
  DN07: 'Inne wartości niematerialne',
  DN08: 'Zbiór wartości niematerialnych, dla których ustalono jednolitą wspólną cenę transferową',
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

const RodzajAnalizyCodeMapping: Record<string, string> = {
  RA01: 'Analiza danych transakcyjnych wewnętrznych – porównywalne transakcje z podmiotami niepowiązanymi',
  RA02: 'Analiza danych transakcyjnych zewnętrznych – bazy danych',
  RA03: 'Wycena za pomocą techniki DCF',
  RA04: 'Wycena za pomocą podejścia dochodowego innego niż DCF',
  RA05: 'Wycena za pomocą techniki hipotetycznych opłat licencyjnych (Relief from Royalty)',
  RA06: 'Wycena z użyciem podejścia porównawczego',
  RA07: 'Wycena z użyciem podejścia kosztowego',
  RA08: 'Wycena z użyciem kombinacji dwu lub więcej podejść wskazanych powyżej',
  RA09: 'Inna analiza niż wskazane powyżej',
}

const SposobKalkulacjiOplatyCodeMapping:  Record<string, string> = {
  SK01: 'Procent od sprzedaży do podmiotów niepowiązanych towarów lub produktów, których dotyczy wartość niematerialna',
  SK02: 'Procent od sprzedaży całkowitej towarów lub produktów, których dotyczy wartość niematerialna',
  SK03: 'Procent od innej bazy',
  SK04: 'Kwota w ujęciu rocznym',
  SK05: 'Kwota na jednostkę towaru lub produktu',
  SK06: 'Inny sposób kalkulacji opłaty',
}

const KorektaPorownywalnosciCodeMapping:  Record<string, string> = {
  KP01: 'Nie dokonano korekty porównywalności',
  KP02: 'Dokonano jednej lub większej liczby korekt porównywalności',
}

const KorektaPorownywalnosciProgCodeMapping: Record<string, string> = {
  KP02A: 'Korekta porównywalności zmieniająca wynik o mniej niż 30%',
  KP02B: 'Korekta porównywalności zmieniająca wynik o 30% lub więcej',
  KP02C: 'Brak możliwości ustalenia wpływu korekty na wynik',
}

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

const ZwolnienieCodeReverseMapping: Record<string, string> = {
 'Transakcja KORZYSTA ze zwolnienia na podstawie art 11-n pkt 1-2': 'ZW01' ,
 'Transakcja NIE KORZYSTA ze zwolenia na podstawie art 11-n pkt 1-2': 'ZW02'
}

const RodzajWartosciNiematerialnychReverseCodeMapping: Record<string, string> = {
  'Marka / znak towarowy': 'DN01',
  'Patent': 'DN02',
  'Wiedza techniczna lub organizacyjna (know-how) w zakresie produkcji': 'DN03',
  'Wiedza techniczna lub organizacyjna (know-how) w zakresie innym niż produkcja': 'DN04',
  'Franczyza (pakiet wartości niematerialnych obejmujący w szczególności DN01 oraz DN03 lub DN04)': 'DN05',
  'Oprogramowanie': 'DN06',
  'Inne wartości niematerialne': 'DN07',
  'Zbiór wartości niematerialnych, dla których ustalono jednolitą wspólną cenę transferową': 'DN08' 
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

const RodzajAnalizyReverseCodeMapping: Record<string, string> = {
  'Analiza danych transakcyjnych wewnętrznych – porównywalne transakcje z podmiotami niepowiązanymi' : 'RA01',
  'Analiza danych transakcyjnych zewnętrznych – bazy danych': 'RA02',
  'Wycena za pomocą techniki DCF': 'RA03',
  'Wycena za pomocą podejścia dochodowego innego niż DCF': 'RA04',
  'Wycena za pomocą techniki hipotetycznych opłat licencyjnych (Relief from Royalty)':'RA05',
  'Wycena z użyciem podejścia porównawczego':'RA06',
  'Wycena z użyciem podejścia kosztowego':'RA07',
  'Wycena z użyciem kombinacji dwu lub więcej podejść wskazanych powyżej':'RA08',
  'Inna analiza niż wskazane powyżej':'RA09',
}

const SposobKalkulacjiOplatyReverseCodeMapping:  Record<string, string> = {
  'Procent od sprzedaży do podmiotów niepowiązanych towarów lub produktów, których dotyczy wartość niematerialna': 'SK01',
  'Procent od sprzedaży całkowitej towarów lub produktów, których dotyczy wartość niematerialna':'SK02',
  'Procent od innej bazy':'SK03',
  'Kwota w ujęciu rocznym':'SK04',
  'Kwota na jednostkę towaru lub produktu':'SK05',
  'Inny sposób kalkulacji opłaty':'SK06',
}

const KorektaPorownywalnosciReverseCodeMapping:  Record<string, string> = {
  'Nie dokonano korekty porównywalności': 'KP01',
  'Dokonano jednej lub większej liczby korekt porównywalności': 'KP02',
}

const KorektaPorownywalnosciProgReverseCodeMapping: Record<string, string> = {
  'Korekta porównywalności zmieniająca wynik o mniej niż 30%': 'KP02A',
  'Korekta porównywalności zmieniająca wynik o 30% lub więcej': 'KP02B',
  'Brak możliwości ustalenia wpływu korekty na wynik': 'KP02C'
}

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
      values: Object.values(correctionCodeReverseMapping),
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
      values: Object.values(compensationCodeReverseMapping),
    } as ISelectCellEditorParams,
    valueFormatter: params => compensationCodeMapping[params.value],
  },
  {
    field: 'RodzajWartosciNiematerialnych',
    headerName: 'Rodzaj wartości niematerialnych',
    headerTooltip: 'Rodzaj wartości niematerialnych',
    cellEditor: 'agSelectCellEditor',
    cellDataType: 'text',
    cellEditorParams: {
      values: Object.values(RodzajWartosciNiematerialnychReverseCodeMapping),
    } as ISelectCellEditorParams,
    valueFormatter: params => RodzajWartosciNiematerialnychCodeMapping[params.value],
  },
  {
    field: 'Zwolnienie',
    headerName: 'Zwolnienie',
    headerTooltip: 'Zwolnienie',
    cellEditor: 'agSelectCellEditor',
    cellDataType: 'text',
    cellEditorParams: {
      values: Object.values(ZwolnienieCodeReverseMapping),
    } as ISelectCellEditorParams,
    valueFormatter: params => ZwolnienieCodeMapping[params.value],
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
      values: Object.values(RodzajTransakcjiReverseCodeMapping),
    } as ISelectCellEditorParams,
    valueFormatter: params => RodzajTransakcjiCodeMapping[params.value],
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
      values: Object.values(MetodyBadaniaReverseCodeMapping),
    } as ISelectCellEditorParams,
    valueFormatter: params => MetodyBadaniaCodeMapping[params.value],
  },
  {
    field: 'RodzajAnalizy',
    headerName: 'Rodzaj analizy',
    headerTooltip: 'Rodzaj analizy',
    type: 'MetodyBadaniaType',
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: Object.values(RodzajAnalizyReverseCodeMapping),
    } as ISelectCellEditorParams,
    valueFormatter: params => RodzajAnalizyCodeMapping[params.value],
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
    cellEditorParams:{
      values: Object.values(SposobKalkulacjiOplatyReverseCodeMapping),
    } as ISelectCellEditorParams,
    valueFormatter: params => SposobKalkulacjiOplatyCodeMapping[params.value],
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
      values: Object.values(KorektaPorownywalnosciReverseCodeMapping),
    } as ISelectCellEditorParams,
    valueFormatter: params => KorektaPorownywalnosciCodeMapping[params.value],
  },
  {
    field: 'KorektaPorownywalnosciProg',
    headerName: 'Korekta porównywalności próg',
    headerTooltip: 'Korekta porównywalności próg',
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: Object.values(KorektaPorownywalnosciProgReverseCodeMapping),
    } as ISelectCellEditorParams,
    valueFormatter: params => KorektaPorownywalnosciProgCodeMapping[params.value],
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
