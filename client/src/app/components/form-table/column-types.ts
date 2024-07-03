import {
  ColTypeDef,
  EditableCallbackParams,
  CellClassParams,
} from 'ag-grid-community';

export const columnTypes: {
  [key: string]: ColTypeDef;
} = {
  correctionType: {
    editable: (params: EditableCallbackParams<any>) => {
      return params.data.Korekta === 'KC01';
    },
    cellStyle: (params: CellClassParams<any>) =>
      getCellStyle(params.data.Korekta === 'KC02'),
  },
  exemptionType: {
    editable: (params: EditableCallbackParams<any>) => {
      return params.data.Zwolnienie === 'ZW01';
    },
    cellStyle: (params: CellClassParams<any>) =>
      getCellStyle(params.data.Zwolnienie === 'ZW02'),
  },
  exemptionSecondType: {
    editable: (params: EditableCallbackParams<any>) => {
      return params.data.Zwolnienie === 'ZW02';
    },
    cellStyle: (params: CellClassParams<any>) =>
      getCellStyle(params.data.Zwolnienie === 'ZW01'),
  },
  transactionType: {
    editable: (params: EditableCallbackParams<any>) => {
      return (
        params.data.RodzajTransakcji === 'TK01' &&
        params.data.Zwolnienie === 'ZW02'
      );
    },
    cellStyle: (params: CellClassParams<any>) =>
      getCellStyle(
        params.data.transactionType === 'TK02' ||
          params.data.Zwolnienie === 'ZW01',
      ),
  },
  analysisMethodType: {
    editable: ({ data }) =>
      data.MetodyBadania === 'MW01' && data.Zwolnienie === 'ZW02',
    cellStyle: ({ data }) =>
      getCellStyle(data.MetodyBadania !== 'MW01' || data.Zwolnienie === 'ZW01'),
  },
  analysisMethodCorrectionType: {
    editable: (params: EditableCallbackParams<any>) => {
      return (
        params.data.MetodyBadania === 'MW01' &&
        params.data.Zwolnienie === 'ZW02' &&
        params.data.KorektaMetodyBadania === 'KP02'
      );
    },
    cellStyle: (params: CellClassParams<any>) =>
      getCellStyle(
        params.data.KorektaMetodyBadania !== 'KP02' ||
          params.data.MetodyBadania !== 'MW01' ||
          params.data.Zwolnienie === 'ZW01',
      ),
  },
};

function getCellStyle(isDisabled: boolean) {
  if (isDisabled) {
    return { backgroundColor: 'var(--bg2-light)' };
  }
  return { backgroundColor: '#fff' };
}
