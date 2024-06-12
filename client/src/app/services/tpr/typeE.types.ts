// Base TransakcjaKategoriaE type with generic support variables
export type TransakcjaKategoriaE<
  K extends KorektaCenTransferowych = KorektaCenTransferowych,
  ZW extends ZwolnienieArt11n = ZwolnienieArt11n,
  MW extends MetodyBadania = MetodyBadania
> = {
  KategoriaE: string;
  PrzedmiotE: string;
  WartoscE: [
    {
      _attr: {
        kodWaluty: string;
      };
    },
    number
  ];
  SupportVarCorrection: K;
  Kompensata: Kompensata;
  RodzajDN: RodzajeWartosciNiematerialnych;
  SupportVarKodZW: ZW;
  SupportVarMetoda: MW;
} & SupportVarCorrectionMap<K> &
  SupportVarKodZWMap<ZW> &
  SupportVarMetodaMap<MW>;

// SupportVar mappings for KorektaCenTransferowych
type SupportVarCorrectionMap<K extends KorektaCenTransferowych> =
  K extends 'KC01' ? KC01 : K extends 'KC02' ? KC02 : {};

// SupportVar mappings for ZwolnienieArt11n
type SupportVarKodZWMap<ZW extends ZwolnienieArt11n> = ZW extends 'ZW01'
  ? ZW01
  : ZW extends 'ZW02'
  ? ZW02
  : {};

// SupportVar mappings for MetodyBadania
type SupportVarMetodaMap<MW extends MetodyBadania> = MW extends 'MW00'
  ? KategoriaE_MW00
  : MW extends 'MW01' | 'MW02' | 'MW03' | 'MW04' | 'MW05' | 'MW06'
  ? KategorieMW01toMW06
  : {};

// KorektaCenTransferowych types
type KC01 = {
  KorektaCT3: 'KC01';
  WartKorektyCT3: [
    {
      _attr: {
        kodWaluty: string;
      };
    },
    number
  ];
};

type KC02 = {
  BrakKorektyCT3: 'KC02';
};

// ZwolnienieArt11n types
type ZW01 = {
  KodZW1: 'ZW01';
  PodstZW: '11n1'; // only this value appears at the client
  InformacjaOKrajuE1: {
    Kraj: string;
    WartoscEKraj1: [
      {
        _attr: {
          kodWaluty: string;
        };
      },
      number
    ];
  };
};

type ZW02 = {
  KodZW2: 'ZW02';
  SupportVarRodzajTransakcji: RodzajTransakcji;
};

// MetodyBadania types
type KategoriaE_MW00 = {
  MetodaE1: 'MW00';
};

type KategorieMW01toMW06 = {
  MetodaE: 'MW01' | 'MW02' | 'MW03' | 'MW04' | 'MW05' | 'MW06';
  RodzajAnalizy: RodzajAnalizy;
  SposobWyrCeny: string;
  SupportVarKorektaPorownywalnosciWynikow: Korekta;
  KorektyPorWynProg: number;
  KalkOplaty1: SposobKalkulacjiOplaty;
  PoziomOpl1: number; // TOCODE: Provide in percentages
  RodzajPrzedzialu: 'RP01'; //Should be up to RP04 but the client never uses other versions
  WynikAPKO1D1: number; //TOCODE: Provide as thousands
  WynikAPKO1G1: number; //TOCODE: Provide as thousands
};

// Common types
type KorektaCenTransferowych = 'KC01' | 'KC02';
type Kompensata = 'KS01' | 'KS02' | 'KS03';
type RodzajeWartosciNiematerialnych =
  | 'DN01'
  | 'DN02'
  | 'DN03'
  | 'DN04'
  | 'DN05'
  | 'DN06'
  | 'DN07'
  | 'DN08';
type ZwolnienieArt11n = 'ZW01' | 'ZW02';
type RodzajAnalizy =
  | 'RA01'
  | 'RA02'
  | 'RA03'
  | 'RA04'
  | 'RA05'
  | 'RA06'
  | 'RA07'
  | 'RA08'
  | 'RA09';
type MetodyBadania =
  | 'MW00'
  | 'MW01'
  | 'MW02'
  | 'MW03'
  | 'MW04'
  | 'MW05'
  | 'MW06';
type RodzajTransakcji = 'TK01' | 'TK02';
type Korekta = 'KP01' | 'KP02';
type SposobKalkulacjiOplaty =
  | 'SK01'
  | 'SK02'
  | 'SK03'
  | 'SK04'
  | 'SK05'
  | 'SK06';
