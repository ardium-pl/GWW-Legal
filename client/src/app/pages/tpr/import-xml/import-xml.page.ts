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
    FileDropZoneComponent
  ],
  templateUrl: './import-xml.page.html',
  styleUrl: './import-xml.page.scss'
})
export class ImportXMLPage {
  private readonly children = viewChildren(TransactionTableComponent);
  private readonly fileSystemService = inject(FileSystemService);
  private readonly errorSnackbarService = inject(ErrorSnackbarService);
  public readonly tprDataService = inject(TprDataService);
  public readonly tprCompanyDataService = inject(TprCompanyDataService);
  private readonly importXMLService = inject(ImportXMLService);
  readonly dialog = inject(MatDialog);
  private readonly mixpanelService = inject(MixpanelService);


  public readonly selectedTab = signal<number>(0);

  async onFileDropped(files: File | File[]) {
    try {
      const fileArray = Array.isArray(files) ? files : [files]; // Ensure it's an array
      await this.importXMLService.handleFileDrop(fileArray);
      const xmlData = await this.importXMLService.xmlData;
      const translatedData = await reverseTranslator(xmlData);
      this.tprCompanyDataService.setData(translatedData as object);
      console.log(translatedData);
    } catch (error) {
      console.error('Error processing file:', error);
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
