import { WritableSignal } from '@angular/core';
import { ColDef } from 'ag-grid-community/dist/types/core/entities/colDef';
import { transactionAColDefs } from 'app/components/transaction-table/column-definitions/type-A-column-definitions.consts';
import { transactionBColDefs } from 'app/components/transaction-table/column-definitions/type-B-column-definitions.consts';
import { transactionCColDefs } from 'app/components/transaction-table/column-definitions/type-C-column-definitions.consts';
import { transactionDColDefs } from 'app/components/transaction-table/column-definitions/type-D-column-definitions.consts';
import { transactionEColDefs } from 'app/components/transaction-table/column-definitions/type-E-column-definitions.consts';
import { transactionFColDefs } from 'app/components/transaction-table/column-definitions/type-F-column-definitions.consts';
import {
  TransactionATable,
  TransactionBTable,
  TransactionCTable,
  TransactionDTable,
  TransactionETable,
  TransactionFTable,
} from 'app/services/tpr/tpr-table.types';

export const keysToCheckDefault: (keyof TransactionATable)[] = [
  'transactionCategory',
  'subjectMatter',
  'transactionValue',
  'currencyCode',
  'correction',
  'compensation',
  'Zwolnienie',
];

export const getColumnDefUtil = (transactionType: string): ColDef[] => {
  switch (transactionType) {
    case 'A':
      return transactionAColDefs;
    case 'B':
      return transactionBColDefs;
    case 'C':
      return transactionCColDefs;
    case 'D':
      return transactionDColDefs;
    case 'E':
      return transactionEColDefs;
    case 'F':
      return transactionFColDefs;
    default:
      return transactionAColDefs;
  }
};

export const getKeysToCheck = (transactionType: string): string[] => {
  const keysToCheckB: (keyof TransactionBTable)[] = [
    'transactionCategory',
    'subjectMatter',
    'transactionValue',
    'currencyCode',
    'correction',
    'compensation',
    'KodKraju',
    'WartoscTransakcjiKraju',
    'KodWalutyKraju',
  ];

  const keysToCheckC: (keyof TransactionCTable)[] = [
    'transactionCategory',
    'subjectMatter',
    'transactionValue',
    'currencyCode',
    'correction',
    'compensation',
    'Kapital',
    'KodWalutyKapitalu',
    'Zadluzenie',
    'KodWalutyZadluzenia',
    'WysokoscOdsetekMemorialowo',
    'KodWalutyOdsetekMemorialowych',
    'WysokoscOdsetekKasowo',
    'KodWalutyOdsetekKasowych',
    'Zwolnienie',
  ];

  const keysToCheckD: (keyof TransactionDTable)[] = [
    'transactionCategory',
    'subjectMatter',
    'transactionValue',
    'currencyCode',
    'correction',
    'compensation',
    'KodWalutyKapitalu',
    'KodWalutyZadluzenia',
    'KodWalutyOdsetekMiesiecznych',
    'KodWalutyOdsetekKwartalnych',
    'PodstawaZwolnienia',
    'Kraj',
    'NazwaKontrahenta',
    'WartoscTransakcjiZKontrahentem',
    'KodWalutyTransakcjiZKontrahentem',
    'IdentyfikatorKontrahenta',
  ];

  const keysToCheckE: (keyof TransactionETable)[] = [
    'transactionCategory',
    'subjectMatter',
    'transactionValue',
    'currencyCode',
    'correction',
    'compensation',
    'RodzajWartosciNiematerialnych',
    'Zwolnienie',
  ];

  const keysToCheckF: (keyof TransactionFTable)[] = [
    'transactionCategory',
    'subjectMatter',
    'transactionValue',
    'currencyCode',
    'correction',
    'compensation',
    'PodstawaZwolnienia',
    'KodKraju',
    'WartoscTransakcjiKraju',
    'KodWalutyKraju',
  ];

  switch (transactionType) {
    case 'A':
      return keysToCheckDefault;
    case 'B':
      return keysToCheckB;
    case 'C':
      return keysToCheckC;
    case 'D':
      return keysToCheckD;
    case 'E':
      return keysToCheckE;
    case 'F':
      return keysToCheckF;
    default:
      return keysToCheckDefault;
  }
};
