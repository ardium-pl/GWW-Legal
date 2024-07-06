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

export const getColumnDefUtil = (
  transactionType: string,
  defaultKeys: WritableSignal<string[]>,
): ColDef[] => {
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
      defaultKeys.set(keysToCheckDefault);
      return transactionAColDefs;
    case 'B':
      defaultKeys.set(keysToCheckB);
      return transactionBColDefs;
    case 'C':
      defaultKeys.set(keysToCheckC);
      return transactionCColDefs;
    case 'D':
      defaultKeys.set(keysToCheckD);
      return transactionDColDefs;
    case 'E':
      defaultKeys.set(keysToCheckE);
      return transactionEColDefs;
    case 'F':
      defaultKeys.set(keysToCheckF);
      return transactionFColDefs;
    default:
      defaultKeys.set(keysToCheckDefault);
      return transactionAColDefs;
  }
};
