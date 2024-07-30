import { Injectable } from '@angular/core';
import { parseString, processors } from 'xml2js';
import { PozycjeSzczegolowe } from './tpr/tpr-output.types';
import { TPRCompanyData } from './tpr/tpr-input.types';


type Declaration  = {
  Naglowek: Naglowek;
  Podmiot1: Podmiot;
  PozycjeSzczegolowe: PozSzcz;
  Oswiadczenie: 'OSW1' | 'OSW2';
}
type Naglowek = {
  OkresOd: string;
  OkresDo: string;
  KodUrzedu: string;
}

type PozSzcz = {
  PodmiotNZ: 'ZK01';
  PodmiotKZ: 'ZK02';
  InnyPodmiot: InnyPodmiot;
  Transakcja: Array<any>;
}

type InnyPodmiot = {
  MarzaOper: number;
  MarzaZysku: number;
  RentAkt: number;
  RentKW: number;
}

type Podmiot = {
  NIP: string;
  PelnaNazwa: string;
  KodKraju: string;
  KodPKD: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImportXMLService {

  async handleFileDrop(files: File[]) {
    const file = files[0];
    if (!file.name.endsWith('.xml')) {
      throw new Error('Invalid file type. Please upload an XML file.');
    }

    const fileContent = await file.text();
    console.log(fileContent);
    const xmlData = await this.readAsXml(fileContent);
    const parsedData = this.parseXML(xmlData);
    console.log(parsedData);
    
    return parsedData;
  }

  private readAsXml(xmlContent: string): Promise<any> {
    const options = {
      explicitArray: false,
      mergeAttrs: false,
      trim: true,
      normalizeTags: false,
      explicitRoot: false,
      tagNameProcessors: [processors.stripPrefix], // Removes namespace prefixes from tag names
      attrNameProcessors: [processors.stripPrefix]  // Removes namespace prefixes from attribute names
    };

    return new Promise((resolve, reject) => {
      parseString(xmlContent, options, (err, result) => {
        if (err) {
          reject(new Error(`Error parsing XML: ${err.message}`));
        } else {
          resolve(result);
        }
      });
    });
  }

  private parseXML(data: Declaration):  TPRCompanyData{
    const result: TPRCompanyData = {
      periodFrom: data.Naglowek.OkresOd,
      periodUntil: data.Naglowek.OkresDo,
      taxID: data.Podmiot1.NIP,
      fullName: data.Podmiot1.PelnaNazwa,
      countryCode: data.Podmiot1.KodKraju,
      pkdCode: data.Podmiot1.KodPKD,
      taxCategory: data.PozycjeSzczegolowe.PodmiotNZ || data.PozycjeSzczegolowe.PodmiotKZ,
      operatingMargin: data.PozycjeSzczegolowe.InnyPodmiot.MarzaOper,
      profitMargin: data.PozycjeSzczegolowe.InnyPodmiot.MarzaZysku,
      returnOnAssets: data.PozycjeSzczegolowe.InnyPodmiot.RentAkt,
      returnOnEquity: data.PozycjeSzczegolowe.InnyPodmiot.RentKW,
      transactions: data.PozycjeSzczegolowe.Transakcja,
      statement: data.Oswiadczenie,
      irsCode: data.Naglowek.KodUrzedu || '',
    };

    return result;
  }
}
