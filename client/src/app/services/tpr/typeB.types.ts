export type TransakcjaKategoriaB<
  K extends KorektaCenTransferowych = KorektaCenTransferowych
> = {
  KategoriaB: string;
  PrzedmiotB: string;
  WartoscB:[
    {
      _attr: {
        kodWaluty: string;
      };
    },
    number
  ];
  SupportVarCorrection: K;
  Kompensata: Kompensata;
  KodZW1: 'ZW01';
  PodstZW: '11n1';
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
} & SupportVarCorrectionMap<K>;

// SupportVar mappings for KorektaCenTransferowych
type SupportVarCorrectionMap<K extends KorektaCenTransferowych> =
  K extends 'KC01' ? KC01 :
  K extends 'KC02' ? KC02 : {};

// KorektaCenTransferowych types
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
