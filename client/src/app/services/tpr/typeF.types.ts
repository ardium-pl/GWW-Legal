export type TransakcjaKategoriaF = {
  KategoriaF: '1501' | '2501';
  PrzedmiotF: string;
  WartoscF: [
    {
      $: {
        kodWaluty: string;
      };
    },
    number
  ];
  Kompensata: Kompensata;
  KodZW1: 'ZW01';
  PodstZW?: PodstawaZwolnienia;
  InformacjaOKrajuF1: {
    Kraj: string;
    WartoscFKraj1: {
        $: {
          kodWaluty: string;
        };
      _: number
    }
  }
  KorektaCT6?: 'KC01' | 'KC02' | undefined;
  WartKorektyCT6?: {
    $: {
      kodWaluty?: string;
    };
    _text: number;
  };
  BrakKorektyCT6?: 'KC02';
};
type Kompensata = 'KS01' | 'KS02' | 'KS03';
type PodstawaZwolnienia = '11n1' | '11n1a' | '11n2' | undefined;