
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { WardData } from '@/types';

interface HappinessIndexChartProps {
  wardData: WardData[];
  predictedData: WardData[];
}

const HappinessIndexChart: React.FC<HappinessIndexChartProps> = ({
  wardData,
  predictedData
}) => {
  // Generate a map of ward to color for consistent coloring
  const uniqueWards = [...new Set([...wardData, ...predictedData].map(item => item.Ward))];
  const colors = [
    '#4169E1', '#2E8B57', '#8A2BE2', '#FF69B4', '#FF8C00', 
    '#DC143C', '#20B2AA', '#9370DB', '#3CB371', '#F08080'
  ];
  
  const wardColors = uniqueWards.reduce((acc, ward, index) => {
    acc[ward] = colors[index % colors.length];
    return acc;
  }, {} as {[key: string]: string});
  
  // Prepare data for the chart
  const chartData = wardData.concat(predictedData).map(data => ({
    Ward: data.Ward,
    Year: data.Year,
    HappinessIndex: data.HappinessIndex,
    isPredicted: predictedData.some(p => p.Ward === data.Ward && p.Year === data.Year)
  }));

  // Group the data by ward
  const groupedByWard: {[ward: string]: any[]} = {};
  chartData.forEach(item => {
    if (!groupedByWard[item.Ward]) {
      groupedByWard[item.Ward] = [];
    }
    
    // Check if we already have this year/ward combination
    const existingEntry = groupedByWard[item.Ward].find(
      entry => entry.Year === item.Year
    );
    
    if (!existingEntry) {
      groupedByWard[item.Ward].push(item);
    }
  });
  
  // Sort each ward's data by year
  Object.keys(groupedByWard).forEach(ward => {
    groupedByWard[ward].sort((a, b) => a.Year - b.Year);
  });

  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Happiness Index Trends</CardTitle>
        <CardDescription>
          Historical trends and predictions by ward over time
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="Year" 
                type="number" 
                domain={['dataMin', 'dataMax']}
                allowDuplicatedCategory={false}
              />
              <YAxis 
                domain={[0, 10]}
                label={{ 
                  value: 'Happiness Index', 
                  angle: -90, 
                  position: 'insideLeft' 
                }} 
              />
              <Tooltip 
                formatter={(value, name) => [value, name]}
                labelFormatter={(label) => `Year: ${label}`}
              />
              <Legend />
              
              {Object.keys(groupedByWard).map((ward) => (
                <Line
                  key={ward}
                  data={groupedByWard[ward]}
                  type="monotone"
                  dataKey="HappinessIndex"
                  name={ward}
                  stroke={wardColors[ward]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default HappinessIndexChart;
