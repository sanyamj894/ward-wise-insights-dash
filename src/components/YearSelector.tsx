
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface YearSelectorProps {
  availableYears: number[];
  selectedYear: number;
  onChange: (year: number) => void;
}

const YearSelector: React.FC<YearSelectorProps> = ({
  availableYears,
  selectedYear,
  onChange
}) => {
  const handleYearChange = (value: string) => {
    onChange(parseInt(value, 10));
  };

  return (
    <div className="flex flex-col space-y-1">
      <Label htmlFor="year-selector">Select Prediction Year</Label>
      <Select
        value={selectedYear.toString()}
        onValueChange={handleYearChange}
      >
        <SelectTrigger id="year-selector" className="w-full">
          <SelectValue placeholder="Select year" />
        </SelectTrigger>
        <SelectContent>
          {availableYears.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default YearSelector;
