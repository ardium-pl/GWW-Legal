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
import { WynagrodzenieZaRestrukturyzację } from './typeA1.types';
import { RodzajUmowy, Udział } from './typeA2.types';
import {
  NazwaStopyBazowej,
  RodzajOprocentowania,
  TerminStopyBazowej,
  ZrodloDanychFinansowych,
} from './typeC.types';
import {
  RodzajAnalizy,
  RodzajeWartosciNiematerialnych,
  SposobKalkulacjiOplaty,
} from './typeE.types';

export type TransactionATable = {
  Id: number;
  transactionCategory: string;
  WynagrodzenieZaRestrukturyzacje?: WynagrodzenieZaRestrukturyzację;
  RodzajUmowy?: RodzajUmowy;
  subjectMatter: string;
  transactionValue: number;
  currencyCode: string;
  Wklad?: number;
  KodWalutyWkladu?: string;
  WkladOgolny?: number;
  KodWalutyWkladuOgolnego?: string;
  Udzial?: Udział;
  ProcentUdzialuWZyskach?: number;
  ProcentUdzialuWStracie?: number;
  ProcentUdzialuWMajatkuLikwidacyjnym?: number;
  correction: KorektaCenTransferowych;
  WartoscKorekty?: number;
  KodWalutyKorekty?: string;
  compensation: Kompensata;
  safeHarbour: string;
  Zwolnienie: ZwolnienieArt11n;
  PodstawaZwolnienia?: '11n1' | '11n1a' | '11n2' | null;
  KodKrajuZwolnienia?: string;
  WartoscTransakcjiZwolnienia?: number;
  KodWalutyKraju?: string;
  RodzajTransakcji?: RodzajTransakcji;
  KodKrajuTransakcji?: string;
  WartośćTransakcjiKraju?: number;
  KodWalutyKrajuTransakcji?: string;
  MetodyBadania?: MetodyBadania;
  SposobWeryfikacji?: SposobWeryfikacjiEynkowegoPoziomuCeny;
  KorektaMetodyBadania?: Korekta;
  KorektaPorownywalnosciProg?: string;
  SposobUjeciaCeny?: SposobUjeciaCeny;
  Waluta1?: string;
  CenaMinimalna?: number;
  CenaMaksymalna?: number;
  Miara1?: string;
  RodzajPrzedzialu?: RodzajPrzedzialu;
  CenaPorownywalnaMin?: number;
  CenaPorownywalnaMax?: number;
  OpisPrzedzialu?: string;
  WysokoscCenyPorownywalnej?: number;
  ProcentMinimalny?: number;
  ProcentMaksymalny?: number;
  Miara2?: string;
  DolnaGranica?: number;
  GornaGranica?: number;
  WysokoscWskaznikaFinansowego?: number;
  WskaznikFinansowy?: WskaznikFinansowy;
  WynikTransakcji?: number;
  RodzajPorownania?: RodzajPorownania;
  PodmiotBadany?: PodmiotBadany;
  KryteriumGeograficzne?: KryteriumGeograficzne;
  RodzajMetodyPodzialuZysku?: RodzajMetodyPodzialuZysku;
  Strata?: boolean;
  ZakladanyZysk?: number;
  ZrealizowanyZysk?: number;
  TechWyceny?: TechWyceny;
  WspolczynnikDyskontowy?: number;
  OkresPrognozy?: OkresPrognozy;
  TerminInny?: ZrodloDanychZgodnosci;
  ZrodloDanychZgodnosci?: ZrodloDanychZgodnosci;
  taxExemptionCode: ZwolnienieArt11n;
};

export type TransactionBTable = {
  Id: number;
  transactionCategory: string;
  subjectMatter: string;
  transactionValue: number;
  currencyCode: string;
  correction: KorektaCenTransferowych;
  WartoscKorekty?: number;
  KodWalutyKorekty?: string;
  compensation: Kompensata;
  safeHarbour?: string;
  TransakcjaZwolniona: ZwolnienieArt11n;
  PodstawaZwolnienia: '11n1' | '11n1a' | '11n2' | null;
  KodKraju: string;
  WartoscTransakcjiKraju: number;
  KodWalutyKraju: string;
};

