import { WritableSignal } from '@angular/core';
import { ColDef } from 'ag-grid-community/dist/types/core/entities/colDef';
import { transactionAColDefs } from 'app/components/transaction-table/column-definitions/type-A-column-definitions.consts';
import { transactionBColDefs } from 'app/components/transaction-table/column-definitions/type-B-column-definitions.consts';
import { transactionDColDefs } from 'app/components/transaction-table/column-definitions/type-D-column-definitions.consts';
import { transactionFColDefs } from 'app/components/transaction-table/column-definitions/type-F-column-definitions.consts';
import {
  TransactionATable,
  TransactionBTable,
  TransactionCTable,
  TransactionDTable,
  TransactionFTable,
} from 'app/services/tpr/tpr-table.types';

export const getColumnDefUtil = (
  transactionType: string,
  defaultKeys: WritableSignal<string[]>,
): ColDef[] => {
  const keysToCheckDefault: (keyof TransactionATable)[] = [
    'transactionCategory',
    'subjectMatter',
    'transactionValue',
    'currencyCode',
    'correction',
    'compensation',
    'Zwolnienie',
  ];

  const keysToCheckB: (keyof TransactionBTable)[] = [
    'transactionCategory',
    'subjectMatter',
    'transactionValue',
    'currencyCode',
    'correction',
    'compensation',
    'TransakcjaZwolniona',
    'KodKrajuZwolnienia',
    'KodWalutyKraju',
    'WartoscTransakcjiZwolnienia',
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
    'TransakcjaZwolniona',
    'PodstawaZwolnienia',
    'Kraj',
    'NazwaKontrahenta',
    'WartoscTransakcjiZKontrahentem',
    'KodWalutyTransakcjiZKontrahentem',
    'IdentyfikatorKontrahenta',
  ];
  const keysToCheckF: (keyof TransactionFTable)[] = [
    'transactionCategory',
    'subjectMatter',
    'transactionValue',
    'currencyCode',
    'correction',
    'compensation',
    'Zwolnienie',
    'TransakcjaZwolniona',
    'PodstawaZwolnienia',
    'KodKraju',
    'TransakcjaZwolniona',
    'PodstawaZwolnienia',
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
      return transactionBColDefs;
    case 'D':
      defaultKeys.set(keysToCheckD);
      return transactionDColDefs;
    case 'E':
      defaultKeys.set(keysToCheckDefault);
      return transactionBColDefs;
    case 'F':
      defaultKeys.set(keysToCheckF);
      return transactionFColDefs;
    default:
      defaultKeys.set(keysToCheckDefault);
      return transactionAColDefs;
  }
};
