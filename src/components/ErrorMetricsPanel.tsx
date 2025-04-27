
import React from 'react';
import { ErrorMetrics } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface ErrorMetricsPanelProps {
  metrics: ErrorMetrics;
  metricName: string;
}

const ErrorMetricsPanel: React.FC<ErrorMetricsPanelProps> = ({ metrics, metricName }) => {
  const formatValue = (value: number) => {
    return value.toFixed(2);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Error Metrics for {metricName}</CardTitle>
        <CardDescription>
          Statistical measures of prediction accuracy
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <motion.div 
            className="flex flex-col items-center p-3 bg-secondary rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-sm text-muted-foreground">RMSE</span>
            <span className="text-2xl font-bold">{formatValue(metrics.rmse)}</span>
            <span className="text-xs text-muted-foreground mt-1">Root Mean Squared Error</span>
          </motion.div>
          
          <motion.div 
            className="flex flex-col items-center p-3 bg-secondary rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <span className="text-sm text-muted-foreground">MAE</span>
            <span className="text-2xl font-bold">{formatValue(metrics.mae)}</span>
            <span className="text-xs text-muted-foreground mt-1">Mean Absolute Error</span>
          </motion.div>
          
          <motion.div 
            className="flex flex-col items-center p-3 bg-secondary rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <span className="text-sm text-muted-foreground">MAPE (%)</span>
            <span className="text-2xl font-bold">{formatValue(metrics.mape)}%</span>
            <span className="text-xs text-muted-foreground mt-1">Mean Absolute Percentage Error</span>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ErrorMetricsPanel;
