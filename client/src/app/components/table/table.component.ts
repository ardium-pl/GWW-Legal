import {
  Component,
  OnDestroy,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { ClipboardService } from 'app/services/clipboard.service';
import { TPR_input } from 'app/services/tpr/tpr-input.types';
import { Subject, from, takeUntil, tap } from 'rxjs';
import { DropdownCellComponent } from '../dropdown-cell/dropdown-cell.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [AgGridAngular, FormsModule, ReactiveFormsModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnDestroy {
  private readonly clipboardService = inject(ClipboardService);
  private readonly destroy$$ = new Subject<void>();
  rowData: WritableSignal<TPR_input[]> = signal([]);

  constructor() {}

  public ngOnInit(): void {
    const observableFrom$ = from(this.clipboardService.readClipboard());
    observableFrom$
      .pipe(
        takeUntil(this.destroy$$),
        tap((clipboardData) => {
          if (clipboardData)
            this.rowData.update(() => [...JSON.parse(clipboardData)]);
        }),
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  colDefs: ColDef[] = [
    { field: 'periodFrom', headerName: 'Okres od' },
    { field: 'periodUntil', headerName: 'Okres do' },
    { field: 'taxID', headerName: 'Numer NIP' },
    { field: 'fullName', headerName: 'Nazwa' },
    { field: 'countryCode', headerName: 'Kod kraju' },
    {
      field: 'pkdCode',
      headerName: 'Kod PKD',
      cellRenderer: DropdownCellComponent,
      cellRendererParams: {
        list: ['17.40', '24.33', '19.03', '20.52'], // przykładowe dane wyświetlane w liście dropdowna
      },
    },
    { field: 'taxCategory', headerName: 'Kategoria podmiotu w ramach art. 11' },
    {
      field: 'operatingMargin',
      headerName: 'Marża operacyjna',
      valueFormatter: (p) => p.value + '%',
    },
    {
      field: 'profitMargin',
      headerName: 'Marża zysku',
      valueFormatter: (p) => p.value + '%',
    },
    {
      field: 'returnOnAssets',
      headerName: 'Zwrot z aktywów',
      valueFormatter: (p) => p.value + '%',
    },
    {
      field: 'returnOnEquity',
      headerName: 'Zwrot z kapitału',
      valueFormatter: (p) => p.value + '%',
    },
  ];
}
