import {
  KorektaCenTransferowych,
  Kompensata,
  ZwolnienieArt11n,
  RodzajTransakcji,
  MetodyBadania,
  SposobWeryfikacjiEynkowegoPoziomuCeny,
  Korekta,
  SposobUjeciaCeny,
  RodzajPrzedzialu,
  WskaznikFinansowy,
  RodzajPorownania,
  PodmiotBadany,
  KryteriumGeograficzne,
  RodzajMetodyPodzialuZysku,
  TechWyceny,
  OkresPrognozy,
  ZrodloDanychZgodnosci,
} from './typeA.types';

export type TransactionATable = {
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

export type TransactionBTable = {
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
};

export type TransactionCTable = {};

export type TransactionDTable = {
  Kategoria: string;
  Przedmiot: string;
  Wartosc: number;
  KodWaluty: string;
  Korekta: KorektaCenTransferowych;
  WartoscKorekty: number;
  KodWalutyKorekty: string;
  BrakKorektyCT5: 'KC02';
  Kompensata: Kompensata;
  KodWalutyKapitalu: string;
  KodWalutyZadluzenia: string;
  KodWalutyOdsetekMiesiecznych: string;
  KodWalutyOdsetekKwartalnych: string;
  TransakcjaZwolniona: 'ZW01';
  PodstawaZwolnienia: '11n1' | '11n1a' | '11n2' | null;
  Kraj: string;
  NazwaKontrahenta: string;
  WartoscTransakcjiZKontrahentem: number;
  KodWalutyTransakcjiZKontrahentem: string;
  IdentyfikatorKontrahenta: 'NIP' | 'PESEL' | 'NrId';
  Nip: string;
  Pesel: string;
  NrId: string;
  KodKrajuWydania: string;
};

export type TransactionETable = {};

export type TransactionFTable = {
  Kategoria: string;
  Przedmiot: string;
  Wartosc: number;
  KodWaluty: string;
  Korekta: KorektaCenTransferowych;
  WartoscKorekty: number;
  KodWalutyKorekty: string;
  Kompensata: Kompensata;
  Zwolnienie: ZwolnienieArt11n;
  TransakcjaZwolniona: 'ZW01';
  PodstawaZwolnienia: '11n1' | '11n1a' | '11n2' | null;
  KodKraju: string;
  WartoscTransakcjiKraju: number;
  KodWalutyKraju: string;
};
