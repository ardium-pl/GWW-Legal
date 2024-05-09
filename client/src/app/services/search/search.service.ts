import { Injectable, computed, signal } from '@angular/core';
import { SearchResult } from './search-result';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  readonly searchPhrase = signal<string>('');
  readonly searchText = signal<string>('');

  readonly highlightedText = computed(() =>
    this._highlightResults(
      this.searchText(),
      this.searchPhrase(),
      this.current(),
    ),
  );

  /** 1-indexed number of the currently highlighted phrase. */
  private readonly _current = signal<number | null>(null);
  public readonly current = computed(() => this._current());
  public readonly total = computed(() => {
    if (!this.searchPhrase()) return null;
    const newTotal = this.searchText().split(this.searchPhrase()).length - 1;
    return newTotal === -1 ? null : newTotal;
  });

  next() {
    this._current.update((v) => {
      const total = this.total();
      if (!total || !v || v === total) return 1;
      return v + 1;
    });
  }
  prev() {
    this._current.update((v) => {
      const total = this.total();
      if (!total || !v) return 1;
      if (v === 1) return total;
      return v - 1;
    });
  }

  private _highlightResults(
    text: string,
    searchPhrase: string | null,
    current: number | null,
  ): string {
    if (!searchPhrase) return text;

    const retArr = text
      .split(searchPhrase)
      .reduce<(string | SearchResult)[]>((result, el, index, array) => {
        result.push(el);

        if (index < array.length - 1) {
          result.push(new SearchResult(searchPhrase, current === index + 1));
        }
        return result;
      }, []);

    return retArr.join('');
  }
}
