
import React from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface WardSelectorProps {
  availableWards: string[];
  selectedWards: string[];
  onChange: (selectedWards: string[]) => void;
}

const WardSelector: React.FC<WardSelectorProps> = ({
  availableWards,
  selectedWards,
  onChange,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (ward: string) => {
    const isSelected = selectedWards.includes(ward);
    let newSelectedWards: string[];
    
    if (isSelected) {
      newSelectedWards = selectedWards.filter(w => w !== ward);
    } else {
      newSelectedWards = [...selectedWards, ward];
    }
    
    onChange(newSelectedWards);
  };

  const selectAll = () => {
    onChange([...availableWards]);
  };

  const clearAll = () => {
    onChange([]);
  };

  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium leading-none mb-1">
        Select Wards
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="min-w-[200px] justify-between"
          >
            {selectedWards.length === 0
              ? "Select wards..."
              : selectedWards.length === 1
              ? selectedWards[0]
              : `${selectedWards.length} wards selected`}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search wards..." />
            <div className="flex justify-between p-2 border-b">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={selectAll} 
                className="text-xs"
              >
                Select All
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAll} 
                className="text-xs"
              >
                Clear All
              </Button>
            </div>
            <CommandEmpty>No ward found.</CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-y-auto">
              {availableWards.map(ward => (
                <CommandItem
                  key={ward}
                  value={ward}
                  onSelect={() => handleSelect(ward)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedWards.includes(ward) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {ward}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default WardSelector;
