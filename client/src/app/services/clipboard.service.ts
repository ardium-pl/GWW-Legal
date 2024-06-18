import { Injectable } from '@angular/core';
import { DialogService } from './dialog.service';
import { TPR_input } from './tpr/tpr-input.types';

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {
  public constructor(private readonly dialogService: DialogService) {}

  public async readClipboard() {
    try {
      const copiedData = await navigator.clipboard.readText();
      return copiedData;
    } catch (error) {
      this.dialogService.openDialog(
        'Zablokowano dostęp do tekstu i obrazów skopiowanych do schowka.',
      );
    }
    return null;
  }

  public async getJsonFromClipboard() {
    try {
      const clipboardValue = await this.readClipboard();
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
      if (isObjectIncomplete)
        this.dialogService.openDialog(
          'W schowku znajdują się dane nieprawidłowego typu',
        );
    } catch (err) {
      this.dialogService.openDialog(
        'W schowku znajdują się nieprawidłowe dane',
      );
    }
  }
}
