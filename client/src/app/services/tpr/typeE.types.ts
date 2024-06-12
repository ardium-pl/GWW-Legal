export type TransakcjaKategoriaE<
  K extends KorektaCenTransferowych = KorektaCenTransferowych,
  ZW extends ZwolnienieArt11n = ZwolnienieArt11n,
  MW extends MetodyBadania = MetodyBadania,
  KP extends Korekta = Korekta
> = {
  KategoriaE: string;
  PrzedmiotE: string;
  WartoscE: [
    {
      _attr: {
        kodWaluty: string;
      };
    },
    number
  ];
  Kompensata: Kompensata;
  RodzajDN: RodzajeWartosciNiematerialnych;
} &
  (K extends 'KC01' ? KC01 : {}) &
  (K extends 'KC02' ? KC02 : {}) &
  (ZW extends 'ZW01' ? ZW01 : {}) &
  (ZW extends 'ZW02' ? ZW02 : {}) &
  (MW extends 'MW00' ? MW00 : {}) &
  (MW extends 'MW01' | 'MW02' | 'MW03' | 'MW04' | 'MW05' | 'MW06' ? MW01toMW06<KP> : {})

type KC01 = {
  KorektaCT3: 'KC01';
  WartKorektyCT3: [
    {
      _attr: {
        kodWaluty: string;
      };
    },
    number
  ];
}

type KC02 = {
  BrakKorektyCT3: 'KC02';
}

type ZW01 = {
  KodZW1: 'ZW01';
  PodstZW: '11n1'; // u klienta pojawia się tylko ta wartość
  InformacjaOKrajuE1: {
    Kraj: string;
    WartoscEKraj1: [
      {
        _attr: {
          kodWaluty: string;
        };
      },
      number
    ];
  };
}

type ZW02<
  TK extends RodzajTransakcji = RodzajTransakcji
> = {
  KodZW2: 'ZW02';
} &
  (TK extends 'TK01' ? TK01 : {}) &
  (TK extends 'TK02' ? TK02 : {});

type TK01 = {
  RodzajTrans1: 'TK01';
  InformacjaOKrajuE2: {
    Kraj: string;
    WartoscEKraj2: [
      {
        _attr: {
          kodWaluty: string;
        };
      },
      number
    ];
  };
}

type TK02 = {
  RodzajTrans2: 'TK02';
  Kraj: string;
}

type MW00 = {
  MetodaE1: 'MW00';
}

type MW01toMW06<KP extends Korekta> = {
  MetodaE: 'MW01' | 'MW02' | 'MW03' | 'MW04' | 'MW05' | 'MW06';
  RodzajAnalizy: RodzajAnalizy;
  SposobWyrCeny: string;
  KalkOplaty1: SposobKalkulacjiOplaty;
  PoziomOpl1: number; // TOCODE: Podać w procentach
  RodzajPrzedzialu: 'RP01'; //Powinno być aż do RP04 ale klient nigdy nie używa innych wersji 
  WynikAPKO1D1: number; //TOCODE: Podać jako liczba tysięcy
  WynikAPKO1G1: number; //TOCODE: Podać jako liczba tysięcy
} &
  (KP extends 'KP01' ? KP01 : {}) &
  (KP extends 'KP02' ? KP02 : {});

type KP01 = {
  KorektyPorWyn4: 'KP01';
}

type KP02 = {
  KorektyPorWyn8: 'KP02';
}

// Common types
type KorektaCenTransferowych = 'KC01' | 'KC02';
type Kompensata = 'KS01' | 'KS02' | 'KS03';
type RodzajeWartosciNiematerialnych =
  | 'DN01'
  | 'DN02'
  | 'DN03'
  | 'DN04'
  | 'DN05'
  | 'DN06'
  | 'DN07'
  | 'DN08';
type ZwolnienieArt11n = 'ZW01' | 'ZW02';
type RodzajAnalizy =
  | 'RA01'
  | 'RA02'
  | 'RA03'
  | 'RA04'
  | 'RA05'
  | 'RA06'
  | 'RA07'
  | 'RA08'
  | 'RA09';
type MetodyBadania =
  | 'MW00'
  | 'MW01'
  | 'MW02'
  | 'MW03'
  | 'MW04'
  | 'MW05'
  | 'MW06';
type RodzajTransakcji = 'TK01' | 'TK02';
type Korekta = 'KP01' | 'KP02';
type SposobKalkulacjiOplaty =
  | 'SK01'
  | 'SK02'
  | 'SK03'
  | 'SK04'
  | 'SK05'
  | 'SK06';
