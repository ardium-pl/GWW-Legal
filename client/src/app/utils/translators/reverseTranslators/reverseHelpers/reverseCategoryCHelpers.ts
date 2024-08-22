import { TransactionCTable } from 'app/services/tpr/tpr-table.types';
import {
    KC01,
    KC02,
    KP01,
    KP02,
    MW00,
    MW01toMW06,
    RP01,
    RP02,
    RP03,
    TK01,
    TK02,
    TransactionPartial,
    ZW01,
    ZW02
} from 'app/services/tpr/typeC.types';

export function reverseMapKorektaCenTransferowych(transaction: Partial<KC01 & KC02>): Partial<TransactionCTable> {
  if (transaction.WartKorektyCT2) {
    return {
      correction: transaction.KorektaCT2,
      WartoscKorekty: transaction.WartKorektyCT2._text,
      KodWalutyKorekty: transaction.WartKorektyCT2._attributes.kodWaluty,
    };
  } else {
    return {
      correction: transaction.BrakKorektyCT2,
    };
  }
}

export function reverseMapZwolnienieArt11n(transaction: Partial<ZW01 & ZW02> & Partial<TK01 & TK02>): Partial<TransactionCTable> {
  if (transaction.KodZW1) {
    return {
      Zwolnienie: transaction.KodZW1,
      PodstawaZwolnienia: transaction.PodstZW,
      KodKrajuZwolnienia: transaction.InformacjaOKrajuC1?.Kraj,
      WartoscTransakcjiZwolnienia: transaction.InformacjaOKrajuC1?.WartoscCKraj1._text,
      KodWalutyKraju: transaction.InformacjaOKrajuC1?.WartoscCKraj1._attributes.kodWaluty,
    };
  } else {
    if (transaction.RodzajTrans1) {
      return {
        Zwolnienie: transaction.KodZW2,
        RodzajTransakcji: transaction.RodzajTrans1,
        KodKrajuTransakcji: transaction.InformacjaOKrajuC2?.Kraj,
        WartośćTransakcjiKraju: transaction.InformacjaOKrajuC2?.WartoscCKraj2._text!,
        KodWalutyKrajuTransakcji: transaction.InformacjaOKrajuC2?.WartoscCKraj2._attributes.kodWaluty,
      };
    } else {
      return {
        Zwolnienie: transaction.KodZW2,
        RodzajTransakcji: transaction.RodzajTrans2,
        KodKrajuTransakcji: transaction.Kraj,
      };
    }
  }
}

export function reverseMapMetodyBadania(transaction: Partial<MW01toMW06 & MW00 & KP01 & KP02>): Partial<TransactionCTable> {
  if (transaction.MetodaC1) {
    return {
      MetodyBadania: transaction.MetodaC1,
    };
} else {
    const mw: Partial<TransactionCTable> = {
        MetodyBadania: transaction.MetodaC,
        ZrodloDanychFinansowych: transaction.ZrodloDanychFin
    };
    if(transaction.KorektyPorWyn3){
        mw.KorektaMetodyBadania = transaction.KorektyPorWyn3
    } else{
        mw.KorektaMetodyBadania = transaction.KorektyPorWyn7,
        mw.KorektaPorownywalnosciProg = transaction.KorektyPorWynProg

    }
    Object.assign(mw, reverseMapRodzajOprocentowania(transaction as TransactionPartial));
    return mw
    };
}

export function reverseMapRodzajOprocentowania(transaction: TransactionPartial): Partial<TransactionCTable> {
    let result: Partial<TransactionCTable> = {};
    
    switch (true) {
        case !!transaction.KalkOproc1:
            result = {
                RodzajOprocentowania: transaction.KalkOproc1,
                Marza: transaction.Marza,
            };
            if (transaction.InnaSB) {
                result.InnaSB = transaction.InnaSB;
            } else {
                result.NazwaStopyBazowej = transaction.KodSB1;
            }
            if (transaction.TerminInny) {
                result.TerminStopyBazowej = transaction.TerminInny;
                result.Okres = transaction.Okres;
            } else {
                result.TerminStopyBazowej = transaction.TerminSB;
            }
            break;

        case !!transaction.KalkOproc2:
            result = {
                RodzajOprocentowania: transaction.KalkOproc2,
                PoziomOprocentowania: transaction.PoziomOproc,
            };
            break;

        case !!transaction.KalkOproc3:
            result = {
                RodzajOprocentowania: transaction.KalkOproc3,
                PoziomOprocentowaniaMaksymalny: transaction.PoziomOprocMax,
                PoziomOprocentowaniaMinimalny: transaction.PoziomOprocMin,
            };
            break;

        default:
            result = {
                RodzajOprocentowania: transaction.KalkOproc4,
            };
            break;
    }
    
    return result;
}


export function reverseMapRodzajPrzedzialu(transaction: Partial<RP01 & RP02 & RP03>): Partial<TransactionCTable> {
  if (transaction.RodzajPrzedz7) {
    return {
      RodzajPrzedzialu: transaction.RodzajPrzedz7,
      DolnaGranicaPrzedzialu: transaction.WynikAPC1,
      GornaGranicaPrzedzialu: transaction.WynikAPC2,
    };
  } else if (transaction.RodzajPrzedz16) {
    return {
      RodzajPrzedzialu: transaction.RodzajPrzedz16,
      DolnaGranicaPrzedzialu: transaction.WynikAPC3,
      GornaGranicaPrzedzialu: transaction.WynikAPC4,
      OpisPrzedzialu: transaction.OpisPrzedz,
    };
  } else {
    return {
      RodzajPrzedzialu: transaction.RodzajPrzedz8,
      WysokoscWskaznikaFinansowego: transaction.WynikAPC,
    };
  }
}
