import { TransactionDTable } from "app/services/tpr/tpr-table.types";
import { KC01, KC02, TransakcjaKategoriaD } from "app/services/tpr/typeD.types";

export function reverseTranslateCategoryD(transaction: TransakcjaKategoriaD & Partial<KC01&KC02>, id: number): TransactionDTable {

    const tableData: TransactionDTable = {
        Id: id,
        transactionCategory: transaction.KategoriaD,
        subjectMatter: transaction.PrzedmiotD,
        transactionValue: transaction.WartoscD._text,
        currencyCode: transaction.WartoscD._attributes.kodWaluty,
        compensation: transaction.Kompensata,
        safeHarbour: 'TAK',
        Kapital: transaction.KapitalD._text,
        KodWalutyKapitalu: transaction.KapitalD._attributes.kodWaluty,
        Zadluzenie: transaction.ZadluzenieD._text,
        KodWalutyZadluzenia: transaction.ZadluzenieD._attributes.kodWaluty,
        WysokoscOdsetekMiesiecznych: transaction.OdsetkiDm._text,
        KodWalutyOdsetekMiesiecznych: transaction.OdsetkiDm._attributes.kodWaluty,
        WysokoscOdsetekKwartalnych: transaction.OdsetkiDk._text,
        KodWalutyOdsetekKwartalnych: transaction.OdsetkiDk._attributes.kodWaluty,
        TransakcjaZwolniona: transaction.KodZW1,
        PodstawaZwolnienia: transaction.PodstZW!,
        Kraj: transaction.Kraj,
        NazwaKontrahenta: transaction.NazwaKontr1,
        WartoscTransakcjiZKontrahentem: transaction.WartTransKontr1._text,
        KodWalutyTransakcjiZKontrahentem: transaction.WartTransKontr1._attributes.kodWaluty,
        correction: transaction.KorektaCT5 ? transaction.KorektaCT5 : transaction.BrakKorektyCT5,
        IdentyfikatorKontrahenta: transaction.NIPKontr1 ? 'NIP' : transaction.PESELKontr1 ? 'PESEL' : 'NrId',
    }

    if (transaction.KorektaCT5) {
        tableData.WartoscKorekty = transaction.WartKorektyCT5?._text;
        tableData.KodWalutyKorekty = transaction.WartKorektyCT5?._attributes.kodWaluty;
    }

    if (transaction.NIPKontr1) {
        tableData.Nip = transaction.NIPKontr1;
    } else if (transaction.PESELKontr1) {
        tableData.Pesel = transaction.PESELKontr1;
    } else if (transaction.NrIdKontr1) {
        tableData.NrId = transaction.NrIdKontr1;
        tableData.KodKrajuWydania = transaction.KodKrajuWydania1;
    }

    return tableData;
}
