export type TransakcjaKategoriaA2<
  K extends KorektaCenTransferowych = KorektaCenTransferowych,
  ZW extends ZwolnienieArt11n = ZwolnienieArt11n,
  MW extends MetodyBadania = MetodyBadania,
  UD extends Udział = Udział,
> = {
  KategoriaA2: '3101';
  RodzajUm: RodzajUmowy;
  PrzedmiotA2: string;
  WartoscA2: [
    {
      _attributes: {
        kodWaluty: string;
      };
    },
    number,
  ];
  Wklad: [
    {
      _attributes: {
        kodWaluty: string;
      };
    },
    number,
  ];
  WkladOgolny: [
    {
      _attributes: {
        kodWaluty: string;
      };
    },
    number,
  ];
  Kompensata: Kompensata;
  SupportVarMetoda: MW;
} & (UD extends 'UD01' ? UD01 : {}) &
  (UD extends 'UD02' ? UD02 : {}) &
  (UD extends 'UD03' ? UD03 : {}) &
  (K extends 'KC01' ? KC01 : {}) &
  (K extends 'KC02' ? KC02 : {}) &
  (ZW extends 'ZW01' ? ZW01 : {}) &
  (ZW extends 'ZW02' ? ZW02 : {}) &
  (MW extends 'MW00' ? MW00 : {}) &
  (MW extends 'MW01' ? MW01 : {}) &
  (MW extends 'MW04' ? MW04 : {}) &
  (MW extends 'MW06' ? MW06 : {}) &
  (MW extends 'MW02' | 'MW03' | 'MW05' ? MW02_MW03_MW05 : {});

type UD01 = {
  Udzial1: 'UD01';
  ProcentUdzial1: number;
};

type UD02 = {
  Udzial2: 'UD02';
  ProcentUdzial2: number;
};

type UD03 = {
  Udzial3: 'UD03';
  ProcentUdzial3: number;
};
type KC01 = {
  KorektaCT1: 'KC01';
  WartKorektyCT1: [
    {
      _attributes: {
        kodWaluty: string;
      };
    },
    number,
  ];
};

type KC02 = {
  BrakKorektyCT1: 'KC02';
};

type ZW01 = {
  KodZW1: 'ZW01';
  PodstZW?: PodstawaZwolnienia;
  InformacjaOKrajuA1: {
    Kraj: string;
    WartoscAKraj1: [
      {
        _attributes: {
          kodWaluty: string;
        };
      },
      number,
    ];
  };
};

type ZW02<TK extends RodzajTransakcji = RodzajTransakcji> = {
  KodZW2: 'ZW02';
} & (TK extends 'TK01' ? TK01 : {}) &
  (TK extends 'TK02' ? TK02 : {});

type TK01 = {
  RodzajTrans1: 'TK01';
  InformacjaOKrajuA2: {
    Kraj: string;
    WartoscAKraj2: [
      {
        _attributes: {
          kodWaluty: string;
        };
      },
      number,
    ];
  };
};

type TK02 = {
  RodzajTrans2: 'TK02';
  Kraj: string;
};

type MW00 = {
  Metoda00: 'MW00';
};

type MW01<KP extends Korekta = Korekta, CK extends SposobUjeciaCeny = SposobUjeciaCeny> = {
  Metoda01: 'MW01';
  Weryfikacja: SposobWeryfikacjiEynkowegoPoziomuCeny;
} & (KP extends 'KP01' ? KP01 : {}) &
  (KP extends 'KP02' ? KP02 : {}) &
  (CK extends 'CK01' ? CK01 : {}) &
  (CK extends 'CK02' ? CK02 : {});

type KP01 = {
  KorektyPorWyn1: 'KP01';
};

type KP02 = {
  KorektyPorWyn5: 'KP02';
  KorektyPorWynProg: number;
};

type CK01<RP extends RodzajPrzedzialu = RodzajPrzedzialu> = {
  SposobUjCeny1: 'CK01';
  Waluta1: string;
  CenaMin: number;
  CenaMax: number;
  Miara1: string; // Rodzaj jednostki miary np. kg, szt., l, roboczogodzina
} & (RP extends 'RP01' | 'RP02' ? RP01_RP02_for_CK01 : {}) &
  (RP extends 'RP03' ? RP03_for_CK01 : {}) &
  (RP extends 'RP04' ? RP04_for_CK01 : {});

