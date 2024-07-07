import { KC01, KC02, ZW01, ZW02, MW00, MW01toMW06, Korekta, OP01, OP02, OP03, OP04_OP05, RP01, RP02, RP03 } from 'app/services/tpr/typeC.types';
import { AllTransactionTables } from 'app/services/tpr/tpr-input.types';
import { TransactionCTable } from 'app/services/tpr/tpr-table.types';

export function mapKorektaCenTransferowych(transaction: TransactionCTable): Partial<KC01 | KC02> {
    switch (transaction.correction) {
        case 'KC01':
            return {
                KorektaCT2: 'KC01',
                WartKorektyCT2: {
                    _attributes: {
                        kodWaluty: transaction.KodWalutyKorekty,
                    },
                    _text: transaction.WartoscKorekty,
                },
            };
        case 'KC02':
            return {
                BrakKorektyCT2: 'KC02',
            };
        default:
            return {};
    }
}

export function mapZwolnienieArt11n(transaction: TransactionCTable): Partial<ZW01 | ZW02> {
    switch (transaction.Zwolnienie) {
        case 'ZW01':
            return {
                KodZW1: 'ZW01',
                PodstZW: transaction.PodstawaZwolnienia,
                InformacjaOKrajuC1: {
                    Kraj: transaction.currencyCode,
                    WartoscCKraj1: {
                        _attributes: {
                            kodWaluty: transaction.KodKrajuZwolnienia,
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

export function mapZW02(transaction: TransactionCTable): Partial<ZW02> {
    const zw2: Partial<ZW02> = {
        KodZW2: 'ZW02',
    };
    if (transaction.RodzajTransakcji === 'TK01') {
        Object.assign(zw2, {
            RodzajTrans1: 'TK01',
            InformacjaOKrajuC2: {
                Kraj: transaction.KodKrajuTransakcji,
                WartoscCKraj2: {
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
    Object.assign(zw2, mapMetodyBadania(transaction));
    return zw2;
}

export function mapMetodyBadania(transaction: TransactionCTable): Partial<MW00 | MW01toMW06<Korekta>> {
    switch (transaction.MetodyBadania) {
        case 'MW00':
            return {
                MetodaC1: 'MW00',
            };
        case 'MW01':
        case 'MW02':
        case 'MW03':
        case 'MW04':
        case 'MW05':
        case 'MW06':
            const mw: Partial<MW01toMW06<Korekta>> = {
                MetodaC: transaction.MetodyBadania,
                ZrodloDanychFin: transaction.ZrodloDanychFinansowych,
            };
            if (transaction.KorektaMetodyBadania === 'KP01') {
                Object.assign(mw, { KorektyPorWyn3: 'KP01' });
            } else if(transaction.KorektaMetodyBadania === 'KP02') {
                Object.assign(mw, { KorektyPorWyn7: 'KP02', KorektyPorWynProg: transaction.KorektaPorownywalnosciProg });
            }
            Object.assign(mw, mapRodzajOprocentowania(transaction));
            return mw;
        default:
            return {};
    }
}

export function mapRodzajOprocentowania(transaction: TransactionCTable): Partial<OP01 | OP02 | OP03 | OP04_OP05> {
    switch (transaction.RodzajOprocentowania) {
        case 'OP01':
            return {
                KalkOproc1: 'OP01',
                Marza: transaction.Marza,
                KodSB1: transaction.NazwaStopyBazowej,
                TerminSB: transaction.TerminStopyBazowej,
            };
        case 'OP02':
            return {
                KalkOproc2: 'OP02',
                PoziomOproc: transaction.PoziomOprocentowania,
            };
        case 'OP03':
            return {
                KalkOproc3: 'OP03',
                PoziomOprocMin: transaction.PoziomOprocentowaniaMinimalny,
                PoziomOprocMax: transaction.PoziomOprocentowaniaMaksymalny,
            };
        case 'OP04':
        case 'OP05':
            return {
                KalkOproc4: transaction.RodzajOprocentowania,
            };
        default:
            return {};
    }
}

export function mapRodzajPrzedzialu(transaction: TransactionCTable) {
    switch (transaction.RodzajPrzedzialu) {
        case 'RP02':
        case 'RP01':
            return {
                RodzajPrzedz7: transaction.RodzajPrzedzialu,
                WynikAPC1: transaction.DolnaGranicaPrzedzialu,
                WynikAPC2: transaction.GornaGranicaPrzedzialu,
            };
        case 'RP03':
            return {
                RodzajPrzedz16: 'RP03',
                WynikAPC3: transaction.DolnaGranicaPrzedzialu,
                WynikAPC4: transaction.GornaGranicaPrzedzialu,
                OpisPrzedz: transaction.OpisPrzedzialu,
            };
        case 'RP04':
            return{
                RodzajPrzedz8: 'RP04',
                WynikAPC: transaction.WysokoscWskaznikaFinansowego
            }
        default:
            return {};
    }
}