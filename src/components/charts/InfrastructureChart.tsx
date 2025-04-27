
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { WardData } from '@/types';

interface InfrastructureChartProps {
  wardData: WardData[];
}

const InfrastructureChart: React.FC<InfrastructureChartProps> = ({ wardData }) => {
  // Prepare data for the radar chart by averaging infrastructure metrics
  const prepareRadarData = () => {
    // Group by ward
    const wardGroups: { [key: string]: WardData[] } = {};
    wardData.forEach(item => {
      if (!wardGroups[item.Ward]) {
        wardGroups[item.Ward] = [];
      }
      wardGroups[item.Ward].push(item);
    });
    
    // Get latest data for each ward
    const latestData = Object.keys(wardGroups).map(ward => {
      const items = wardGroups[ward];
      return items.reduce((latest, current) => {
        return current.Year > latest.Year ? current : latest;
      });
    });
    
    // Transform to radar format
    return [
      { name: 'Parks', ...latestData.reduce((acc, ward) => {
        acc[ward.Ward] = ward.Parks;
        return acc;
      }, {} as Record<string, number>) },
      { name: 'Theatres', ...latestData.reduce((acc, ward) => {
        acc[ward.Ward] = ward.Theatres;
        return acc;
      }, {} as Record<string, number>) },
      { name: 'Malls', ...latestData.reduce((acc, ward) => {
        acc[ward.Ward] = ward.Malls;
        return acc;
      }, {} as Record<string, number>) },
      { name: 'Gardens', ...latestData.reduce((acc, ward) => {
        acc[ward.Ward] = ward.Gardens;
        return acc;
      }, {} as Record<string, number>) },
      { name: 'Auditoriums', ...latestData.reduce((acc, ward) => {
        acc[ward.Ward] = ward.Auditoriums;
        return acc;
      }, {} as Record<string, number>) }
    ];
  };
  
  const radarData = prepareRadarData();
  
  // Generate colors for each ward
  const uniqueWards = [...new Set(wardData.map(item => item.Ward))];
  const colors = [
    '#4169E1', '#2E8B57', '#8A2BE2', '#FF69B4', '#FF8C00', 
    '#DC143C', '#20B2AA', '#9370DB', '#3CB371', '#F08080'
  ];
  
  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Infrastructure Mix Analysis</CardTitle>
        <CardDescription>
          Distribution of infrastructure types by ward
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius={90} data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
              <Tooltip />
              <Legend />
              
              {uniqueWards.map((ward, index) => (
                <Radar
                  key={ward}
                  name={ward}
                  dataKey={ward}
                  stroke={colors[index % colors.length]}
                  fill={colors[index % colors.length]}
                  fillOpacity={0.3}
                />
              ))}
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfrastructureChart;
