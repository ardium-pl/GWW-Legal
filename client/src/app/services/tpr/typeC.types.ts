export type TransakcjaKategoriaC<
  K extends KorektaCenTransferowych = KorektaCenTransferowych,
  ZW extends ZwolnienieArt11n = ZwolnienieArt11n,
  MW extends MetodyBadania = MetodyBadania
> = {
  KategoriaC: string;
  PrzedmiotC: string;
  WartoscC: [
    {
      _attr: {
        kodWaluty: string;
      };
    },
    number
  ];
  Kompensata: Kompensata;
  KapitalC: [
    {
      _attr: {
        kodWaluty: string;
      };
    },
    number // Podać w tysiącach
  ];
  ZadluzenieC: [
    {
      _attr: {
        kodWaluty: string;
      };
    },
    number // Podać w tysiącach
  ];
  OdsetkiCm: [
    {
      _attr: {
        kodWaluty: string;
      };
    },
    number // Podać w tysiącach
  ];
  OdsetkiCk: [
    {
      _attr: {
        kodWaluty: string;
      };
    },
    number // Podać w tysiącach
  ];
  SupportVarMetoda: MW;
} &
  (K extends 'KC01' ? KC01 : {}) &
  (K extends 'KC02' ? KC02 : {}) &
  (ZW extends 'ZW01' ? ZW01 : {}) &
  (ZW extends 'ZW02' ? ZW02 : {}) &
  (MW extends 'MW00' ? MW00 : {}) &
  (MW extends 'MW01' | 'MW02' | 'MW03' | 'MW04' | 'MW05' | 'MW06' ? MW01toMW06 : {});

type KC01 = {
  KorektaCT2: 'KC01';
  WartKorektyCT2: [
    {
      _attr: {
        kodWaluty: string;
      };
    },
    number
  ];
};

type KC02 = {
  BrakKorektyCT2: 'KC02';
};

type ZW01 = {
  KodZW1: 'ZW01';
  PodstZW: '11n1'; // only this value appears at the client
  InformacjaOKrajuC1: {
    Kraj: string;
    WartoscCKraj1: [
      {
        _attr: {
          kodWaluty: string;
        };
      },
      number
    ];
  };
};

type ZW02<
  TK extends RodzajTransakcji = RodzajTransakcji
> = {
  KodZW2: 'ZW02';
} & (TK extends 'TK01' ? TK01 : {}) &
  (TK extends 'TK02' ? TK02 : {});

type TK01 = {
  RodzajTrans1: 'TK01';
  InformacjaOKrajuC2: {
    Kraj: string;
    WartoscCKraj2: [
      {
        _attr: {
          kodWaluty: string;
        };
      },
      number
    ];
  };
};

type TK02 = {
  RodzajTrans2: 'TK02';
  Kraj: string;
};

type MW00 = {
  MetodaC1: 'MW00';
};

type MW01toMW06<
  KP extends Korekta = Korekta,
  OP extends RodzajOprocentowania = RodzajOprocentowania,
  RP extends RodzajPrzedzialu = RodzajPrzedzialu
> = {
  MetodaC: 'MW01' | 'MW02' | 'MW03' | 'MW04' | 'MW05' | 'MW06';
  ZrodloDanychFin: ZrodloDanychFinansowych;
} &
  (KP extends 'KP01' ? KP01 : {}) &
  (KP extends 'KP02' ? KP02 : {}) &
  (OP extends 'OP02' ? OP02 : {}) &
  (OP extends 'OP03' ? OP03 : {}) &
  (OP extends 'OP04' | 'OP05' ? OP04_OP05 : {}) &
  (RP extends 'RP01' ? RP01 : {}) &
  (RP extends 'RP02' ? RP02 : {}) &
  (RP extends 'RP03' ? RP03 : {});

type KP01 = {
  KorektyPorWyn3: 'KP01';
};

type KP02 = {
  KorektyPorWyn7: 'KP02';
  KorektyPorWynProg: number;
};

//I'm currently talking about this with the client
// type OP01 = {
//   KalkOproc1:'OP01';
//   Marza:
// }

type OP02 = {
  KalkOproc2: 'OP02';
  PoziomOproc: number;
};

type OP03 = {
  KalkOproc3: 'OP03';
  PoziomOprocMin: number;
  PoziomOprocMax: number;
};

type OP04_OP05 = {
  KalkOproc4: 'OP04' | 'OP05';
};

type RP01 = {
  RodzajPrzedz7: 'RP01';
  WynikAPC1: number;
  WynikAPC2: number;
};

type RP02 = {
  RodzajPrzedz8: 'RP02';
  WynikAPC: number;
};

type RP03 = {
  RodzajPrzedz16: 'RP03';
  WynikAPC3: number;
  WynikAPC4: number;
  OpisPrzedz: string;
};

type KorektaCenTransferowych = 'KC01' | 'KC02';
type Kompensata = 'KS01' | 'KS02' | 'KS03';
type ZwolnienieArt11n = 'ZW01' | 'ZW02';
type RodzajTransakcji = 'TK01' | 'TK02';
type MetodyBadania =
  | 'MW00'
  | 'MW01'
  | 'MW02'
  | 'MW03'
  | 'MW04'
  | 'MW05'
  | 'MW06';
type ZrodloDanychFinansowych = 'ZD01' | 'ZD02' | 'ZD03' | 'ZD04' | 'ZD05';
type Korekta = 'KP01' | 'KP02';
type RodzajOprocentowania = 'OP01' | 'OP02' | 'OP03' | 'OP04' | 'OP05';
type RodzajPrzedzialu = 'RP01' | 'RP02' | 'RP03' | 'RP04';
