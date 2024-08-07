import { TransactionATable } from 'app/services/tpr/tpr-table.types';
import {
  CK01,
  CK02,
  KC01,
  KC02,
  KP01,
  KP01_for_MW02_MW03_MW05,
  KP02,
  KP02_for_MW02_MW03_MW05,
  lossFalse,
  lossTrue,
  MW01,
  MW02_MW03_MW05,
  MW04,
  MW06,
  PR01_PR03_for_MW02_MW03_MW05,
  PR02_for_KategoriaA_MW02_MW03_MW05,
  RP01_RP02_for_CK01,
  RP01_RP02_for_CK02,
  RP01_RP02_for_MW02_MW03_MW05,
  RP03_for_CK01,
  RP03_for_CK02,
  RP03_for_MW02_MW03_MW05,
  RP04_for_CK01,
  RP04_for_CK02,
  RP04_for_MW02_MW03_MW05,
  TB07_for_TW01_TW02,
  TB_for_TW01_TW02,
  TK01,
  TK02,
  TW01_TW02_for_MW06,
  TW07_for_MW06,
  ZW01,
  ZW02,
} from 'app/services/tpr/typeA.types';

export function reverseMapKorektaCenTransferowych(transaction: Partial<KC01 & KC02>): Partial<TransactionATable> {
  if (transaction.KorektaCT1) {
    return {
      correction: 'KC01',
      WartoscKorekty: transaction.WartKorektyCT1!._text,
      KodWalutyKorekty: transaction.WartKorektyCT1!._attributes.kodWaluty,
    };
  } else if (transaction.BrakKorektyCT1) {
    return {
      correction: 'KC02',
    };
  }
  return {};
}

export function reverseMapZwolnienieArt11nA(transaction: Partial<ZW01 & ZW02>): Partial<TransactionATable> {
  if (transaction.KodZW1) {
    return {
      Zwolnienie: 'ZW01',
      PodstawaZwolnienia: transaction.PodstZW,
      KodKrajuZwolnienia: transaction.InformacjaOKrajuA1!.Kraj,
      WartoscTransakcjiZwolnienia: transaction.InformacjaOKrajuA1!.WartoscAKraj1._text,
      KodWalutyKraju: transaction.InformacjaOKrajuA1!.WartoscAKraj1._attributes.kodWaluty,
    };
  } else if (transaction.KodZW2) {
    return reverseMapZW02A(transaction);
  }
  return {};
}

function reverseMapZW02A(transaction: Partial<ZW02 & TK01 & TK02>): Partial<TransactionATable> {
  const zw2: Partial<TransactionATable> = {
    Zwolnienie: 'ZW02',
  };

  if (transaction.RodzajTrans1) {
    zw2.RodzajTransakcji = 'TK01';

    if (Array.isArray(transaction.InformacjaOKrajuA2)) {
      const countryInfo = transaction.InformacjaOKrajuA2[0];
      zw2.KodKrajuTransakcji = countryInfo.Kraj;
      zw2.WartośćTransakcjiKraju = countryInfo.WartoscAKraj2._text;
      zw2.KodWalutyKrajuTransakcji = countryInfo.WartoscAKraj2._attributes.kodWaluty;
    } else {
      zw2.KodKrajuTransakcji = transaction.InformacjaOKrajuA2!.Kraj;
      zw2.WartośćTransakcjiKraju = transaction.InformacjaOKrajuA2!.WartoscAKraj2._text;
      zw2.KodWalutyKrajuTransakcji = transaction.InformacjaOKrajuA2!.WartoscAKraj2._attributes.kodWaluty;
    }
  } else if (transaction.RodzajTrans2) {
    zw2.RodzajTransakcji = 'TK02';
    zw2.KodKrajuTransakcji = transaction.Kraj;
  }

  Object.assign(zw2, reverseMapMetodyBadaniaA(transaction));
  return zw2;
}

//Transaction is any, because when types are assigned, it says that 'It's too complex'
function reverseMapMetodyBadaniaA(transaction: any): Partial<TransactionATable> {
  switch (true) {
    case !!transaction.Metoda00:
      return { MetodyBadania: 'MW00' };
    case !!transaction.Metoda01:
      return reverseMapMW01(transaction);
    case !!transaction.Metoda04:
      return reverseMapMW04(transaction);
    case !!transaction.Metoda06:
      return reverseMapMW06(transaction);
    case !!transaction.Metoda02:
      return reverseMapMW02_MW03_MW05(transaction);
    default:
      return {};
  }
}

