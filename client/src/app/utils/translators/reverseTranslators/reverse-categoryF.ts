import { TransactionFTable } from "app/services/tpr/tpr-table.types";
import { TransakcjaKategoriaF } from "app/services/tpr/typeF.types";

export function reverseTranslateCategoryF(transaction: TransakcjaKategoriaF, id: number): TransactionFTable {

    const tableData = {
        Id: id,
        transactionCategory: transaction.KategoriaF,
        subjectMatter: transaction.PrzedmiotF,
        transactionValue: parseFloat(transaction.WartoscF._),
        currencyCode: transaction.WartoscF?.$?.kodWaluty,
        safeHarbour: transaction.Kompensata,
        compensation: transaction.Kompensata,
        TransakcjaZwolniona: transaction.KodZW1,
        PodstawaZwolnienia: transaction.PodstZW || null,
        KodKraju: transaction.InformacjaOKrajuF1.Kraj,
        WartoscTransakcjiKraju: parseFloat(transaction.InformacjaOKrajuF1.WartoscFKraj1._),
        KodWalutyKraju: transaction.InformacjaOKrajuF1.WartoscFKraj1.$.kodWaluty
    }

    if(transaction.KorektaCT6){
        return {
            ...tableData,
            correction: transaction.KorektaCT6,
            WartoscKorekty: transaction.WartKorektyCT6?._ ? parseFloat(transaction.WartKorektyCT6?._): undefined,
            KodWalutyKorekty: transaction.WartKorektyCT6?.$.kodWaluty,
        };
    }
    else{
        return{
            ...tableData,
            correction: transaction.BrakKorektyCT6,
        }
    }
  
  }
  