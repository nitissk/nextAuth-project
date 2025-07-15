export interface CountryName {
  localeCompare(name: CountryName): number;
  common: string;
  official: string;
}

export interface Currency {
  name: string;
  symbol: string;
}

export interface Language {
  [key: string]: string;
}

export interface Country {
  name: CountryName;
  capital: string[];
  population: number;
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  area: number;
  region: string;
  subregion?: string;
  languages?: Language;
  currencies?: Record<string, Currency>;
  continents: string[];
}


