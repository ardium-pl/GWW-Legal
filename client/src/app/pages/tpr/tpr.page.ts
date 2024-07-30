import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  inject,
  signal,
  viewChildren
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FileSystemService } from '@ardium-ui/devkit';
import { IconComponent } from 'app/components';
import { TableComponent } from 'app/components/table/table.component';
import { TransactionTableComponent } from 'app/components/transaction-table/transaction-table.component';
import { ClipboardService } from 'app/services/clipboard.service';
import { MixpanelService } from 'app/services/mixpanel.service';
import { ErrorSnackbarService } from 'app/services/snackbar.service';
import { TprCompanyDataService } from 'app/services/tpr/tpr-company-data.service';
import { TprDataService } from 'app/services/tpr/tpr-data.service';
import { translateToTPR } from 'app/utils/tpr-translator.util';
import { Subject, catchError, from, takeUntil } from 'rxjs';
import * as xmljs from 'xml-js';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'tpr-nsa',
  standalone: true,
  imports: [
    TableComponent,
    TransactionTableComponent,
    MatCardModule,
    MatTabsModule,
    ButtonComponent,
    IconComponent,
    MatTooltipModule,
  ],
  providers: [ClipboardService, TprDataService, ErrorSnackbarService, FileSystemService],
  templateUrl: './tpr.page.html',
  styleUrl: './tpr.page.scss',
  encapsulation: ViewEncapsulation.None,
})
export class TprPage implements OnInit, OnDestroy {
  private readonly children = viewChildren(TransactionTableComponent);

  private readonly errorSnackbarService = inject(ErrorSnackbarService);
  private readonly clipboardService = inject(ClipboardService);
  private readonly mixpanelService = inject(MixpanelService);
  private readonly fileSystemService = inject(FileSystemService);

  public readonly tprDataService = inject(TprDataService);
  public readonly tprCompanyDataService = inject(TprCompanyDataService);

  public readonly selectedTab = signal<number>(0);

  private _readClipboard(): void {
    const sub = from(this.clipboardService.readClipboard())
      .pipe(
        takeUntil(this.destroy$),
        catchError((err, caught) => {
          this.tprCompanyDataService.setError(err);
          sub.unsubscribe();
          return caught;
        })
      )
      .subscribe((clipboardData: object) => {
        this.tprCompanyDataService.setData(clipboardData);
        const firstNonDisabledIndex = this.tprCompanyDataService.transactionCategoriesArray()?.findIndex(v => v[1].length) ?? 0;
        this.selectedTab.set(firstNonDisabledIndex);
      });
  }
  public ngOnInit(): void {
    this._readClipboard();
  }
  @HostListener('window:focus')
  @HostListener('click')
  public onWindowFocus(): void {
    if (this.tprCompanyDataService.hasData()) return;
    this._readClipboard();
  }

  private readonly destroy$ = new Subject<void>();
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getLabel(category: string): string {
    return `Kategoria ${category.slice(-1)}`;
  }

  collectData() {
    this.tprDataService.reset();
    this.children().forEach(child => child.sendData());
    const companyData = this.tprCompanyDataService.data();
    if (companyData) {
      companyData.transactions = this.tprDataService.allTransactionTable();
    }

    this.tprDataService.isError()
      ? this.errorSnackbarService.open('Przed wygenerowaniem pliku należy uzupełnić wszystkie wymagane komórki tablicy')
      : this.generateXML(companyData);
  }

  generateXML(companyData: any) {
    this.mixpanelService.track('XML');
    const tpr = translateToTPR(companyData);
    const xmlVar = xmljs.js2xml(tpr, { compact: true, spaces: 2 });
    const blob = new Blob([xmlVar], { type: 'application/xml' });

    this.fileSystemService.saveAs(blob, {
      fileName: 'TPR-C(5)_v_35.xml',
      types: [{ description: 'Plik XML', accept: { 'application/xml': ['.xml'] } }],
    });
  }
}
