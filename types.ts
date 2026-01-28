
export enum AppTab {
  CALCULATOR = 'CALCULATOR',
  CONVERTER = 'CONVERTER'
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

export interface ExchangeRate {
  [key: string]: number;
}

export interface CalculationResult {
  expression: string;
  result: string;
  timestamp: Date;
}
