// import { TransakcjaKategoriaA } from 'app/services/tpr/typeA.types';
// import { AllTransactionTables } from 'app/services/tpr/tpr-input.types';
// import { mapKorektaCenTransferowychA, mapZwolnienieArt11nA, mapMetodyBadaniaA } from './categoryA'

// export function translateCategoryA(transaction: AllTransactionTables): TransakcjaKategoriaA {
//     const baseTransakcjaA: Partial<TransakcjaKategoriaA> = {
//         KategoriaA: transaction.transactionCategory,
//         PrzedmiotA: transaction.subjectMatter,
//         WartoscA: [
//             {
//                 _attr: {
//                     kodWaluty: transaction.currencyCode,
//                 },
//             },
//             transaction.transactionValue,
//         ],
//         Kompensata: transaction.compensation,
//         SupportVarMetoda: transaction.MetodyBadania as any,
//     };

//     // Apply correction mapping
//     const korektaCenTransferowych = mapKorektaCenTransferowychA(transaction);

//     // Apply exemption mapping
//     const zwolnienieArt11n = mapZwolnienieArt11nA(transaction);

//     // Combine base transaction with correction and exemption mappings
//     const transakcja = {
//         ...baseTransakcjaA,
//         ...korektaCenTransferowych,
//         ...zwolnienieArt11n,
//     };

//     return transakcja as TransakcjaKategoriaA;
// }