// import { TransakcjaKategoriaC } from 'app/services/tpr/typeC.types';
// import { AllTransactionTables } from 'app/services/tpr/tpr-input.types';
// import { mapKorektaCenTransferowych, mapZwolnienieArt11n, mapMetodyBadania, mapRodzajOprocentowania, mapRodzajPrzedzialu } from './categoryC';
// import { TransactionCTable } from 'app/services/tpr/tpr-table.types';

// export function translateCategoryC(transaction: TransactionCTable) {
//     const baseTransakcja = {
//         KategoriaC: transaction.transactionCategory,
//         PrzedmiotC: transaction.subjectMatter,
//         WartoscC: {
//             _attributes: {
//                 kodWaluty: transaction.currencyCode,
//             },
//             _text: transaction.transactionValue,
//         },
//         Kompensata: transaction.compensation,
//         KapitalC: {
//             _attributes: {
//                 kodWaluty: transaction.KodWalutyKapitalu,
//             },
//             _text: transaction.Kapital,
//         },
//         ZadluzenieC: {
//             _attributes: {
//                 kodWaluty: transaction.KodWalutyZadluzenia,
//             },
//             _text: transaction.Zadluzenie,
//         },
//         OdsetkiCm: {
//             _attributes: {
//                 kodWaluty: transaction.KodWalutyOdsetekMemorialowych,
//             },
//             _text: transaction.WysokoscOdsetekMemorialowo,
//         },
//         OdsetkiCk: {
//             _attributes: {
//                 kodWaluty: transaction.KodWalutyOdsetekKasowych,
//             },
//             _text: transaction.WysokoscOdsetekKasowo,
//         },
//     };

//     const korektaCenTransferowych = mapKorektaCenTransferowych(transaction);

//     const zwolnienieArt11n = mapZwolnienieArt11n(transaction);

//     const transakcja = {
//         ...baseTransakcja,
//         ...korektaCenTransferowych,
//         ...zwolnienieArt11n,
//     };

//     if (transaction.Zwolnienie === 'ZW02') {
//         const metodyBadania = mapMetodyBadania(transaction);
//         Object.assign(transakcja, metodyBadania);
//     }

//     const rodzajPrzedzialu = mapRodzajPrzedzialu(transaction);
//     Object.assign(transakcja, rodzajPrzedzialu);

//     return transakcja as TransakcjaKategoriaC;
// }