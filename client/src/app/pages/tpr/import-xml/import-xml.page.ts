import { Component, inject, signal, viewChildren } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconComponent } from 'app/components';
import { ButtonComponent } from 'app/components/button/button.component';
import { FileDropZoneComponent } from 'app/components/file-drop-zone/file-drop-zone.component';
import { TableComponent } from 'app/components/table/table.component';
import { TransactionTableComponent } from 'app/components/transaction-table/transaction-table.component';
import { MixpanelService } from 'app/services/mixpanel.service';
import { ErrorSnackbarService } from 'app/services/snackbar.service';
import { TprCompanyDataService } from 'app/services/tpr/tpr-company-data.service';
import { TprDataService } from 'app/services/tpr/tpr-data.service';
import { FileSystemService } from '@ardium-ui/devkit';
import { translateToTPR } from 'app/utils/translators/tpr-translator.util';
import * as xmljs from 'xml-js';
import { ImportXMLService } from 'app/services/import-xml.service';
import { reverseTranslator } from 'app/utils/translators/reverseTranslators/reverse-tpr-translator';
import { TprFileComponent } from 'app/components/tpr-file/tpr-file.component';
import { MainPage } from '../../main/main.page';
import { TPRCompanyData } from 'app/services/tpr/tpr-input.types';
import { TprFileState } from 'app/services/tpr/tpr-file';

@Component({
  selector: 'app-import-xml',
  standalone: true,
  imports: [
    TableComponent,
    TransactionTableComponent,
    MatCardModule,
    MatTabsModule,
    ButtonComponent,
    IconComponent,
    MatTooltipModule,
    FileDropZoneComponent,
    TprFileComponent,
    MainPage,
  ],
  templateUrl: './import-xml.page.html',
  styleUrl: './import-xml.page.scss',
})
export class ImportXMLPage {
  private readonly children = viewChildren(TransactionTableComponent);
  private readonly fileSystemService = inject(FileSystemService);
  private readonly errorSnackbarService = inject(ErrorSnackbarService);
  public readonly tprDataService = inject(TprDataService);
  public readonly tprCompanyDataService = inject(TprCompanyDataService);
  public readonly importXMLService = inject(ImportXMLService);
  readonly dialog = inject(MatDialog);
  private readonly mixpanelService = inject(MixpanelService);

  public readonly selectedTab = signal<number>(0);

  async onFileDropped(files: File | File[]) {
    try {
      await this.importXMLService.handleFileDrop(files as File);
      const xmlData = this.importXMLService.xmlData;
      const translatedData = reverseTranslator(xmlData);
      this.tprCompanyDataService.setData(translatedData as object);
    } catch (error) {
      this.importXMLService.files[0].state.set(TprFileState.Error);
    }
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

  generateXML(companyData: TPRCompanyData | null) {
    this.mixpanelService.track('XML');
    const tpr = translateToTPR(companyData as TPRCompanyData);
    const xmlVar = xmljs.js2xml(tpr, { compact: true, spaces: 2 });
    const blob = new Blob([xmlVar], { type: 'application/xml' });

    this.fileSystemService.saveAs(blob, {
      fileName: 'TPR-C(5)_v_35.xml',
      types: [{ description: 'Plik XML', accept: { 'application/xml': ['.xml'] } }],
    });
  }
}
