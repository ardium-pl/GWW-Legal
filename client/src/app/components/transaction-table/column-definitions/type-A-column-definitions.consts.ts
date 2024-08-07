import { ColDef } from 'ag-grid-community/dist/types/core/entities/colDef';
import {
  INumberCellEditorParams,
  ISelectCellEditorParams,
  ITooltipParams,
} from 'ag-grid-community';

// Utility function to generate reverse mappings
function createReverseMapping(
  mapping: Record<string, string>,
): Record<string, string> {
  return Object.keys(mapping).reduce(
    (reverseMapping, key) => {
      reverseMapping[mapping[key]] = key;
      return reverseMapping;
    },
    {} as Record<string, string>,
  );
}

// User friendly code mappings
const correctionCodeMapping: Record<string, string> = {
  KC01: 'Podatnik dokonał korekty cen transferowych',
  KC02: 'Podatnik nie dokonał korekty cen transferowych',
};

const WynagrodzenieZaRestrukturyzacjeCodeMapping: Record<string, string> = {
  RM01: 'Podmiot otrzymał wynagrodzenie pieniężne za przeniesione na rzecz podmiotu powiązanego funkcje, aktywa, ryzyka lub prawa',
  RM02: 'Podmiot otrzymał wynagrodzenie w formie innej niż pieniężna za przeniesione na rzecz podmiotu powiązanego funkcje, aktywa, ryzyka lub prawa',
  RM03: 'Podmiot wypłacił wynagrodzenie pieniężne za przejęte od podmiotu powiązanego funkcje, aktywa, ryzyka lub prawa',
  RM04: 'Podmiot wypłacił wynagrodzenie w formie innej niż pieniężna za przejęte od podmiotu powiązanego funkcje, aktywa, ryzyka lub prawa',
  RM05: 'Podmiot nie wypłacił ani nie otrzymał wynagrodzenia w jakiejkolwiek formie w związku z przeniesieniem funkcji, aktywów, ryzyk lub praw',
};

const RodzajUmowyCodeMapping: Record<string, string> = {
  RT01: 'Umowa spółki niebędącej osobą prawną',
  RT02: 'Umowa wspólnego przedsięwzięcia lub umowa o podobnym charakterze',
};

