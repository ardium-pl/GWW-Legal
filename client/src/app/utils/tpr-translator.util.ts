import { TPR_input, Transaction } from 'app/services/tpr/tpr-input.types';
import { TPR, PozycjeSzczegolowe } from 'app/services/tpr/tpr-output.types';
// import { TransakcjaKategoriaA } from 'app/services/tpr/typeA.types';
import { TransakcjaKategoriaA1 } from 'app/services/tpr/typeA1.types';
import { TransakcjaKategoriaA2 } from 'app/services/tpr/typeA2.types';
import { TransakcjaKategoriaB } from 'app/services/tpr/typeB.types';
import { TransakcjaKategoriaC } from 'app/services/tpr/typeC.types';
import { TransakcjaKategoriaE } from 'app/services/tpr/typeE.types';
import { TransakcjaKategoriaF } from 'app/services/tpr/typeF.types';
import { translateCategoryE } from './translators/translate-typeE.utilss';

export function translateToTPR(tprInput: TPR_input): TPR {
    // Translate transactions
    const translatedTransactions = translateTransactions(tprInput.transactions) as Transakcja[];

    // Map TPR_input to TPR
    const tpr: TPR = {
        Deklaracja: {
            _attributes: {
                xmlns: 'http://example.com',
            },
            Naglowek: {
                KodFormularza: {

                    _attributes: {
                        kodSystemowy: 'TPR-C (5)',
                        kodPodatku: 'CIT',
                        rodzajZobowiazania: 'Z',
                        wersjaSchemy: '1-0E',
                    },

                    _text: 'TPR-C',
                },
                WariantFormularza: 1,
                CelZlozenia: 1,
                OkresOd: tprInput.periodFrom,
                OkresDo: tprInput.periodUntil,
            },
            Podmiot1: {
                _attributes: {
                    rola: 'Podmiot, którego dotyczy informacja o cenach transferowych',
                },
                NIP: tprInput.taxID,
                PelnaNazwa: tprInput.fullName,
                KodKraju: tprInput.countryCode,
                KodPKD: tprInput.pkdCode,
            },
            PozycjeSzczegolowe: {
                PodmiotNZ: tprInput.taxCategory as PozycjeSzczegolowe,
                InnyPodmiot: {
                    MarzaOper: tprInput.operatingMargin,
                    MarzaZysku: tprInput.profitMargin,
                    RentAkt: tprInput.returnOnAssets,
                    RentKW: tprInput.returnOnEquity,
                },
                Transakcja: translatedTransactions,
            },
        },
    };

    return tpr;
}

type Transakcja =
    //   | TransakcjaKategoriaA
    //   | TransakcjaKategoriaA1
    //   | TransakcjaKategoriaA2
      | TransakcjaKategoriaB
    //   | TransakcjaKategoriaC
    | TransakcjaKategoriaE
    | TransakcjaKategoriaF;

