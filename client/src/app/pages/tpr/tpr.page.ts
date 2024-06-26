import {
  Component,
  OnDestroy,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TableComponent } from 'app/components/table/table.component';
import {
  companyColDefs,
  transactionColDefs,
} from 'app/components/table/table.consts';
import { ClipboardService } from 'app/services/clipboard.service';
import { MatTabsModule } from '@angular/material/tabs';
import {
  TPR_input,
  TransactionCategories,
} from 'app/services/tpr/tpr-input.types';
import { Subject, from, takeUntil, tap } from 'rxjs';
import { GetTransactionDataUtil } from 'app/utils/get-transaction-data.util';

@Component({
  selector: 'tpr-nsa',
  standalone: true,
  imports: [TableComponent, MatCardModule, MatTabsModule],
  providers: [ClipboardService],
  templateUrl: './tpr.page.html',
  styleUrl: './tpr.page.scss',
})
export class TprPage implements OnInit, OnDestroy {
  private readonly clipboardService = inject(ClipboardService);
  private readonly destroy$$ = new Subject<void>();
  companyColumnDefs = companyColDefs;
  transactionColumnDefs = transactionColDefs;

  companyData: WritableSignal<TPR_input[] | null> = signal(null);
  transactionData: WritableSignal<TransactionCategories> = signal({
    categoryA: [],
    categoryB: [],
    categoryC: [],
    categoryD: [],
    categoryE: [],
    categoryF: [],
  });
  itterableTransactionData: WritableSignal<any> = signal([]);

  public ngOnInit(): void {
    const observableFrom$ = from(this.clipboardService.readClipboard());
    observableFrom$
      .pipe(
        takeUntil(this.destroy$$),
        tap((clipboardData: TPR_input) => {
          if (clipboardData) {
            this.companyData.set([clipboardData]);
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

  public getLabel(category: string): string {
    return `Kategoria ${category.slice(-1)}`;
  }

  public ngOnDestroy(): void {
    this.destroy$$.next();
    this.destroy$$.complete();
  }
}
