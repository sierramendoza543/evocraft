'use client';

import { motion } from 'framer-motion';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart,
  Cell,
  Bar
} from 'recharts';
import { useOrganismStore } from '@/store/useOrganismStore';

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: {
      generation: number;
      score: number;
      mutation: boolean;
    };
  }>;
  label?: number;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    const score = payload[0].value;
    const hasMutation = payload[0].payload.mutation;
    
    let status = '';
    let color = '';

    if (score >= 70) {
      status = 'Excellent adaptation';
      color = 'text-green-400';
    } else if (score >= 40) {
      status = 'Moderate adaptation';
      color = 'text-yellow-400';
    } else {
      status = 'Poor adaptation';
      color = 'text-red-400';
    }

    return (
      <div className="bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-700">
        <p className="text-white font-semibold">Generation {label}</p>
        <p className={`${color} font-medium`}>
          Score: {score} — {status}
          {hasMutation && ' (Mutation occurred)'}
        </p>
      </div>
    );
  }
  return null;
};

export default function ResultsChart() {
  const { generationResults } = useOrganismStore();

  // Early return if no simulation data is available
  if (!generationResults || generationResults.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-gray-800/50 rounded-lg p-6 mb-8"
      >
        <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
          Adaptation Score Over Time
        </h2>
        <div className="h-[400px] w-full flex items-center justify-center">
          <p className="text-gray-400">No simulation data available</p>
        </div>
      </motion.div>
    );
  }

  // Map the exact generation results from the simulation
  const data = generationResults.map(result => ({
    generation: result.generation,
    score: Math.round(result.adaptationScore),
    mutation: result.mutation !== undefined
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-gray-800/50 rounded-lg p-6 mb-8"
    >
      <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
        Adaptation Score Over Time
      </h2>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis
              dataKey="generation"
              stroke="#888"
              label={{ value: 'Generation', position: 'insideBottom', offset: -5 }}
              domain={[1, 5]}
              ticks={[1, 2, 3, 4, 5]}
            />
            <YAxis
              stroke="#888"
              label={{ value: 'Adaptation Score', angle: -90, position: 'insideLeft' }}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="score"
              fill="#8884d8"
              radius={[4, 4, 0, 0]}
              barSize={40}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.score >= 70
                      ? '#4ade80'
                      : entry.score >= 40
                      ? '#facc15'
                      : '#f87171'
                  }
                />
              ))}
            </Bar>
            <Line
              type="monotone"
              dataKey="score"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ fill: '#8884d8', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
} 