
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { getPredictions } from '@/services/predictionService';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CSVUploader from '@/components/CSVUploader';
import WardSelector from '@/components/WardSelector';
import YearSelector from '@/components/YearSelector';
import ScenarioControls from '@/components/ScenarioControls';
import ErrorMetricsPanel from '@/components/ErrorMetricsPanel';
import OutlierPanel from '@/components/OutlierPanel';
import OptimizationPanel from '@/components/OptimizationPanel';
import ExportButtons from '@/components/ExportButtons';
import PredictButton from '@/components/PredictButton';
import ComparisonChart from '@/components/charts/ComparisonChart';
import HappinessIndexChart from '@/components/charts/HappinessIndexChart';
import InfrastructureChart from '@/components/charts/InfrastructureChart';

import { WardData, ErrorMetrics, ChartData } from '@/types';
import { SAMPLE_WARD_DATA, AVAILABLE_WARDS, AVAILABLE_YEARS } from '@/utils/sampleData';
import { 
  calculateErrorMetrics,
  findOutliers,
  getOptimizationSuggestions
} from '@/utils/predictionModel';

const Dashboard = () => {
  const [wardData, setWardData] = useState<WardData[]>(SAMPLE_WARD_DATA);
  const [predictedData, setPredictedData] = useState<WardData[]>([]);
  
  const [selectedWards, setSelectedWards] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(2031);
  
  const [populationGrowthRate, setPopulationGrowthRate] = useState<number>(2.0);
  const [infrastructureInvestment, setInfrastructureInvestment] = useState<number>(5.0);
  const [policyEffectiveness, setPolicyEffectiveness] = useState<number>(70.0);
  
  const [errorMetrics, setErrorMetrics] = useState<ErrorMetrics>({ rmse: 0, mae: 0, mape: 0 });
  const [outlierWards, setOutlierWards] = useState<string[]>([]);
  const [optimizationData, setOptimizationData] = useState<{ [key: string]: number }>({
    parks: 0, theatres: 0, malls: 0, gardens: 0, auditoriums: 0
  });
  
  const [happinessChartData, setHappinessChartData] = useState<ChartData[]>([]);
  const [infraChartData, setInfraChartData] = useState<ChartData[]>([]);
  const [popChartData, setPopChartData] = useState<ChartData[]>([]);
  
  useEffect(() => {
    if (wardData.length === 0) {
      setWardData(SAMPLE_WARD_DATA);
    }
  }, []);

  useEffect(() => {
    updateChartData();
    updateAnalysisData();
  }, [wardData, predictedData, selectedWards]);

  const handleDataLoaded = (data: WardData[]) => {
    if (data && data.length > 0) {
      setWardData(data);
      toast.success(`Successfully loaded ${data.length} records`);
      
      const availableWards = [...new Set(data.map(item => item.Ward))];
      
      if (selectedWards.length === 0) {
        setSelectedWards(availableWards.slice(0, Math.min(3, availableWards.length)));
      }
    }
  };

  const generatePredictions = async () => {
    try {
      const filteredHistoricalData = selectedWards.length > 0
        ? wardData.filter(item => selectedWards.includes(item.Ward))
        : wardData;
      
      const predictions = await getPredictions({
        year: selectedYear,
        populationGrowthRate,
        infrastructureInvestment,
        policyEffectiveness,
        selectedWards
      });
      
      setPredictedData(predictions);
    } catch (error) {
      console.error('Prediction error:', error);
      toast.error('Failed to generate predictions. Please check your inputs and server connection.');
    }
  };

  const updateChartData = () => {
    const filteredHistorical = selectedWards.length > 0
      ? wardData.filter(item => selectedWards.includes(item.Ward))
      : wardData;
    
    const filteredPredictions = selectedWards.length > 0
      ? predictedData.filter(item => selectedWards.includes(item.Ward))
      : predictedData;
    
    const happinessData: ChartData[] = selectedWards.length > 0
      ? selectedWards.map(ward => {
          const historicalData = filteredHistorical.find(item => item.Ward === ward && item.Year === selectedYear);
          const predictedDataItem = filteredPredictions.find(item => item.Ward === ward && item.Year === selectedYear);
          
          return {
            name: ward,
            historical: historicalData?.HappinessIndex,
            predicted: predictedDataItem?.HappinessIndex
          };
        })
      : [];
    
    const infraData: ChartData[] = selectedWards.length > 0
      ? selectedWards.map(ward => {
          const historicalData = filteredHistorical.find(item => item.Ward === ward && item.Year === selectedYear);
          const predictedDataItem = filteredPredictions.find(item => item.Ward === ward && item.Year === selectedYear);
          
          return {
            name: ward,
            historical: historicalData?.TotalInfrastructure,
            predicted: predictedDataItem?.TotalInfrastructure
          };
        })
      : [];
    
    const popData: ChartData[] = selectedWards.length > 0
      ? selectedWards.map(ward => {
          const historicalData = filteredHistorical.find(item => item.Ward === ward && item.Year === selectedYear);
          const predictedDataItem = filteredPredictions.find(item => item.Ward === ward && item.Year === selectedYear);
          
          return {
            name: ward,
            historical: historicalData?.Population,
            predicted: predictedDataItem?.Population
          };
        })
      : [];
    
    setHappinessChartData(happinessData);
    setInfraChartData(infraData);
    setPopChartData(popData);
  };

  const updateAnalysisData = () => {
    const metrics = calculateErrorMetrics(
      wardData.filter(item => selectedWards.includes(item.Ward)), 
      predictedData.filter(item => selectedWards.includes(item.Ward)),
      'HappinessIndex'
    );
    setErrorMetrics(metrics);
    
    const outliers = findOutliers(
      predictedData.filter(item => selectedWards.includes(item.Ward)), 
      'HappinessIndex'
    );
    setOutlierWards(outliers);
    
    const optimization = getOptimizationSuggestions(
      wardData.filter(item => item.HappinessIndex > 6.0)
    );
    setOptimizationData(optimization);
  };

  const canPredict = wardData.length > 0 && selectedYear > 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-card rounded-lg border p-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Data & Controls</h2>
              
              <div className="space-y-4">
                <CSVUploader onDataLoaded={handleDataLoaded} />
                
                <div className="space-y-4 pt-2">
                  <WardSelector 
                    availableWards={AVAILABLE_WARDS} 
                    selectedWards={selectedWards}
                    onChange={setSelectedWards}
                  />
                  
                  <YearSelector
                    availableYears={AVAILABLE_YEARS}
                    selectedYear={selectedYear}
                    onChange={setSelectedYear}
                  />

                  {canPredict && (
                    <PredictButton
                      onPredict={generatePredictions}
                      disabled={!canPredict}
                    />
                  )}
                </div>
              </div>
            </div>
            
            <ScenarioControls
              populationGrowthRate={populationGrowthRate}
              setPopulationGrowthRate={setPopulationGrowthRate}
              infrastructureInvestment={infrastructureInvestment}
              setInfrastructureInvestment={setInfrastructureInvestment}
              policyEffectiveness={policyEffectiveness}
              setPolicyEffectiveness={setPolicyEffectiveness}
            />
            
            <ExportButtons 
              elementId="charts-container" 
              filename="ward-insights-dashboard" 
            />
          </div>
          
          <div className="lg:col-span-9" id="charts-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ComparisonChart
                  title="Happiness Index Comparison"
                  description={`Historical vs. Predicted for ${selectedYear}`}
                  data={happinessChartData}
                  dataKey="HappinessIndex"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <ComparisonChart
                  title="Infrastructure Comparison"
                  description={`Historical vs. Predicted for ${selectedYear}`}
                  data={infraChartData}
                  dataKey="TotalInfrastructure"
                />
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <ComparisonChart
                title="Population Comparison"
                description={`Historical vs. Predicted for ${selectedYear}`}
                data={popChartData}
                dataKey="Population"
              />
            </motion.div>
            
            <div className="grid grid-cols-1 mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <HappinessIndexChart wardData={wardData} predictedData={predictedData} />
              </motion.div>
            </div>
            
            {selectedWards.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <ErrorMetricsPanel metrics={errorMetrics} metricName="Happiness Index" />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <OutlierPanel outlierWards={outlierWards} metricName="Happiness Index" />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <OptimizationPanel optimizationData={optimizationData} />
                </motion.div>
              </div>
            )}
            
            {selectedWards.length > 0 && (
              <div className="grid grid-cols-1 mb-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <InfrastructureChart wardData={[...wardData, ...predictedData].filter(
                    item => selectedWards.includes(item.Ward)
                  )} />
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
