// Base TransakcjaKategoriaF type with generic support variables
export type TransakcjaKategoriaF<
  K extends KorektaCenTransferowych = KorektaCenTransferowych
> = {
  KategoriaF: '1501'|'2501';
  PrzedmiotF: string;
  WartoscF: [
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
  InformacjaOKrajuF1: {
    Kraj: string;
    WartoscFKraj1: [
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
  KorektaCT6: 'KC01';
  WartKorektyCT6: [
    {
      _attr: {
        kodWaluty: string;
      };
    },
    number
  ];
};

type KC02 = {
  BrakKorektyCT6: 'KC02';
};

// Common types
type KorektaCenTransferowych = 'KC01' | 'KC02';
type Kompensata = 'KS01' | 'KS02' | 'KS03';
type PodstawaZwolnienia = '11n1' | '11n1a' | '11n2';

