import { TransactionETable } from 'app/services/tpr/tpr-table.types';
import { KC01, KC02, KP01, KP02, MW00, MW01toMW06, TK01, TK02, ZW01, ZW02 } from 'app/services/tpr/typeE.types';

export function reverseMapKorektaCenTransferowych(transaction: Partial<KC01 & KC02>): Partial<TransactionETable> {
  if (transaction.WartKorektyCT3) {
    return {
      correction: transaction.KorektaCT3,
      WartoscKorekty: transaction.WartKorektyCT3._text,
      KodWalutyKorekty: transaction.WartKorektyCT3._attributes.kodWaluty,
    };
  } else {
    return {
      correction: transaction.BrakKorektyCT3,
    };
  }
}

export function reverseMapZwolnienieArt11n(transaction: Partial<ZW01 & ZW02> & Partial<TK01 & TK02>): Partial<TransactionETable> {
  if (transaction.KodZW1) {
    return {
      Zwolnienie: transaction.KodZW1,
      PodstawaZwolnienia: transaction.PodstZW,
      KodKrajuZwolnienia: transaction.InformacjaOKrajuE1?.Kraj,
      WartoscTransakcjiZwolnienia: transaction.InformacjaOKrajuE1?.WartoscEKraj1._text,
      KodWalutyKraju: transaction.InformacjaOKrajuE1?.WartoscEKraj1._attributes.kodWaluty,
    };
  } else {
    if (transaction.RodzajTrans1) {
      return {
        Zwolnienie: transaction.KodZW2,
        RodzajTransakcji: transaction.RodzajTrans1,
        KodKrajuTransakcji: transaction.InformacjaOKrajuE2?.Kraj,
        WartośćTransakcjiKraju: transaction.InformacjaOKrajuE2?.WartoscEKraj2._text!,
        KodWalutyKrajuTransakcji: transaction.InformacjaOKrajuE2?.WartoscEKraj2._attributes.kodWaluty,
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

export function reverseMapMetodyBadania(
  transaction: Partial<MW01toMW06<any> & MW00> & Partial<KP01 & KP02>
): Partial<TransactionETable> {
  if (transaction.MetodaE) {
    const result: Partial<TransactionETable> = {
      MetodyBadania: transaction.MetodaE,
      RodzajAnalizy: transaction.RodzajAnalizy,
      SposobWyrazeniaCeny: transaction.SposobWyrCeny,
      SposobKalkulacjiOplaty: transaction.KalkOplaty1,
      PoziomOplaty: transaction.PoziomOpl1!,
      RodzajPrzedzialu: transaction.RodzajPrzedz10,
      GornaGranicaPrzedzialu: transaction.WynikAPKO1G1!,
      DolnaGranicaPrzedzialu: transaction.WynikAPKO1D1!,
    };

    if (transaction.KorektyPorWyn4) {
      result.KorektaPorownywalnosci = transaction.KorektyPorWyn4;
    } else {
      result.KorektaPorownywalnosci = transaction.KorektyPorWyn8;
      result.KorektaPorownywalnosciProg = transaction.KorektyPorWynProg;
    }

    return result;
  }else {
    return {
      MetodyBadania: transaction.MetodaE1
    }
  }
}
