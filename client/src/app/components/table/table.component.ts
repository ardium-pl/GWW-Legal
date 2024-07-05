import { Component, Input, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { TPR_input } from 'app/services/tpr/tpr-input.types';
import { DataExportService } from 'app/services/data-export.service';
import { companyColDefs } from './table.consts';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() public inputData: TPR_input[] | null = null;
  @ViewChild('agGrid') agGrid!: AgGridAngular;

  colDefs: ColDef[] = companyColDefs;
  gridData: TPR_input[] | null = null;
  tooltipShowDelay = 500;

  constructor(private dataExportService: DataExportService) {}

  getGridData() {
    let rowData: any = [];
    this.agGrid.api.forEachNode((node) => rowData.push(node.data));
    if (rowData.length > 0 && this.isTPRData(rowData[0])) {
      this.dataExportService.setTprData(rowData as TPR_input[]);
    }
  }

  isTPRData(data: TPR_input): data is TPR_input {
    if (
      (data as TPR_input).periodFrom !== undefined &&
      (data as TPR_input).periodFrom !== ''
    ) {
      const tprData = data as TPR_input;
      return !Object.values(tprData).some(
        (value) => value === null || value === undefined || value === '',
      );
    }
    return false;
  }
}
