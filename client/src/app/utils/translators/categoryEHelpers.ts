import { KC01, KC02, ZW01, ZW02, MW00, MW01toMW06, KorektaCenTransferowych, ZwolnienieArt11n, MetodyBadania, Korekta, TK01, TK02 } from 'app/services/tpr/typeE.types';
import { Transaction } from 'app/services/tpr/tpr-input.types';

export function mapKorektaCenTransferowych(transaction: any): Partial<KC01 | KC02> {
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

export function mapZwolnienieArt11n(transaction: any): Partial<ZW01 | ZW02> {
    switch (transaction.ZwolnienieArt11n) {
        case 'ZW01':
            return {
                KodZW1: 'ZW01',
                PodstZW: transaction.podstawaZwolnienia,
                InformacjaOKrajuE1: {
                    Kraj: transaction.kraj,
                    WartoscEKraj1: {
                        _attributes: {
                            kodWaluty: transaction.zwolnienieCurrency,
                        },
                        _text: transaction.zwolnienieValue,
                    },
                },
            };
        case 'ZW02':
            return mapZW02(transaction);
        default:
            return {};
    }
}

function mapZW02(transaction: any): Partial<ZW02> {
    const zw2: Partial<ZW02> = {
        KodZW2: 'ZW02',
    };
    if (transaction.rodzajTransakcji === 'TK01') {
        Object.assign(zw2, {
            RodzajTrans1: 'TK01',
            InformacjaOKrajuE2: {
                Kraj: transaction.kraj,
                WartoscEKraj2: {
                    _attributes: {
                        kodWaluty: transaction.zwolnienieCurrency,
                    },
                    _text: transaction.zwolnienieValue,
                },
            },
        });
    } else if (transaction.rodzajTransakcji === 'TK02') {
        Object.assign(zw2, {
            RodzajTrans2: 'TK02',
            Kraj: transaction.kraj,
        });
    }
    Object.assign(zw2, mapMetodyBadania(transaction));
    return zw2;
}


export function mapMetodyBadania(transaction: any): Partial<MW00 | MW01toMW06<Korekta>> {
    switch (transaction.metodaBadania) {
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
                MetodaE: transaction.metodaBadania,
                RodzajAnalizy: transaction.rodzajAnalizy,
                SposobWyrCeny: transaction.sposobWyrazeniaCeny,
                KalkOplaty1: transaction.sposobKalkulacjiOplaty,
                PoziomOpl1: transaction.poziomOplaty,
                RodzajPrzedz10: 'RP01',
                WynikAPKO1D1: transaction.dolnaGranica,
                WynikAPKO1G1: transaction.gornaGranica,
            };
            if (transaction.korektaMetodyBadania === 'KP01') {
                Object.assign(mw, { KorektyPorWyn4: 'KP01' });
            } else if (transaction.korektaMetodyBadania === 'KP02') {
                Object.assign(mw, { KorektyPorWyn8: 'KP02' });
            }
            return mw;
        default:
            return {};
    }
}