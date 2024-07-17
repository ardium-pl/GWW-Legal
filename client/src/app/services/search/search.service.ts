import { Injectable, OnDestroy, computed, inject, signal } from '@angular/core';
import { SearchResult } from './search-result';
import { KeyboardShortcut, KeyboardShortcutService } from '@ardium-ui/devkit';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService implements OnDestroy {
  readonly searchActive = signal<boolean>(false);
  readonly searchPhrase = signal<string>('');
  readonly searchText = signal<string>('');

  readonly highlightedText = computed(() => this._highlightResults(this.searchText(), this.searchPhrase(), this.current()));

  /** 1-indexed number of the currently highlighted phrase. */
  readonly current = signal<number | null>(null);
  public readonly total = computed(() => {
    if (!this.searchPhrase()) return null;
    const newTotal = this.searchText().split(this.searchPhrase()).length - 1;
    return newTotal === -1 ? null : newTotal;
  });

  next() {
    this.current.update(v => {
      const total = this.total();
      if (!total || !v || v === total) return 1;
      return v + 1;
    });
  }
  prev() {
    this.current.update(v => {
      const total = this.total();
      if (!total || !v) return 1;
      if (v === 1) return total;
      return v - 1;
    });
  }

  private _highlightResults(text: string, searchPhrase: string | null, current: number | null): string {
    if (!searchPhrase) return text;

    const retArr = text.split(searchPhrase).reduce<(string | SearchResult)[]>((result, el, index, array) => {
      result.push(el);

      if (index < array.length - 1) {
        result.push(new SearchResult(searchPhrase, current === index + 1));
      }
      return result;
    }, []);

    return retArr.join('');
  }

  //! CTRL+F functionality
  private readonly keyboardShortcutService = inject(KeyboardShortcutService);

  private readonly _ctrlFSubscription = signal<Subscription | null>(null);
  private readonly _ctrlFObservable = signal<Observable<KeyboardShortcut> | null>(null);
  public readonly ctrlFObservable = computed(() => this._ctrlFObservable());

  constructor() {
    const obs = this.keyboardShortcutService.listenToShortcut(['Ctrl', 'F']);
    const sub = obs.subscribe(v => {
      v.event.preventDefault();
      const selection = window.getSelection();
      const text = selection?.toString().trim();
      if (!text) return;

      this.searchPhrase.set(text);
      this.searchActive.set(true);
    });
    this._ctrlFSubscription.set(sub);
    this._ctrlFObservable.set(obs);
  }

  ngOnDestroy(): void {
    this._ctrlFSubscription()?.unsubscribe();
  }
}
