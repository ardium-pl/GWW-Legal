import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ArdiumInfiniteScrollModule } from '@ardium-ui/devkit';
import { NsaService } from 'app/services';

@Component({
  selector: 'app-nsa-signatures',
  standalone: true,
  imports: [CommonModule, MatButtonModule, ArdiumInfiniteScrollModule],
  templateUrl: './nsa-signatures.component.html',
  styleUrl: './nsa-signatures.component.scss',
})
export class NsaSignaturesComponent implements OnInit {
  readonly nsaService = inject(NsaService);
  readonly router = inject(Router);

  readonly infiniteScrollActive = signal<boolean>(true);

  private readonly _currentPage = signal<number>(1);

  onLoadDataClick(signature: string): void {
    this.router.navigate(['nsa'], { queryParams: { signature, isFromBrowser: true } })
  }

  onInfiniteScrollTrigger(): void {
    this._currentPage.update(v => v + 1);

    this.nsaService.fetchSignatureBrowserData(this._currentPage());
  }

  ngOnInit(): void {
    this.nsaService.fetchSignatureBrowserData(1);
  }
}
