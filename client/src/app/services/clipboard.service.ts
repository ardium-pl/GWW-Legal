import { Injectable } from '@angular/core';

const ACCESS_DENIED_MESSAGE = 'Zablokowano dostęp do schowka. Udziel dostępu, żeby kontynuować';
const WRONG_TYPE_MESSAGE = 'W schowku znajdują się dane nieprawidłowego typu. Skopiuj dane z arkusza TPR i spróbuj ponownie';
const WRONG_DATA_MESSAGE = 'W schowku znajdują się nieprawidłowe dane. Skopiuj dane z arkusza TPR i spróbuj ponownie';

@Injectable({
  providedIn: 'root',
})
export class ClipboardService {
  public async readClipboard() {
    let copiedData!: string;
    try {
      copiedData = await navigator.clipboard.readText();
      if (!copiedData) {
        throw 'NO_COPIED_DATA_ERR';
      }
    } catch (error) {
      throw 'ACCESS_DENIED_ERR';
    }
    return await this._getJsonFromClipboard(copiedData);
  }

  private _getJsonFromClipboard(clipboardValue: string): object {
    let object: object;
    try {
      object = JSON.parse(clipboardValue);
    } catch (err) {
      throw 'NOT_JSON_ERR';
    }
    return object;
  }
}
