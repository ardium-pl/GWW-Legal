import { TransactionETable } from 'app/services/tpr/tpr-table.types';
import { KC01, KC02, MW01toMW06, TK01, TK02, ZW01, ZW02 } from '../types/reverseTypeE';

export function reverseMapKorektaCenTransferowych(transaction: Partial<KC01 & KC02>): Partial<TransactionETable> {
    if (transaction.WartKorektyCT3) {
        return {
            correction: transaction.KorektaCT3,
            WartoscKorekty: parseFloat(transaction.WartKorektyCT3._!),
            KodWalutyKorekty: transaction.WartKorektyCT3.$?.kodWaluty,
        };
    } else {
        return {
            correction: transaction.BrakKorektyCT3,
        };
    }
}


// Function to map ZwolnienieArt11n
export function reverseMapZwolnienieArt11n(transaction: Partial<ZW01 & ZW02> & Partial<TK01 & TK02>): Partial<TransactionETable> {
    if (transaction.KodZW1) {
        return {
            Zwolnienie: transaction.KodZW1,
            PodstawaZwolnienia: transaction.PodstZW,
            KodKrajuZwolnienia: transaction.InformacjaOKrajuE1?.Kraj,
            WartoscTransakcjiZwolnienia: parseFloat(transaction.InformacjaOKrajuE1?.WartoscEKraj1._!),
            KodWalutyKraju: transaction.InformacjaOKrajuE1?.WartoscEKraj1.$?.kodWaluty,
        };
    } else {
        if (transaction.RodzajTrans1) {
            return {
                Zwolnienie: transaction.KodZW2,
                RodzajTransakcji: transaction.RodzajTrans1,
                KodKrajuTransakcji: transaction.InformacjaOKrajuE2?.Kraj,
                WartośćTransakcjiKraju: parseFloat(transaction.InformacjaOKrajuE2?.WartoscEKraj2._!),
                KodWalutyKrajuTransakcji: transaction.InformacjaOKrajuE2?.WartoscEKraj2.$.kodWaluty,
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

export function reverseMapMetodyBadania(transaction: Partial<MW01toMW06<any>>): Partial<TransactionETable> {
    if (transaction.MetodaE) {
        return {
            MetodyBadania: transaction.MetodaE,
            RodzajAnalizy: transaction.RodzajAnalizy,
            SposobWyrazeniaCeny: transaction.SposobWyrCeny,
            SposobKalkulacjiOplaty: transaction.KalkOplaty1,
            PoziomOplaty: parseFloat(transaction.PoziomOpl1!),
            RodzajPrzedzialu: transaction.RodzajPrzedz10,
            DolnaGranicaPrzedzialu: parseFloat(transaction.WynikAPKO1D1!),
            GornaGranicaPrzedzialu: parseFloat(transaction.WynikAPKO1G1!),
        };
    }
    return {};
}
