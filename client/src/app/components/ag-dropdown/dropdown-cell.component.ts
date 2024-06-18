import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-dropdown-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-cell.component.html',
  styleUrls: ['./dropdown-cell.component.css']
})
export class DropdownCellComponent implements ICellRendererAngularComp, OnInit {
  @Input() options: { label: string, code: string }[] = [];
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  private params: any;

  ngOnInit(): void {
    if (this.options.length > 0 && !this.options.find(option => option.code === this.value)) {
      this.value = this.options[0].code;
    }
  }

  agInit(params: any): void {
    this.params = params;
    this.options = params.options || [];
    this.value = params.value || '';
  }

  refresh(params: any): boolean {
    this.params = params;
    this.value = params.value;
    return true;
  }

  onSelectionChange(event: any): void {
    this.value = event.target.value;
    this.valueChange.emit(this.value);
    this.params.node.setDataValue(this.params.colDef.field, this.value);
  }
}