type RP01_RP02_for_CK01 = {
  RodzajPrzedz1: 'RP01' | 'RP02';
  CenaPorMin1: number;
  CenaPorMax1: number;
};

type RP03_for_CK01 = {
  RodzajPrzedz13: 'RP03';
  CenaPorMin3: number;
  CenaPorMax3: number;
  OpisPrzedz: string;
};

type RP04_for_CK01 = {
  RodzajPrzedz2: 'RP04';
  WysCenPor1: number;
};

type CK02<RP extends RodzajPrzedzialu = RodzajPrzedzialu> = {
  SposobUjCeny2: 'CK02';
  ProcentMin: number;
  ProcentMax: number;
  Miara2: string; // Rodzaj jednostki miary np. kg, szt., l, roboczogodzina
} & (RP extends 'RP01' | 'RP02' ? RP01_RP02_for_CK02 : {}) &
  (RP extends 'RP03' ? RP03_for_CK02 : {}) &
  (RP extends 'RP04' ? RP04_for_CK02 : {});

type RP01_RP02_for_CK02 = {
  RodzajPrzedz3: 'RP01' | 'RP02';
  CenaPorMin2: number;
  CenaPorMax2: number;
};

type RP03_for_CK02 = {
  RodzajPrzedz14: 'RP03';
  CenaPorMin4: number;
  CenaPorMax4: number;
  OpisPrzedz: string;
};

type RP04_for_CK02 = {
  RodzajPrzedz4: 'RP04';
  WysCenPor2: number;
};

type MW04<loss extends boolean = boolean> = {
  Metoda04: 'MW04';
  RodzMetodyPodzialu: RodzajMetodyPodzialuZysku;
} & (loss extends false ? lossFalse : {}) &
  (loss extends true ? lossTrue : {});

type lossFalse = {
  StrataPodm2: false;
  ZaklZyskPodm2: number; // Podać w procentach
  ZrealZyskPodm: number; // Podać w procentach
};

type lossTrue = {
  StrataPodm1: true;
  ZaklZyskPodm1: number; // Podać w procentach
};

type MW02_MW03_MW05<
  KP extends Korekta = Korekta,
  PR extends RodzajPorownania = RodzajPorownania,
  RP extends RodzajPrzedzialu = RodzajPrzedzialu,
> = {
  Metoda02: 'MW02' | 'MW03' | 'MW05';
  WskaznikFinans: WskaznikFinansowy;
  WynikTrans: number;
} & (KP extends 'KP01' ? KP01_for_MW02_MW03_MW05 : {}) &
  (KP extends 'KP02' ? KP02_for_MW02_MW03_MW05 : {}) &
  (PR extends 'PR01' | 'PR03' ? PR01_PR03_for_MW02_MW03_MW05 : {}) &
  (PR extends 'PR02' ? PR02_for_KategoriaA_MW02_MW03_MW05 : {}) &
  (RP extends 'RP01' | 'RP02' ? RP01_RP02_for_MW02_MW03_MW05 : {}) &
  (RP extends 'RP03' ? RP03_for_MW02_MW03_MW05 : {}) &
  (RP extends 'RP04' ? RP04_for_MW02_MW03_MW05 : {});
type KP01_for_MW02_MW03_MW05 = {
  KorektyPorWyn2: 'KP01';
};

type KP02_for_MW02_MW03_MW05 = {
  KorektyPorWyn6: 'KP02';
  KorektyPorWynProg: number;
};

type PR01_PR03_for_MW02_MW03_MW05 = {
  RodzPor1: 'PR01' | 'PR03';
};

type PR02_for_KategoriaA_MW02_MW03_MW05 = {
  RodzPor2: 'PR02';
  PodmiotBadany: PodmiotBadany;
  KrytGeograf: KryteriumGeograficzne;
};

type RP01_RP02_for_MW02_MW03_MW05 = {
  RodzajPrzedz5: 'RP01' | 'RP02';
  WynikAP1: number;
  WynikAP2: number;
};

