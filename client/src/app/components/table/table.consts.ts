import { ColDef } from 'ag-grid-community/dist/types/core/entities/colDef';
import { ITooltipParams } from 'ag-grid-community/dist/types/core/rendering/tooltipComponent';

export const companyColDefs: ColDef[] = [
  {
    field: 'fullName',
    headerName: 'Nazwa',
    headerTooltip: 'Nazwa',
    tooltipValueGetter: (p: ITooltipParams) => p.value,
    pinned: 'left',
  },
  {
    field: 'periodFrom',
    headerName: 'Okres od',
    headerTooltip: 'Okres od',
    editable: true,
  },
  {
    field: 'periodUntil',
    headerName: 'Okres do',
    headerTooltip: 'Okres do',
  },
  {
    field: 'taxID',
    headerName: 'Numer NIP',
    headerTooltip: 'Numer NIP',
  },
  {
    field: 'countryCode',
    headerName: 'Kod kraju',
    headerTooltip: 'Kod kraju',
  },
  {
    field: 'pkdCode',
    headerName: 'Kod PKD',
    headerTooltip: 'Kod PKD',
    cellEditor: 'agTextCellEditor',
    cellDataType: 'text',
  },
  {
    field: 'taxCategory',
    headerName: 'Kategoria podmiotu w ramach art. 11',
    headerTooltip: 'Kategoria podmiotu w ramach art. 11',
  },
  {
    field: 'operatingMargin',
    headerName: 'Marża operacyjna',
    headerTooltip: 'Marża operacyjna',
    valueFormatter: p => p.value + '%',
  },
  {
    field: 'profitMargin',
    headerName: 'Marża zysku',
    headerTooltip: 'Marża zysku',
    valueFormatter: p => p.value + '%',
  },
  {
    field: 'returnOnAssets',
    headerName: 'Zwrot z aktywów',
    headerTooltip: 'Zwrot z aktywów',
    valueFormatter: p => p.value + '%',
  },
  {
    field: 'returnOnEquity',
    headerName: 'Zwrot z kapitału',
    headerTooltip: 'Zwrot z kapitału',
    valueFormatter: p => p.value + '%',
  },
];
