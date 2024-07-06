export type TransakcjaKategoriaE<
  K extends KorektaCenTransferowych = KorektaCenTransferowych,
  ZW extends ZwolnienieArt11n = ZwolnienieArt11n,
  MW extends MetodyBadania = MetodyBadania,
  KP extends Korekta = Korekta
> = {
  KategoriaE: '1401'|'2401';
  PrzedmiotE: string;
  WartoscE: {
    _attributes: {
      kodWaluty: string;
    };
    _text: number;
  };
  Kompensata: Kompensata;
  RodzajDN: RodzajeWartosciNiematerialnych;
} &
  (K extends 'KC01' ? KC01 : {}) |
  (K extends 'KC02' ? KC02 : {}) &
  (ZW extends 'ZW01' ? ZW01 : {}) |
  (ZW extends 'ZW02' ? ZW02 : {}) &
  (MW extends 'MW00' ? MW00 : {}) |
  (MW extends 'MW01' | 'MW02' | 'MW03' | 'MW04' | 'MW05' | 'MW06' ? MW01toMW06<KP> : {});

export type KC01 = {
  KorektaCT3: 'KC01';
  WartKorektyCT3: {
    _attributes: {
      kodWaluty: string;
    };
    _text: number;
  };
}

export type KC02 = {
  BrakKorektyCT3: 'KC02';
}

export type ZW01 = {
  KodZW1: 'ZW01';
  PodstZW?: PodstawaZwolnienia;
  InformacjaOKrajuE1: {
    Kraj: string;
    WartoscEKraj1: {
      _attributes: {
        kodWaluty: string;
      };
      _text: number;
    };
  };
}

export type ZW02<
  TK extends RodzajTransakcji = RodzajTransakcji
> = {
  KodZW2: 'ZW02';
} &
  (TK extends 'TK01' ? TK01 : {}) &
  (TK extends 'TK02' ? TK02 : {});

export type TK01 = {
  RodzajTrans1: 'TK01';
  InformacjaOKrajuE2: {
    Kraj: string;
    WartoscEKraj2: {
      _attributes: {
        kodWaluty: string;
      };
      _text: number;
    };
  };
}

export type TK02 = {
  RodzajTrans2: 'TK02';
  Kraj: string;
}

export type MW00 = {
  MetodaE1: 'MW00';
}

export type MW01toMW06<KP extends Korekta> = {
  MetodaE: 'MW01' | 'MW02' | 'MW03' | 'MW04' | 'MW05' | 'MW06';
  RodzajAnalizy: RodzajAnalizy;
  SposobWyrCeny: string;
  KalkOplaty1: SposobKalkulacjiOplaty;
  PoziomOpl1: number; // TOCODE: Podać w procentach
  RodzajPrzedz10: 'RP01'; // Powinno być aż do RP04 ale klient nigdy nie używa innych wersji 
  WynikAPKO1D1: number; // TOCODE: Podać jako liczba tysięcy
  WynikAPKO1G1: number; // TOCODE: Podać jako liczba tysięcy
} &
  (KP extends 'KP01' ? KP01 : {}) &
  (KP extends 'KP02' ? KP02 : {});

export type KP01 = {
  KorektyPorWyn4: 'KP01';
}

export type KP02 = {
  KorektyPorWyn8: 'KP02';
}

// Common types
export type KorektaCenTransferowych = 'KC01' | 'KC02';
export type Kompensata = 'KS01' | 'KS02' | 'KS03';
export type RodzajeWartosciNiematerialnych =
  | 'DN01'
  | 'DN02'
  | 'DN03'
  | 'DN04'
  | 'DN05'
  | 'DN06'
  | 'DN07'
  | 'DN08';
export type ZwolnienieArt11n = 'ZW01' | 'ZW02';
export type RodzajAnalizy =
  | 'RA01'
  | 'RA02'
  | 'RA03'
  | 'RA04'
  | 'RA05'
  | 'RA06'
  | 'RA07'
  | 'RA08'
  | 'RA09';
export type MetodyBadania =
  | 'MW00'
  | 'MW01'
  | 'MW02'
  | 'MW03'
  | 'MW04'
  | 'MW05'
  | 'MW06';
export type RodzajTransakcji = 'TK01' | 'TK02';
export type Korekta = 'KP01' | 'KP02';
export type SposobKalkulacjiOplaty =
  | 'SK01'
  | 'SK02'
  | 'SK03'
  | 'SK04'
  | 'SK05'
  | 'SK06';
export type PodstawaZwolnienia = '11n1' | '11n1a' | '11n2';
