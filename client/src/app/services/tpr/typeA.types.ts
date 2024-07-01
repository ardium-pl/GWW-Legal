export type TransakcjaKategoriaA<
  K extends KorektaCenTransferowych = KorektaCenTransferowych,
  ZW extends ZwolnienieArt11n = ZwolnienieArt11n,
  MW extends MetodyBadania = MetodyBadania,
> = {
  KategoriaA: string;
  PrzedmiotA: string;
  WartoscA: [
    {
      _attr: {
        kodWaluty: string;
      };
    },
    number,
  ];
  SupportVarCorrection: K;
  Kompensata: Kompensata;
  SupportVarKodZW: ZW;
  SupportVarMetoda: MW;
};

type KC01 = {
  KorektaCT1: 'KC01';
  WartKorektyCT1: [
    {
      _attr: {
        kodWaluty: string;
      };
    },
    number,
  ];
};

type KC02 = {
  BrakKorektyCT1: 'KC02';
};

// ZwolnienieArt11n types
type ZW01 = {
  KodZW1: 'ZW01';
  PodstZW: '11n1'; // only this value appears at the client
  InformacjaOKrajuA1: {
    Kraj: string;
    WartoscAKraj1: [
      {
        _attr: {
          kodWaluty: string;
        };
      },
      number,
    ];
  };
};

type ZW02 = {
  KodZW2: 'ZW02';
  SupportVarRodzajTransakcji: RodzajTransakcji;
};

