export type TransakcjaKategoriaD<K extends KorektaCenTransferowych = KorektaCenTransferowych> = {
  KategoriaD: '1201' | '2201';
  PrzedmiotD: string;
  WartoscD: {
    _attributes: {
      kodWaluty: string;
    };
    _text: number;
  };
  Kompensata: Kompensata;
  KapitalD: {
    _attributes: {
      kodWaluty: string;
    };
    _text: number; // Podać w tysiącach
  };
  ZadluzenieD: {
    _attributes: {
      kodWaluty: string;
    };
    _text: number; // Podać w tysiącach
  };
  OdsetkiDm: {
    _attributes: {
      kodWaluty: string;
    };
    _text: number; // Podać w tysiącach
  };
  OdsetkiDk: {
    _attributes: {
      kodWaluty: string;
    };
    _text: number; // Podać w tysiącach
  };
  KodZW1: 'ZW01';
  PodstZW?: PodstawaZwolnienia;
  Kraj: string;
  NazwaKontr1: string;
  WartTransKontr1: {
    _attributes: {
      kodWaluty: string;
    };
    _text: number;
  };
} & (K extends 'KC01' ? KC01 : {}) &
  (K extends 'KC02' ? KC02 : {}) &
  (
    | { NIPKontr1: string; PESELKontr1?: never; NrIdKontr1?: never }
    | { NIPKontr1?: never; PESELKontr1: string; NrIdKontr1?: never }
    | {
        NIPKontr1?: never;
        PESELKontr1?: never;
        NrIdKontr1: string;
        KodKrajuWydania1: string;
      }
  );

type KC01 = {
  KorektaCT5: 'KC01';
  WartKorektyCT5: {
    _attributes: {
      kodWaluty: string;
    };
    _text: number;
  };
};

type KC02 = {
  BrakKorektyCT5: 'KC02';
};

// Common types
type KorektaCenTransferowych = 'KC01' | 'KC02';
type Kompensata = 'KS01' | 'KS02' | 'KS03';
type PodstawaZwolnienia = '11n1' | '11n1a' | '11n2';
