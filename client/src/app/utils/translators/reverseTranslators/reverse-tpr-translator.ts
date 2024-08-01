import { inject } from "@angular/core";
import { Declaration, TPRCompanyData } from "app/services/tpr/tpr-input.types";
import { TransakcjaKategoriaA } from "app/services/tpr/typeA.types";
import { TransakcjaKategoriaB } from "app/services/tpr/typeB.types";
import { TransakcjaKategoriaC } from "app/services/tpr/typeC.types";
import { TransakcjaKategoriaD } from "app/services/tpr/typeD.types";
import { TransakcjaKategoriaE } from "app/services/tpr/typeE.types";
import { TransakcjaKategoriaF } from "app/services/tpr/typeF.types";
import { AllTables } from "../tpr-translator.util";
import { reverseTranslateCategoryF } from "./reverse-categoryF";

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

    return transactions.map((transaction: any) => {
        const keys = Object.keys(transaction);
        for (let key of keys) {
            if (key.startsWith("Kategoria")) {
                const category = key;
                const number = transaction[key];
                console.log("Kategoria" + category);

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
                        return category;
                        // return reverseTranslateCategoryE(transaction);
                    case "KategoriaF":
                        return reverseTranslateCategoryF(transaction);
                    default:
                        return null;
                }
            }
        }
        return null;
    }).filter((transaction: any) => transaction !== null);
}
