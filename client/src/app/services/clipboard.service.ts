import { Injectable, inject } from '@angular/core';
import { DialogService } from './dialog.service';
import { TPR_input } from './tpr/tpr-input.types';

const ACCESS_DENIED_MESSAGE =
  'Zablokowano dostęp do schowka. Udziel dostępu, żeby kontynuować';
const WRONG_TYPE_MESSAGE =
  'W schowku znajdują się dane nieprawidłowego typu. Skopiuj dane z arkusza TPR i spróbuj ponownie';
const WRONG_DATA_MESSAGE =
  'W schowku znajdują się nieprawidłowe dane. Skopiuj dane z arkusza TPR i spróbuj ponownie';

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {
  constructor() {}
  readonly dialogService = inject(DialogService);

  public async readClipboard() {
    try {
      const copiedData = await navigator.clipboard.readText();
      const input = await this.getJsonFromClipboard(copiedData);
      return input;
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
        'returnOnEquity',
        'taxCategory',
        'taxID',
      ];
      const objectKeys = Object.keys(object);
      const isObjectIncomplete = keysToCheck.some((key) => {
        return !objectKeys.some((objectKey) => objectKey === key);
      });
      if (isObjectIncomplete) this.dialogService.openDialog(WRONG_TYPE_MESSAGE);
      return object;
    } catch (err) {
      this.dialogService.openDialog(WRONG_DATA_MESSAGE);
    }
  }
}
