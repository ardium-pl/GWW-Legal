export type TransakcjaKategoriaB<
  K extends KorektaCenTransferowych = KorektaCenTransferowych
> = {
  KategoriaB: '1101'|'2101';
  PrzedmiotB: string;
  WartoscB: [
    {
      _attr: {
        kodWaluty: string;
      };
    },
    number
  ];
  Kompensata: Kompensata;
  KodZW1: 'ZW01';
  PodstZW?: PodstawaZwolnienia;
  InformacjaOKrajuB1: {
    Kraj: string;
    WartoscBKraj1: [
      {
        _attr: {
          kodWaluty: string;
        };
      },
      number
    ];
  };
} &
  (K extends 'KC01' ? KC01 : {}) &
  (K extends 'KC02' ? KC02 : {});


type KC01 = {
  KorektaCT4: 'KC01';
  WartKorektyCT4: [
    {
      _attr: {
        kodWaluty: string;
      };
    },
    number
  ];
};

type KC02 = {
  BrakKorektyCT4: 'KC02';
};

// Common types
type KorektaCenTransferowych = 'KC01' | 'KC02';
type Kompensata = 'KS01' | 'KS02' | 'KS03';
type PodstawaZwolnienia = '11n1' | '11n1a' | '11n2';
