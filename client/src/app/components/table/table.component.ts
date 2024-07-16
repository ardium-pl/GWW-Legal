import { Component, input, ViewEncapsulation } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { TPR_input } from 'app/services/tpr/tpr-input.types';
import { companyColDefs } from './table.consts';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent {
  public readonly inputData = input.required<(TPR_input | null)[]>();

  readonly colDefs: ColDef[] = companyColDefs;
  readonly tooltipShowDelay = 500;
}
