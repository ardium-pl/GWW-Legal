import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, ClipboardModule],
  templateUrl: './app.component.html',
})
export class AppComponent {}
