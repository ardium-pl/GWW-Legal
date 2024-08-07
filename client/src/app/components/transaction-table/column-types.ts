import { ColTypeDef } from 'ag-grid-community';

export const columnTypes: {
  [key: string]: ColTypeDef;
} = {
  correctionType: {
    editable: ({ data }) => {
      return data.correction === 'KC01' || data.WartoscKorekty;
    },
    cellClass: ({ data }) => getCellClass(data.correction !== 'KC01'),
  },
  A2Type: {
    editable: ({ data }) => {
      return data.transactionCategory === '3101' || data.Wklad || data.WkladOgolny ;
    },
    cellClass: ({ data }) => getCellClass(data.transactionCategory !== '3101'),
  },
  exemptionType: {
    editable: ({ data }) => {
      return data.Zwolnienie === 'ZW01' || data.WartoscTransakcjiZwolnienia;
    },
    cellClass: ({ data }) => getCellClass(data.Zwolnienie === 'ZW02'),
  },
  exemptionSecondType: {
    editable: ({ data }) => {
      return data.Zwolnienie === 'ZW02' || data.RodzajTransakcji ;
    },
    cellClass: ({ data }) => getCellClass(data.Zwolnienie === 'ZW01'),
  },
  transactionType: {
    editable: ({ data }) => {
      return (data.RodzajTransakcji === 'TK01' && data.Zwolnienie === 'ZW02') || data.WartośćTransakcjiKraju;
    },
    cellClass: ({ data }) => getCellClass(data.RodzajTransakcji === 'TK02' || data.Zwolnienie === 'ZW01'),
  },
  analysisMethodType: {
    editable: ({ data }) => data.MetodyBadania === 'MW01' && data.Zwolnienie === 'ZW02',
    cellClass: ({ data }) => getCellClass(data.MetodyBadania !== 'MW01' || data.Zwolnienie === 'ZW01'),
  },
  SposobUjeciaCenyType: {
    editable: ({ data }) => {
      return (data.Zwolnienie === 'ZW02' && data.MetodyBadania === 'MW01' && data.SposobUjeciaCeny === 'CK01') || data.CenaMaksymalna || data.CenaMinimalna;
    },
    cellClass: ({ data }) =>
      getCellClass(data.Zwolnienie !== 'ZW02' || data.MetodyBadania !== 'MW01' || data.SposobUjeciaCeny === 'CK02'),
  },
  RodzajPrzedzialuType: {
    editable: ({ data }) => {
      return (data.Zwolnienie === 'ZW02' && data.MetodyBadania === 'MW01' && data.RodzajPrzedzialu !== 'RP04') || data.CenaPorownywalnaMin || data.CenaPorownywalnaMax;
    },
    cellClass: ({ data }) =>
      getCellClass(data.Zwolnienie !== 'ZW02' || data.MetodyBadania !== 'MW01' || data.RodzajPrzedzialu === 'RP04'),
  },
  CK2Type: {
    editable: ({ data }) => {
      return (data.Zwolnienie === 'ZW02' && data.MetodyBadania === 'MW01' && data.SposobUjeciaCeny === 'CK02') || data.ProcentMinimalny || data.ProcentMaksymalny || data.Miara2;
    },
    cellClass: ({ data }) =>
      getCellClass(
        data.Zwolnienie !== 'ZW02' ||
          data.MetodyBadania !== 'MW01' ||
          data.SposobUjeciaCeny !== 'CK02' ||
          data.RodzajPrzedzialu === 'RP04'),
  },
  MW235Type: {
    editable: ({ data }) => {
      return (
        ((data.MetodyBadania === 'MW02' || data.MetodyBadania === 'MW03' || data.MetodyBadania === 'MW05') &&
        data.Zwolnienie === 'ZW02') || data.WynikTransakcji
      );
    },
    cellClass: ({ data }) =>
      getCellClass(
        data.Zwolnienie !== 'ZW02' ||
          data.MetodyBadania === 'MW00' ||
          data.MetodyBadania === 'MW01' ||
          data.MetodyBadania === 'MW04' ||
          data.MetodyBadania === 'MW06'),
  },
  PR02Type: {
    editable: ({ data }) => {
      return (
        (data.MetodyBadania === 'MW02' || data.MetodyBadania === 'MW03' || data.MetodyBadania === 'MW05') &&
        data.Zwolnienie === 'ZW02' &&
        data.RodzajPorownania === 'PR02'
      );
    },
    cellClass: ({ data }) =>
      getCellClass(
        data.Zwolnienie !== 'ZW02' ||
          data.RodzajPorownania !== 'PR02' ||
          data.MetodyBadania === 'MW00' ||
          data.MetodyBadania === 'MW01' ||
          data.MetodyBadania === 'MW04' ||
          data.MetodyBadania === 'MW06'
      ),
  },
  GranicePrzedzialuType: {
    editable: ({ data }) => {
      return (
        ((data.MetodyBadania === 'MW02' || data.MetodyBadania === 'MW03' || data.MetodyBadania === 'MW05') &&
        data.Zwolnienie === 'ZW02' &&
        data.RodzajPrzedzialu !== 'RP04') || data.DolnaGranicaPrzedzialu || data.GornaGranicaPrzedzialu
      );
    },
    cellClass: ({ data }) =>
      getCellClass(
        data.Zwolnienie !== 'ZW02' ||
          data.RodzajPrzedzialu === 'RP04' ||
          data.MetodyBadania === 'MW00' ||
          data.MetodyBadania === 'MW01' ||
          data.MetodyBadania === 'MW04' ||
          data.MetodyBadania === 'MW06'
    ),
  },
  PrzedzialType: {
    editable: ({ data }) =>
      data.Zwolnienie === 'ZW02' &&
      (data.MetodyBadania === 'MW01' ||
        data.MetodyBadania === 'MW02' ||
        data.MetodyBadania === 'MW03' ||
        data.MetodyBadania === 'MW05'),
    cellClass: ({ data }) =>
      getCellClass(
        data.Zwolnienie !== 'ZW02' ||
          data.MetodyBadania === 'MW04' ||
          data.MetodyBadania === 'MW00' ||
          data.MetodyBadania === 'MW06'
      ),
  },
  MW04Type: {
    editable: ({ data }) => (data.MetodyBadania === 'MW04' && data.Zwolnienie === 'ZW02') || data.Strata || data.ZakladanyZysk ,
    cellClass: ({ data }) => getCellClass(data.MetodyBadania !== 'MW04' || data.Zwolnienie === 'ZW01'),
  },
  MW06Type: {
    editable: ({ data }) => data.MetodyBadania === 'MW06' && data.Zwolnienie === 'ZW02',
    cellClass: ({ data }) => getCellClass(data.MetodyBadania !== 'MW06' || data.Zwolnienie === 'ZW01'),
  },
  TechWycenyType: {
    editable: ({ data }) =>
      (data.MetodyBadania === 'MW06' && data.Zwolnienie === 'ZW02' && (data.TechWyceny === 'TW01' || data.TechWyceny === 'TW02')) || data.WspolczynnikDyskontowy,
    cellClass: ({ data }) =>
      getCellClass(
        data.MetodyBadania !== 'MW06' ||
          data.Zwolnienie === 'ZW01' ||
          data.TechWyceny === 'TW03' ||
          data.TechWyceny === 'TW04' ||
          data.TechWyceny === 'TW05' ||
          data.TechWyceny === 'TW06' ||
          data.TechWyceny === 'TW07'
    ),
  },
  InnyTerminType: {
    editable: ({ data }) =>
      data.MetodyBadania === 'MW06' &&
      data.Zwolnienie === 'ZW02' &&
      data.OkresPrognozy === 'TB07' &&
      (data.TechWyceny === 'TW01' || data.TechWyceny === 'TW02'),
    cellClass: ({ data }) =>
      getCellClass(
        data.MetodyBadania !== 'MW06' ||
          data.Zwolnienie === 'ZW01' ||
          data.TechWyceny === 'TW03' ||
          data.TechWyceny === 'TW04' ||
          data.TechWyceny === 'TW05' ||
          data.TechWyceny === 'TW06' ||
          data.TechWyceny === 'TW07' ||
          data.OkresPrognozy !== 'TB07'
      ),
  },
  NrIdType: {
    editable: ({ data }) => {
      return data.IdentyfikatorKontrahenta === 'NrId';
    },
    cellClass: ({ data }) => getCellClass(data.IdentyfikatorKontrahenta !== 'NrId'),
  },
  MetodyBadaniaType: {
    editable: ({ data }) => (data.MetodyBadania !== 'MW00' && data.Zwolnienie === 'ZW02') || data.DolnaGranicaPrzedzialu || data.GornaGranicaPrzedzialu || data.PoziomOplaty,
    cellClass: ({ data }) => getCellClass(data.Zwolnienie !== 'ZW02' || data.MetodyBadania === 'MW00'),
  },
  RodzajOprocentowania1Type: {
    editable: ({ data }) => (data.MetodyBadania !== 'MW00' && data.Zwolnienie === 'ZW02' && data.RodzajOprocentowania === 'OP01') || data.Marza,
    cellClass: ({ data }) =>
      getCellClass(data.Zwolnienie !== 'ZW02' || data.MetodyBadania === 'MW00' || data.RodzajOprocentowania !== 'OP01'),
  },
  RodzajOprocentowania3Type: {
    editable: ({ data }) => (data.MetodyBadania !== 'MW00' && data.Zwolnienie === 'ZW02' && data.RodzajOprocentowania === 'OP03') || data.PoziomOprocentowaniaMinimalny || data.PoziomOprocentowaniaMaksymalny,
    cellClass: ({ data }) =>
      getCellClass(data.Zwolnienie !== 'ZW02' || data.MetodyBadania === 'MW00' || data.RodzajOprocentowania !== 'OP03'),
  },
  RestrukturyzacjaType: {
    editable: ({ data }) =>
      ['3001', '3002', '3003', '3004', '3005', '3006', '3007', '3008', '3009', '3010', '3011', '3012', '3013'].includes(
        data.transactionCategory
      ),
    cellClass: ({ data }) =>
      getCellClass(
        !['3001', '3002', '3003', '3004', '3005', '3006', '3007', '3008', '3009', '3010', '3011', '3012', '3013'].includes(
          data.transactionCategory
        )
      ),
  },
};

export function getCellClass(isDisabled: boolean) {
  return isDisabled? 'cell-disabled' : 'cell-enabled';
}