type RP03_for_MW02_MW03_MW05 = {
  RodzajPrzedz15: 'RP03';
  WynikAP3: number;
  WynikAP4: number;
  OpisPrzedz: string;
};

type RP04_for_MW02_MW03_MW05 = {
  RodzajPrzedz6: 'RP04';
  WynikAP: number;
};

type MW06<TW extends TechWyceny = TechWyceny> = {
  Metoda06: 'MW06';
  SupportVarTechnikaWyceny: TechWyceny;
} & (TW extends 'TW01' | 'TW02' ? TW01_TW02_for_MW06 : {}) &
  (TW extends 'TW07' ? TW07_for_MW06 : {}) &
  (TW extends 'TW03' | 'TW04' | 'TW05' | 'TW06' ? TW03_to_TW06_for_MW06 : {});

type TW01_TW02_for_MW06<TB extends OkresPrognozy = OkresPrognozy> = {
  TechWyceny1: 'TW01' | 'TW02';
  WspDyskont: number;
  SupporterVarOkresPrognozy: OkresPrognozy;
} & (TB extends 'TB01' | 'TB02' | 'TB03' | 'TB04' | 'TB05' | 'TB06' ? TB_for_TW01_TW02 : {}) &
  (TB extends 'TB07' ? TB07_for_TW01_TW02 : {});

type TB_for_TW01_TW02 = {
  OkresProg1: 'TB01' | 'TB02' | 'TB03' | 'TB04' | 'TB05' | 'TB06';
};

type TB07_for_TW01_TW02 = {
  OkresProg2: 'TW07';
  TerminInny: ZrodloDanychZgodnosci;
};

type TW07_for_MW06 = {
  TechWyceny2: 'TW07';
  ZrodloDanychZgodn: ZrodloDanychZgodnosci;
};

type TW03_to_TW06_for_MW06 = {
  TechWyceny3: 'TW03' | 'TW04' | 'TW05' | 'TW06';
};

type KorektaCenTransferowych = 'KC01' | 'KC02';
type Kompensata = 'KS01' | 'KS02' | 'KS03';
type ZwolnienieArt11n = 'ZW01' | 'ZW02';
type RodzajTransakcji = 'TK01' | 'TK02';
type MetodyBadania = 'MW00' | 'MW01' | 'MW02' | 'MW03' | 'MW04' | 'MW05' | 'MW06';
type SposobWeryfikacjiEynkowegoPoziomuCeny = 'SW01' | 'SW02' | 'SW03' | 'SW04';
type Korekta = 'KP01' | 'KP02';
type SposobUjeciaCeny = 'CK01' | 'CK02';
type RodzajPrzedzialu = 'RP01' | 'RP02' | 'RP03' | 'RP04';
type RodzajMetodyPodzialuZysku = 'PZ01' | 'PZ02' | 'PZ03' | 'PZ04';
type WskaznikFinansowy =
  | 'WF01'
  | 'WF02'
  | 'WF03'
  | 'WF04'
  | 'WF05'
  | 'WF06'
  | 'WF07'
  | 'WF08'
  | 'WF09'
  | 'WF10'
  | 'WF11'
  | 'WF12'
  | 'WF13'
  | 'WF14'
  | 'WF15'
  | 'WF16'
  | 'WF17';
type RodzajPorownania = 'PR01' | 'PR02' | 'PR03';
type PodmiotBadany = 'PB01' | 'PB02';
type KryteriumGeograficzne = 'KG01' | 'KG02' | 'KG03' | 'KG04' | 'KG05' | 'KG06';
type TechWyceny = 'TW01' | 'TW02' | 'TW03' | 'TW04' | 'TW05' | 'TW06' | 'TW07';
type OkresPrognozy = 'TB01' | 'TB02' | 'TB03' | 'TB04' | 'TB05' | 'TB06' | 'TB07';
type ZrodloDanychZgodnosci = 'AZ01' | 'AZ02' | 'AZ03' | 'AZ04' | 'AZ05' | 'AZ06' | 'AZ07' | 'AZ08' | 'AZ09';
type PodstawaZwolnienia = '11n1' | '11n1a' | '11n2';
export type RodzajUmowy = 'RT01' | 'RT02';
export type Udział = 'UD01' | 'UD02' | 'UD03';
