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
        },
        Kompensata: transaction.compensation,
    };

    // Apply correction mapping
    const korektaCenTransferowych = mapKorektaCenTransferowychA(transaction);

    // Apply exemption mapping
    const zwolnienieArt11n = mapZwolnienieArt11nA(transaction);

    // Combine base transaction with correction and exemption mappings
    const transakcja = {
        ...baseTransakcjaA,
        ...korektaCenTransferowych,
        ...zwolnienieArt11n,
    };

    return transakcja as TransakcjaKategoriaA;
}

export function translateCategoryA1(transaction: TransactionATable) {
    const baseTransakcjaA1: Partial<TransakcjaKategoriaA> = {
        KategoriaA: transaction.transactionCategory,
        PrzedmiotA: transaction.subjectMatter,
        WartoscA: {
            _attributes: {
                kodWaluty: transaction.currencyCode,
            },
            _text: transaction.transactionValue,
        },
        Kompensata: transaction.compensation,
    };

    // Apply correction mapping
    const korektaCenTransferowych = mapKorektaCenTransferowychA(transaction);

    // Apply exemption mapping
    const zwolnienieArt11n = mapZwolnienieArt11nA(transaction);

    // Combine base transaction with correction and exemption mappings
    const transakcja = {
        ...baseTransakcjaA1,
        ...korektaCenTransferowych,
        ...zwolnienieArt11n,
    };

    return transakcja as TransakcjaKategoriaA;
}
