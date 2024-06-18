import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { DropdownCellComponent } from '../ag-dropdown/dropdown-cell.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AgGridAngular, DropdownCellComponent],
  templateUrl: './example-ag-table.component.html',
  styleUrls: ['./example-ag-table.component.scss'],
})
export class AppComponent {
  title = 'ag-grid-no-server';

  rowData = [
    { make: 'Honda', model: 'Civic', price: 'cheap' },
    { make: 'Chevrolet', model: 'Bolt', price: 'cheap' },
    { make: 'BMW', model: 'i3', price: 'cheap' },
    { make: 'Nissan', model: 'Leaf', price: 'cheap' },
    { make: 'Hyundai', model: 'Elantra', price: 'cheap' },
  ];

  colDefs: ColDef[] = [
    { field: 'make', editable: true },
    { field: 'model', editable: true },
    {
      headerName: 'Price',
      field: 'price',
      cellRenderer: DropdownCellComponent,
      cellRendererParams: {
        options: [
          { label: 'Cheap', code: 'cheap' },
          { label: 'Moderate', code: 'moderate' },
          { label: 'Expensive', code: 'expensive' },
        ],
      },
    },
  ];
}