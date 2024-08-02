import { TransactionDTable } from "app/services/tpr/tpr-table.types";
import { KC01, KC02, TransakcjaKategoriaD } from "app/services/tpr/typeD.types";

export function reverseTranslateCategoryD(transaction: TransakcjaKategoriaD & Partial<KC01&KC02>, id: number): TransactionDTable {

    const tableData: TransactionDTable = {
        Id: id,
        transactionCategory: transaction.KategoriaD,
        subjectMatter: transaction.PrzedmiotD,
        transactionValue: parseFloat(transaction.WartoscD._),
        currencyCode: transaction.WartoscD.$.kodWaluty,
        compensation: transaction.Kompensata,
        safeHarbour: 'TAK',
        Kapital: parseFloat(transaction.KapitalD._),
        KodWalutyKapitalu: transaction.KapitalD.$.kodWaluty,
        Zadluzenie: parseFloat(transaction.ZadluzenieD._),
        KodWalutyZadluzenia: transaction.ZadluzenieD.$.kodWaluty,
        WysokoscOdsetekMiesiecznych: parseFloat(transaction.OdsetkiDm._),
        KodWalutyOdsetekMiesiecznych: transaction.OdsetkiDm.$.kodWaluty,
        WysokoscOdsetekKwartalnych: parseFloat(transaction.OdsetkiDk._),
        KodWalutyOdsetekKwartalnych: transaction.OdsetkiDk.$.kodWaluty,
        TransakcjaZwolniona: transaction.KodZW1,
        PodstawaZwolnienia: transaction.PodstZW!,
        Kraj: transaction.Kraj,
        NazwaKontrahenta: transaction.NazwaKontr1,
        WartoscTransakcjiZKontrahentem: parseFloat(transaction.WartTransKontr1._),
        KodWalutyTransakcjiZKontrahentem: transaction.WartTransKontr1.$.kodWaluty,
        correction: transaction.KorektaCT5 ? transaction.KorektaCT5 : transaction.BrakKorektyCT5,
        IdentyfikatorKontrahenta: transaction.NIPKontr1 ? 'NIP' : transaction.PESELKontr1 ? 'PESEL' : 'NrId',
    }

    if (transaction.KorektaCT5) {
        tableData.WartoscKorekty = transaction.WartKorektyCT5?._ ? parseFloat(transaction.WartKorektyCT5?._) : undefined;
        tableData.KodWalutyKorekty = transaction.WartKorektyCT5?.$.kodWaluty;
    }

    if (transaction.NIPKontr1) {
        tableData.Nip = transaction.NIPKontr1;
    } else if (transaction.PESELKontr1) {
        tableData.Pesel = transaction.PESELKontr1;
    } else if (transaction.NrIdKontr1) {
        tableData.NrId = transaction.NrIdKontr1;
        tableData.KodKrajuWydania = transaction.KodKrajuWydania1;
    }

    return tableData as TransactionDTable;
}
