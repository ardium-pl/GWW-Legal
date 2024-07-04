import { EOF } from '@angular/compiler';
import {
  Kompensata,
  Korekta,
  KorektaCenTransferowych,
  MetodyBadania,
  RodzajTransakcji,
  SposobWeryfikacjiEynkowegoPoziomuCeny,
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
  transactions: Array<AllTransactionTables>;
};

export type Transaction = {
  transactionCategory: string;
  subjectMatter: string;
  transactionValue: number;
  currencyCode: string;
  correction: 'KC01' | 'KC02';
  compensation: 'KS01' | 'KS02' | 'KS03';
  safeHarbour: string;
  korektaCenTransferowych: string;
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
  KategoriaA: string;
  PrzedmiotA: string;
  WartoscA: number;
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
};

export type AllTransactionTables = Transaction & TransactionTable &{
  test: string;
}
