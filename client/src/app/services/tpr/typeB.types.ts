export type TransakcjaKategoriaB<K extends KorektaCenTransferowych = KorektaCenTransferowych> = {
  KategoriaB: '1101' | '2101';
  PrzedmiotB: string;
  WartoscB: {
    _attributes: {
      kodWaluty: string;
    };
    _text: number;
  };
  Kompensata: Kompensata;
  KodZW1: 'ZW01';
  PodstZW?: PodstawaZwolnienia;
  InformacjaOKrajuB1: {
    Kraj: string;
    WartoscBKraj1: {
      _attributes: {
        kodWaluty: string;
      };
      _text: number;
    };
  };
} & (K extends 'KC01' ? KC01 : K extends 'KC02' ? KC02 : {});

export type KC01 = {
  KorektaCT4: 'KC01';
  WartKorektyCT4: {
    _attributes: {
      kodWaluty: string;
    };
    _text: number;
  };
};

export type KC02 = {
  BrakKorektyCT4?: 'KC02';
};

// Common types
export type KorektaCenTransferowych = 'KC01' | 'KC02';
export type Kompensata = 'KS01' | 'KS02' | 'KS03';
export type PodstawaZwolnienia = '11n1' | '11n1a' | '11n2';
