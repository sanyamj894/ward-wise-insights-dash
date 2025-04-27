
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Sparkles } from 'lucide-react';

interface OptimizationPanelProps {
  optimizationData: { [key: string]: number };
}

const OptimizationPanel: React.FC<OptimizationPanelProps> = ({ optimizationData }) => {
  // Sort infrastructure types by their optimal values
  const sortedTypes = Object.entries(optimizationData)
    .sort(([, a], [, b]) => b - a);
  
  // Calculate total to derive percentages
  const total = sortedTypes.reduce((sum, [, value]) => sum + value, 0);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Infrastructure Optimization</CardTitle>
        </div>
        <CardDescription>
          Optimal ratios per 10,000 residents based on happiest wards
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sortedTypes.map(([type, value]) => {
            const percentage = total > 0 ? (value / total) * 100 : 0;
            
            return (
              <div key={type} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm capitalize">{type}</span>
                  <span className="text-sm font-medium">{value.toFixed(2)}</span>
                </div>
                <Progress value={percentage} className="h-2" />
                <span className="text-xs text-muted-foreground">
                  {percentage.toFixed(1)}% of optimal infrastructure mix
                </span>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 text-sm">
          <p className="font-medium">Recommendations:</p>
          <ul className="list-disc pl-4 mt-1 text-xs text-muted-foreground space-y-1">
            <li>Focus on highest-ratio infrastructure types</li>
            <li>Balance development across all categories</li>
            <li>Adapt based on ward-specific population needs</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default OptimizationPanel;
