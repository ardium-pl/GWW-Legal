import {
  Component,
  ViewEncapsulation,
  computed,
  input,
  model,
  output,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
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
    MatTooltipModule,
  ],
  templateUrl: './search-fab.component.html',
  styleUrl: './search-fab.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SearchFabComponent {
  readonly active = model.required<boolean>();

  readonly current = input.required<number | string | null>();
  readonly total = input.required<number | string | null>();
  readonly searchPhrase = model.required<string>();

  readonly isNoRuling = input<boolean>(false);
  readonly isRulingManual = input<boolean>(false);

  readonly inputTooltip = computed<string>(() => {
    if (this.isNoRuling())
      return 'Najpierw pobierz orzeczenie, aby zacząć wyszukiwać.';
    if (this.isRulingManual())
      return 'Nie można wyszukiwać w orzeczeniu dodanym ręcznie.';
    return '';
  });
  readonly isInputDisabled = computed<boolean>(
    () => this.inputTooltip() !== '',
  );

  open() {
    this.active.set(true);
    this.openEvent.emit();
  }
  close() {
    this.active.set(false);
    this.closeEvent.emit();
    this.searchPhrase.set('');
  }
  setSearch(evt: EventTarget | null): void {
    const v = (evt as HTMLInputElement | null)?.value ?? '';
    this.searchPhrase.set(v);
  }

  readonly clickNextEvent = output<void>({ alias: 'clickNext' });
  readonly clickPrevEvent = output<void>({ alias: 'clickPrev' });
  readonly openEvent = output<void>({ alias: 'open' });
  readonly closeEvent = output<void>({ alias: 'close' });
}
