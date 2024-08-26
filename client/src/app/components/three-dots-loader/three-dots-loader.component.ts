import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-three-dots-loader',
  standalone: true,
  imports: [],
  template: '<div></div><div></div><div></div>',
  styleUrl: './three-dots-loader.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ThreeDotsLoaderComponent {}
