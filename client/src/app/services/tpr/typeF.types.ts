export type TransakcjaKategoriaF<
  K extends KorektaCenTransferowych = KorektaCenTransferowych,
> = {
  KategoriaF: '1501' | '2501';
  PrzedmiotF: string;
  WartoscF: {
    _attributes: {
      kodWaluty: string;
    };
    _text: number;
  };
  Kompensata: Kompensata;
  KodZW1: 'ZW01';
  PodstZW?: PodstawaZwolnienia;
  InformacjaOKrajuF1: {
    Kraj: string;
    WartoscFKraj1: {
      _attributes: {
        kodWaluty: string;
      };
      _text: number;
    };
  };
} & (K extends 'KC01' ? KC01 : {}) &
  (K extends 'KC02' ? KC02 : {});

export type KC01 = {
  KorektaCT6: 'KC01';
  WartKorektyCT6: {
    _attributes: {
      kodWaluty: string;
    };
    _text: number;
  };
};

export type KC02 = {
  BrakKorektyCT6: 'KC02';
};

// Common types
export type KorektaCenTransferowych = 'KC01' | 'KC02';
export type Kompensata = 'KS01' | 'KS02' | 'KS03';
export type PodstawaZwolnienia = '11n1' | '11n1a' | '11n2';