export type TransactionCTable = {
  Id: number;
  transactionCategory: string;
  subjectMatter: string;
  transactionValue: number;
  currencyCode: string;
  correction: KorektaCenTransferowych;
  WartoscKorekty?: number;
  KodWalutyKorekty?: string;
  compensation: Kompensata;
  safeHarbour: string;
  Kapital: number;
  KodWalutyKapitalu: string;
  Zadluzenie: number;
  KodWalutyZadluzenia: string;
  WysokoscOdsetekMemorialowo: number;
  KodWalutyOdsetekMemorialowych: string;
  WysokoscOdsetekKasowo: number;
  KodWalutyOdsetekKasowych: string;
  Zwolnienie: ZwolnienieArt11n;
  PodstawaZwolnienia: '11n1' | '11n1a' | '11n2' | null;
  KodKrajuZwolnienia: string;
  WartoscTransakcjiZwolnienia: number;
  KodWalutyKraju: string;
  RodzajTransakcji?: RodzajTransakcji;
  KodKrajuTransakcji?: string;
  WartośćTransakcjiKraju?: number;
  KodWalutyKrajuTransakcji?: string;
  MetodyBadania?: MetodyBadania;
  ZrodloDanychFinansowych?: ZrodloDanychFinansowych;
  KorektaMetodyBadania?: Korekta;
  KorektaPorownywalnosciProg?: string;
  RodzajOprocentowania?: RodzajOprocentowania;
  Marza?: number;
  NazwaStopyBazowej?: NazwaStopyBazowej;
  InnaSB?: string;
  TerminStopyBazowej?: TerminStopyBazowej;
  Okres?: string;
  PoziomOprocentowania?: number;
  PoziomOprocentowaniaMinimalny?: number;
  PoziomOprocentowaniaMaksymalny?: number;
  RodzajPrzedzialu?: RodzajPrzedzialu;
  DolnaGranicaPrzedzialu?: number;
  GornaGranicaPrzedzialu?: number;
  OpisPrzedzialu?: string;
};

export type TransactionDTable = {
  Id: number;
  transactionCategory: string;
  subjectMatter: string;
  transactionValue: number;
  currencyCode: string;
  correction: KorektaCenTransferowych;
  WartoscKorekty?: number;
  KodWalutyKorekty?: string;
  compensation?: Kompensata;
  safeHarbour: string;
  Kapital: number;
  KodWalutyKapitalu: string;
  KodWalutyZadluzenia: string;
  WysokoscOdsetekMiesiecznych: number;
  KodWalutyOdsetekMiesiecznych: string;
  WysokoscOdsetekKwartalnych: number;
  KodWalutyOdsetekKwartalnych: string;
  TransakcjaZwolniona: 'ZW01';
  PodstawaZwolnienia: '11n1' | '11n1a' | '11n2' | null;
  Kraj: string;
  NazwaKontrahenta: string;
  WartoscTransakcjiZKontrahentem: number;
  KodWalutyTransakcjiZKontrahentem: string;
  IdentyfikatorKontrahenta: 'NIP' | 'PESEL' | 'NrId';
  Nip?: string;
  Pesel?: string;
  NrId?: string;
  KodKrajuWydania?: string;
};

export type TransactionETable = {
  Id: number;
  transactionCategory: string;
  subjectMatter: string;
  transactionValue: number;
  currencyCode: string;
  correction: KorektaCenTransferowych;
  WartoscKorekty?: number;
  KodWalutyKorekty?: string;
  compensation: Kompensata;
  RodzajWartosciNiematerialnych: RodzajeWartosciNiematerialnych;
  Zwolnienie: ZwolnienieArt11n;
  PodstawaZwolnienia: '11n1' | '11n1a' | '11n2' | null;
  KodKrajuZwolnienia?: string;
  WartoscTransakcjiZwolnienia?: number;
  KodWalutyKraju?: string;
  RodzajTransakcji?: RodzajTransakcji;
  KodKrajuTransakcji?: string;
  WartośćTransakcjiKraju?: number;
  KodWalutyKrajuTransakcji?: string;
  MetodyBadania?: MetodyBadania;
  RodzajAnalizy?: RodzajAnalizy;
  SposobWyrazeniaCeny?: string;
  SposobKalkulacjiOplaty?: SposobKalkulacjiOplaty;
  PoziomOplaty?: number;
  RodzajPrzedzialu?: RodzajPrzedzialu;
  DolnaGranicaPrzedzialu?: number;
  GornaGranicaPrzedzialu?: number;
  KorektaMetodyBadania?: Korekta;
  KorektaPorownywalnosci?: Korekta;
  KorektaPorownywalnosciProg?: string;
};

export type TransactionFTable = {
  Id: number;
  transactionCategory: string;
  subjectMatter: string;
  transactionValue: number;
  currencyCode: string;
  correction: KorektaCenTransferowych;
  WartoscKorekty?: number;
  KodWalutyKorekty?: string;
  safeHarbour: string;
  compensation: Kompensata;
  TransakcjaZwolniona: 'ZW01';
  PodstawaZwolnienia: '11n1' | '11n1a' | '11n2' | null;
  KodKraju: string;
  WartoscTransakcjiKraju: number;
  KodWalutyKraju: string;
};
