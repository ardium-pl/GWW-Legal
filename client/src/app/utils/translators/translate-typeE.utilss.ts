import { TransakcjaKategoriaE } from 'app/services/tpr/typeE.types';
import { Transaction } from 'app/services/tpr/tpr-input.types';
import { mapKorektaCenTransferowych, mapZwolnienieArt11n, mapMetodyBadania } from './categoryEHelpers';

export function translateCategoryE(transaction: any): TransakcjaKategoriaE {
    const baseTransakcja: Partial<TransakcjaKategoriaE> = {
        KategoriaE: transaction.transactionCategory as '1401' | '2401',
        PrzedmiotE: transaction.subjectMatter,
        WartoscE: {
            _attributes: {
                kodWaluty: transaction.currencyCode,
            },
            _text: transaction.transactionValue,
        },
        Kompensata: transaction.compensation,
        RodzajDN: transaction.rodzajDN || 'DN01',
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
    if (transaction.zwolnienieArt11n === 'ZW02') {
        const metodyBadania = mapMetodyBadania(transaction);
        Object.assign(transakcja, metodyBadania);
    }

    return transakcja as TransakcjaKategoriaE;
}