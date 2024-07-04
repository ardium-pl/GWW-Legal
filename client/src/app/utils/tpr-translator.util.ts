import { AllTransactionTables, TPR_input, Transaction } from 'app/services/tpr/tpr-input.types';
import { TPR, PozycjeSzczegolowe } from 'app/services/tpr/tpr-output.types';
// import { TransakcjaKategoriaA } from 'app/services/tpr/typeA.types';
import { TransakcjaKategoriaA1 } from 'app/services/tpr/typeA1.types';
import { TransakcjaKategoriaA2 } from 'app/services/tpr/typeA2.types';
import { TransakcjaKategoriaB } from 'app/services/tpr/typeB.types';
import { TransakcjaKategoriaC } from 'app/services/tpr/typeC.types';
import { TransakcjaKategoriaE } from 'app/services/tpr/typeE.types';
import { TransakcjaKategoriaF } from 'app/services/tpr/typeF.types';
import { translateCategoryE } from './translators/translate-typeE.utilss';
import { translateCategoryC } from './translators/translate-typeC';
import { TransakcjaKategoriaD } from 'app/services/tpr/typeD.types';

export function translateToTPR(tprInput: TPR_input): TPR {
    // Translate transactions
    const translatedTransactions = translateTransactions(tprInput.transactions) as AllTransactionTables[];

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
      | TransakcjaKategoriaC
      |TransakcjaKategoriaD
    | TransakcjaKategoriaE
    | TransakcjaKategoriaF;

export function translateTransactions(transactions: AllTransactionTables[]): Transakcja[] {
    if (!transactions) {
        return [];
    }

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
                        case '2101': {
                                const commonData = {
                                    KategoriaB: transaction.transactionCategory as '1101' | '2101',
                                    PrzedmiotB: transaction.subjectMatter,
                                    WartoscB: {
                                        _attributes: {
                                            kodWaluty: transaction.currencyCode,
                                        },
                                        _text: transaction.transactionValue,
                                    },
                                    Kompensata: transaction.compensation,
                                    KodZW1: 'ZW01',
                                    PodstZW: '11n1',
                                    InformacjaOKrajuB1: {
                                        Kraj: 'PL',
                                        WartoscBKraj1: {
                                            _attributes: {
                                                kodWaluty: transaction.currencyCode,
                                            },
                                            _text: transaction.transactionValue,
                                        },
                                    },
                                };
            
                                if (transaction.correction === 'KC01') {
                                    return {
                                        ...commonData,
                                        KorektaCT4: 'KC01',
                                        WartKorektyCT4: {
                                            _attributes: {
                                                kodWaluty: transaction.currencyCode,
                                            },
                                            _text: transaction.transactionValue,
                                        },
                                    } as TransakcjaKategoriaB<'KC01'>;
                                } else {
                                    return {
                                        ...commonData,
                                        BrakKorektyCT4: 'KC02',
                                    } as TransakcjaKategoriaB<'KC02'>;
                                }
            
                                
                            }

                case '1201':
                case '1202': {
                    console.log(transaction.safeHarbour);
                    if (transaction.safeHarbour === 'TAK') {
                        return {
                            KategoriaD: transaction.transactionCategory,
                            PrzedmiotD: transaction.subjectMatter,
                            WartoscD: {
                                _attributes: {
                                    kodWaluty: transaction.currencyCode,
                                },
                                _text: transaction.transactionValue,
                            },
                            Kompensata: transaction.compensation,
                            KapitalD: {
                                _attributes: {
                                    kodWaluty: transaction.currencyCode,
                                },
                                _text: transaction.transactionValue,
                            },
                            ZadluzenieD: {
                                _attributes: {
                                    kodWaluty: transaction.currencyCode,
                                },
                                _text: transaction.transactionValue,
                            },
                            OdsetkiDm: {
                                _attributes: {
                                    kodWaluty: transaction.currencyCode,
                                },
                                _text: transaction.transactionValue,
                            },
                            OdsetkiDk: {
                                _attributes: {
                                    kodWaluty: transaction.currencyCode,
                                },
                                _text: transaction.transactionValue,
                            },
                            KodZW1: 'ZW01',
                            PodstZW: '11n1',
                            Kraj: 'PL',
                            NazwaKontr1: transaction.subjectMatter, // Adjust as needed
                            WartTransKontr1: {
                                _attributes: {
                                    kodWaluty: transaction.currencyCode,
                                },
                                _text: transaction.transactionValue,
                            },
                            ...(transaction.correction === 'KC01' ? {
                                KorektaCT5: 'KC01',
                                WartKorektyCT5: {
                                    _attributes: {
                                        kodWaluty: transaction.currencyCode,
                                    },
                                    _text: transaction.transactionValue,
                                },
                            } : {
                                BrakKorektyCT5: 'KC02',
                            }),
                            // ...(
                            //     transaction.Nrnip ? { NIPKontr1: transaction.NIPKontr1 } :
                            //         transaction.PESELKontr1 ? { PESELKontr1: transaction.PESELKontr1 } :
                            //             transaction.NrIdKontr1 ? {
                            //                 NrIdKontr1: transaction.NrIdKontr1,
                            //                 KodKrajuWydania1: transaction.KodKrajuWydania1
                            //             } : {}
                            // )
                        } as TransakcjaKategoriaD;
                    } 
                        return translateCategoryC(transaction);
                        }
                
                case '1203':
                case '1204':
                case '2201':
                case '2202':
                case '2203':
                case '2204':
                    return translateCategoryC(transaction);
                        
                case '1401':
                case '2401':
                    return translateCategoryE(transaction);

                case '1501':
                case '2501': {
                            const commonData = {
                                KategoriaF: transaction.transactionCategory as '1501' | '2501',
                                PrzedmiotF: transaction.subjectMatter,
                                WartoscF: {
                                    _attributes: {
                                        kodWaluty: transaction.currencyCode,
                                    },
                                    _text: transaction.transactionValue,
                                },
                                Kompensata: transaction.compensation,
                                KodZW1: 'ZW01',
                                PodstZW: '11n1',
                                InformacjaOKrajuF1: {
                                    Kraj: 'PL',
                                    WartoscFKraj1: {
                                        _attributes: {
                                            kodWaluty: transaction.KodKrajuTransakcji,
                                        },
                                        _text: transaction.WartośćTransakcjiKraju,
                                    },
                                },
                            };
        
                            if (transaction.correction === 'KC01') {
                                return {
                                    ...commonData,
                                    KorektaCT6: 'KC01',
                                    WartKorektyCT6: {
                                        _attributes: {
                                            kodWaluty: transaction.KodWalutyKorekty,
                                        },
                                        _text: transaction.WartoscKorekty,
                                    },
                                } as TransakcjaKategoriaF<'KC01'>;
                            } else {
                                return {
                                    ...commonData,
                                    BrakKorektyCT6: 'KC02',
                                } as TransakcjaKategoriaF<'KC02'>;
                            }
        
                        }
                default:
                    return undefined;
            }

        })
        .filter((transaction): transaction is Transakcja => transaction !== undefined);

}

