import { TPRCompanyData } from "app/services/tpr/tpr-input.types";
import { reverseTranslateCategoryF } from "./reverse-categoryF";
import { reverseTranslateCategoryE } from "./reverse-categoryE";

export function reverseTranslator(xmlData: any): TPRCompanyData | null {
    if (!xmlData) {
        console.error('xmlData is undefined');
        return null;
    }

    const translatedTransactions = translateTransactionsReverse(xmlData.transactions);

    const tableData: TPRCompanyData = {
        periodFrom: xmlData.periodFrom,
        periodUntil: xmlData.periodUntil,
        taxID: xmlData.taxID,
        fullName: xmlData.fullName,
        countryCode: xmlData.countryCode,
        pkdCode: xmlData.pkdCode,
        taxCategory: xmlData.taxCategory,
        operatingMargin: xmlData.operatingMargin,
        profitMargin: xmlData.profitMargin,
        returnOnAssets: xmlData.returnOnAssets,
        returnOnEquity: xmlData.returnOnEquity,
        transactions: translatedTransactions,
        irsCode: xmlData.irsCode,
        statement: xmlData.statement
    };

    return tableData;
}

export function translateTransactionsReverse(transactions: any): any[] {
    if (!transactions) {
        console.error('transactions is undefined or null');
        return [];
    }

    if (!Array.isArray(transactions)) {
        console.error('transactions is not an array:', transactions);
        return [];
    }

    return transactions.map((transaction: any, index: number) => {
        const keys = Object.keys(transaction);
        for (let key of keys) {
            if (key.startsWith("Kategoria")) {
                const category = key;

                switch (category) {
                    case "KategoriaA":
                        return category;
                        // return reverseTranslateCategoryA(transaction);
                    case "KategoriaB":
                        return category;
                        // return reverseTranslateCategoryB(transaction);
                    case "KategoriaC":
                        return category;
                        // return reverseTranslateCategoryC(transaction);
                    case "KategoriaD":
                        return category;
                        // return reverseTranslateCategoryD(transaction);
                    case "KategoriaE":
                        return reverseTranslateCategoryE(transaction, index);
                    case "KategoriaF":
                        return reverseTranslateCategoryF(transaction, index);
                    default:
                        return null;
                }
            }
            
        }
        
        return null;
    }).filter((transaction: any) => transaction !== null);
}
