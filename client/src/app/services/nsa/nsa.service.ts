import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NsaService {

  private readonly http = inject(HttpClient);

  private readonly _isRulingLoading = signal(false);
  public readonly isRulingLoading = computed(() => this._isRulingLoading());

  public fetchCourtRuling(caseSignature: string) {
    this.http.post('/api/nsa/query', { caseSignature }).subscribe(res => {
      console.log(res);
    });
  }
}
