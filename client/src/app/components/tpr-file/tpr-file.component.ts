import { UpperCasePipe } from '@angular/common';
import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { TprFileState, TprFile } from 'app/services/tpr/tpr-file';
import { ArdiumFilesizePipeModule } from '@ardium-ui/devkit';

@Component({
  selector: 'app-tpr-file',
  standalone: true,
  imports: [UpperCasePipe, MatProgressSpinnerModule, MatIconModule, ArdiumFilesizePipeModule],
  templateUrl: './tpr-file.component.html',
  styleUrl: './tpr-file.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class TprFileComponent {
  readonly tprFile = input.required<TprFile>();
  readonly _states = TprFileState;

  readonly validationDataString = computed(() => {
    const data = this.tprFile().validationData();
    if (!data) return 'Kod błędu: UNXPTD_NO_DATA';
    const [msg, code] = data;
    return `${msg} Kod błędu: ${code}`;
  })
}