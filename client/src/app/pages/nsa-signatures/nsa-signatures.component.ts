import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { ArdiumInfiniteScrollModule } from '@ardium-ui/devkit';
import { NsaService } from 'app/services';

@Component({
  selector: 'app-nsa-signatures',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ArdiumInfiniteScrollModule, MatProgressSpinnerModule],
  templateUrl: './nsa-signatures.component.html',
  styleUrl: './nsa-signatures.component.scss',
})
export class NsaSignaturesComponent implements OnInit {
  readonly nsaService = inject(NsaService);
  readonly router = inject(Router);

  readonly infiniteScrollActive = signal<boolean>(true);

  private readonly _currentPage = signal<number>(1);

  readonly clickedSignatureButtonIndex = signal<number | null>(null);

  async onLoadDataClick(signature: string, index: number) {
    this.clickedSignatureButtonIndex.set(index);
    const res = await this.nsaService.fetchSignatureExtendedData(signature);

    this.router.navigate(['nsa'], {
      queryParams: {
        signature,
        isFromBrowser: true,
        systemMessage: res.systemMessage,
        messages: res.mainMessages.concat(res.independentMessages),
      },
    });
  }

  onInfiniteScrollTrigger(): void {
    this._currentPage.update(v => v + 1);

    this.nsaService.fetchSignatureBrowserData(this._currentPage());
  }

  ngOnInit(): void {
    this.nsaService.fetchSignatureBrowserData(1);
  }
}
