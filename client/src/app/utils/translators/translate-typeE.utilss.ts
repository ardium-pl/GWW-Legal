import { TransakcjaKategoriaE } from 'app/services/tpr/typeE.types';
import { Transaction } from 'app/services/tpr/tpr-input.types';
import { mapKorektaCenTransferowych, mapZwolnienieArt11n } from './categoryEHelpers';

export function translateCategoryE(transaction: any): TransakcjaKategoriaE {
    console.log("Transakcja" + transaction);
    let transakcja: any = {
        KategoriaE: transaction.transactionCategory as '1401' | '2401',
        PrzedmiotE: transaction.subjectMatter,
        WartoscE: {
            _attributes: {
                kodWaluty: transaction.currencyCode,
            },
            _text: transaction.transactionValue,
        },
        Kompensata: transaction.compensation,
        RodzajDN: 'DN01', 
    };

    console.log("Transakcja" + transakcja);
    Object.assign(transakcja, mapKorektaCenTransferowych(transaction));
    

    return transakcja;
}
