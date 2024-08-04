import { Injectable } from '@angular/core';
import { parseString, processors } from 'xml2js';
import { TPRCompanyData } from './tpr/tpr-input.types';
import { Declaration } from './tpr/tpr-input.types';

const TAGS_THAT_SHOULD_REMAIN_STRINGS = [
  'OkresOd',
  'OkresDo',
  'KodUrzedu',
  'NIP',
  'KategoriaA',
  'KategoriaA1',
  'KategoriaA2',
  'KategoriaB',
  'KategoriaC',
  'KategoriaD',
  'KategoriaE',
  'KategoriaF',
  'PESELKontr1',
  'NrIdKontr1',
  'NIPKontr1',
];
@Injectable({
  providedIn: 'root',
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
    let validation = this._validateXmlFile(fileContent);
    if(!validation){
    const xmlData = this.readAsXml(fileContent);
    this._xmlData = this.parseXML(xmlData);
    console.log(this._xmlData);
    }
  }

  private _validateXmlFile(content: string): false | [string, string] {
    if (!/<KodFormularza.*?>TPR-C<\/KodFormularza>/.test(content)) {
        window.alert('Dodany plik nie wygląda na poprawny plik XML. Upewnij się, że dodajesz plik wygenerowany przez formularz TPR-C.')
      }
    return false;
  }
  private readAsXml(xmlContent: string): Declaration {
    const options = {
      explicitArray: false,
      mergeAttrs: false,
      trim: true,
      normalizeTags: false,
      charkey: '_text',
      attrkey: '_attributes',
      explicitRoot: false,
      tagNameProcessors: [processors.stripPrefix], // Removes namespace prefixes from tag names
      attrNameProcessors: [processors.stripPrefix],
      valueProcessors: [this._customValueProcessor], // Removes namespace prefixes from attribute names
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

  private _customValueProcessor(value: string, name: string) {
    if (!TAGS_THAT_SHOULD_REMAIN_STRINGS.includes(name)) {
      return processors.parseNumbers(value);
    }
    return value;
  }


  private parseXML(record: Declaration): TPRCompanyData {
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
