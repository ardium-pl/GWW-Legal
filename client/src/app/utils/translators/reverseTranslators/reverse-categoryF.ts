import { TransactionFTable } from "app/services/tpr/tpr-table.types";
import { KC01, KC02, TransakcjaKategoriaF } from "app/services/tpr/typeF.types";

export function reverseTranslateCategoryF(transaction: TransakcjaKategoriaF & Partial<KC01 & KC02>, id: number): TransactionFTable {

    const tableData = {
        Id: id,
        transactionCategory: transaction.KategoriaF,
        subjectMatter: transaction.PrzedmiotF,
        transactionValue: transaction.WartoscF._text,
        currencyCode: transaction.WartoscF._attributes.kodWaluty,
        compensation: transaction.Kompensata,
        TransakcjaZwolniona: transaction.KodZW1,
        PodstawaZwolnienia: transaction.PodstZW || null,
        KodKraju: transaction.InformacjaOKrajuF1.Kraj,
        WartoscTransakcjiKraju: transaction.InformacjaOKrajuF1.WartoscFKraj1._text,
        KodWalutyKraju: transaction.InformacjaOKrajuF1.WartoscFKraj1._attributes.kodWaluty
    }

    if(transaction.KorektaCT6){
        return {
            ...tableData,
            correction: transaction.KorektaCT6,
            WartoscKorekty: transaction.WartKorektyCT6?._text,
            KodWalutyKorekty: transaction.WartKorektyCT6?._attributes.kodWaluty,
        };
    }
    else{
        return{
            ...tableData,
            correction: transaction.BrakKorektyCT6,
        }
    }
  
  }
  