function reverseMapMW01(transaction: Partial<MW01 & KP01 & KP02>): Partial<TransactionATable> {
  const mw01: Partial<TransactionATable> = {
    MetodyBadania: 'MW01',
    SposobWeryfikacji: transaction.Weryfikacja,
  };
  if (transaction.KorektyPorWyn1) {
    mw01.KorektaMetodyBadania = 'KP01';
  } else if (transaction.KorektyPorWyn5) {
    mw01.KorektaMetodyBadania = 'KP02';
    mw01.KorektaPorownywalnosciProg = transaction.KorektyPorWynProg;
  }
  Object.assign(mw01, reverseMapSposobUjeciaCeny(transaction as Partial<CK01 & CK02>));
  return mw01;
}

function reverseMapSposobUjeciaCeny(transaction: Partial<CK01 & CK02>): Partial<TransactionATable> {
  if (transaction.SposobUjCeny1) {
    return {
      SposobUjeciaCeny: 'CK01',
      Waluta1: transaction.Waluta1,
      CenaMinimalna: transaction.CenaMin,
      CenaMaksymalna: transaction.CenaMax,
      Miara1: transaction.Miara1,
      ...reverseMapRodzajPrzedzialuCK01(transaction as Partial<RP01_RP02_for_CK01 & RP03_for_CK01 & RP04_for_CK01>),
    };
  } else if (transaction.SposobUjCeny2) {
    return {
      SposobUjeciaCeny: 'CK02',
      ProcentMinimalny: transaction.ProcentMin,
      ProcentMaksymalny: transaction.ProcentMax,
      Miara2: transaction.Miara2,
      ...reverseMapRodzajPrzedzialuCK02(transaction as Partial<RP01_RP02_for_CK02 & RP03_for_CK02 & RP04_for_CK02>),
    };
  }
  return {};
}

function reverseMapRodzajPrzedzialuCK01(
  transaction: Partial<RP01_RP02_for_CK01 & RP03_for_CK01 & RP04_for_CK01>
): Partial<TransactionATable> {
  if (transaction.RodzajPrzedz1) {
    return {
      RodzajPrzedzialu: transaction.RodzajPrzedz1,
      CenaPorownywalnaMin: transaction.CenaPorMin1,
      CenaPorownywalnaMax: transaction.CenaPorMax1,
    };
  } else if (transaction.RodzajPrzedz13) {
    return {
      RodzajPrzedzialu: 'RP03',
      CenaPorownywalnaMin: transaction.CenaPorMin3,
      CenaPorownywalnaMax: transaction.CenaPorMax3,
      OpisPrzedzialu: transaction.OpisPrzedz,
    };
  } else if (transaction.RodzajPrzedz2) {
    return {
      RodzajPrzedzialu: 'RP04',
      WysokoscCenyPorownywalnej: transaction.WysCenPor1,
    };
  }
  return {};
}

function reverseMapRodzajPrzedzialuCK02(
  transaction: Partial<RP01_RP02_for_CK02 & RP03_for_CK02 & RP04_for_CK02>
): Partial<TransactionATable> {
  if (transaction.RodzajPrzedz3) {
    return {
      RodzajPrzedzialu: transaction.RodzajPrzedz3,
      CenaPorownywalnaMin: transaction.CenaPorMin2,
      CenaPorownywalnaMax: transaction.CenaPorMax2,
    };
  } else if (transaction.RodzajPrzedz14) {
    return {
      RodzajPrzedzialu: 'RP03',
      CenaPorownywalnaMin: transaction.CenaPorMin4,
      CenaPorownywalnaMax: transaction.CenaPorMax4,
      OpisPrzedzialu: transaction.OpisPrzedz,
    };
  } else if (transaction.RodzajPrzedz4) {
    return {
      RodzajPrzedzialu: 'RP04',
      WysokoscCenyPorownywalnej: transaction.WysCenPor2,
    };
  }
  return {};
}

