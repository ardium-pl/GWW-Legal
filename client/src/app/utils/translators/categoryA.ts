import { TransactionATable } from 'app/services/tpr/tpr-table.types';
import {
  KC01,
  KC02,
  ZW01,
  ZW02,
  MW00,
  MW01,
  MW04,
  MW06,
  MW02_MW03_MW05,
  Korekta,
  CK01,
  CK02,
  RP01_RP02_for_CK01,
  RP03_for_CK01,
  RP04_for_CK01,
  RP01_RP02_for_CK02,
  RP03_for_CK02,
  RP04_for_CK02,
  RP01_RP02_for_MW02_MW03_MW05,
  RP03_for_MW02_MW03_MW05,
  RP04_for_MW02_MW03_MW05,
  KP01,
  KP02,
  TW01_TW02_for_MW06,
  TW03_to_TW06_for_MW06,
  TW07_for_MW06,
  PR01_PR03_for_MW02_MW03_MW05,
  PR02_for_KategoriaA_MW02_MW03_MW05,
} from 'app/services/tpr/typeA.types';

export function mapKorektaCenTransferowychA(transaction: TransactionATable): Partial<KC01 | KC02> {
  switch (transaction.correction) {
    case 'KC01':
      return {
        KorektaCT1: 'KC01',
        WartKorektyCT1: {
          _attributes: {
            kodWaluty: transaction.KodWalutyKorekty,
          },
          _text: transaction.WartoscKorekty,
        },
      };
    case 'KC02':
      return {
        BrakKorektyCT1: 'KC02',
      };
    default:
      return {};
  }
}

export function mapZwolnienieArt11nA(transaction: TransactionATable): Partial<ZW01 | ZW02> {
  switch (transaction.Zwolnienie) {
    case 'ZW01':
      return {
        KodZW1: 'ZW01',
        PodstZW: transaction.PodstawaZwolnienia,
        InformacjaOKrajuA1: {
          Kraj: transaction.KodKrajuZwolnienia,
          WartoscAKraj1: {
            _attributes: {
              kodWaluty: transaction.KodWalutyKraju,
            },
            _text: transaction.WartoscTransakcjiZwolnienia,
          },
        },
      };
    case 'ZW02':
      return mapZW02A(transaction);
    default:
      return {};
  }
}

function mapZW02A(transaction: TransactionATable): Partial<ZW02> {
  const zw2: Partial<ZW02> = {
    KodZW2: 'ZW02',
  };
  if (transaction.RodzajTransakcji === 'TK01') {
    Object.assign(zw2, {
      RodzajTrans1: 'TK01',
      InformacjaOKrajuA2: {
        Kraj: transaction.KodKrajuTransakcji,
        WartoscAKraj2: {
          _attributes: {
            kodWaluty: transaction.KodWalutyKrajuTransakcji,
          },
          _text: transaction.WartośćTransakcjiKraju,
        },
      },
    });
  } else if (transaction.RodzajTransakcji === 'TK02') {
    Object.assign(zw2, {
      RodzajTrans2: 'TK02',
      Kraj: transaction.KodKrajuTransakcji,
    });
  }
  Object.assign(zw2, mapMetodyBadaniaA(transaction));
  return zw2;
}

export function mapMetodyBadaniaA(transaction: TransactionATable): Partial<MW00 | MW01 | MW04 | MW06 | MW02_MW03_MW05<Korekta>> {
  switch (transaction.MetodyBadania) {
    case 'MW00':
      return {
        Metoda00: 'MW00',
      };
    case 'MW01':
      const mw01: Partial<MW01> = {
        Metoda01: 'MW01',
        Weryfikacja: transaction.SposobWeryfikacji,
      };
      if (transaction.KorektaMetodyBadania === 'KP01') {
        Object.assign(mw01, { KorektyPorWyn1: 'KP01' });
      } else if (transaction.KorektaMetodyBadania === 'KP02') {
        Object.assign(mw01, {
          KorektyPorWyn5: 'KP02',
          KorektyPorWynProg: transaction.KorektaPorownywalnosciProg,
        });
      }
      Object.assign(mw01, mapSposobUjeciaCeny(transaction));
      return mw01;
    case 'MW04':
      return mapMW04(transaction);
    case 'MW06':
      return mapMW06(transaction);
    case 'MW02':
    case 'MW03':
    case 'MW05':
      const mw02_03_05: Partial<MW02_MW03_MW05<Korekta>> = {
        Metoda02: transaction.MetodyBadania,
        WskaznikFinans: transaction.WskaznikFinansowy,
        WynikTrans: transaction.WynikTransakcji,
      };
      if (transaction.KorektaMetodyBadania === 'KP01') {
        Object.assign(mw02_03_05, { KorektyPorWyn2: 'KP01' });
      } else if (transaction.KorektaMetodyBadania === 'KP02') {
        Object.assign(mw02_03_05, {
          KorektyPorWyn6: 'KP02',
          KorektyPorWynProg: transaction.KorektaPorownywalnosciProg,
        });
      }
      Object.assign(mw02_03_05, mapRodzajPorownania(transaction));
      Object.assign(mw02_03_05, mapRodzajPrzedzialuMW02_MW03_MW05(transaction));
      return mw02_03_05;
    default:
      return {};
  }
}

