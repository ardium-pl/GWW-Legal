import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClipboardBlockDialogComponent } from 'app/components/clipboard-block-dialog/clipboard-block-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  readonly dialog = inject(MatDialog);

  public openDialog(
    warningMessage: string,
  ): MatDialogRef<ClipboardBlockDialogComponent> {
    const dialogRef = this.dialog.open(ClipboardBlockDialogComponent, {
      data: warningMessage,
      height: '15%',
      width: '35%',
      disableClose: true,
      backdropClass: 'standard-backdrop-class',
    });
    return dialogRef;
  }
}
