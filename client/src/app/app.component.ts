import { CommonModule } from '@angular/common';
import {} from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClipboardModule } from '@angular/cdk/clipboard';
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
