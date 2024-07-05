// src/app/xml-generator/xml-generator.component.ts
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { TPR_input } from 'app/services/tpr/tpr-input.types';
import { translateToTPR } from 'app/utils/tpr-translator.util';
import * as xmljs from 'xml-js';
import { ButtonComponent } from '../button/button.component';
import { saveAs } from 'file-saver';
import { DataExportService } from 'app/services/data-export.service';
import { TprDataServiceService } from 'app/services/tpr/tpr-data-service.service';

@Component({
  selector: 'app-xml-generator',
  templateUrl: './xml-generator.component.html',
  styleUrls: ['./xml-generator.component.scss'],
  imports: [ButtonComponent],
  standalone: true,
})
export class XmlGeneratorComponent implements OnInit {
  @Output() public clicked = new EventEmitter();

  tprData: TPR_input[] = [];
  private readonly tprDataServiceService = inject(TprDataServiceService);

  constructor(private dataExportService: DataExportService) {}

  ngOnInit() {
    this.dataExportService.tprData$.subscribe((data) => {
      this.tprData = data as TPR_input[];
    });
  }

  public onClick(): void {
    this.clicked.emit();
  }

  generateXML() {
    if (this.tprData.length > 0) {
      const tpr = translateToTPR(this.tprData[0]);
      const xmlVar = xmljs.js2xml(tpr, { compact: true, spaces: 2 });
      console.log('Generated XML:', xmlVar);
      const blob = new Blob([xmlVar], { type: 'application/xml' });
      saveAs(blob, 'tpr_data.xml');
    }
  }
}
