
import Papa from 'papaparse';
import { WardData } from '@/types';

export const parseCSV = (file: File): Promise<WardData[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        try {
          const data = results.data.map((row: any) => ({
            Ward: row.Ward,
            Population: Number(row.Population || 0),
            Theatres: Number(row.Theatres || 0),
            Malls: Number(row.Malls || 0),
            Parks: Number(row.Parks || 0),
            Gardens: Number(row.Gardens || 0),
            Auditoriums: Number(row.Auditoriums || 0),
            TotalInfrastructure: Number(row.TotalInfrastructure || 0),
            HappinessIndex: Number(row.HappinessIndex || 0),
            Year: Number(row.Year || 0)
          }));
          resolve(data as WardData[]);
        } catch (error) {
          reject(new Error('Error parsing CSV data. Please check the format.'));
        }
      },
      error: (error) => {
        reject(new Error(`CSV parsing error: ${error.message}`));
      }
    });
  });
};
