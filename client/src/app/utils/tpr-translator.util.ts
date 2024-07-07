import { translateCategoryE } from './translators/translate-typeE.utilss';
import { translateCategoryC } from './translators/translate-typeC';
import { TransactionATable, TransactionBTable, TransactionCTable, TransactionDTable, TransactionETable, TransactionFTable } from 'app/services/tpr/tpr-table.types';
import { translateCategoryA, translateCategoryA1, translateCategoryA2, } from './translators/translate-typeA.util';

export function translateToTPR(tprInput: any) {
    const translatedTransactions = translateTransactions(tprInput.transactions);

    const tpr = {
        Deklaracja: {
            _attributes: {
                xmlns: 'https://ardium.pl/home',//???????????????????????
            },
            Naglowek: {
                KodFormularza: {

                    _attributes: {
                        kodSystemowy: 'TPR-C (5)',
                        kodPodatku: 'CIT',
                        rodzajZobowiazania: 'Z',
                        wersjaSchemy: '1-1E',
                    },

                    _text: 'TPR-C',
                },
                WariantFormularza: 5,
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
                ...(
                    tprInput.taxCategory === 'ZK01'
                        ? { PodmiotNZ: tprInput.taxCategory }
                        : { PodmiotKZ: tprInput.taxCategory }
                ),
                InnyPodmiot: {
                    MarzaOper: tprInput.operatingMargin,
                    MarzaZysku: tprInput.profitMargin,
                    RentAkt: tprInput.returnOnAssets,
                    RentKW: tprInput.returnOnEquity,
                },
                Transakcja: translatedTransactions,
            },
            Oswiadczenie: 'OSW1'
        },
    };

    return tpr;
}
type AllTables = 
& TransactionATable 
& TransactionBTable 
& TransactionCTable
& TransactionDTable
& TransactionETable
& TransactionFTable


export function translateTransactions(transactions: any) {
    if (!transactions) {
        return [];
    }

    return transactions
        .map((transaction: AllTables) => {
            switch (transaction.transactionCategory) {
                        case '3001':
                        case '3002':
                        case '3003':
                        case '3004':
                        case '3005':
                        case '3006':
                        case '3007':
                        case '3008':
                        case '3009':
                        case '3010':
                        case '3011':
                        case '3012':
                        case '3013':
                          return translateCategoryA1(transaction);
                          
                        case '3101':
                          return translateCategoryA2(transaction);

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
                                    PodstZW: transaction.PodstawaZwolnienia,
                                    InformacjaOKrajuB1: {
                                        Kraj: 'PL',
                                        WartoscBKraj1: {
                                            _attributes: {
                                                kodWaluty: transaction.KodKrajuZwolnienia,
                                            },
                                            _text: transaction.WartoscTransakcjiZwolnienia,
                                        },
                                    },
                                };
            
                                if (transaction.correction === 'KC01') {
                                    return {
                                        ...commonData,
                                        KorektaCT4: 'KC01',
                                        WartKorektyCT4: {
                                            _attributes: {
                                                kodWaluty: transaction.KodWalutyKorekty,
                                            },
                                            _text: transaction.WartoscKorekty,
                                        },
                                    };
                                } else {
                                    return {
                                        ...commonData,
                                        BrakKorektyCT4: 'KC02',
                                    };
                                }
            
                                
                            }

                case '1201':
                case '1202': {
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
                                    kodWaluty: transaction.KodWalutyKapitalu,
                                },
                                _text: transaction.Kapital,
                            },
                            ZadluzenieD: {
                                _attributes: {
                                    kodWaluty: transaction.KodWalutyZadluzenia,
                                },
                                _text: transaction.Zadluzenie,
                            },
                            OdsetkiDm: {
                                _attributes: {
                                    kodWaluty: transaction.KodWalutyOdsetekMiesiecznych,
                                },
                                _text: transaction.WysokoscOdsetekMiesiecznych,
                            },
                            OdsetkiDk: {
                                _attributes: {
                                    kodWaluty: transaction.KodWalutyOdsetekKwartalnych,
                                },
                                _text: transaction.WysokoscOdsetekKwartalnych,
                            },
                            KodZW1: 'ZW01',
                            PodstZW: transaction.PodstawaZwolnienia,
                            Kraj: transaction.Kraj,
                            NazwaKontr1: transaction.NazwaKontrahenta,
                            WartTransKontr1: {
                                _attributes: {
                                    kodWaluty: transaction.KodWalutyTransakcjiZKontrahentem,
                                },
                                _text: transaction.WartoscTransakcjiZKontrahentem,
                            },
                            ...(transaction.correction === 'KC01' ? {
                                KorektaCT5: 'KC01',
                                WartKorektyCT5: {
                                    _attributes: {
                                        kodWaluty: transaction.KodWalutyKorekty,
                                    },
                                    _text: transaction.WartoscKorekty,
                                },
                            } : {
                                BrakKorektyCT5: 'KC02',
                            }),
                            ...(
                                transaction.Nip ? { NIPKontr1: transaction.Nip } :
                                    transaction.Pesel ? { PESELKontr1: transaction.Pesel } :
                                        transaction.NrId ? {
                                            NrIdKontr1: transaction.NrId,
                                            KodKrajuWydania1: transaction.KodKrajuWydania
                                        } : {}
                            )
                        };
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
                                PodstZW: transaction.PodstawaZwolnienia,
                                InformacjaOKrajuF1: {
                                    Kraj: transaction.KodKraju,
                                    WartoscFKraj1: {
                                        _attributes: {
                                            kodWaluty: transaction.KodWalutyKraju,
                                        },
                                        _text: transaction.WartoscTransakcjiKraju,
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
                                };
                            } else {
                                return {
                                    ...commonData,
                                    BrakKorektyCT6: 'KC02',
                                };
                            }
        
                        }
                default:
                    return translateCategoryA(transaction);
            }

        })
        .filter((transaction: undefined)=> transaction !== undefined);

}

