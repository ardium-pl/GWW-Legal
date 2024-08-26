import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

export interface DropdownCellParams extends ICellRendererParams {
  list: string[] | null;
}
@Component({
  selector: 'app-dropdown-cell',
  standalone: true,
  imports: [MatCheckboxModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatInputModule],
  templateUrl: './dropdown-cell.component.html',
})
export class DropdownCellComponent implements ICellRendererAngularComp {
  callback: any;
  list: string[] | null = null;
  selectedValue: string | null = null;

  agInit(params: DropdownCellParams): void {
    this.selectedValue = params.value || null;
    this.list = params.list;
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }
}
