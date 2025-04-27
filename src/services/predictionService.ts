
import { WardData, PredictionInputs } from '@/types';

const API_URL = 'http://0.0.0.0:8000';

export const getPredictions = async (inputs: PredictionInputs): Promise<WardData[]> => {
  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Prediction API error:', error);
    throw error;
  }
};

