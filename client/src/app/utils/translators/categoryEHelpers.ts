import { KC01, KC02, ZW01, ZW02, MW00, MW01toMW06,  Korekta,  } from 'app/services/tpr/typeE.types';
import { TransactionETable } from 'app/services/tpr/tpr-table.types';

export function mapKorektaCenTransferowych(transaction: TransactionETable): Partial<KC01 | KC02> {
    switch (transaction.correction) {
        case 'KC01':
            return {
                KorektaCT3: 'KC01',
                WartKorektyCT3: {
                    _attributes: {
                        kodWaluty: transaction.KodWalutyKorekty,
                    },
                    _text: transaction.WartoscKorekty,
                },
            };
        case 'KC02':
            return {
                BrakKorektyCT3: 'KC02',
            };
        default:
            return {};
    }
}

export function mapZwolnienieArt11n(transaction: TransactionETable): Partial<ZW01 | ZW02> {
    switch (transaction.Zwolnienie) {
        case 'ZW01':
            return {
                KodZW1: 'ZW01',
                PodstZW: transaction.PodstawaZwolnienia,
                InformacjaOKrajuE1: {
                    Kraj: transaction.KodKrajuZwolnienia,
                    WartoscEKraj1: {
                        _attributes: {
                            kodWaluty: transaction.KodWalutyKraju,
                        },
                        _text: transaction.WartoscTransakcjiZwolnienia,
                    },
                },
            };
        case 'ZW02':
            return mapZW02(transaction);
        default:
            return {};
    }
}

function mapZW02(transaction: TransactionETable): Partial<ZW02> {
    const zw2: Partial<ZW02> = {
        KodZW2: 'ZW02',
    };
    if (transaction.RodzajTransakcji === 'TK01') {
        Object.assign(zw2, {
            RodzajTrans1: 'TK01',
            InformacjaOKrajuE2: {
                Kraj: transaction.KodWalutyKraju,
                WartoscEKraj2: {
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
            Kraj: transaction.KodWalutyKraju,
        });
    }
    Object.assign(zw2, mapMetodyBadania(transaction));
    return zw2;
}


export function mapMetodyBadania(transaction: TransactionETable): Partial<MW00 | MW01toMW06<Korekta>> {
    switch (transaction.MetodyBadania) {
        case 'MW00':
            return {
                MetodaE1: 'MW00',
            };
        case 'MW01':
        case 'MW02':
        case 'MW03':
        case 'MW04':
        case 'MW05':
        case 'MW06':
            const mw: Partial<MW01toMW06<Korekta>> = {
                MetodaE: transaction.MetodyBadania,
                RodzajAnalizy: transaction.RodzajAnalizy,
                SposobWyrCeny: transaction.SposobWyrazeniaCeny,
                KalkOplaty1: transaction.SposobKalkulacjiOplaty,
                PoziomOpl1: transaction.PoziomOplaty,
                RodzajPrzedz10: 'RP01',
                WynikAPKO1D1: transaction.DolnaGranicaPrzedzialu,
                WynikAPKO1G1: transaction.GornaGranicaPrzedzialu,
            };
            if (transaction.KorektaMetodyBadania === 'KP01') {
                Object.assign(mw, { KorektyPorWyn4: 'KP01' });
            } else if (transaction.KorektaMetodyBadania === 'KP02') {
                Object.assign(mw, { KorektyPorWyn8: 'KP02' });
            }
            return mw;
        default:
            return {};
    }
}