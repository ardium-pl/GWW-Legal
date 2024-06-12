import { Injectable } from '@angular/core';
import { TransakcjaKategoriaE } from "./typeE.types"

@Injectable({
  providedIn: 'root'
})
export class TprDataServiceService {

  constructor() { }
}





const transakcjaE: TransakcjaKategoriaE = {
  KategoriaE: "1401",
  PrzedmiotE: "",
  WartoscE: [{_attr: {kodWaluty:"PL"}},1221],
  BrakKorektyCT3:"KC02",
  Kompensata:"KS03",
  RodzajDN: "DN07",
  KodZW2:"ZW02",
  RodzajTrans1: "TK01",
  InformacjaOKrajuE2:{
    Kraj:"PL",
    WartoscEKraj2: [{_attr:{kodWaluty:"PLN"}},6842]
  },
  MetodaE:"MW01",
  RodzajAnalizy:"RA02",
  SposobWyrCeny:"Procent od przychodów licencjobiorcy",
  KorektyPorWyn4:"KP01",
  KalkOplaty1:"SK01",
  PoziomOpl1:1.5,
  RodzajPrzedzialu:"RP01",
  WynikAPKO1D1:1.50,
  WynikAPKO1G1:3.88
}


