
export interface Ward {
  name: string;
}

export interface WardData {
  Ward: string;
  Population: number;
  Theatres: number;
  Malls: number;
  Parks: number;
  Gardens: number;
  Auditoriums: number;
  TotalInfrastructure: number;
  HappinessIndex: number;
  Year: number;
}

export interface PredictionInputs {
  year: number;
  populationGrowthRate: number;
  infrastructureInvestment: number;
  policyEffectiveness: number;
  selectedWards: string[];
}

export interface ErrorMetrics {
  rmse: number;
  mae: number;
  mape: number;
}

export interface ChartData {
  name: string;
  historical?: number;
  predicted?: number;
}
