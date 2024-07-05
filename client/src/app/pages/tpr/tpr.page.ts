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
import { XmlGeneratorComponent } from 'app/components/xml-generator/xml-generator.component';
import { DataExportService } from 'app/services/data-export.service';
import { TransactionTableComponent } from 'app/components/transaction-table/transaction-table.component';
import { TprDataServiceService } from 'app/services/tpr/tpr-data-service.service';
import { translateToTPR } from 'app/utils/tpr-translator.util';
import { saveAs } from 'file-saver';
import * as xmljs from 'xml-js';


@Component({
  selector: 'tpr-nsa',
  standalone: true,
  imports: [
    TableComponent,
    TransactionTableComponent,
    MatCardModule,
    MatTabsModule,
    XmlGeneratorComponent,
  ],
  providers: [ClipboardService],
  templateUrl: './tpr.page.html',
  styleUrl: './tpr.page.scss',
})
export class TprPage implements OnInit, OnDestroy {
  @ViewChildren(TransactionTableComponent)
  children: QueryList<TransactionTableComponent> | undefined;
  private readonly tprDataServiceService = inject(TprDataServiceService);
  private readonly clipboardService = inject(ClipboardService);
  private readonly destroy$$ = new Subject<void>();
  readonly companyData = signal<TPR_input | null>(null);
  constructor(private dataExportService: DataExportService) {}

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
    this.tprDataServiceService.clearData();
    this.children && this.children.forEach((child) => child.sendData());
    const companyData = this.companyData();
    if (companyData) {
      companyData.transactions = this.tprDataServiceService.getData();
    }
    const tpr = translateToTPR(companyData);
    console.log(tpr);
      const xmlVar = xmljs.js2xml(tpr, { compact: true, spaces: 2 });
      console.log('Generated XML:', xmlVar);
      const blob = new Blob([xmlVar], { type: 'application/xml' });
      saveAs(blob, 'tpr_data.xml');
    

    console.log(companyData);
  }
  
}