function mapSposobUjeciaCeny(transaction: TransactionATable): Partial<CK01 | CK02> {
  switch (transaction.SposobUjeciaCeny) {
    case 'CK01':
      const ck01: Partial<CK01> = {
        SposobUjCeny1: 'CK01',
        Waluta1: transaction.Waluta1,
        CenaMin: transaction.CenaMinimalna,
        CenaMax: transaction.CenaMaksymalna,
        Miara1: transaction.Miara1,
      };
      Object.assign(ck01, mapRodzajPrzedzialuCK01(transaction));
      return ck01;
    case 'CK02':
      const ck02: Partial<CK02> = {
        SposobUjCeny2: 'CK02',
        ProcentMin: transaction.ProcentMinimalny,
        ProcentMax: transaction.ProcentMaksymalny,
        Miara2: transaction.Miara2,
      };
      Object.assign(ck02, mapRodzajPrzedzialuCK02(transaction));
      return ck02;
    default:
      return {};
  }
}

function mapRodzajPrzedzialuCK01(transaction: TransactionATable): Partial<RP01_RP02_for_CK01 | RP03_for_CK01 | RP04_for_CK01> {
  switch (transaction.RodzajPrzedzialu) {
    case 'RP01':
    case 'RP02':
      return {
        RodzajPrzedz1: transaction.RodzajPrzedzialu,
        CenaPorMin1: transaction.CenaPorownywalnaMin,
        CenaPorMax1: transaction.CenaPorownywalnaMax,
      };
    case 'RP03':
      return {
        RodzajPrzedz13: 'RP03',
        CenaPorMin3: transaction.CenaPorownywalnaMin,
        CenaPorMax3: transaction.CenaPorownywalnaMax,
        OpisPrzedz: transaction.OpisPrzedzialu,
      };
    case 'RP04':
      return {
        RodzajPrzedz2: 'RP04',
        WysCenPor1: transaction.WysokoscCenyPorownywalnej,
      };
    default:
      return {};
  }
}

function mapRodzajPrzedzialuCK02(transaction: TransactionATable): Partial<RP01_RP02_for_CK02 | RP03_for_CK02 | RP04_for_CK02> {
  switch (transaction.RodzajPrzedzialu) {
    case 'RP01':
    case 'RP02':
      return {
        RodzajPrzedz3: transaction.RodzajPrzedzialu,
        CenaPorMin2: transaction.CenaPorownywalnaMin,
        CenaPorMax2: transaction.CenaPorownywalnaMax,
      };
    case 'RP03':
      return {
        RodzajPrzedz14: 'RP03',
        CenaPorMin4: transaction.CenaPorownywalnaMin,
        CenaPorMax4: transaction.CenaPorownywalnaMax,
        OpisPrzedz: transaction.OpisPrzedzialu,
      };
    case 'RP04':
      return {
        RodzajPrzedz4: 'RP04',
        WysCenPor2: transaction.WysokoscCenyPorownywalnej,
      };
    default:
      return {};
  }
}

function mapRodzajPorownania(
  transaction: TransactionATable
): Partial<PR01_PR03_for_MW02_MW03_MW05 | PR02_for_KategoriaA_MW02_MW03_MW05> {
  switch (transaction.RodzajPorownania) {
    case 'PR01':
    case 'PR03':
      return {
        RodzPor1: transaction.RodzajPorownania,
      };
    case 'PR02':
      return {
        RodzPor2: 'PR02',
        PodmiotBadany: transaction.PodmiotBadany,
        KrytGeograf: transaction.KryteriumGeograficzne,
      };
    default:
      return {};
  }
}

function mapRodzajPrzedzialuMW02_MW03_MW05(
  transaction: TransactionATable
): Partial<RP01_RP02_for_MW02_MW03_MW05 | RP03_for_MW02_MW03_MW05 | RP04_for_MW02_MW03_MW05> {
  switch (transaction.RodzajPrzedzialu) {
    case 'RP01':
    case 'RP02':
      return {
        RodzajPrzedz5: transaction.RodzajPrzedzialu,
        WynikAP1: transaction.DolnaGranica,
        WynikAP2: transaction.GornaGranica,
      };
    case 'RP03':
      return {
        RodzajPrzedz15: 'RP03',
        WynikAP3: transaction.DolnaGranica,
        WynikAP4: transaction.GornaGranica,
        OpisPrzedz: transaction.OpisPrzedzialu,
      };
    case 'RP04':
      return {
        RodzajPrzedz6: 'RP04',
        WynikAP: transaction.WysokoscWskaznikaFinansowego,
      };
    default:
      return {};
  }
}

function mapMW04(transaction: TransactionATable): Partial<MW04> {
  const mw04: Partial<MW04> = {
    Metoda04: 'MW04',
    RodzMetodyPodzialu: transaction.RodzajMetodyPodzialuZysku,
  };
  if (transaction.Strata) {
    Object.assign(mw04, {
      StrataPodm1: 1,
      ZaklZyskPodm1: transaction.ZakladanyZysk,
    });
  } else {
    Object.assign(mw04, {
      StrataPodm2: 2,
      ZaklZyskPodm2: transaction.ZakladanyZysk,
      ZrealZyskPodm: transaction.ZrealizowanyZysk,
    });
  }
  return mw04;
}

function mapMW06(transaction: TransactionATable): Partial<MW06> {
  const mw06: Partial<MW06> = {
    Metoda06: 'MW06',
  };
  if (transaction.TechWyceny === 'TW01' || transaction.TechWyceny === 'TW02') {
    Object.assign(mw06, {
      TechWyceny1: transaction.TechWyceny,
      WspDyskont: transaction.WspolczynnikDyskontowy,
    });
    if (transaction.OkresPrognozy === 'TB07') {
      Object.assign(mw06, {
        OkresProg2: 'TW07',
        TerminInny: transaction.TerminInny,
      });
    }
  } else if (transaction.TechWyceny === 'TW07') {
    Object.assign(mw06, {
      TechWyceny2: 'TW07',
      ZrodloDanychZgodn: transaction.ZrodloDanychZgodnosci,
    });
  } else {
    Object.assign(mw06, {
      TechWyceny3: transaction.TechWyceny,
    });
  }
  return mw06;
}
