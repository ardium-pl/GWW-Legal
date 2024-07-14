import {
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  inject,
  signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TableComponent } from 'app/components/table/table.component';
import { ClipboardService } from 'app/services/clipboard.service';
import { MatTabsModule } from '@angular/material/tabs';
import {
  TPR_input,
  TransactionCategories,
} from 'app/services/tpr/tpr-input.types';
import { Subject, from, takeUntil, tap } from 'rxjs';
import { GetTransactionDataUtil } from 'app/utils/get-transaction-data.util';
import { TransactionTableComponent } from 'app/components/transaction-table/transaction-table.component';
import { TprDataService } from 'app/services/tpr/tpr-data.service';
import { translateToTPR } from 'app/utils/tpr-translator.util';
import * as xmljs from 'xml-js';
import { saveAs } from 'file-saver';
import { ErrorSnackbarService } from 'app/services/snackbar.service';
import { ButtonComponent } from '../../components/button/button.component';
import { MixpanelService } from 'app/services/mixpanel.service';

@Component({
  selector: 'tpr-nsa',
  standalone: true,
  imports: [
    TableComponent,
    TransactionTableComponent,
    MatCardModule,
    MatTabsModule,
    ButtonComponent,
  ],
  providers: [ClipboardService, TprDataService, ErrorSnackbarService],
  templateUrl: './tpr.page.html',
  styleUrl: './tpr.page.scss',
})
export class TprPage implements OnInit, OnDestroy {
  @ViewChildren(TransactionTableComponent)
  children: QueryList<TransactionTableComponent> | undefined;
  private readonly tprDataService = inject(TprDataService);
  private readonly errorSnackbarService = inject(ErrorSnackbarService);
  private readonly clipboardService = inject(ClipboardService);
  private readonly mixpanelService = inject(MixpanelService);
  private readonly destroy$$ = new Subject<void>();
  readonly companyData = signal<TPR_input | null>(null);
  constructor() {}

  readonly transactionData = signal<TransactionCategories>({
    categoryA: [],
    categoryB: [],
    categoryC: [],
    categoryD: [],
    categoryE: [],
    categoryF: [],
  });
  readonly itterableTransactionData = signal<any>(null);

  public ngOnInit(): void {
    const observableFrom$ = from(this.clipboardService.readClipboard());
    observableFrom$
      .pipe(
        takeUntil(this.destroy$$),
        tap((clipboardData: TPR_input) => {
          if (clipboardData) {
            this.companyData.set(clipboardData);
            GetTransactionDataUtil(
              clipboardData,
              this.transactionData,
              this.itterableTransactionData,
            );
          }
        }),
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }

  public getLabel(category: string): string {
    return `Kategoria ${category.slice(-1)}`;
  }

  collectData() {
    this.tprDataService.clearData();
    this.children && this.children.forEach((child) => child.sendData());
    const companyData = this.companyData();
    if (companyData) {
      companyData.transactions = this.tprDataService.getData();
    }

    this.tprDataService.getIsError()
      ? this.errorSnackbarService.open(
          'Przed wygenerowaniem pliku należy uzupełnić wszystkie niezablokowane komórki tablicy',
        )
      : this.generateXML(companyData);
  }

  generateXML(companyData: any) {
    this.mixpanelService.track('XML');
    const tpr = translateToTPR(companyData);
    const xmlVar = xmljs.js2xml(tpr, { compact: true, spaces: 2 });
    const blob = new Blob([xmlVar], { type: 'application/xml' });
    saveAs(blob, 'TPR-C(5)_v_35.xml');
  }
}
