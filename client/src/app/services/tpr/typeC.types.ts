import { ExternalExpr } from "@angular/compiler";

export type TransakcjaKategoriaC<
  K extends KorektaCenTransferowych = KorektaCenTransferowych,
  ZW extends ZwolnienieArt11n = ZwolnienieArt11n,
  MW extends MetodyBadania = MetodyBadania
> = {
  KategoriaC: '1201' | '1202' | '1203' | '1204' | '2201' | '2202' | '2203' | '2204';
  PrzedmiotC: string;
  WartoscC: [
    {
      _attributes: {
        kodWaluty: string;
      };
    },
    number
  ];
  Kompensata: Kompensata;
  KapitalC: [
    {
      _attributes: {
        kodWaluty: string;
      };
    },
    number // Podać w tysiącach
  ];
  ZadluzenieC: [
    {
      _attributes: {
        kodWaluty: string;
      };
    },
    number // Podać w tysiącach
  ];
  OdsetkiCm: [
    {
      _attributes: {
        kodWaluty: string;
      };
    },
    number // Podać w tysiącach
  ];
  OdsetkiCk: [
    {
      _attributes: {
        kodWaluty: string;
      };
    },
    number // Podać w tysiącach
  ];
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
      _attributes: {
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
  PodstZW?: PodstawaZwolnienia;
  InformacjaOKrajuC1: {
    Kraj: string;
    WartoscCKraj1: [
      {
        _attributes: {
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
        _attributes: {
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
  (OP extends 'OP01' ? OP01 : {}) &
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

type OP01<
  SB extends NazwaStopyBazowej = NazwaStopyBazowej,
  TB extends TerminStopyBazowej = TerminStopyBazowej
> = {
  KalkOproc1: 'OP01';
  Marza: number; // show in %

} &
  (SB extends 'SB01' | 'SB02' | 'SB03' | 'SB04' | 'SB05' | 'SB06' | 'SB07' | 'SB08' ? SB01toSB08 : {}) &
  (SB extends 'SB09' ? SB09 : {}) &
  (TB extends 'TB01' | 'TB02' | 'TB03' | 'TB04' | 'TB05' | 'TB06' ? TB01toTB06 : {}) &
  (TB extends 'TB07' ? TB07 : {});

type SB01toSB08 = {
  KodSB1: 'SB01' | 'SB02' | 'SB03' | 'SB04' | 'SB05' | 'SB06' | 'SB07' | 'SB08';
}

type SB09 = {
  InnaSB: string;
}

type TB01toTB06 = {
  TerminSB: 'TB01' | 'TB02' | 'TB03' | 'TB04' | 'TB05' | 'TB06';
}

type TB07 = {
  TerminInny: 'TB07';
  Okres: string;
}

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
type PodstawaZwolnienia = '11n1' | '11n1a' | '11n2';
type NazwaStopyBazowej = 'SB01' | 'SB02' | 'SB03' | 'SB04' | 'SB05' | 'SB06' | 'SB07' | 'SB08' | 'SB09';
type TerminStopyBazowej = 'TB01' | 'TB02' | 'TB03' | 'TB04' | 'TB05' | 'TB06' | 'TB07';