export function translateTransactions(transactions: Transaction[]): Transakcja[] {
    if (!transactions) {
        return [];
    }
    const transactiona = {
        transactionCategory: '1401',
        subjectMatter: 'Example Subject',
        currencyCode: 'USD',
        transactionValue: 1000,
        compensation: 'KS01',
        rodzajDN: 'DN01',
        korektaCenTransferowych: 'KC01',
        korektaCenTransferowychCurrency: 'USD',
        korektaCenTransferowychValue: 500,
        zwolnienieArt11n: 'ZW01',
        podstawaZwolnienia: '11n1',
        kraj: 'Poland',
        zwolnienieArt11nCurrency: 'USD',
        zwolnienieArt11nValue: 400,
        metodaE: 'MW01',
        rodzajAnalizy: 'RA01',
        sposobWyrCeny: 'Example Method',
        kalkOplaty1: 'SK01',
        poziomOpl1: 10,
        wynikAPKO1D1: 5,
        wynikAPKO1G1: 15,
        korekta: 'KP01'
    };
    

    return transactions
        .map((transaction) => {
            switch (transaction.transactionCategory) {
                        // case '3001':
                        // case '3002':
                        // case '3003':
                        // case '3004':
                        // case '3005':
                        // case '3006':
                        // case '3007':
                        // case '3008':
                        // case '3009':
                        // case '3010':
                        // case '3011':
                        // case '3012':
                        // case '3013':
                        //   return {
                        //     KategoriaA: transaction.transactionCategory,
                        //     PrzedmiotA: transaction.subjectMatter,
                        //     WartoscA: [
                        //       {
                        //         _attributes: {
                        //           kodWaluty: transaction.currencyCode,
                        //         },
                        //       },
                        //       transaction.transactionValue,
                        //     ],
                        //     Kompensata: transaction.compensation,
                        //     SupportVarMetoda: 'MW00', // Example value, adjust as needed
                        //   } as TransakcjaKategoriaA;

                        // case '3101':
                        //   return {
                        //     KategoriaA2: '3101',
                        //     RodzajUm: 'RT01', // Example value, adjust as needed
                        //     PrzedmiotA2: transaction.subjectMatter,
                        //     WartoscA2: [
                        //       {
                        //         _attributes: {
                        //           kodWaluty: transaction.currencyCode,
                        //         },
                        //       },
                        //       transaction.transactionValue,
                        //     ],
                        //     Wklad: [
                        //       {
                        //         _attributes: {
                        //           kodWaluty: transaction.currencyCode,
                        //         },
                        //       },
                        //       transaction.transactionValue, // Example value, adjust as needed
                        //     ],
                        //     WkladOgolny: [
                        //       {
                        //         _attributes: {
                        //           kodWaluty: transaction.currencyCode,
                        //         },
                        //       },
                        //       transaction.transactionValue, // Example value, adjust as needed
                        //     ],
                        //     Kompensata: transaction.compensation,
                        //     SupportVarMetoda: 'MW00', // Example value, adjust as needed
                        //   } as TransakcjaKategoriaA2;

                        case '1101':
                        case '2101':
                          return {
                            KategoriaB: transaction.transactionCategory as '1101' | '2101',
                            PrzedmiotB: transaction.subjectMatter,
                            WartoscB: {
                              
                                _attributes: {
                                  kodWaluty: transaction.currencyCode,
                                },
                              
                              _text: transaction.transactionValue,
                            },
                            Kompensata: transaction.compensation,
                            KodZW1: 'ZW01', // Example value, adjust as needed
                            PodstZW: '11n1', // Example value, adjust as needed
                            InformacjaOKrajuB1: {
                              Kraj: 'PL', // Example value, adjust as needed
                              WartoscBKraj1: {
                                
                                  _attributes: {
                                    kodWaluty: transaction.currencyCode,
                                  },
                                
                                _text: transaction.transactionValue,
                                },
                            },
                          } as TransakcjaKategoriaB;

                        // case '1201':
                        // case '1202':
                        // case '1203':
                        // case '1204':
                        // case '2201':
                        // case '2202':
                        // case '2203':
                        // case '2204':
                            
                        //   return {
                        //     KategoriaC: transaction.transactionCategory,
                        //     PrzedmiotC: transaction.subjectMatter,
                        //     WartoscC: [
                        //       {
                        //         _attributes: {
                        //           kodWaluty: transaction.currencyCode,
                        //         },
                        //       },
                        //       transaction.transactionValue,
                        //     ],
                        //     Kompensata: transaction.compensation,
                        //     KapitalC: [
                        //       {
                        //         _attributes: {
                        //           kodWaluty: transaction.currencyCode,
                        //         },
                        //       },
                        //       transaction.transactionValue, // Example value, adjust as needed
                        //     ],
                        //     ZadluzenieC: [
                        //       {
                        //         _attributes: {
                        //           kodWaluty: transaction.currencyCode,
                        //         },
                        //       },
                        //       transaction.transactionValue, // Example value, adjust as needed
                        //     ],
                        //     OdsetkiCm: [
                        //       {
                        //         _attributes: {
                        //           kodWaluty: transaction.currencyCode,
                        //         },
                        //       },
                        //       transaction.transactionValue, // Example value, adjust as needed
                        //     ],
                        //     OdsetkiCk: [
                        //       {
                        //         _attributes: {
                        //           kodWaluty: transaction.currencyCode,
                        //         },
                        //       },
                        //       transaction.transactionValue, // Example value, adjust as needed
                        //     ],
                        //   } as TransakcjaKategoriaC;
                        
                case '1401':
                case '2401':
                    return translateCategoryE(transactiona);

                case '1501':
                case '2501':
                    return {
                        KategoriaF: transaction.transactionCategory as '1501' | '2501',
                        PrzedmiotF: transaction.subjectMatter,
                        WartoscF: {
                            _attributes: {
                                kodWaluty: transaction.currencyCode,
                            },
                            _text: transaction.transactionValue,
                        },
                        Kompensata: transaction.compensation,
                        KodZW1: 'ZW01', // Example value, adjust as needed
                        PodstZW: '11n1', // Example value, adjust as needed
                        InformacjaOKrajuF1: {
                            Kraj: 'PL', // Example value, adjust as needed
                            WartoscFKraj1: {
                                _attributes: {
                                    kodWaluty: transaction.currencyCode,
                                },
                                _text: transaction.transactionValue,
                            },
                        },
                    } as TransakcjaKategoriaF;

                default:
                    return undefined;
            }

        })
        .filter((transaction): transaction is Transakcja => transaction !== undefined);

}

