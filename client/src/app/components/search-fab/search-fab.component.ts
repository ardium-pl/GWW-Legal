import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-search-fab',
  standalone: true,
  imports: [
    IconComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './search-fab.component.html',
  styleUrl: './search-fab.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SearchFabComponent {
  readonly active = signal<boolean>(true);

  readonly searchValue = signal<string>('');
}
