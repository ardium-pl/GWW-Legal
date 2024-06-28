import { TransakcjaKategoriaA } from './typeA.types';
import { TransakcjaKategoriaB } from './typeB.types';
import { TransakcjaKategoriaC } from './typeC.types';
import { TransakcjaKategoriaE } from './typeE.types';
import { TransakcjaKategoriaF } from './typeF.types';

export type TPR = {
  Deklaracja: {
    _attributes: {
      xmlns: string;
    };
    Naglowek: {
      KodFormularza: [
        {
          _attributes: {
            kodSystemowy: string;
            kodPodatku: string;
            rodzajZobowiazania: string;
            wersjaSchemy: string;
          };
        },
        string,
      ];
      WariantFormularza: number;
      CelZlozenia: number;
      OkresOd: string;
      OkresDo: string;
    };
    Podmiot1: {
      _attributes: {
        rola: string;
      };
      NIP: string;
      PelnaNazwa: string;
      KodKraju: string;
      KodPKD: string;
    };
    PozycjeSzczegolowe: {
      PodmiotNZ: PozycjeSzczegolowe;
      InnyPodmiot: {
        MarzaOper: number;
        MarzaZysku: number;
        RentAkt: number;
        RentKW: number;
      };
      Transakcja: Array<
        | TransakcjaKategoriaA
        | TransakcjaKategoriaB
        | TransakcjaKategoriaC
        | TransakcjaKategoriaE
        | TransakcjaKategoriaF
      >;
    };
  };
};


export type PozycjeSzczegolowe = 'ZK01' | 'ZK02';
type TPR_Universal_Header = {};
