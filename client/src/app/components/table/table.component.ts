import { Component, Input, ViewChild } from '@angular/core';
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
})
export class TableComponent {
  @Input() public inputData: (TPR_input | null)[] = [null];
  @ViewChild('agGrid') agGrid!: AgGridAngular;

  colDefs: ColDef[] = companyColDefs;
  gridData: TPR_input[] | null = null;
  tooltipShowDelay = 500;



}
