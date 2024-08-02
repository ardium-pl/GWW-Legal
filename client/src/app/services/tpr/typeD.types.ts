export type TransakcjaKategoriaD<K extends KorektaCenTransferowych = KorektaCenTransferowych> = {
  KategoriaD: '1201' | '2201';
  PrzedmiotD: string;
  WartoscD: {
    $: {
      kodWaluty: string;
    };
    _: string;
  };
  Kompensata: Kompensata;
  KapitalD: {
    $: {
      kodWaluty: string;
    };
    _: string; // Podać w tysiącach
  };
  ZadluzenieD: {
    $: {
      kodWaluty: string;
    };
    _: string; // Podać w tysiącach
  };
  OdsetkiDm: {
    $: {
      kodWaluty: string;
    };
    _: string; // Podać w tysiącach
  };
  OdsetkiDk: {
    $: {
      kodWaluty: string;
    };
    _: string; // Podać w tysiącach
  };
  KodZW1: 'ZW01';
  PodstZW?: PodstawaZwolnienia;
  Kraj: string;
  NazwaKontr1: string;
  WartTransKontr1: {
    $: {
      kodWaluty: string;
    };
    _: string;
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

export type KC01 = {
  KorektaCT5: 'KC01';
  WartKorektyCT5: {
    $: {
      kodWaluty: string;
    };
    _: string;
  };
};

export type KC02 = {
  BrakKorektyCT5: 'KC02';
};

// Common types
export type KorektaCenTransferowych = 'KC01' | 'KC02';
export type Kompensata = 'KS01' | 'KS02' | 'KS03';
export type PodstawaZwolnienia = '11n1' | '11n1a' | '11n2';
