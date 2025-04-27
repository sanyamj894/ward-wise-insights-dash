
import { WardData, PredictionInputs, ErrorMetrics } from '@/types';

// Simple prediction model based on the provided code snippet
export const predictFutureValues = (
  historicalData: WardData[],
  inputs: PredictionInputs
): WardData[] => {
  const { year, populationGrowthRate, infrastructureInvestment, policyEffectiveness } = inputs;
  
  // Filter for selected wards or use all
  const relevantData = inputs.selectedWards.length > 0 
    ? historicalData.filter(item => inputs.selectedWards.includes(item.Ward))
    : historicalData;

  // Get the latest year data for each ward
  const latestData: { [key: string]: WardData } = {};
  relevantData.forEach(item => {
    if (!latestData[item.Ward] || latestData[item.Ward].Year < item.Year) {
      latestData[item.Ward] = item;
    }
  });

  // Generate predictions
  return Object.values(latestData).map(ward => {
    const yearDiff = year - ward.Year;
    if (yearDiff <= 0) return ward; // Return original if prediction year is not in future
    
    // Apply growth factors based on inputs
    const populationGrowth = ward.Population * Math.pow(1 + (populationGrowthRate / 100), yearDiff);
    
    // Infrastructure growth based on investment level
    const infrastructureGrowthRate = (infrastructureInvestment / 100) * (1 + policyEffectiveness / 100);
    const infrastructureGrowth = Math.round(yearDiff * infrastructureGrowthRate);
    
    // Calculate infrastructure components with some distribution logic
    const totalInfrastructure = ward.TotalInfrastructure + infrastructureGrowth;
    const theatres = ward.Theatres + Math.floor(infrastructureGrowth * 0.2);
    const malls = ward.Malls + Math.floor(infrastructureGrowth * 0.15);
    const parks = ward.Parks + Math.floor(infrastructureGrowth * 0.3);
    const gardens = ward.Gardens + Math.floor(infrastructureGrowth * 0.2);
    const auditoriums = ward.Auditoriums + Math.floor(infrastructureGrowth * 0.15);
    
    // Calculate happiness index - simplified formula
    const populationFactor = Math.log10(populationGrowth) * 0.2;
    const infrastructureFactor = totalInfrastructure / Math.sqrt(populationGrowth) * 15;
    const parksFactor = (parks + gardens) * 0.5;
    
    // Combine factors with some randomization for realism
    let happinessIndex = ((populationFactor + infrastructureFactor + parksFactor) / 10) + 
                         (policyEffectiveness / 20) +
                         (Math.random() * 0.5 - 0.25); // Small random factor
    
    // Ensure values are within reasonable ranges
    happinessIndex = Math.max(1, Math.min(10, happinessIndex));
    
    return {
      Ward: ward.Ward,
      Population: Math.round(populationGrowth),
      Theatres: theatres,
      Malls: malls,
      Parks: parks, 
      Gardens: gardens,
      Auditoriums: auditoriums,
      TotalInfrastructure: totalInfrastructure,
      HappinessIndex: parseFloat(happinessIndex.toFixed(1)),
      Year: year
    };
  });
};

// Calculate error metrics for validation
export const calculateErrorMetrics = (
  actual: WardData[], 
  predicted: WardData[],
  metric: keyof WardData
): ErrorMetrics => {
  // Match actual and predicted based on Ward and Year
  const matchedPairs = actual.map(actualItem => {
    const match = predicted.find(
      predItem => predItem.Ward === actualItem.Ward && predItem.Year === actualItem.Year
    );
    return { actual: actualItem, predicted: match };
  }).filter(pair => pair.predicted !== undefined);
  
  if (matchedPairs.length === 0) {
    return { rmse: 0, mae: 0, mape: 0 };
  }

  // Calculate metrics
  const errors = matchedPairs.map(pair => {
    const actualValue = pair.actual[metric] as number;
    const predictedValue = pair.predicted![metric] as number;
    return {
      error: predictedValue - actualValue,
      absError: Math.abs(predictedValue - actualValue),
      percError: actualValue !== 0 ? Math.abs((predictedValue - actualValue) / actualValue) * 100 : 0
    };
  });

  const sumSquaredErrors = errors.reduce((sum, e) => sum + e.error * e.error, 0);
  const sumAbsErrors = errors.reduce((sum, e) => sum + e.absError, 0);
  const sumPercErrors = errors.reduce((sum, e) => sum + e.percError, 0);
  
  return {
    rmse: Math.sqrt(sumSquaredErrors / errors.length),
    mae: sumAbsErrors / errors.length,
    mape: sumPercErrors / errors.length
  };
};

// Find outliers in prediction data
export const findOutliers = (data: WardData[], metric: keyof WardData): string[] => {
  if (data.length < 5) return []; // Need enough data for meaningful outlier detection
  
  const values = data.map(item => Number(item[metric]));
  
  // Calculate quartiles and IQR for outlier detection
  const sorted = [...values].sort((a, b) => a - b);
  const q1 = sorted[Math.floor(sorted.length * 0.25)];
  const q3 = sorted[Math.floor(sorted.length * 0.75)];
  const iqr = q3 - q1;
  
  const lowerBound = q1 - 1.5 * iqr;
  const upperBound = q3 + 1.5 * iqr;
  
  // Return wards that have outlier values
  return data
    .filter(item => {
      const value = Number(item[metric]);
      return value < lowerBound || value > upperBound;
    })
    .map(item => item.Ward);
};

// Get infrastructure optimization suggestions
export const getOptimizationSuggestions = (data: WardData[]): { [key: string]: number } => {
  // Find wards with highest happiness indexes
  const sortedByHappiness = [...data].sort((a, b) => b.HappinessIndex - a.HappinessIndex);
  const topWards = sortedByHappiness.slice(0, Math.min(3, sortedByHappiness.length));
  
  // Calculate average infrastructure ratios in top wards
  const sumPopulation = topWards.reduce((sum, ward) => sum + ward.Population, 0);
  
  const parkRatio = topWards.reduce((sum, ward) => sum + ward.Parks / ward.Population * 10000, 0) / topWards.length;
  const theatreRatio = topWards.reduce((sum, ward) => sum + ward.Theatres / ward.Population * 10000, 0) / topWards.length;
  const mallRatio = topWards.reduce((sum, ward) => sum + ward.Malls / ward.Population * 10000, 0) / topWards.length;
  const gardenRatio = topWards.reduce((sum, ward) => sum + ward.Gardens / ward.Population * 10000, 0) / topWards.length;
  const auditoriumRatio = topWards.reduce((sum, ward) => sum + ward.Auditoriums / ward.Population * 10000, 0) / topWards.length;
  
  // Return optimal ratios (facilities per 10,000 people)
  return {
    parks: parseFloat(parkRatio.toFixed(2)),
    theatres: parseFloat(theatreRatio.toFixed(2)),
    malls: parseFloat(mallRatio.toFixed(2)),
    gardens: parseFloat(gardenRatio.toFixed(2)),
    auditoriums: parseFloat(auditoriumRatio.toFixed(2))
  };
};
