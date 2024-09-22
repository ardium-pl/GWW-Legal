import { CommonModule } from '@angular/common';
import { Component, effect, HostListener, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { NsaService } from 'app/services';

@Component({
  selector: 'app-nsa-signatures',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './nsa-signatures.component.html',
  styleUrl: './nsa-signatures.component.scss',
})
export class NsaSignaturesComponent implements OnInit {
  readonly nsaService = inject(NsaService);
  readonly router = inject(Router);

  readonly infiniteScrollActive = signal<boolean>(true);
  private readonly _currentPage = signal<number>(1);

  readonly clickedSignatureButtonIndex = signal<number | null>(null);

  constructor() {
    effect(
      () => {
        this.nsaService.signatureBrowserData();
        this.infiniteScrollActive.set(true);
      },
      { allowSignalWrites: true }
    );
  }

  async onLoadDataClick(signature: string) {
    const res = await this.nsaService.fetchSignatureExtendedData(signature);

    this.router.navigate(['nsa'], {
      queryParams: {
        signature,
        isFromBrowser: true,
        systemMessage: res.systemMessage,
        userMessageIds: res.userMessageIds,
      },
    });
  }

  private _onInfiniteScrollTrigger(): void {
    if (this.nsaService.isSignatureBrowserPageAvailable()(this._currentPage())) return;

    this._currentPage.update(v => v + 1);

    this.nsaService.fetchSignatureBrowserData(this._currentPage());
  }

  @HostListener('document:scroll')
  onDocumentScroll() {
    console.log('document:scroll', this.infiniteScrollActive());
    if (!this.infiniteScrollActive()) return;

    if (document.documentElement.scrollTop + window.innerHeight + 200 > document.documentElement.scrollHeight) {
      this.infiniteScrollActive.set(false);
      this._onInfiniteScrollTrigger();
    }
  }

  ngOnInit(): void {
    this.nsaService.fetchSignatureBrowserData(1);
  }
}
