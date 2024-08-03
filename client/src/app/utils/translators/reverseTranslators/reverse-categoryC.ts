import { TransactionCTable } from 'app/services/tpr/tpr-table.types';
import { reverseMapKorektaCenTransferowych, reverseMapMetodyBadania, reverseMapRodzajPrzedzialu, reverseMapZwolnienieArt11n } from './reverseHelpers/reverseCategoryCHelpers';

export function reverseTranslateCategoryC(transaction: any, id: number): TransactionCTable {

    const baseTableData: Partial<TransactionCTable> = {
        Id: id,
        transactionCategory: transaction.KategoriaC,
        transactionValue: transaction.WartoscC._text,
        subjectMatter: transaction.PrzedmiotC,
        currencyCode: transaction.WartoscC._attributes.kodWaluty,
        compensation: transaction.Kompensata,
        Kapital: transaction.KapitalC._text,
        KodWalutyKapitalu: transaction.KapitalC._attributes.kodWaluty,
        Zadluzenie: transaction.ZadluzenieC._text,
        KodWalutyZadluzenia: transaction.ZadluzenieC._attributes.kodWaluty,
        WysokoscOdsetekMemorialowo: transaction.OdsetkiCm._text,
        KodWalutyOdsetekMemorialowych: transaction.OdsetkiCm._attributes.kodWaluty,
        WysokoscOdsetekKasowo: transaction.OdsetkiCk._text,
        KodWalutyOdsetekKasowych: transaction.OdsetkiCk._attributes.kodWaluty,
    };

    const korektaCenTransferowych = reverseMapKorektaCenTransferowych(transaction);
    const zwolnienieArt11n = reverseMapZwolnienieArt11n(transaction);

    const transakcja = {
        ...baseTableData,
        ...korektaCenTransferowych,
        ...zwolnienieArt11n,
    };

    if ('KodZW2' in transaction) {
        const metodyBadania = reverseMapMetodyBadania(transaction);
        Object.assign(transakcja, metodyBadania);
        
        const rodzajPrzedzialu = reverseMapRodzajPrzedzialu(transaction);
        Object.assign(transakcja, rodzajPrzedzialu);
    }


    return transakcja as TransactionCTable;
}
