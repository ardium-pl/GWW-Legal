import { TransakcjaKategoriaA } from 'app/services/tpr/typeA.types';
import { mapKorektaCenTransferowychA, mapZwolnienieArt11nA, } from './categoryA';
import { TransactionATable } from 'app/services/tpr/tpr-table.types';

export function translateCategoryA(transaction: TransactionATable) {
    const baseTransakcjaA: Partial<TransakcjaKategoriaA> = {
        KategoriaA: transaction.transactionCategory,
        PrzedmiotA: transaction.subjectMatter,
        WartoscA: {
            _attributes: {
                kodWaluty: transaction.currencyCode,
            },
            _text: transaction.transactionValue,
        }
    };

    const korektaCenTransferowych = mapKorektaCenTransferowychA(transaction);

    const zwolnienieArt11n = mapZwolnienieArt11nA(transaction);

    const transakcja = {
        ...baseTransakcjaA,
        ...korektaCenTransferowych,
        Kompensata: transaction.compensation,
        ...zwolnienieArt11n,
    };

    return transakcja as TransakcjaKategoriaA;
}

export function translateCategoryA1(transaction: TransactionATable) {
    const baseTransakcjaA1: Partial<TransakcjaKategoriaA> = {
        KategoriaA1: transaction.transactionCategory,
        WynRestrukt: transaction.WynagrodzenieZaRestrukturyzacje,
        PrzedmiotA: transaction.subjectMatter,
        WartoscA: {
            _attributes: {
                kodWaluty: transaction.currencyCode,
            },
            _text: transaction.transactionValue,
        }
    };

    const korektaCenTransferowych = mapKorektaCenTransferowychA(transaction);

    const zwolnienieArt11n = mapZwolnienieArt11nA(transaction);

    const transakcja = {
        ...baseTransakcjaA1,
        ...korektaCenTransferowych,
        Kompensata: transaction.compensation,
        ...zwolnienieArt11n,
    };

    return transakcja;
}


export function translateCategoryA2(transaction: TransactionATable) {
    const baseTransakcjaA2 = {
        KategoriaA2: '3101',
        RodzajUm: transaction.RodzajUmowy,
        PrzedmiotA: transaction.subjectMatter,
        WartoscA: {
            _attributes: {
                kodWaluty: transaction.currencyCode,
            },
            _text: transaction.transactionValue,
        },
        Wklad: {
            _attributes: {
                kodWaluty: transaction.KodWalutyWkladu,
            },
            _text: transaction.Wklad,
        },
        WkladOgolny: {
            _attributes: {
                kodWaluty: transaction.KodWalutyWkladuOgolnego,
            },
            _text: transaction.WkladOgolny,
        },
    };

    const korektaCenTransferowych = mapKorektaCenTransferowychA(transaction);

    const zwolnienieArt11n = mapZwolnienieArt11nA(transaction);

    let udMapping = {};
    if (transaction.Udzial === 'UD01') {
        udMapping = {
            Udzial1: 'UD01',
            ProcentUdzial1: transaction.ProcentUdzialuWZyskach,
        };
    } else if (transaction.Udzial === 'UD02') {
        udMapping = {
            Udzial2: 'UD02',
            ProcentUdzial2: transaction.ProcentUdzialuWStracie,
        };
    } else if (transaction.Udzial === 'UD03') {
        udMapping = {
            Udzial3: 'UD03',
            ProcentUdzial3: transaction.ProcentUdzialuWMajatkuLikwidacyjnym,
        };
    }

    const transakcja = {
        ...baseTransakcjaA2,
        ...udMapping,
        ...korektaCenTransferowych,
        Kompensata: transaction.compensation,
        ...zwolnienieArt11n,
    };

    return transakcja;
}
