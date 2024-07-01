import { Component, OnInit } from '@angular/core';
import { DataExportService } from 'app/services/data-export.service';
import { TPR_input, Transaction } from 'app/services/tpr/tpr-input.types';
import { translateToTPR } from 'app/utils/tpr-translator.util';
import * as xmljs from 'xml-js';
import { ButtonComponent } from '../button/button.component';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-xml-generator',
  templateUrl: './xml-generator.component.html',
  styleUrls: ['./xml-generator.component.scss'],
  imports: [ButtonComponent],
  standalone: true
})
export class XmlGeneratorComponent implements OnInit {
  tprData: TPR_input[] = [];
  transactionData: Transaction[] = [];

  constructor(private dataExportService: DataExportService) {}

  ngOnInit() {
    this.dataExportService.getTPRData().subscribe((data: TPR_input[]) => {
      this.tprData = data;
    });

  }

  generateXML() {
    if (this.tprData.length > 0) {
      const tpr = translateToTPR(this.tprData[0]);
      console.log('Translated TPR:', tpr);
      const xmlVar = xmljs.js2xml(tpr, { compact: true, spaces: 4 });
      console.log('Generated XML:', xmlVar);
      const blob = new Blob([xmlVar], { type: 'application/xml' });
      saveAs(blob, 'tpr_data.xml');
    }
  }
  
}
