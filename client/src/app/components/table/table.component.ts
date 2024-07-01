import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridSizeChangedEvent, CellValueChangedEvent } from 'ag-grid-community';
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
export class TableComponent{
  @Input() public colDefs: ColDef[] | null = null;
  @Input() public inputData: TPR_input[] | Transaction[] | null = null;
  @ViewChild('agGrid') agGrid!: AgGridAngular;

  gridData: TPR_input[] | Transaction[] | null = null;
  tooltipShowDelay = 500;

  constructor(private dataExportService: DataExportService) {}


  getGridData(){
    let rowData: any = [];
    this.agGrid.api.forEachNode(node => rowData.push(node.data));
    if (rowData.length > 0 && this.isTPRData(rowData[0])) {
      this.dataExportService.setTprData(rowData as TPR_input[]);
      console.log("Combined grid data: " + JSON.stringify(rowData));
    }

    return rowData;
  }

  isTPRData(data: TPR_input | Transaction): data is TPR_input {
    if ((data as TPR_input).periodFrom !== undefined && (data as TPR_input).periodFrom !== '') {
      const tprData = data as TPR_input;
      return !Object.values(tprData).some(value => value === null || value === undefined || value === '');
    }
    return false;
  }




  onGridSizeChanged(params: GridSizeChangedEvent) {
    var gridWidth = document.querySelector('.ag-body-viewport')!.clientWidth;
    var columnsToShow = [];
    var columnsToHide = [];
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

    params.api.setColumnsVisible(columnsToShow, true);
    params.api.setColumnsVisible(columnsToHide, false);

    window.setTimeout(() => {
      params.api.sizeColumnsToFit();
    }, 10);
    this.getGridData();
  }
}
