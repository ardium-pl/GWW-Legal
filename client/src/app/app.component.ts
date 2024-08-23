import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ClipboardModule,
    ButtonComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {}
