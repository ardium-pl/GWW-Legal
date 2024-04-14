import { Component, input } from '@angular/core';
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
})
export class IconComponent {
  readonly icon = input.required<string>();
}