function reverseMapMW04(transaction: Partial<MW04 & lossFalse & lossTrue>): Partial<TransactionATable> {
  const mw04: Partial<TransactionATable> = {
    MetodyBadania: 'MW04',
    RodzajMetodyPodzialuZysku: transaction.RodzMetodyPodzialu,
  };
  if (transaction.StrataPodm1) {
    mw04.Strata = true;
    mw04.ZakladanyZysk = transaction.ZaklZyskPodm1;
  } else if (transaction.StrataPodm2) {
    mw04.Strata = false;
    mw04.ZakladanyZysk = transaction.ZaklZyskPodm2;
    mw04.ZrealizowanyZysk = transaction.ZrealZyskPodm;
  }
  return mw04;
}

function reverseMapMW06(
  transaction: Partial<MW06 & TW01_TW02_for_MW06 & TB_for_TW01_TW02 & TB07_for_TW01_TW02 & TW07_for_MW06>
): Partial<TransactionATable> {
  const mw06: Partial<TransactionATable> = {
    MetodyBadania: 'MW06',
    TechWyceny: transaction.TechWyceny1,
  };
  if (transaction.TechWyceny1) {
    mw06.WspolczynnikDyskontowy = transaction.WspDyskont;
    if (transaction.OkresProg2) {
      mw06.OkresPrognozy = transaction.OkresProg2;
      mw06.TerminInny = transaction.TerminInny;
    }
  } else if (transaction.TechWyceny2) {
    mw06.ZrodloDanychZgodnosci = transaction.ZrodloDanychZgodn;
  }
  return mw06;
}

function reverseMapMW02_MW03_MW05(
  transaction: Partial<MW02_MW03_MW05 & KP01_for_MW02_MW03_MW05 & KP02_for_MW02_MW03_MW05>
): Partial<TransactionATable> {
  const mw02_03_05: Partial<TransactionATable> = {
    MetodyBadania: transaction.Metoda02,
    WskaznikFinansowy: transaction.WskaznikFinans,
    WynikTransakcji: transaction.WynikTrans,
  };
  if (transaction.KorektyPorWyn2) {
    mw02_03_05.KorektaMetodyBadania = 'KP01';
  } else if (transaction.KorektyPorWyn6) {
    mw02_03_05.KorektaMetodyBadania = 'KP02';
    mw02_03_05.KorektaPorownywalnosciProg = transaction.KorektyPorWynProg;
  }
  Object.assign(
    mw02_03_05,
    reverseMapRodzajPorownania(transaction as Partial<PR01_PR03_for_MW02_MW03_MW05 & PR02_for_KategoriaA_MW02_MW03_MW05>)
  );
  Object.assign(
    mw02_03_05,
    reverseMapRodzajPrzedzialuMW02_MW03_MW05(
      transaction as Partial<RP01_RP02_for_MW02_MW03_MW05 & RP03_for_MW02_MW03_MW05 & RP04_for_MW02_MW03_MW05>
    )
  );
  return mw02_03_05;
}

function reverseMapRodzajPorownania(
  transaction: Partial<PR01_PR03_for_MW02_MW03_MW05 & PR02_for_KategoriaA_MW02_MW03_MW05>
): Partial<TransactionATable> {
  if (transaction.RodzPor1) {
    return {
      RodzajPorownania: transaction.RodzPor1,
    };
  } else if (transaction.RodzPor2) {
    return {
      RodzajPorownania: 'PR02',
      PodmiotBadany: transaction.PodmiotBadany,
      KryteriumGeograficzne: transaction.KrytGeograf,
    };
  }
  return {};
}

function reverseMapRodzajPrzedzialuMW02_MW03_MW05(
  transaction: Partial<RP01_RP02_for_MW02_MW03_MW05 & RP03_for_MW02_MW03_MW05 & RP04_for_MW02_MW03_MW05>
): Partial<TransactionATable> {
  if (transaction.RodzajPrzedz5) {
    return {
      RodzajPrzedzialu: transaction.RodzajPrzedz5,
      DolnaGranicaPrzedzialu: transaction.WynikAP1,
      GornaGranicaPrzedzialu: transaction.WynikAP2,
    };
  } else if (transaction.RodzajPrzedz15) {
    return {
      RodzajPrzedzialu: 'RP03',
      DolnaGranicaPrzedzialu: transaction.WynikAP3,
      GornaGranicaPrzedzialu: transaction.WynikAP4,
      OpisPrzedzialu: transaction.OpisPrzedz,
    };
  } else if (transaction.RodzajPrzedz6) {
    return {
      RodzajPrzedzialu: 'RP04',
      WysokoscWskaznikaFinansowego: transaction.WynikAP,
    };
  }
  return {};
}
