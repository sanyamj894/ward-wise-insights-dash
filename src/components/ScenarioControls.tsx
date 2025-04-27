
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ScenarioControlsProps {
  populationGrowthRate: number;
  setPopulationGrowthRate: (value: number) => void;
  infrastructureInvestment: number;
  setInfrastructureInvestment: (value: number) => void;
  policyEffectiveness: number;
  setPolicyEffectiveness: (value: number) => void;
}

const ScenarioControls: React.FC<ScenarioControlsProps> = ({
  populationGrowthRate,
  setPopulationGrowthRate,
  infrastructureInvestment,
  setInfrastructureInvestment,
  policyEffectiveness,
  setPolicyEffectiveness
}) => {
  return (
    <div className="flex flex-col space-y-6 p-4 bg-card rounded-lg border shadow-sm">
      <h3 className="text-lg font-medium">Development Scenario Controls</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Population Growth Rate (%)</Label>
            <span className="text-sm font-medium">{populationGrowthRate.toFixed(1)}%</span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Slider
                  value={[populationGrowthRate]}
                  min={0}
                  max={10}
                  step={0.1}
                  onValueChange={(value) => setPopulationGrowthRate(value[0])}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">Adjust annual population growth rate</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Infrastructure Investment (%)</Label>
            <span className="text-sm font-medium">{infrastructureInvestment.toFixed(1)}%</span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Slider
                  value={[infrastructureInvestment]}
                  min={0}
                  max={20}
                  step={0.5}
                  onValueChange={(value) => setInfrastructureInvestment(value[0])}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">Percentage of budget allocated to new infrastructure</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Policy Effectiveness (%)</Label>
            <span className="text-sm font-medium">{policyEffectiveness.toFixed(1)}%</span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Slider
                  value={[policyEffectiveness]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={(value) => setPolicyEffectiveness(value[0])}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">How effectively policies are implemented and enforced</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default ScenarioControls;
