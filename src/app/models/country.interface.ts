export interface Country {
  cca3: string;
  name: { common: string; official: string };
  capital?: string[];
  region: string;
  subregion?: string;
  currencies?: { [key: string]: { name: string; symbol: string } };
  languages?: { [key: string]: string };
  flags: { png: string; svg: string; alt?: string };
  population: number;
}
