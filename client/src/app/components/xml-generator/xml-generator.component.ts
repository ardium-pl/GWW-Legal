// src/app/xml-generator/xml-generator.component.ts
import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
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

  tprData = [];
  private readonly tprDataServiceService = inject(TprDataServiceService);


  constructor(private dataExportService: DataExportService) {}

  ngOnInit() {
    this.dataExportService.tprData$.subscribe((data) => {
      this.tprData = data;
    });
  }

  public onClick(): void {
    this.clicked.emit();
  }

}
