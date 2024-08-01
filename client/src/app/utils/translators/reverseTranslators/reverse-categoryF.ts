import { TransactionFTable } from "app/services/tpr/tpr-table.types";
import { TransakcjaKategoriaF } from "app/services/tpr/typeF.types";

export function reverseTranslateCategoryF(transaction: TransakcjaKategoriaF): TransactionFTable {
    const correctionType = transaction.KorektaCT6;
    let WartoscKorekty = undefined;
    let KodWalutyKorekty = undefined;
  
    if (correctionType === 'KC01' && transaction.WartKorektyCT6) {
      WartoscKorekty = transaction.WartKorektyCT6._text;
      KodWalutyKorekty = transaction.WartKorektyCT6.$?.kodWaluty;
    }
  
    const WartoscF0 = transaction.WartoscF[0]?.$?.kodWaluty;
    const WartoscF1 = transaction.WartoscF[1];
  
    const InformacjaOKrajuF1 = transaction.InformacjaOKrajuF1;
    const WartoscFKraj1_0 = InformacjaOKrajuF1?.WartoscFKraj1?.$?.kodWaluty;
    const WartoscFKraj1_1 = InformacjaOKrajuF1?.WartoscFKraj1._;
  
    return {
      Id: 3,
      transactionCategory: transaction.KategoriaF,
      subjectMatter: transaction.PrzedmiotF,
      transactionValue: WartoscF1,
      currencyCode: WartoscF0,
      correction: correctionType,
      WartoscKorekty,
      KodWalutyKorekty,
      safeHarbour: transaction.Kompensata,
      compensation: transaction.Kompensata,
      TransakcjaZwolniona: transaction.KodZW1,
      PodstawaZwolnienia: transaction.PodstZW || null,
      KodKraju: transaction.InformacjaOKrajuF1.Kraj,
      WartoscTransakcjiKraju: WartoscFKraj1_1,
      KodWalutyKraju: WartoscFKraj1_0
    };
  }
  