import { Injectable } from '@angular/core';
import { parseString, processors } from 'xml2js';
import { TPRCompanyData } from './tpr/tpr-input.types';
import { Declaration } from './tpr/tpr-input.types';

@Injectable({
  providedIn: 'root'
})
export class ImportXMLService {

  private _xmlData: TPRCompanyData | null = null;

  get xmlData(): TPRCompanyData | null {
    return this._xmlData;
  }

  async handleFileDrop(files: File[]) {
    const file = files[0];
    if (!file.name.endsWith('.xml')) {
      throw new Error('Invalid file type. Please upload an XML file.');
    }

    const fileContent = await file.text();
    const xmlData = this.readAsXml(fileContent);
    this._xmlData = this.parseXML(xmlData);
    console.log(this._xmlData);
  }

  private readAsXml(xmlContent: string): Declaration {
    const options = {
      explicitArray: false,
      mergeAttrs: false,
      trim: true,
      normalizeTags: false,
      explicitRoot: false,
      tagNameProcessors: [processors.stripPrefix], // Removes namespace prefixes from tag names
      attrNameProcessors: [processors.stripPrefix]  // Removes namespace prefixes from attribute names
    };

    let result: any;
    parseString(xmlContent, options, (err, res) => {
      if (err) {
        throw new Error(`Error parsing XML: ${err.message}`);
      } else {
        result = res;
      }
    });
    console.log(result);
    return result;
  }

  private parseXML(data: Declaration): TPRCompanyData {
    return this.transformRecord(data);
  }

  private transformRecord(record: Declaration): TPRCompanyData {
    return {
      periodFrom: record.Naglowek.OkresOd,
      periodUntil: record.Naglowek.OkresDo,
      taxID: record.Podmiot1.NIP,
      fullName: record.Podmiot1.PelnaNazwa,
      countryCode: record.Podmiot1.KodKraju,
      pkdCode: record.Podmiot1.KodPKD,
      taxCategory: record.PozycjeSzczegolowe.PodmiotNZ || record.PozycjeSzczegolowe.PodmiotKZ,
      operatingMargin: record.PozycjeSzczegolowe.InnyPodmiot.MarzaOper,
      profitMargin: record.PozycjeSzczegolowe.InnyPodmiot.MarzaZysku,
      returnOnAssets: record.PozycjeSzczegolowe.InnyPodmiot.RentAkt,
      returnOnEquity: record.PozycjeSzczegolowe.InnyPodmiot.RentKW,
      transactions: record.PozycjeSzczegolowe.Transakcja,
      statement: record.Oswiadczenie,
      irsCode: record.Naglowek.KodUrzedu || '',
    };
  }
}
