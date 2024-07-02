import { Component, ViewEncapsulation, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [MatIconModule],
  template: `<mat-icon
    aria-hidden="false"
    aria-label="Example home icon"
    [fontIcon]="icon()"
  />`,
  encapsulation: ViewEncapsulation.None,
  styles: `app-icon {
    height: 24px;
    width: 24px;
    display: block;
  }`
})
export class IconComponent {
  readonly icon = input.required<string>();
}
