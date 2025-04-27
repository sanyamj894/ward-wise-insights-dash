
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { ChartData } from '@/types';

interface ComparisonChartProps {
  title: string;
  description: string;
  data: ChartData[];
  dataKey: string;
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({
  title,
  description,
  data,
  dataKey,
}) => {
  return (
    <Card className="w-full h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={70}
              />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => {
                  return [value, name === 'historical' ? 'Historical' : 'Predicted'];
                }}
                labelFormatter={(label) => `Ward: ${label}`}
              />
              <Legend />
              <Bar 
                dataKey="historical" 
                fill="#4169E1" 
                name="Historical" 
                barSize={20}
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="predicted" 
                fill="#2E8B57" 
                name="Predicted" 
                barSize={20}
                radius={[4, 4, 0, 0]} 
              />
              <ReferenceLine y={0} stroke="#000" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComparisonChart;
