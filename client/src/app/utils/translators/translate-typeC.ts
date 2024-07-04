import { TransakcjaKategoriaC } from 'app/services/tpr/typeC.types';
import { AllTransactionTables } from 'app/services/tpr/tpr-input.types';
import { mapKorektaCenTransferowych, mapZwolnienieArt11n, mapMetodyBadania, mapRodzajOprocentowania, mapRodzajPrzedzialu } from './categoryC';

export function translateCategoryC(transaction: AllTransactionTables): TransakcjaKategoriaC {
    const baseTransakcja: Partial<TransakcjaKategoriaC> = {
        KategoriaC: transaction.transactionCategory,
        PrzedmiotC: transaction.subjectMatter,
        WartoscC: {
            _attributes: {
                kodWaluty: transaction.currencyCode,
            },
            _text: transaction.transactionValue,
        },
        Kompensata: transaction.compensation,
        KapitalC: {
            _attributes: {
                kodWaluty: transaction.currencyCode,
            },
            _text: transaction.transactionValue,
        },
        ZadluzenieC: {
            _attributes: {
                kodWaluty: transaction.currencyCode,
            },
            _text: transaction.transactionValue,
        },
        OdsetkiCm: {
            _attributes: {
                kodWaluty: transaction.currencyCode,
            },
            _text: transaction.transactionValue,
        },
        OdsetkiCk: {
            _attributes: {
                kodWaluty: transaction.currencyCode,
            },
            _text: transaction.transactionValue,
        },
    };

    // Apply correction mapping
    const korektaCenTransferowych = mapKorektaCenTransferowych(transaction);

    // Apply exemption mapping
    const zwolnienieArt11n = mapZwolnienieArt11n(transaction);

    // Combine base transaction with correction and exemption mappings
    const transakcja = {
        ...baseTransakcja,
        ...korektaCenTransferowych,
        ...zwolnienieArt11n,
    };

    // If zwolnienieArt11n is ZW02, apply the additional logic
    if (transaction.Zwolnienie === 'ZW02') {
        const metodyBadania = mapMetodyBadania(transaction);
        Object.assign(transakcja, metodyBadania);
    }

    const rodzajPrzedzialu = mapRodzajPrzedzialu(transaction);
    Object.assign(transakcja, rodzajPrzedzialu);

    return transakcja as TransakcjaKategoriaC;
}