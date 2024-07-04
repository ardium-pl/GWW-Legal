export type TransakcjaKategoriaC<
  K extends KorektaCenTransferowych = KorektaCenTransferowych,
  ZW extends ZwolnienieArt11n = ZwolnienieArt11n,
  MW extends MetodyBadania = MetodyBadania
> = {
  KategoriaC: string;
  PrzedmiotC: string;
  WartoscC: {
    _attributes: {
      kodWaluty: string;
    };
    _text: number;
  };
  Kompensata: Kompensata;
  KapitalC: {
    _attributes: {
      kodWaluty: string;
    };
    _text: number; // Podać w tysiącach
  };
  ZadluzenieC: {
    _attributes: {
      kodWaluty: string;
    };
    _text: number; // Podać w tysiącach
  };
  OdsetkiCm: {
    _attributes: {
      kodWaluty: string;
    };
    _text: number; // Podać w tysiącach
  };
  OdsetkiCk: {
    _attributes: {
      kodWaluty: string;
    };
    _text: number; // Podać w tysiącach
  };
} &
  (K extends 'KC01' ? KC01 : {}) |
  (K extends 'KC02' ? KC02 : {}) &
  (ZW extends 'ZW01' ? ZW01 : {}) |
  (ZW extends 'ZW02' ? ZW02 : {}) &
  (MW extends 'MW00' ? MW00 : {}) |
  (MW extends 'MW01' | 'MW02' | 'MW03' | 'MW04' | 'MW05' | 'MW06' ? MW01toMW06 : {});

export type KC01 = {
  KorektaCT2: 'KC01';
  WartKorektyCT2: {
    _attributes: {
      kodWaluty: string;
    };
    _text: number;
  };
};

export type KC02 = {
  BrakKorektyCT2: 'KC02';
};

export type ZW01 = {
  KodZW1: 'ZW01';
  PodstZW?: PodstawaZwolnienia;
  InformacjaOKrajuC1: {
    Kraj: string;
    WartoscCKraj1: {
      _attributes: {
        kodWaluty: string;
      };
      _text: number;
    };
  };
};

export type ZW02<
  TK extends RodzajTransakcji = RodzajTransakcji
> = {
  KodZW2: 'ZW02';
} & (TK extends 'TK01' ? TK01 : {}) |
  (TK extends 'TK02' ? TK02 : {});

export type TK01 = {
  RodzajTrans1: 'TK01';
  InformacjaOKrajuC2: {
    Kraj: string;
    WartoscCKraj2: {
      _attributes: {
        kodWaluty: string;
      };
      _text: number;
    };
  };
};

export type TK02 = {
  RodzajTrans2: 'TK02';
  Kraj: string;
};

export type MW00 = {
  MetodaC1: 'MW00';
};

export type MW01toMW06<
  KP extends Korekta = Korekta,
  OP extends RodzajOprocentowania = RodzajOprocentowania,
  RP extends RodzajPrzedzialu = RodzajPrzedzialu
> = {
  MetodaC: 'MW01' | 'MW02' | 'MW03' | 'MW04' | 'MW05' | 'MW06';
  ZrodloDanychFin: ZrodloDanychFinansowych;
} &
  (KP extends 'KP01' ? KP01 : {}) |
  (KP extends 'KP02' ? KP02 : {}) &
  (OP extends 'OP01' ? OP01 : {}) |
  (OP extends 'OP02' ? OP02 : {}) |
  (OP extends 'OP03' ? OP03 : {}) |
  (OP extends 'OP04' | 'OP05' ? OP04_OP05 : {}) &
  (RP extends 'RP01' ? RP01 : {}) |
  (RP extends 'RP02' ? RP02 : {}) |
  (RP extends 'RP03' ? RP03 : {});

export type KP01 = {
  KorektyPorWyn3: 'KP01';
};

export type KP02 = {
  KorektyPorWyn7: 'KP02';
  KorektyPorWynProg: number;
};

export type OP01<
  SB extends NazwaStopyBazowej = NazwaStopyBazowej,
  TB extends TerminStopyBazowej = TerminStopyBazowej
> = {
  KalkOproc1: 'OP01';
  Marza: number; // show in %

} &
  (SB extends 'SB01' | 'SB02' | 'SB03' | 'SB04' | 'SB05' | 'SB06' | 'SB07' | 'SB08' ? SB01toSB08 : {}) |
  (SB extends 'SB09' ? SB09 : {}) &
  (TB extends 'TB01' | 'TB02' | 'TB03' | 'TB04' | 'TB05' | 'TB06' ? TB01toTB06 : {}) |
  (TB extends 'TB07' ? TB07 : {});

export type SB01toSB08 = {
  KodSB1: 'SB01' | 'SB02' | 'SB03' | 'SB04' | 'SB05' | 'SB06' | 'SB07' | 'SB08';
}

export type SB09 = {
  InnaSB: string;
}

export type TB01toTB06 = {
  TerminSB: 'TB01' | 'TB02' | 'TB03' | 'TB04' | 'TB05' | 'TB06';
}

export type TB07 = {
  TerminInny: 'TB07';
  Okres: string;
}

export type OP02 = {
  KalkOproc2: 'OP02';
  PoziomOproc: number;
};

export type OP03 = {
  KalkOproc3: 'OP03';
  PoziomOprocMin: number;
  PoziomOprocMax: number;
};

export type OP04_OP05 = {
  KalkOproc4: 'OP04' | 'OP05';
};

export type RP01 = {
  RodzajPrzedz7: 'RP01';
  WynikAPC1: number;
  WynikAPC2: number;
};

export type RP02 = {
  RodzajPrzedz8: 'RP02';
  WynikAPC: number;
};

export type RP03 = {
  RodzajPrzedz16: 'RP03';
  WynikAPC3: number;
  WynikAPC4: number;
  OpisPrzedz: string;
};

export type KorektaCenTransferowych = 'KC01' | 'KC02';
export type Kompensata = 'KS01' | 'KS02' | 'KS03';
export type ZwolnienieArt11n = 'ZW01' | 'ZW02';
export type RodzajTransakcji = 'TK01' | 'TK02';
export type MetodyBadania =
  | 'MW00'
  | 'MW01'
  | 'MW02'
  | 'MW03'
  | 'MW04'
  | 'MW05'
  | 'MW06';
export type ZrodloDanychFinansowych = 'ZD01' | 'ZD02' | 'ZD03' | 'ZD04' | 'ZD05';
export type Korekta = 'KP01' | 'KP02';
export type RodzajOprocentowania = 'OP01' | 'OP02' | 'OP03' | 'OP04' | 'OP05';
export type RodzajPrzedzialu = 'RP01' | 'RP02' | 'RP03' | 'RP04';
export type PodstawaZwolnienia = '11n1' | '11n1a' | '11n2';
export type NazwaStopyBazowej = 'SB01' | 'SB02' | 'SB03' | 'SB04' | 'SB05' | 'SB06' | 'SB07' | 'SB08' | 'SB09';
export type TerminStopyBazowej = 'TB01' | 'TB02' | 'TB03' | 'TB04' | 'TB05' | 'TB06' | 'TB07';
