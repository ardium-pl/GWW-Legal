import { TransactionATable } from "app/services/tpr/tpr-table.types";

export function reverseMapKorektaCenTransferowych(transaction: any): Partial<TransactionATable> {
    if (transaction.KorektaCT1) {
      return {
        correction: 'KC01',
        WartoscKorekty: transaction.WartKorektyCT1._text,
        KodWalutyKorekty: transaction.WartKorektyCT1._attributes.kodWaluty,
      };
    } else if (transaction.BrakKorektyCT1) {
      return {
        correction: 'KC02',
      };
    }
    return {};
  }
  
 export  function reverseMapZwolnienieArt11nA(transaction: any): Partial<TransactionATable> {
    if (transaction.KodZW1) {
      return {
        Zwolnienie: 'ZW01',
        PodstawaZwolnienia: transaction.PodstZW,
        KodKrajuZwolnienia: transaction.InformacjaOKrajuA1.Kraj,
        WartoscTransakcjiZwolnienia: transaction.InformacjaOKrajuA1.WartoscAKraj1._text,
        KodWalutyKraju: transaction.InformacjaOKrajuA1.WartoscAKraj1._attributes.kodWaluty,
      };
    } else if (transaction.KodZW2) {
      return reverseMapZW02A(transaction);
    }
    return {};
  }
  
  function reverseMapZW02A(transaction: any): Partial<TransactionATable> {
    const zw2: Partial<TransactionATable> = {
      Zwolnienie: 'ZW02',
    };
    if (transaction.RodzajTrans1) {
      Object.assign(zw2, {
        RodzajTransakcji: 'TK01',
        KodKrajuTransakcji: transaction.InformacjaOKrajuA2.Kraj,
        WartośćTransakcjiKraju: transaction.InformacjaOKrajuA2.WartoscAKraj2._text,
        KodWalutyKrajuTransakcji: transaction.InformacjaOKrajuA2.WartoscAKraj2._attr.kodWaluty,
      });
    } else if (transaction.RodzajTrans2) {
      Object.assign(zw2, {
        RodzajTransakcji: 'TK02',
        KodKrajuTransakcji: transaction.Kraj,
      });
    }
    Object.assign(zw2, reverseMapMetodyBadaniaA(transaction));
    return zw2;
  }
  
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
  
  function reverseMapMW01(transaction: any): Partial<TransactionATable> {
    const mw01: Partial<TransactionATable> = {
      MetodyBadania: 'MW01',
      SposobWeryfikacji: transaction.Weryfikacja,
    };
    if (transaction.KorektyPorWyn1) {
      Object.assign(mw01, { KorektaMetodyBadania: 'KP01' });
    } else if (transaction.KorektyPorWyn5) {
      Object.assign(mw01, {
        KorektaMetodyBadania: 'KP02',
        KorektaPorownywalnosciProg: transaction.KorektyPorWynProg,
      });
    }
    Object.assign(mw01, reverseMapSposobUjeciaCeny(transaction));
    return mw01;
  }
  
  function reverseMapSposobUjeciaCeny(transaction: any): Partial<TransactionATable> {
    if (transaction.SposobUjCeny1) {
      return {
        SposobUjeciaCeny: 'CK01',
        Waluta1: transaction.Waluta1,
        CenaMinimalna: transaction.CenaMin,
        CenaMaksymalna: transaction.CenaMax,
        Miara1: transaction.Miara1,
        ...reverseMapRodzajPrzedzialuCK01(transaction),
      };
    } else if (transaction.SposobUjCeny2) {
      return {
        SposobUjeciaCeny: 'CK02',
        ProcentMinimalny: transaction.ProcentMin,
        ProcentMaksymalny: transaction.ProcentMax,
        Miara2: transaction.Miara2,
        ...reverseMapRodzajPrzedzialuCK02(transaction),
      };
    }
    return {};
  }
  
  function reverseMapRodzajPrzedzialuCK01(transaction: any): Partial<TransactionATable> {
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
  
  function reverseMapRodzajPrzedzialuCK02(transaction: any): Partial<TransactionATable> {
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
  
  function reverseMapMW04(transaction: any): Partial<TransactionATable> {
    const mw04: Partial<TransactionATable> = {
      MetodyBadania: 'MW04',
      RodzajMetodyPodzialuZysku: transaction.RodzMetodyPodzialu,
    };
    if (transaction.StrataPodm1) {
      Object.assign(mw04, {
        Strata: true,
        ZakladanyZysk: transaction.ZaklZyskPodm1,
      });
    } else if (transaction.StrataPodm2) {
      Object.assign(mw04, {
        Strata: false,
        ZakladanyZysk: transaction.ZaklZyskPodm2,
        ZrealizowanyZysk: transaction.ZrealZyskPodm,
      });
    }
    return mw04;
  }
  
  function reverseMapMW06(transaction: any): Partial<TransactionATable> {
    const mw06: Partial<TransactionATable> = {
      MetodyBadania: 'MW06',
      TechWyceny: transaction.TechWyceny,
    };
    if (transaction.TechWyceny1) {
      Object.assign(mw06, {
        WspolczynnikDyskontowy: transaction.WspDyskont,
      });
      if (transaction.OkresProg2) {
        Object.assign(mw06, {
          OkresPrognozy: 'TW07',
          TerminInny: transaction.TerminInny,
        });
      }
    } else if (transaction.TechWyceny2) {
      Object.assign(mw06, {
        ZrodloDanychZgodnosci: transaction.ZrodloDanychZgodn,
      });
    }
    return mw06;
  }
  
  function reverseMapMW02_MW03_MW05(transaction: any): Partial<TransactionATable> {
    const mw02_03_05: Partial<TransactionATable> = {
      MetodyBadania: transaction.Metoda02,
      WskaznikFinansowy: transaction.WskaznikFinans,
      WynikTransakcji: transaction.WynikTrans,
    };
    if (transaction.KorektyPorWyn2) {
      Object.assign(mw02_03_05, { KorektaMetodyBadania: 'KP01' });
    } else if (transaction.KorektyPorWyn6) {
      Object.assign(mw02_03_05, {
        KorektaMetodyBadania: 'KP02',
        KorektaPorownywalnosciProg: transaction.KorektyPorWynProg,
      });
    }
    Object.assign(mw02_03_05, reverseMapRodzajPorownania(transaction));
    Object.assign(mw02_03_05, reverseMapRodzajPrzedzialuMW02_MW03_MW05(transaction));
    return mw02_03_05;
  }
  
  function reverseMapRodzajPorownania(transaction: any): Partial<TransactionATable> {
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
  
  function reverseMapRodzajPrzedzialuMW02_MW03_MW05(transaction: any): Partial<TransactionATable> {
    if (transaction.RodzajPrzedz5) {
      return {
        RodzajPrzedzialu: transaction.RodzajPrzedz5,
        DolnaGranica: transaction.WynikAP1,
        GornaGranica: transaction.WynikAP2,
      };
    } else if (transaction.RodzajPrzedz15) {
      return {
        RodzajPrzedzialu: 'RP03',
        DolnaGranica: transaction.WynikAP3,
        GornaGranica: transaction.WynikAP4,
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