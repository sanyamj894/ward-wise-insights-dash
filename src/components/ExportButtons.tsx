
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileImage, FilePdf } from 'lucide-react';
import { exportAsImage, exportAsPDF } from '@/utils/exportUtils';
import { toast } from 'sonner';

interface ExportButtonsProps {
  elementId: string;
  filename: string;
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ elementId, filename }) => {
  const handleExportImage = async () => {
    try {
      await exportAsImage(elementId, filename);
      toast.success('Exported as PNG image successfully');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export image. Please try again.');
    }
  };

  const handleExportPDF = async () => {
    try {
      await exportAsPDF(elementId, filename);
      toast.success('Exported as PDF successfully');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export PDF. Please try again.');
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-1" 
        onClick={handleExportImage}
      >
        <FileImage className="h-4 w-4" />
        <span>Export PNG</span>
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-1" 
        onClick={handleExportPDF}
      >
        <FilePdf className="h-4 w-4" />
        <span>Export PDF</span>
      </Button>
    </div>
  );
};

export default ExportButtons;
