import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClipboardBlockDialogComponent } from 'app/components/clipboard-block-dialog/clipboard-block-dialog.component';
import { TPRCompanyData } from 'app/services/tpr/tpr-input.types';

const ACCESS_DENIED_MESSAGE = 'Zablokowano dostęp do schowka. Udziel dostępu, żeby kontynuować';
const WRONG_TYPE_MESSAGE = 'W schowku znajdują się dane nieprawidłowego typu. Skopiuj dane z arkusza TPR i spróbuj ponownie';
const WRONG_DATA_MESSAGE = 'W schowku znajdują się nieprawidłowe dane. Skopiuj dane z arkusza TPR i spróbuj ponownie';

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {
  constructor() {}
  readonly dialog = inject(MatDialog);

  public async readClipboard() {
    let copiedData!: string;
    try {
      copiedData = await navigator.clipboard.readText();
      if (!copiedData) {
        throw 'NO_COPIED_DATA_ERR';
      }
    } catch (error) {
      this.openDialog(ACCESS_DENIED_MESSAGE);
    }
    return await this._getJsonFromClipboard(copiedData);
  }

  private _getJsonFromClipboard(clipboardValue: string): object {
    let object: object;
    try {
      if (!clipboardValue) throw new Error();
      object = JSON.parse(clipboardValue);
      const keysToCheck: (keyof TPRCompanyData)[] = [
        'countryCode',
        'fullName',
        'operatingMargin',
        'periodFrom',
        'periodUntil',
        'pkdCode',
        'profitMargin',
        'returnOnAssets',
        'returnOnEquity',
        'taxCategory',
        'taxID',
      ];
      const objectKeys = Object.keys(object);
      const isObjectIncomplete = keysToCheck.some((key) => {
        return !objectKeys.some((objectKey) => objectKey === key);
      });
      if (isObjectIncomplete) this.openDialog(WRONG_TYPE_MESSAGE);
    } catch (err) {
      this.openDialog(WRONG_DATA_MESSAGE);
    }
    return object!;
  }

  private openDialog(
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
