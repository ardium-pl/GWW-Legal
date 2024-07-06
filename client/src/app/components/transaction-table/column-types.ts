import { ColTypeDef } from 'ag-grid-community';

export const columnTypes: {
  [key: string]: ColTypeDef;
} = {
  correctionType: {
    editable: ({ data }) => {
      return data.correction === 'KC01';
    },
    cellStyle: ({ data }) => getCellStyle(data.correction !== 'KC01'),
  },
  A2Type: {
    editable: ({ data }) => {
      return data.transactionCategory === '3101';
    },
    cellStyle: ({ data }) => getCellStyle(data.transactionCategory !== '3101'),
  },
  exemptionType: {
    editable: ({ data }) => {
      return data.Zwolnienie === 'ZW01';
    },
    cellStyle: ({ data }) => getCellStyle(data.Zwolnienie === 'ZW02'),
  },
  exemptionSecondType: {
    editable: ({ data }) => {
      return data.Zwolnienie === 'ZW02';
    },
    cellStyle: ({ data }) => getCellStyle(data.Zwolnienie === 'ZW01'),
  },
  transactionType: {
    editable: ({ data }) => {
      return data.RodzajTransakcji === 'TK01' && data.Zwolnienie === 'ZW02';
    },
    cellStyle: ({ data }) =>
      getCellStyle(
        data.RodzajTransakcji === 'TK02' || data.Zwolnienie === 'ZW01',
      ),
  },
  analysisMethodType: {
    editable: ({ data }) =>
      data.MetodyBadania === 'MW01' && data.Zwolnienie === 'ZW02',
    cellStyle: ({ data }) =>
      getCellStyle(data.MetodyBadania !== 'MW01' || data.Zwolnienie === 'ZW01'),
  },
  SposobUjeciaCenyType: {
    editable: ({ data }) => {
      return (
        data.Zwolnienie === 'ZW02' &&
        data.MetodyBadania === 'MW01' &&
        data.SposobUjeciaCeny === 'CK01'
      );
    },
    cellStyle: ({ data }) =>
      getCellStyle(
        data.Zwolnienie !== 'ZW02' ||
          data.MetodyBadania !== 'MW01' ||
          data.SposobUjeciaCeny === 'CK02',
      ),
  },
  RodzajPrzedzialuType: {
    editable: ({ data }) => {
      return (
        data.Zwolnienie === 'ZW02' &&
        data.MetodyBadania === 'MW01' &&
        data.RodzajPrzedzialu !== 'RP04'
      );
    },
    cellStyle: ({ data }) =>
      getCellStyle(
        data.Zwolnienie !== 'ZW02' ||
          data.MetodyBadania !== 'MW01' ||
          data.RodzajPrzedzialu === 'RP04',
      ),
  },
  CK2Type: {
    editable: ({ data }) => {
      return (
        data.Zwolnienie === 'ZW02' &&
        data.MetodyBadania === 'MW01' &&
        data.SposobUjeciaCeny === 'CK02'
      );
    },
    cellStyle: ({ data }) =>
      getCellStyle(
        data.Zwolnienie !== 'ZW02' ||
          data.MetodyBadania !== 'MW01' ||
          data.SposobUjeciaCeny !== 'CK02' ||
          data.RodzajPrzedzialu === 'RP04',
      ),
  },
  MW235Type: {
    editable: ({ data }) => {
      return (
        (data.MetodyBadania === 'MW02' ||
          data.MetodyBadania === 'MW03' ||
          data.MetodyBadania === 'MW05') &&
        data.Zwolnienie === 'ZW02'
      );
    },
    cellStyle: ({ data }) =>
      getCellStyle(
        data.Zwolnienie !== 'ZW02' ||
          data.MetodyBadania === 'MW00' ||
          data.MetodyBadania === 'MW01' ||
          data.MetodyBadania === 'MW04' ||
          data.MetodyBadania === 'MW06',
      ),
  },
  PR02Type: {
    editable: ({ data }) => {
      return (
        (data.MetodyBadania === 'MW02' ||
          data.MetodyBadania === 'MW03' ||
          data.MetodyBadania === 'MW05') &&
        data.Zwolnienie === 'ZW02' &&
        data.RodzajPorownania === 'PR02'
      );
    },
    cellStyle: ({ data }) =>
      getCellStyle(
        data.Zwolnienie !== 'ZW02' ||
          data.RodzajPorownania !== 'PR02' ||
          data.MetodyBadania === 'MW00' ||
          data.MetodyBadania === 'MW01' ||
          data.MetodyBadania === 'MW04' ||
          data.MetodyBadania === 'MW06',
      ),
  },
  GranicePrzedzialuType: {
    editable: ({ data }) => {
      return (
        (data.MetodyBadania === 'MW02' ||
          data.MetodyBadania === 'MW03' ||
          data.MetodyBadania === 'MW05') &&
        data.Zwolnienie === 'ZW02' &&
        data.RodzajPrzedzialu !== 'RP04'
      );
    },
    cellStyle: ({ data }) =>
      getCellStyle(
        data.Zwolnienie !== 'ZW02' ||
          data.RodzajPrzedzialu === 'RP04' ||
          data.MetodyBadania === 'MW00' ||
          data.MetodyBadania === 'MW01' ||
          data.MetodyBadania === 'MW04' ||
          data.MetodyBadania === 'MW06',
      ),
  },
  PrzedzialType: {
    editable: ({ data }) =>
      data.Zwolnienie === 'ZW02' &&
      (data.MetodyBadania === 'MW01' ||
        data.MetodyBadania === 'MW02' ||
        data.MetodyBadania === 'MW03' ||
        data.MetodyBadania === 'MW05'),
    cellStyle: ({ data }) =>
      getCellStyle(
        data.Zwolnienie !== 'ZW02' ||
          data.MetodyBadania === 'MW04' ||
          data.MetodyBadania === 'MW00' ||
          data.MetodyBadania === 'MW06',
      ),
  },
  MW04Type: {
    editable: ({ data }) =>
      data.MetodyBadania === 'MW04' && data.Zwolnienie === 'ZW02',
    cellStyle: ({ data }) =>
      getCellStyle(data.MetodyBadania !== 'MW04' || data.Zwolnienie === 'ZW01'),
  },
  MW06Type: {
    editable: ({ data }) =>
      data.MetodyBadania === 'MW06' && data.Zwolnienie === 'ZW02',
    cellStyle: ({ data }) =>
      getCellStyle(data.MetodyBadania !== 'MW06' || data.Zwolnienie === 'ZW01'),
  },
  TechWycenyType: {
    editable: ({ data }) =>
      data.MetodyBadania === 'MW06' &&
      data.Zwolnienie === 'ZW02' &&
      (data.TechWyceny === 'TW01' || data.TechWyceny === 'TW02'),
    cellStyle: ({ data }) =>
      getCellStyle(
        data.MetodyBadania !== 'MW06' ||
          data.Zwolnienie === 'ZW01' ||
          data.TechWyceny === 'TW03' ||
          data.TechWyceny === 'TW04' ||
          data.TechWyceny === 'TW05' ||
          data.TechWyceny === 'TW06' ||
          data.TechWyceny === 'TW07',
      ),
  },
  InnyTerminType: {
    editable: ({ data }) =>
      data.MetodyBadania === 'MW06' &&
      data.Zwolnienie === 'ZW02' &&
      data.OkresPrognozy === 'TB07' &&
      (data.TechWyceny === 'TW01' || data.TechWyceny === 'TW02'),
    cellStyle: ({ data }) =>
      getCellStyle(
        data.MetodyBadania !== 'MW06' ||
          data.Zwolnienie === 'ZW01' ||
          data.TechWyceny === 'TW03' ||
          data.TechWyceny === 'TW04' ||
          data.TechWyceny === 'TW05' ||
          data.TechWyceny === 'TW06' ||
          data.TechWyceny === 'TW07' ||
          data.OkresPrognozy !== 'TB07',
      ),
  },
  NrIdType: {
    editable: ({ data }) => {
      return data.IdentyfikatorKontrahenta === 'NrId';
    },
    cellStyle: ({ data }) =>
      getCellStyle(data.IdentyfikatorKontrahenta !== 'NrId'),
  },
  MetodyBadaniaType: {
    editable: ({ data }) =>
      data.MetodyBadania !== 'MW00' && data.Zwolnienie === 'ZW02',
    cellStyle: ({ data }) =>
      getCellStyle(data.Zwolnienie !== 'ZW02' || data.MetodyBadania === 'MW00'),
  },
  RodzajOprocentowania1Type: {
    editable: ({ data }) =>
      data.MetodyBadania !== 'MW00' &&
      data.Zwolnienie === 'ZW02' &&
      data.RodzajOprocentowania === 'OP01',
    cellStyle: ({ data }) =>
      getCellStyle(
        data.Zwolnienie !== 'ZW02' ||
          data.MetodyBadania === 'MW00' ||
          data.RodzajOprocentowania !== 'OP01',
      ),
  },
  RodzajOprocentowania3Type: {
    editable: ({ data }) =>
      data.MetodyBadania !== 'MW00' &&
      data.Zwolnienie === 'ZW02' &&
      data.RodzajOprocentowania === 'OP03',
    cellStyle: ({ data }) =>
      getCellStyle(
        data.Zwolnienie !== 'ZW02' ||
          data.MetodyBadania === 'MW00' ||
          data.RodzajOprocentowania !== 'OP03',
      ),
  },
  RestrukturyzacjaType: {
    editable: ({ data }) =>
      data.transactionCategory === '3001' ||
      data.transactionCategory === '3002' ||
      data.transactionCategory === '3003' ||
      data.transactionCategory === '3004' ||
      data.transactionCategory === '3005' ||
      data.transactionCategory === '3006' ||
      data.transactionCategory === '3007' ||
      data.transactionCategory === '3008' ||
      data.transactionCategory === '3009' ||
      data.transactionCategory === '3010' ||
      data.transactionCategory === '3011' ||
      data.transactionCategory === '3012' ||
      data.transactionCategory === '3013',
    cellStyle: ({ data }) =>
      data.transactionCategory === '3001' ||
      data.transactionCategory === '3002' ||
      data.transactionCategory === '3003' ||
      data.transactionCategory === '3004' ||
      data.transactionCategory === '3005' ||
      data.transactionCategory === '3006' ||
      data.transactionCategory === '3007' ||
      data.transactionCategory === '3008' ||
      data.transactionCategory === '3009' ||
      data.transactionCategory === '3010' ||
      data.transactionCategory === '3011' ||
      data.transactionCategory === '3012' ||
      data.transactionCategory === '3013'
        ? { backgroundColor: '#fff' }
        : { backgroundColor: 'var(--bg2-light)' },
  },
};

function getCellStyle(isDisabled: boolean) {
  return isDisabled
    ? { backgroundColor: 'var(--bg2-light)' }
    : { backgroundColor: '#fff' };
}
