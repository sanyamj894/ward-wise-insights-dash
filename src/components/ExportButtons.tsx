import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { toast } from 'sonner';

interface ExportButtonsProps {
  elementId: string;
  filename: string;
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ elementId, filename }) => {
  const exportAsImage = async () => {
    const element = document.getElementById(elementId);
    if (!element) {
      toast.error(`Element with ID ${elementId} not found`);
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: '#ffffff'
      });

      const dataUrl = canvas.toDataURL('image/png');
      
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${filename}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Image export successful');
    } catch (error) {
      console.error('Error exporting image:', error);
      toast.error('Failed to export as image. Please try again.');
    }
  };

  const exportAsPDF = async () => {
    const element = document.getElementById(elementId);
    if (!element) {
      toast.error(`Element with ID ${elementId} not found`);
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm'
      });
      
      // Calculate dimensions
      const imgWidth = 280;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Add image to PDF
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save(`${filename}.pdf`);
      toast.success('PDF export successful');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast.error('Failed to export as PDF. Please try again.');
    }
  };

  const downloadSourceCode = async () => {
    try {
      // In a real Lovable environment, this would be a platform-specific method
      // For demonstration, we'll simulate a download process
      toast.info('Source code download initiated');
      
      // Normally, this would trigger a server-side ZIP generation
      const sourceCodeUrl = '/download-source-code';
      
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = sourceCodeUrl;
      link.download = 'ward-insights-dashboard-source.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Source code download started');
    } catch (error) {
      console.error('Error downloading source code:', error);
      toast.error('Failed to download source code');
    }
  };

  return (
    <div className="flex space-x-2">
      <Button variant="outline" onClick={exportAsImage}>
        Export as Image
      </Button>
      <Button variant="outline" onClick={exportAsPDF}>
        Export as PDF
      </Button>
      <Button 
        variant="outline" 
        onClick={downloadSourceCode}
        className="gap-2"
      >
        <Download className="h-4 w-4" />
        Download Source Code
      </Button>
    </div>
  );
};

export default ExportButtons;
