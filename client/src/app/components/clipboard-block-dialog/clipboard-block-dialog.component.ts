import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-clipboard-block-dialog',
  templateUrl: './clipboard-block-dialog.component.html',
  styleUrls: ['./clipboard-block-dialog.component.scss'],
  standalone: true,
  imports: [MatIconModule],
})
export class ClipboardBlockDialogComponent {
  constructor() {}
  readonly dialogRef = inject(MatDialogRef<string>);
  readonly data = inject(MAT_DIALOG_DATA);
}