const UdzialCodeMapping: Record<string, string> = {
  UD01: 'Udział w zysku',
  UD02: 'Udział w stracie',
  UD03: 'Udział w majątku likwidacyjnym',
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

const RodzajTransakcjiCodeMapping: Record<string, string> = {
  TK01: 'Transakcja kontrolowana (art. 11k ust. 2 i 2a ustawy)',
  TK02: 'Transakcja inna niż transakcja kontrolowana (art. 11o ust. 1 ustawy)',
};

const MetodyBadaniaCodeMapping: Record<string, string> = {
  MW00: 'Nie dotyczy',
  MW01: 'Metoda porównywalnej ceny niekontrolowanej',
  MW02: 'Metoda ceny odprzedaży',
  MW03: 'Metoda koszt plus',
  MW04: 'Metoda podziału zysku',
  MW05: 'Metoda marży transakcyjnej netto',
  MW06: 'Inna metoda',
};

const KorektaMetodyBadaniaCodeMapping: Record<string, string> = {
  KP01: 'Nie dokonano korekty porównywalności',
  KP02: 'Dokonano jednej lub większej liczby korekt porównywalności',
};

const KorektaPorownywalnosciProgCodeMapping: Record<string, string> = {
  KP02A: 'Korekta porównywalności zmieniająca wynik o mniej niż 30%',
  KP02B: 'Korekta porównywalności zmieniająca wynik o 30% lub więcej',
  KP02C: 'Brak możliwości ustalenia wpływu korekty na wynik',
};

const SposobWeryfikacjiCodeMapping: Record<string, string> = {
  SW01: 'Porównanie wewnętrzne cen (porównywalny przedmiot transakcji jest kupowany/sprzedawany jednocześnie od/do podmiotów powiązanych i niepowiązanych)',
  SW02: 'Porównanie zewnętrzne cen (istnieją dostępne dane o cenach porównywalnych przedmiotów transakcji, których stronami są podmioty niepowiązane)',
  SW03: 'Porównanie wewnętrzne cen kontrahenta (kontrahent kupuje/sprzedaje porównywalny przedmiot transakcji jednocześnie od/do podatnika i podmiotu niepowiązanego)',
  SW04: 'Inny sposób weryfikacji rynkowego charakteru ceny',
};

const SposobUjeciaCenyCodeMapping: Record<string, string> = {
  CK01: 'Cena wyrażona kwotowo',
  CK02: 'Cena wyrażona procentowo',
};

const RodzajPrzedzialuCodeMapping: Record<string, string> = {
  RP01: 'Przedział międzykwartylowy',
  RP02: 'Przedział pełny',
  RP03: 'Inny przedział',
  RP04: 'Jedna wartość',
};

const WskaznikFinansowyCodeMapping: Record<string, string> = {
  WF01: 'Marża brutto ze sprzedaży',
  WF02: 'Marża brutto z odprzedaży',
  WF03: 'Narzut brutto ze sprzedaży',
  WF04: 'Marża netto ze sprzedaży',
  WF05: 'Narzut netto ze sprzedaży',
  WF06: 'Marża operacyjna',
  WF07: 'Narzut operacyjny',
  WF08: 'Marża zysku brutto',
  WF09: 'Narzut zysku brutto',
  WF10: 'Rentowność aktywów',
  WF11: 'Rentowność kapitału własnego ',
  WF12: 'Wskaźnik Berry’ego',
  WF13: 'Inny wskaźnik oparty o dane polskie',
  WF14: 'Narzut EBIT',
  WF15: 'Marża EBIT',
  WF16: 'Rentowność kapitału własnego (dane międzynarodowe)',
  WF17: 'Inny wskaźnik oparty o dane międzynarodowe',
};

const RodzajPorownaniaCodeMapping: Record<string, string> = {
  PR01: 'Wewnętrzne',
  PR02: 'Zewnętrzne',
  PR03: 'Wewnętrzne przygotowane przez kontrahenta',
};

const PodmiotBadanyCodeMapping: Record<string, string> = {
  PB01: 'Podmiot, którego dotyczy informacja o cenach transferowych',
  PB02: 'Kontrahent',
};

const KryteriumGeograficzneCodeMapping: Record<string, string> = {
  KG01: 'Polska',
  KG02: 'Region',
  KG03: 'Europa',
  KG04: 'Świat',
  KG05: 'Inne',
};

const RodzajMetodyPodzialuZyskuCodeMapping: Record<string, string> = {
  PZ01: 'Podział zysku (straty) za pomocą analizy rezydualnej, w przypadku gdy uprawniony do otrzymania zysku rutynowego jest podmiot, którego dotyczy Informacja TPR',
  PZ02: 'Podział zysku (straty) za pomocą analizy rezydualnej, w przypadku gdy uprawniony do otrzymania zysku rutynowego jest kontrahent (kontrahenci) podmiotu, którego dotyczy Informacja TPR',
  PZ03: 'Podział zysku (straty) za pomocą analizy rezydualnej, w przypadku gdy uprawniony do otrzymania zysku rutynowego jest zarówno podmiot, którego dotyczy Informacja TPR, jak i jego kontrahent (kontrahenci)',
  PZ04: 'Podział zysku (straty) za pomocą analizy udziału',
};

const TechWycenyCodeMapping: Record<string, string> = {
  TW01: 'Metoda dochodowa (DCF)',
  TW02: 'Metoda dochodowa inna niż DCF',
  TW03: 'Metoda porównawcza',
  TW04: 'Metoda majątkowa',
  TW05: 'Metoda statystyczna',
  TW06: 'Kombinacja dwu lub więcej metod wskazanych powyżej',
  TW07: 'Analiza zgodności – w pozostałych przypadkach',
};

const OkresPrognozyCodeMapping: Record<string, string> = {
  TB01: '1 dzień (O/N)',
  TB02: '1 miesiąc',
  TB03: '3 miesiące',
  TB04: '6 miesięcy',
  TB05: '9 miesięcy',
  TB06: '1 rok',
  TB07: 'Inny',
};

const ZrodloDanychZgodnosciCodeMapping: Record<string, string> = {
  AZ01: 'Statystki publiczne',
  AZ02: 'Dane ofertowe',
  AZ03: 'Ogólnodostępne raporty z analiz rynkowych lub branżowych',
  AZ04: 'Raporty z innych analiz (w tym cyklu życia produktu, opcji realistycznie dostępnych, korzyści stron transakcji)',
  AZ05: 'Notowania giełdowe',
  AZ06: 'Notowanie pozagiełdowe',
  AZ07: 'Procedury wewnętrzne (np. metodyki ustalania cen)',
  AZ08: 'Praktyka rynkowa',
  AZ09: 'Inne źródła danych niewymienione powyżej',
};

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
      values: Object.values(
        createReverseMapping(WynagrodzenieZaRestrukturyzacjeCodeMapping),
      ),
    } as ISelectCellEditorParams,
    valueFormatter: (params) =>
      WynagrodzenieZaRestrukturyzacjeCodeMapping[params.value],
  },
  {
    field: 'RodzajUmowy',
    headerName: 'Rodzaj Umowy',
    headerTooltip: 'Rodzaj Umowy',
    type: 'A2Type',
    cellEditor: 'agSelectCellEditor',
    cellDataType: 'text',
    cellEditorParams: {
      values: Object.values(createReverseMapping(RodzajUmowyCodeMapping)),
    } as ISelectCellEditorParams,
    valueFormatter: (params) => RodzajUmowyCodeMapping[params.value],
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
      values: Object.values(createReverseMapping(UdzialCodeMapping)),
    } as ISelectCellEditorParams,
    valueFormatter: (params) => UdzialCodeMapping[params.value],
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
      values: Object.values(createReverseMapping(correctionCodeMapping)),
    } as ISelectCellEditorParams,
    valueFormatter: (params) => correctionCodeMapping[params.value],
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
    valueFormatter: (params) => compensationCodeMapping[params.value],
  },
  {
    field: 'Zwolnienie',
    headerName: 'Zwolnienie',
    headerTooltip: 'Zwolnienie',
    cellEditor: 'agSelectCellEditor',
    cellDataType: 'text',
    cellEditorParams: {
      values: Object.values(createReverseMapping(ZwolnienieCodeMapping)),
    } as ISelectCellEditorParams,
    valueFormatter: (params) => ZwolnienieCodeMapping[params.value],
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
      values: Object.values(createReverseMapping(RodzajTransakcjiCodeMapping)),
    } as ISelectCellEditorParams,
    valueFormatter: (params) => RodzajTransakcjiCodeMapping[params.value],
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
      values: Object.values(createReverseMapping(MetodyBadaniaCodeMapping)),
    } as ISelectCellEditorParams,
    valueFormatter: (params) => MetodyBadaniaCodeMapping[params.value],
  },
  {
    field: 'SposobWeryfikacji',
    headerName: 'Sposób weryfikacji',
    headerTooltip: 'Sposób weryfikacji',
    cellEditor: 'agSelectCellEditor',
    type: 'analysisMethodType',
    cellEditorParams: {
      values: Object.values(createReverseMapping(SposobWeryfikacjiCodeMapping)),
    } as ISelectCellEditorParams,
    valueFormatter: (params) => SposobWeryfikacjiCodeMapping[params.value],
  },
  {
    field: 'KorektaMetodyBadania',
    headerName: 'Korekta dla metody badania',
    headerTooltip: 'Korekta dla metody badania',
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: Object.values(
        createReverseMapping(KorektaMetodyBadaniaCodeMapping),
      ),
    } as ISelectCellEditorParams,
    valueFormatter: (params) => KorektaMetodyBadaniaCodeMapping[params.value],
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
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: Object.values(
        createReverseMapping(KorektaPorownywalnosciProgCodeMapping),
      ),
    } as ISelectCellEditorParams,
    valueFormatter: (params) =>
      KorektaPorownywalnosciProgCodeMapping[params.value],
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
      values: Object.values(createReverseMapping(SposobUjeciaCenyCodeMapping)),
    } as ISelectCellEditorParams,
    valueFormatter: (params) => SposobUjeciaCenyCodeMapping[params.value],
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
      values: Object.values(createReverseMapping(RodzajPrzedzialuCodeMapping)),
    } as ISelectCellEditorParams,
    valueFormatter: (params) => RodzajPrzedzialuCodeMapping[params.value],
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
      values: Object.values(createReverseMapping(WskaznikFinansowyCodeMapping)),
      valueListMaxHeight: 120,
      valueListMaxWidth: 120,
    } as ISelectCellEditorParams,
    valueFormatter: (params) => WskaznikFinansowyCodeMapping[params.value],
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
      values: Object.values(createReverseMapping(RodzajPorownaniaCodeMapping)),
    } as ISelectCellEditorParams,
    valueFormatter: (params) => RodzajPorownaniaCodeMapping[params.value],
  },
  {
    field: 'PodmiotBadany',
    headerName: 'Podmiot badany',
    headerTooltip: 'Podmiot badany',
    cellEditor: 'agSelectCellEditor',
    type: 'PR02Type',
    cellEditorParams: {
      values: Object.values(createReverseMapping(PodmiotBadanyCodeMapping)),
    } as ISelectCellEditorParams,
    valueFormatter: (params) => PodmiotBadanyCodeMapping[params.value],
  },
  {
    field: 'KryteriumGeograficzne',
    headerName: 'Kryterium geograficzne',
    headerTooltip: 'Kryterium geograficzne',
    cellEditor: 'agSelectCellEditor',
    type: 'PR02Type',
    cellEditorParams: {
      values: Object.values(
        createReverseMapping(KryteriumGeograficzneCodeMapping),
      ),
    } as ISelectCellEditorParams,
    valueFormatter: (params) => KryteriumGeograficzneCodeMapping[params.value],
  },
  {
    field: 'RodzajMetodyPodzialuZysku',
    headerName: 'Rodzaj metody podziału zysku',
    headerTooltip: 'Rodzaj metody podziału zysku',
    cellEditor: 'agSelectCellEditor',
    type: 'MW04Type',
    cellEditorParams: {
      values: Object.values(
        createReverseMapping(RodzajMetodyPodzialuZyskuCodeMapping),
      ),
    } as ISelectCellEditorParams,
    valueFormatter: (params) =>
      RodzajMetodyPodzialuZyskuCodeMapping[params.value],
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
      values: Object.values(createReverseMapping(TechWycenyCodeMapping)),
    } as ISelectCellEditorParams,
    valueFormatter: (params) => TechWycenyCodeMapping[params.value],
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
      values: Object.values(createReverseMapping(OkresPrognozyCodeMapping)),
    } as ISelectCellEditorParams,
    valueFormatter: (params) => OkresPrognozyCodeMapping[params.value],
  },
  {
    field: 'TerminInny',
    headerName: 'Termin inny',
    headerTooltip: 'Termin inny',
    type: 'InnyTerminType',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
  },
  {
    field: 'ZrodloDanychZgodnosci',
    headerName: 'Źródło danych zgodności',
    headerTooltip: 'Źródło danych zgodności',
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: Object.values(
        createReverseMapping(ZrodloDanychZgodnosciCodeMapping),
      ),
    } as ISelectCellEditorParams,
    valueFormatter: (params) => ZrodloDanychZgodnosciCodeMapping[params.value],
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
