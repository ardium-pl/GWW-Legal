import { Component } from '@angular/core';

@Component({
  selector: 'app-required-star',
  standalone: true,
  imports: [],
  template: `<span>*</span>`,
  styles: `span {
    font-size: 110%;
    margin-left: 3px;
    color: rgb(217, 48, 37);
    position: relative;
    bottom: 3px;
  }`,
})
export class RequiredStarComponent {}
