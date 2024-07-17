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
  styles: `
    app-icon {
      font-size: 24px;
      height: 1em;
      width: 1em;
      display: block;
    }
    mat-icon {
      width: 1em !important;
      height: 1em !important;
      font-size: inherit !important;

      &::before {
        font-size: inherit !important;
      }
    }
  `,
})
export class IconComponent {
  readonly icon = input.required<string>();
}
