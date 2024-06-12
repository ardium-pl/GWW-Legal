// Base TransakcjaKategoriaF type with generic support variables
export type TransakcjaKategoriaF<
  K extends KorektaCenTransferowych = KorektaCenTransferowych
> = {
  KategoriaF: string;
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
  PodstZW: '11n1';
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
