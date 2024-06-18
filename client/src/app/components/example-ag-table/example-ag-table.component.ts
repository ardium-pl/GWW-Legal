import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


@Component({
  selector: 'app-my-table',
  standalone: true,
  templateUrl: './example-ag-table.component.html',
  styleUrls: ['./example-ag-table.component.scss'],
  imports: [AgGridAngular]
})
export class MyTableComponent {
  columnDefs: ColDef[] = [
    { headerName: 'Make', field: 'make' , editable: true},
    { headerName: 'Model', field: 'model' , editable: true },
    { headerName: 'Price', field: 'price' , editable: true}
  ];

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 }
  ];
}
