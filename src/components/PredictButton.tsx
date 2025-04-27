
import React from 'react';
import { Button } from '@/components/ui/button';

interface PredictButtonProps {
  onPredict: () => void;
  disabled?: boolean;
}

const PredictButton: React.FC<PredictButtonProps> = ({ onPredict, disabled }) => {
  return (
    <Button 
      onClick={onPredict} 
      disabled={disabled}
      className="w-full lg:w-auto"
      variant="default"
    >
      Generate Predictions
    </Button>
  );
};

export default PredictButton;
