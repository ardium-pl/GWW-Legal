import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridSizeChangedEvent } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { TPR_input, Transaction } from 'app/services/tpr/tpr-input.types';
import { DataExportService } from 'app/services/data-export.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges {
  @Input() public colDefs: ColDef[] | null = null;
  @Input() public inputData: TPR_input[] | Transaction[] | null = null;
  readonly gridData: TPR_input[] | Transaction[] | null = null;

  tooltipShowDelay = 500;

  constructor(private dataExportService: DataExportService) {}


  ngOnChanges(changes: SimpleChanges): void {
    console.log("Input data: " + JSON.stringify(this.inputData));
    if (changes['inputData'] && this.inputData) {
      if (this.inputData.length > 0 && this.isTPRData(this.inputData[0])) {
        this.dataExportService.setTPRData(this.inputData as TPR_input[]);
      }
    }
  }

  isTPRData(data: TPR_input | Transaction): data is TPR_input {
    if ((data as TPR_input).periodFrom !== undefined && (data as TPR_input).periodFrom !== '') {
      const tprData = data as TPR_input;
      return !Object.values(tprData).some(value => value === null || value === undefined || value === '');
    }
    return false;
  }

  onGridSizeChanged(params: GridSizeChangedEvent) {
    // get the current grids width
    var gridWidth = document.querySelector('.ag-body-viewport')!.clientWidth;

    // keep track of which columns to hide/show
    var columnsToShow = [];
    var columnsToHide = [];

    // iterate over all columns (visible or not) and work out
    // now many columns can fit (based on their minWidth)
    var totalColsWidth = 0;
    var allColumns = params.api.getColumns();

    if (allColumns && allColumns.length > 0) {
      for (var i = 0; i < allColumns.length; i++) {
        var column = allColumns[i];
        totalColsWidth += column.getMinWidth() || 0;
        if (totalColsWidth > gridWidth) {
          columnsToHide.push(column.getColId());
        } else {
          columnsToShow.push(column.getColId());
        }
      }
    }

    // show/hide columns based on current grid width
    params.api.setColumnsVisible(columnsToShow, true);
    params.api.setColumnsVisible(columnsToHide, false);

    // wait until columns stopped moving and fill out
    // any available space to ensure there are no gaps
    window.setTimeout(() => {
      params.api.sizeColumnsToFit();
    }, 10);
  }
}
