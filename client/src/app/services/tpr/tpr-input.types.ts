import {
  Kompensata,
  Korekta,
  KorektaCenTransferowych,
  KryteriumGeograficzne,
  MetodyBadania,
  OkresPrognozy,
  PodmiotBadany,
  RodzajMetodyPodzialuZysku,
  RodzajPorownania,
  RodzajPrzedzialu,
  RodzajTransakcji,
  SposobUjeciaCeny,
  SposobWeryfikacjiEynkowegoPoziomuCeny,
  TechWyceny,
  WskaznikFinansowy,
  ZrodloDanychZgodnosci,
  ZwolnienieArt11n,
} from './typeA.types';

export type TPR_input = {
  periodFrom: string;
  periodUntil: string;
  taxID: string;
  fullName: string;
  countryCode: string;
  pkdCode: string;
  taxCategory: 'ZK01' | 'ZK02';
  operatingMargin: number;
  profitMargin: number;
  returnOnAssets: number;
  returnOnEquity: number;
  transactions: Array<Transaction>;
};

export type Transaction = {
  transactionCategory: string;
  subjectMatter: string;
  transactionValue: number;
  currencyCode: string;
  correction: 'KC01' | 'KC02';
  compensation: 'KS01' | 'KS02' | 'KS03';
};

export type TransactionTableInput = {
  Kategoria: string;
  Przedmiot: string;
  Wartosc: number;
  KodWaluty: string;
  Korekta: 'KC01' | 'KC02';
  Kompensata: 'KS01' | 'KS02' | 'KS03';
};

export type TransactionCategories = {
  categoryA: Transaction[];
  categoryB: Transaction[];
  categoryC: Transaction[];
  categoryD: Transaction[];
  categoryE: Transaction[];
  categoryF: Transaction[];
};

export type TransactionTable = {
  Kategoria: string;
  Przedmiot: string;
  Wartosc: number;
  KodWaluty: string;
  Korekta: KorektaCenTransferowych;
  WartoscKorekty: number;
  KodWalutyKorekty: string;
  Kompensata: Kompensata;
  Zwolnienie: ZwolnienieArt11n;
  PodstawaZwolnienia: '11n1' | '11n1a' | '11n2' | null;
  KodKrajuZwolnienia: string;
  WartoscTransakcjiZwolnienia: number;
  KodWalutyKraju: string;
  RodzajTransakcji: RodzajTransakcji;
  KodKrajuTransakcji: string;
  WartośćTransakcjiKraju: number;
  KodWalutyKrajuTransakcji: string;
  MetodyBadania: MetodyBadania;
  SposobWeryfikacji: SposobWeryfikacjiEynkowegoPoziomuCeny;
  KorektaMetodyBadania: Korekta;
  KorektaPorownywalnosciProg: number;
  SposobUjeciaCeny: SposobUjeciaCeny;
  Waluta1: string;
  CenaMinimalna: number;
  CenaMaksymalna: number;
  Miara1: string;
  RodzajPrzedzialu: RodzajPrzedzialu;
  CenaPorownywalnaMin: number;
  CenaPorownywalnaMax: number;
  OpisPrzedzialu: string;
  WysokoscCenyPorownywalnej: number;
  ProcentMinimalny: number;
  ProcentMaksymalny: number;
  Miara2: string;
  DolnaGranica: number;
  GornaGranica: number;
  WysokoscWskaznikaFinansowego: number;
  WskaznikFinansowy: WskaznikFinansowy;
  WynikTransakcji: number;
  RodzajPorownania: RodzajPorownania;
  PodmiotBadany: PodmiotBadany;
  KryteriumGeograficzne: KryteriumGeograficzne;
  RodzajMetodyPodzialuZysku: RodzajMetodyPodzialuZysku;
  Strata: boolean;
  ZakladanyZysk: number;
  ZrealizowanyZysk: number;
  TechWyceny: TechWyceny;
  WspolczynnikDyskontowy: number;
  OkresPrognozy: OkresPrognozy;
  TerminInny: ZrodloDanychZgodnosci;
  ZrodloDanychZgodnosci: ZrodloDanychZgodnosci;
};
