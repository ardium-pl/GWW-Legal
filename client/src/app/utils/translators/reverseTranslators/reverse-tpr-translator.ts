import { TPRCompanyData } from "app/services/tpr/tpr-input.types";
import { reverseTranslateCategoryA, reverseTranslateCategoryA1, reverseTranslateCategoryA2 } from "./reverse-categoryA";
import { reverseTranslateCategoryB } from "./reverse-categoryB";
import { reverseTranslateCategoryC } from "./reverse-categoryC";
import { reverseTranslateCategoryD } from "./reverse-categoryD";
import { reverseTranslateCategoryE } from "./reverse-categoryE";
import { reverseTranslateCategoryF } from "./reverse-categoryF";

export function reverseTranslator(xmlData: TPRCompanyData | null): TPRCompanyData | null {
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

export function translateTransactionsReverse(transactions: string[]) {
    if (!transactions) {
        console.error('transactions is undefined or null');
        return [];
    }

    if (!Array.isArray(transactions)) {
        transactions = [transactions];
    }

    //Transaction is any, because there can be every type of transaction category, but it's too complex
    return transactions.map((transaction: any, index: number) => {
        const keys = Object.keys(transaction);
        for (let key of keys) {
            if (key.startsWith("Kategoria")) {
                const category = key;

                switch (category) {
                    case "KategoriaA1":
                        return reverseTranslateCategoryA1(transaction, index);
                    case "KategoriaA2":
                        return reverseTranslateCategoryA2(transaction, index);
                    case "KategoriaB":
                        return reverseTranslateCategoryB(transaction, index);
                    case "KategoriaC":
                        return reverseTranslateCategoryC(transaction, index);
                    case "KategoriaD":
                        return reverseTranslateCategoryD(transaction, index);
                    case "KategoriaE":
                        return reverseTranslateCategoryE(transaction, index);
                    case "KategoriaF":
                        return reverseTranslateCategoryF(transaction, index);
                    default:
                        return reverseTranslateCategoryA(transaction, index);
                }
            }
        }
        return null;
    }).filter((transaction: any) => transaction !== null);
}
