'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useOrganismStore } from '@/store/useOrganismStore';
import { validateGenerationResult, ValidationError } from '@/utils/validation';
import { useState } from 'react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: {
      generation: number;
      score: number;
    };
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const score = data.score;
    let status = '';
    let color = '';

    if (score >= 70) {
      status = 'Well Adapted';
      color = 'text-green-400';
    } else if (score >= 40) {
      status = 'Moderately Adapted';
      color = 'text-yellow-400';
    } else {
      status = 'Poorly Adapted';
      color = 'text-red-400';
    }

    return (
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-lg">
        <p className="text-gray-300">Generation {data.generation}</p>
        <p className="text-gray-300">Score: {score}</p>
        <p className={color}>{status}</p>
      </div>
    );
  }
  return null;
};

export default function ResultsChart() {
  const { generationResults } = useOrganismStore();
  const [error, setError] = useState<string | null>(null);

  if (!generationResults || generationResults.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-800/50 rounded-lg">
        <p className="text-gray-400">No simulation data available</p>
      </div>
    );
  }

  try {
    // Validate all generation results
    generationResults.forEach(result => {
      validateGenerationResult(result);
    });

    const data = generationResults.map((result, index) => ({
      generation: index + 1,
      score: Math.round(result.adaptationScore || 0),
    }));

    return (
      <div className="space-y-4">
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg">
            {error}
          </div>
        )}
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="generation" 
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
              />
              <YAxis 
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="score" 
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  } catch (err) {
    setError(err instanceof ValidationError ? err.message : 'Error processing chart data');
    return (
      <div className="flex items-center justify-center h-64 bg-gray-800/50 rounded-lg">
        <p className="text-red-400">Error displaying chart data</p>
      </div>
    );
  }
} 