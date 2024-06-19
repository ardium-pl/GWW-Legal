import { Injectable, inject } from '@angular/core';
import { DialogService } from './dialog.service';
import { TPR_input } from './tpr/tpr-input.types';

const ACCESS_DENIED_MESSAGE =
  'Zablokowano dostęp do tekstu i obrazów skopiowanych do schowka.';
const WRONG_TYPE_MESSAGE = 'W schowku znajdują się dane nieprawidłowego typu.';
const WRONG_DATA_MESSAGE = 'W schowku znajdują się nieprawidłowe dane.';

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {
  constructor() {}
  readonly dialogService = inject(DialogService);

  public async readClipboard() {
    try {
      const copiedData = await navigator.clipboard.readText();
      this.getJsonFromClipboard(copiedData);
    } catch (error) {
      this.dialogService.openDialog(ACCESS_DENIED_MESSAGE);
    }
    return null;
  }

  public async getJsonFromClipboard(clipboardValue: string) {
    try {
      if (!clipboardValue) throw new Error();
      const object = JSON.parse(clipboardValue);
      const keysToCheck: (keyof TPR_input)[] = [
        'countryCode',
        'fullName',
        'operatingMargin',
        'periodFrom',
        'periodUntil',
        'pkdCode',
        'profitMargin',
        'returnOnAssets',
        'taxCategory',
        'taxID',
        'transactions',
      ];
      const objectKeys = Object.keys(object);
      const isObjectIncomplete = keysToCheck.some((key) => {
        return !objectKeys.some((objectKey) => objectKey === key);
      });
      if (isObjectIncomplete) this.dialogService.openDialog(WRONG_TYPE_MESSAGE);
    } catch (err) {
      this.dialogService.openDialog(WRONG_DATA_MESSAGE);
    }
  }
}
