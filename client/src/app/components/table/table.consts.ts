import { ColDef } from 'ag-grid-community/dist/types/core/entities/colDef';
import { DropdownCellComponent } from '../dropdown-cell/dropdown-cell.component';
import { ITooltipParams } from 'ag-grid-community/dist/types/core/rendering/tooltipComponent';

export const companyColDefs: ColDef[] = [
  {
    field: 'periodFrom',
    headerName: 'Okres od',
    headerTooltip: 'Okres od',
    editable: true
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
    field: 'fullName',
    headerName: 'Nazwa',
    headerTooltip: 'Nazwa',
    tooltipValueGetter: (p: ITooltipParams) => p.value,
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
    cellRenderer: DropdownCellComponent,
    cellRendererParams: {
      list: ['2551Z', '2651Z', '1651Z', '2641Z'], // przykładowe dane wyświetlane w liście dropdowna
    },
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
    valueFormatter: (p) => p.value + '%',
  },
  {
    field: 'profitMargin',
    headerName: 'Marża zysku',
    headerTooltip: 'Marża zysku',
    valueFormatter: (p) => p.value + '%',
  },
  {
    field: 'returnOnAssets',
    headerName: 'Zwrot z aktywów',
    headerTooltip: 'Zwrot z aktywów',
    valueFormatter: (p) => p.value + '%',
  },
  {
    field: 'returnOnEquity',
    headerName: 'Zwrot z kapitału',
    headerTooltip: 'Zwrot z kapitału',
    valueFormatter: (p) => p.value + '%',
  },
];

export const transactionColDefs: ColDef[] = [
  {
    field: 'transactionCategory',
    headerName: 'Kategoria',
    headerTooltip: 'Kategoria',
  },
  {
    field: 'subjectMatter',
    headerName: 'Przedmiot',
    tooltipValueGetter: (p: ITooltipParams) => p.value,
    headerTooltip: 'Przedmiot',
  },
  {
    field: 'transactionValue',
    headerName: 'Wartość transakcji',
    headerTooltip: 'Wartość transakcji',
  },
  {
    field: 'currencyCode',
    headerName: 'Kod waluty transakcji',
    headerTooltip: 'Kod waluty transakcji',
  },
  {
    field: 'correction',
    headerName: 'Korekta',
    headerTooltip: 'Korekta',
  },
  {
    field: 'compensation',
    headerName: 'Kompensata',
    headerTooltip: 'Kompensata',
  },
  {
    field: 'taxExemptionCode',
    headerName: 'Kod zwolnienia z podatku',
    headerTooltip: 'Kod zwolnienia z podatku',
  },
];
