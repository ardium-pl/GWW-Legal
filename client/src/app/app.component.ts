import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { } from '@angular/common/http';
import { Component } from '@angular/core';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ClipboardModule, ButtonComponent],
  providers: [{ provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: { showDelay: 600 } }],
  templateUrl: './app.component.html',
})
export class AppComponent {}
