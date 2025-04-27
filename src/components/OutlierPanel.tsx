
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface OutlierPanelProps {
  outlierWards: string[];
  metricName: string;
}

const OutlierPanel: React.FC<OutlierPanelProps> = ({ outlierWards, metricName }) => {
  if (outlierWards.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Outlier Analysis</CardTitle>
          <CardDescription>
            No outliers detected for {metricName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            All wards show expected values within normal ranges.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-amber-500" />
          <CardTitle className="text-lg">Outlier Analysis</CardTitle>
        </div>
        <CardDescription>
          Wards showing abnormal {metricName} values
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {outlierWards.map((ward, index) => (
            <motion.div 
              key={ward}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className="bg-amber-50">Anomaly</Badge>
                <span>{ward}</span>
              </div>
              
              <div className="text-xs text-muted-foreground">
                Investigate potential factors
              </div>
            </motion.div>
          ))}
        </div>
        
        <Separator className="my-4" />
        
        <div className="text-xs text-muted-foreground">
          <p>Outliers may indicate:</p>
          <ul className="list-disc pl-4 mt-1">
            <li>Data collection errors</li>
            <li>Unusual development patterns</li>
            <li>Special circumstances in these areas</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default OutlierPanel;
