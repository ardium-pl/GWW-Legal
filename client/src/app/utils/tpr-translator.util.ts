import { TPR_input, Transaction } from 'app/services/tpr/tpr-input.types';
import { TPR, PozycjeSzczegolowe } from 'app/services/tpr/tpr-output.types';
import { TransakcjaKategoriaA } from 'app/services/tpr/typeA.types';
import { TransakcjaKategoriaB } from 'app/services/tpr/typeB.types';
import { TransakcjaKategoriaC } from 'app/services/tpr/typeC.types';
import { TransakcjaKategoriaE } from 'app/services/tpr/typeE.types';
import { TransakcjaKategoriaF } from 'app/services/tpr/typeF.types';

export function translateToTPR(tprInput: TPR_input): TPR {
    // Translate transactions
    const translatedTransactions = translateTransactions(tprInput.transactions);
  
    // Map TPR_input to TPR
    const tpr: TPR = {
      Deklaracja: {
        _attributes: {
          xmlns: 'http://example.com',
        },
        Naglowek: {
          KodFormularza: [
            {
              _attributes: {
                kodSystemowy: 'TPR-C (5)',
                kodPodatku: 'CIT',
                rodzajZobowiazania: 'Z',
                wersjaSchemy: '1-0E',
              },
            },
            'TPR-C',
          ],
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

export function translateTransactions(transactions: Transaction[]): Array<TransakcjaKategoriaA | TransakcjaKategoriaB | TransakcjaKategoriaC | TransakcjaKategoriaE | TransakcjaKategoriaF> {
    if (!transactions) {
        return [];
      }
    return transactions.map(transaction => {
    switch (transaction.transactionCategory) {
      case 'A':
        return {
          KategoriaA: transaction.transactionCategory,
          PrzedmiotA: transaction.subjectMatter,
          WartoscA: [
            {
              _attributes: {
                kodWaluty: transaction.currencyCode,
              },
            },
            transaction.transactionValue,
          ],
          SupportVarCorrection: transaction.correction as any, // Replace 'any' with the actual type if known
          Kompensata: transaction.compensation,
          SupportVarKodZW: 'ZW01', // Example value, adjust as needed
          SupportVarMetoda: 'MW00', // Example value, adjust as needed
        } as TransakcjaKategoriaA;

      case 'B':
        return {
          KategoriaB: transaction.transactionCategory,
          PrzedmiotB: transaction.subjectMatter,
          WartoscB: [
            {
              _attributes: {
                kodWaluty: transaction.currencyCode,
              },
            },
            transaction.transactionValue,
          ],
          SupportVarCorrection: transaction.correction as any, // Replace 'any' with the actual type if known
          Kompensata: transaction.compensation,
          KodZW1: 'ZW01', // Example value, adjust as needed
          PodstZW: '11n1', // Example value, adjust as needed
          InformacjaOKrajuB1: {
            Kraj: 'PL', // Example value, adjust as needed
            WartoscBKraj1: [
              {
                _attributes: {
                  kodWaluty: transaction.currencyCode,
                },
              },
              transaction.transactionValue,
            ],
          },
        } as TransakcjaKategoriaB;

      case 'C':
        return {
          KategoriaC: transaction.transactionCategory,
          PrzedmiotC: transaction.subjectMatter,
          WartoscC: [
            {
              _attributes: {
                kodWaluty: transaction.currencyCode,
              },
            },
            transaction.transactionValue,
          ],
          SupportVarCorrection: transaction.correction as any, // Replace 'any' with the actual type if known
          Kompensata: transaction.compensation,
          KapitalC: [
            {
              _attributes: {
                kodWaluty: transaction.currencyCode,
              },
            },
            transaction.transactionValue, // Example value, adjust as needed
          ],
          ZadluzenieC: [
            {
              _attributes: {
                kodWaluty: transaction.currencyCode,
              },
            },
            transaction.transactionValue, // Example value, adjust as needed
          ],
          OdsetkiCm: [
            {
              _attributes: {
                kodWaluty: transaction.currencyCode,
              },
            },
            transaction.transactionValue, // Example value, adjust as needed
          ],
          OdsetkiCk: [
            {
              _attributes: {
                kodWaluty: transaction.currencyCode,
              },
            },
            transaction.transactionValue, // Example value, adjust as needed
          ],
          SupportVarKodZW: 'ZW02', // Example value, adjust as needed
          SupportVarMetoda: 'MW02', // Example value, adjust as needed
        } as TransakcjaKategoriaC;

      case 'E':
        return {
          KategoriaE: transaction.transactionCategory,
          PrzedmiotE: transaction.subjectMatter,
          WartoscE: [
            {
              _attributes: {
                kodWaluty: transaction.currencyCode,
              },
            },
            transaction.transactionValue,
          ],
          SupportVarCorrection: transaction.correction as any, // Replace 'any' with the actual type if known
          Kompensata: transaction.compensation,
          RodzajDN: 'DN01', // Example value, adjust as needed
          SupportVarKodZW: 'ZW01', // Example value, adjust as needed
          SupportVarMetoda: 'MW00', // Example value, adjust as needed
        } as TransakcjaKategoriaE;

      case 'F':
        return {
          KategoriaF: transaction.transactionCategory,
          PrzedmiotF: transaction.subjectMatter,
          WartoscF: [
            {
              _attributes: {
                kodWaluty: transaction.currencyCode,
              },
            },
            transaction.transactionValue,
          ],
          SupportVarCorrection: transaction.correction as any, // Replace 'any' with the actual type if known
          Kompensata: transaction.compensation,
          KodZW1: 'ZW01', // Example value, adjust as needed
          PodstZW: '11n1', // Example value, adjust as needed
          InformacjaOKrajuF1: {
            Kraj: 'PL', // Example value, adjust as needed
            WartoscFKraj1: [
              {
                _attributes: {
                  kodWaluty: transaction.currencyCode,
                },
              },
              transaction.transactionValue,
            ],
          },
        } as TransakcjaKategoriaF;

      default:
        return undefined;
    }
  }).filter((transaction): transaction is TransakcjaKategoriaA | TransakcjaKategoriaB | TransakcjaKategoriaC | TransakcjaKategoriaE | TransakcjaKategoriaF => transaction !== undefined);
}
