import { TransactionETable } from "app/services/tpr/tpr-table.types";
import { reverseMapKorektaCenTransferowych, reverseMapMetodyBadania, reverseMapZwolnienieArt11n } from "./reverseHelpers/reverseCategoryEHelpers";
import { reverseTransakcjaKategoriaE } from "./types/reverseTypeE";


export function reverseTranslateCategoryE(transaction: any, id: number): TransactionETable {

    const baseTableData: Partial<TransactionETable> = {
        Id: id,
        transactionCategory: transaction.KategoriaE,
        transactionValue: parseFloat(transaction.WartoscE._!),
        subjectMatter: transaction.PrzedmiotE,
        currencyCode: transaction.WartoscE.$.kodWaluty,
        compensation: transaction.Kompensata,
        RodzajWartosciNiematerialnych: transaction.RodzajDN,
    }

    const korektaCenTransferowych = reverseMapKorektaCenTransferowych(transaction);
    const zwolnienieArt11n = reverseMapZwolnienieArt11n(transaction);

    const transakcja = {
        ...baseTableData,
        ...korektaCenTransferowych,
        ...zwolnienieArt11n,
    }

    if ('KodZW2' in transaction) {
        const metodyBadania = reverseMapMetodyBadania(transaction);
        Object.assign(transakcja, metodyBadania);
    }

    return transakcja as TransactionETable;
}
