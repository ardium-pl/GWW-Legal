import { TransactionATable } from "app/services/tpr/tpr-table.types";
import { reverseMapKorektaCenTransferowych, reverseMapZwolnienieArt11nA } from "./reverseHelpers/reverseCategoryAHelpers";
import { KC01, KC02, TransakcjaA, ZW01, ZW02 } from "app/services/tpr/typeA.types";
import { TransakcjaA1 } from "app/services/tpr/typeA1.types";
import { TransakcjaA2, UD01, UD02, UD03 } from "app/services/tpr/typeA2.types";

export function reverseTranslateCategoryA(transaction: TransakcjaA, id: number): TransactionATable {
    const baseTransakcjaA: Partial<TransactionATable> = {
        Id: id,
        transactionCategory: transaction.KategoriaA,
        subjectMatter: transaction.PrzedmiotA,
        transactionValue: transaction.WartoscA._text,
        currencyCode: transaction.WartoscA._attributes.kodWaluty,
    };

    const korektaCenTransferowych = reverseMapKorektaCenTransferowych(transaction as Partial<KC01 & KC02>);

    const zwolnienieArt11n = reverseMapZwolnienieArt11nA(transaction as Partial<ZW01 & ZW02>);

    const transakcja = {
        ...baseTransakcjaA,
        ...korektaCenTransferowych,
        compensation: transaction.Kompensata,
        ...zwolnienieArt11n
    };

    return transakcja as TransactionATable;
}

export function reverseTranslateCategoryA1(transaction: TransakcjaA1, id: number): TransactionATable {
    const baseTransakcjaA: Partial<TransactionATable> = {
        Id: id,
        transactionCategory: transaction.KategoriaA1,
        subjectMatter: transaction.PrzedmiotA,
        WynagrodzenieZaRestrukturyzacje: transaction.WynRestrukt,
        transactionValue: transaction.WartoscA._text,
        currencyCode: transaction.WartoscA._attributes.kodWaluty,
    };

    const korektaCenTransferowych = reverseMapKorektaCenTransferowych(transaction as Partial<KC01 & KC02>);

    const zwolnienieArt11n = reverseMapZwolnienieArt11nA(transaction as Partial<ZW01 & ZW02>);

    const transakcja = {
        ...baseTransakcjaA,
        ...korektaCenTransferowych,
        compensation: transaction.Kompensata,
        ...zwolnienieArt11n
    };

    return transakcja as TransactionATable;
}

export function reverseTranslateCategoryA2(transaction: Partial<TransakcjaA2 & UD01 & UD02 & UD03>, id: number): TransactionATable {
    const baseTransakcjaA: Partial<TransactionATable> = {
        Id: id,
        transactionCategory: transaction.KategoriaA2,
        subjectMatter: transaction.PrzedmiotA,
        RodzajUmowy: transaction.RodzajUm,
        transactionValue: transaction.WartoscA!._text,
        currencyCode: transaction.WartoscA!._attributes.kodWaluty,
        Wklad: transaction.Wklad!._text,
        KodWalutyWkladu: transaction.Wklad!._attributes.kodWaluty,
        WkladOgolny: transaction.WkladOgolny!._text,
        KodWalutyWkladuOgolnego: transaction.WkladOgolny!._attributes.kodWaluty,
    };

    const korektaCenTransferowych = reverseMapKorektaCenTransferowych(transaction as Partial<KC01 & KC02>);

    const zwolnienieArt11n = reverseMapZwolnienieArt11nA(transaction as Partial<ZW01 & ZW02>);

    let udMapping: Partial<TransactionATable> = {};

    if(transaction.Udzial1){
        udMapping = {
            Udzial: transaction.Udzial1,
            ProcentUdzialuWZyskach: transaction.ProcentUdzial1
        }
    } else if (transaction.Udzial2){
        udMapping = {
            Udzial: transaction.Udzial2,
            ProcentUdzialuWStracie: transaction.ProcentUdzial2
        }
    } else{
        udMapping = {
            Udzial: transaction.Udzial3,
            ProcentUdzialuWMajatkuLikwidacyjnym: transaction.ProcentUdzial3
        }
    }


    const transakcja = {
        ...baseTransakcjaA,
        ...udMapping,
        ...korektaCenTransferowych,
        compensation: transaction.Kompensata,
        ...zwolnienieArt11n
    };

    return transakcja as TransactionATable;
}