type TK01 = {
  RodzajTrans1: 'TK01';
  InformacjaOKrajuA2: {
    Kraj: string;
    WartoscAKraj2: [
      {
        _attr: {
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

type KategoriaA_MW00 = {
  Metoda00: 'MW00';
};

type KategoriaA_MW01 = {
  Metoda01: 'MW01';
  Weryfikacja: SposobWeryfikacjiEynkowegoPoziomuCeny;
  SupportVarKorkta: Korekta;
  SupportVarSposobUjeciaCeny: SposobUjeciaCeny;
};

type KP01 = {
  KorektyPorWyn1: 'KP01';
};

type KP02 = {
  KorektyPorWyn5: 'KP02';
  KorektyPorWynProg: number;
};

type CK01 = {
  SposobUjCeny1: 'CK01';
  Waluta1: string;
  CenaMin: number;
  CenaMax: number;
  Miara1: string; // Rodzaj jednostki miary np. kg, szt., l, roboczogodzina
  SupportVarRodzajPrzedzialu: RodzajPrzedzialu;
};

type CK01_RP01_RP02 = {
  RodzajPrzedz1: 'RP01' | 'RP02';
  CenaPorMin1: number;
  CenaPorMax1: number;
};

type CK01_RP03 = {
  RodzajPrzedz13: 'RP03';
  CenaPorMin3: number;
  CenaPorMax3: number;
  OpisPrzedz: string;
};

type CK01_RP04 = {
  RodzajPrzedz2: 'RP04';
  WysCenPor1: number;
};

type CK02 = {
  SposobUjCeny2: 'CK02';
  ProcentMin: number;
  ProcentMax: number;
  Miara2: string; // Rodzaj jednostki miary np. kg, szt., l, roboczogodzina
  SupportVarRodzajPrzedzialu: RodzajPrzedzialu;
};

type CK02_RP01_RP02 = {
  RodzajPrzedz3: 'RP01' | 'RP02';
  CenaPorMin2: number;
  CenaPorMax2: number;
};

type CK02_RP03 = {
  RodzajPrzedz14: 'RP03';
  CenaPorMin4: number;
  CenaPorMax4: number;
  OpisPrzedz: string;
};

type CK02_RP04 = {
  RodzajPrzedz4: 'RP04';
  WysCenPor2: number;
};

type KategoriaA_MW04 = {
  Metoda04: 'MW04';
  RodzMetodyPodzialu: RodzajMetodyPodzialuZysku;
  SupportVarStrata: boolean;
};

type StraraTrue_for_KategoriaA_MW04 = {
  StrataPodm2: false;
  ZaklZyskPodm2: number; // Podać w procentach
  ZrealZyskPodm: number; // Podać w procentach
};

type StraraFalse_for_KategoriaA_MW04 = {
  StrataPodm1: true;
  ZaklZyskPodm1: number; // Podać w procentach
};

type KategoriaA_MW02_MW03_MW05 = {
  Metoda02: 'MW02' | 'MW03' | 'MW05';
  SupportVarKorkta: Korekta;
  WskaznikFinans: WskaznikFinansowy;
  WynikTrans: number;
  SupportVarRodzajPorownania: RodzajPorownania;
  SupportVarRodzajPrzedzialu: RodzajPrzedzialu;
};

type KP01_for_KategoriaA_MW02_MW03_MW05 = {
  KorektyPorWyn2: 'KP01';
};

type KP02_for_KategoriaA_MW02_MW03_MW05 = {
  KorektyPorWyn6: 'KP02';
  KorektyPorWynProg: number;
};

type PR01_or_PR03_for_KategoriaA_MW02_MW03_MW05 = {
  RodzPor1: 'PR01' | 'PR03';
};

type PR02_for_KategoriaA_MW02_MW03_MW05 = {
  RodzPor2: 'PR02';
  PodmiotBadany: PodmiotBadany;
  KrytGeograf: KryteriumGeograficzne;
};

type RP01_or_RP02_for_KategoriaA_MW02_MW03_MW05 = {
  RodzajPrzedz5: 'RP01' | 'RP02';
  WynikAP1: number;
  WynikAP2: number;
};

type RP03_for_KategoriaA_MW02_MW03_MW05 = {
  RodzajPrzedz15: 'RP03';
  WynikAP3: number;
  WynikAP4: number;
  OpisPrzedz: string;
};

type RP04_for_KategoriaA_MW02_MW03_MW05 = {
  RodzajPrzedz6: 'RP04';
  WynikAP: number;
};

type KategoriaA_MW06 = {
  Metoda06: 'MW06';
  SupportVarTechnikaWyceny: TechWyceny;
};

type TW01_or_TW02_for_KategoriaA_MW06 = {
  TechWyceny1: 'TW01' | 'TW02';
  WspDyskont: number;
  SupporterVarOkresPrognozy: OkresPrognozy;
};

type TB01_or_TB02_or_TB03_or_TB04_or_TB05_or_TB06_for_TW01_or_TW02_for_KategoriaA_MW06 =
  {
    OkresProg1: 'TB01' | 'TB02' | 'TB03' | 'TB04' | 'TB05' | 'TB06';
  };

type TB07_for_TW01_or_TW02_for_KategoriaA_MW06 = {
  OkresProg2: 'TW07';
  TerminInny: ZrodloDanychZgodnosci;
};

type TW07_for_KategoriaA_MW06 = {
  TechWyceny2: 'TW07';
  ZrodloDanychZgodn: ZrodloDanychZgodnosci;
};

type TW03_or_TW04_or_TW05_or_TW06_for_KategoriaA_MW06 = {
  TechWyceny3: 'TW03' | 'TW04' | 'TW05' | 'TW06';
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
type KryteriumGeograficzne =
  | 'KG01'
  | 'KG02'
  | 'KG03'
  | 'KG04'
  | 'KG05'
  | 'KG06';
type TechWyceny = 'TW01' | 'TW02' | 'TW03' | 'TW04' | 'TW05' | 'TW06' | 'TW07';
type OkresPrognozy =
  | 'TB01'
  | 'TB02'
  | 'TB03'
  | 'TB04'
  | 'TB05'
  | 'TB06'
  | 'TB07';
type ZrodloDanychZgodnosci =
  | 'AZ01'
  | 'AZ02'
  | 'AZ03'
  | 'AZ04'
  | 'AZ05'
  | 'AZ06'
  | 'AZ07'
  | 'AZ08'
  | 'AZ09';
