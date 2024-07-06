import { TransakcjaKategoriaA } from 'app/services/tpr/typeA.types';
import { AllTransactionTables } from 'app/services/tpr/tpr-input.types';
import { mapKorektaCenTransferowychA, mapZwolnienieArt11nA, mapMetodyBadaniaA } from './categoryA';
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

    // Apply correction mapping
    const korektaCenTransferowych = mapKorektaCenTransferowychA(transaction);

    // Apply exemption mapping
    const zwolnienieArt11n = mapZwolnienieArt11nA(transaction);

    // Combine base transaction with correction and exemption mappings, then add compensation
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
        KategoriaA: transaction.transactionCategory,
        // WynRestrukt: transaction.WynagrodzenieZaRestrukturyzacje,
        PrzedmiotA: transaction.subjectMatter,
        WartoscA: {
            _attributes: {
                kodWaluty: transaction.currencyCode,
            },
            _text: transaction.transactionValue,
        }
    };

    // Apply correction mapping
    const korektaCenTransferowych = mapKorektaCenTransferowychA(transaction);

    // Apply exemption mapping
    const zwolnienieArt11n = mapZwolnienieArt11nA(transaction);

    // Combine base transaction with correction and exemption mappings, then add compensation
    const transakcja = {
        ...baseTransakcjaA1,
        ...korektaCenTransferowych,
        Kompensata: transaction.compensation,
        ...zwolnienieArt11n,
    };

    return transakcja;
}


// export function translateCategoryA2(transaction: TransactionATable) {
//     const baseTransakcjaA2 = {
//         KategoriaA2: '3101',
//         RodzajUm: transaction.RodzajUmowy,
//         PrzedmiotA2: transaction.subjectMatter,
//         WartoscA2: {
//             _attributes: {
//                 kodWaluty: transaction.currencyCode,
//             },
//             _text: transaction.transactionValue,
//         },
//         Wklad: {
//             _attributes: {
//                 kodWaluty: transaction.contributionCurrencyCode,
//             },
//             _text: transaction.contributionValue,
//         },
//         WkladOgolny: {
//             _attributes: {
//                 kodWaluty: transaction.generalContributionCurrencyCode,
//             },
//             _text: transaction.generalContributionValue,
//         },
//     };

//     // Apply correction mapping
//     const korektaCenTransferowych = mapKorektaCenTransferowychA(transaction);

//     // Apply exemption mapping
//     const zwolnienieArt11n = mapZwolnienieArt11nA(transaction);

//     // Determine the UD type and apply the relevant mapping
//     let udMapping = {};
//     if (transaction.Udzial === 'UD01') {
//         udMapping = {
//             Udzial1: 'UD01',
//             ProcentUdzial1: transaction.UdzialProcentowy,
//         };
//     } else if (transaction.Udzial === 'UD02') {
//         udMapping = {
//             Udzial2: 'UD02',
//             ProcentUdzial2: transaction.UdzialProcentowy,
//         };
//     } else if (transaction.Udzial === 'UD03') {
//         udMapping = {
//             Udzial3: 'UD03',
//             ProcentUdzial3: transaction.UdzialProcentowy,
//         };
//     }

//     const transakcja = {
//         ...baseTransakcjaA2,
//         ...udMapping,
//         ...korektaCenTransferowych,
//         Kompensata: transaction.compensation,
//         ...zwolnienieArt11n,
//     };

//     return transakcja;
// }
