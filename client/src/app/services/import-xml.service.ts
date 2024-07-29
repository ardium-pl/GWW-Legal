import { Injectable } from '@angular/core';
import { parseString, processors } from 'xml2js';

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
    console.log(fileContent); // Log the file content to the console
    const xmlData = this.readAsXml(fileContent);
    console.log(xmlData);
    // const parsedData = this.parseXml(xmlData);
    
    // return parsedData;
  }

  private readAsXml(xmlContent: string) {
    const options = {
      explicitArray: false,
      mergeAttrs: true,
      trim: true,
      normalizeTags: true,
      explicitRoot: false,
      // tagNameProcessors: [processors.stripPrefix], // Removes namespace prefixes from tag names
      // attrNameProcessors: [processors.stripPrefix], // Removes namespace prefixes from attribute names
    };

    let result: any;
    parseString(xmlContent, options, (err, res) => {
      if (err) {
        throw new Error(`Error parsing XML: ${err.message}`);
      }
      result = res;
    });

    return result;
  }
}
