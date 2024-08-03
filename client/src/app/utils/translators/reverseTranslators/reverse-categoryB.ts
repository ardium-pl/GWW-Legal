import { TransactionBTable } from "app/services/tpr/tpr-table.types";
import { KC01, KC02, TransakcjaKategoriaB } from "app/services/tpr/typeB.types";

export function reverseTranslateCategoryB(transaction: TransakcjaKategoriaB & Partial<KC01 & KC02>, id: number): TransactionBTable {

    const tableData = {
        Id: id,
        transactionCategory: transaction.KategoriaB,
        subjectMatter: transaction.PrzedmiotB,
        transactionValue: transaction.WartoscB._text,
        currencyCode: transaction.WartoscB._attributes.kodWaluty,
        compensation: transaction.Kompensata,
        TransakcjaZwolniona: transaction.KodZW1,
        PodstawaZwolnienia: transaction.PodstZW || null,
        KodKraju: transaction.InformacjaOKrajuB1.Kraj,
        WartoscTransakcjiKraju: transaction.InformacjaOKrajuB1.WartoscBKraj1._text,
        KodWalutyKraju: transaction.InformacjaOKrajuB1.WartoscBKraj1._attributes.kodWaluty
    }

    if(transaction.KorektaCT4){
        return {
            ...tableData,
            correction: transaction.KorektaCT4,
            WartoscKorekty: transaction.WartKorektyCT4?._text,
            KodWalutyKorekty: transaction.WartKorektyCT4?._attributes.kodWaluty,
        };
    }
    else{
        return{
            ...tableData,
            correction: transaction.BrakKorektyCT4,
        }
    }
  
  }
  