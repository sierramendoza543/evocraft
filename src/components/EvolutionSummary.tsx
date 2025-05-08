'use client';

import { motion } from 'framer-motion';
import { useOrganismStore } from '@/store/useOrganismStore';
import { traitCompatibility } from '@/utils/scoring';

const compatibilityToScore = {
  'Excellent': 100,
  'Good': 75,
  'Poor': 40,
  'Unknown': 25
} as const;

export default function EvolutionSummary() {
  const { traits, selectedBiome, generationResults } = useOrganismStore();
  
  // Calculate statistics
  const totalGenerations = generationResults.length;
  const totalMutations = generationResults.filter(g => g.mutation !== undefined).length;
  const finalScore = generationResults[generationResults.length - 1]?.adaptationScore || 0;
  
  // Calculate trait scores
  const traitScores = Object.entries(traits).map(([trait, value]) => {
    const compatibility = traitCompatibility?.[trait]?.[selectedBiome]?.[value] ?? "Unknown";
    return {
      trait,
      score: compatibilityToScore[compatibility as keyof typeof compatibilityToScore]
    };
  });

  // Find strongest and weakest traits
  const strongestTrait = traitScores.length > 0 
    ? traitScores.reduce((a, b) => a.score > b.score ? a : b).trait
    : 'None';
  
  const weakestTrait = traitScores.length > 0
    ? traitScores.reduce((a, b) => a.score < b.score ? a : b).trait
    : 'None';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-gray-800/50 rounded-lg p-6 mb-8"
    >
      <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
        Evolution Report
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="bg-gray-700/50 rounded-lg p-4"
        >
          <div className="text-3xl mb-2">✅</div>
          <h3 className="font-semibold text-gray-300">Generations Survived</h3>
          <p className="text-2xl font-bold text-white">{totalGenerations}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="bg-gray-700/50 rounded-lg p-4"
        >
          <div className="text-3xl mb-2">⚖️</div>
          <h3 className="font-semibold text-gray-300">Total Mutations</h3>
          <p className="text-2xl font-bold text-white">{totalMutations}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          className="bg-gray-700/50 rounded-lg p-4"
        >
          <div className="text-3xl mb-2">🧬</div>
          <h3 className="font-semibold text-gray-300">Strongest Trait</h3>
          <p className="text-xl font-bold text-white capitalize">{strongestTrait}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
          className="bg-gray-700/50 rounded-lg p-4"
        >
          <div className="text-3xl mb-2">⚠️</div>
          <h3 className="font-semibold text-gray-300">Weakest Trait</h3>
          <p className="text-xl font-bold text-white capitalize">{weakestTrait}</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
        className="mt-6 text-center"
      >
        <h3 className="text-lg font-semibold text-gray-300">Final Adaptation Score</h3>
        <p className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
          {Math.round(finalScore)}%
        </p>
      </motion.div>
    </motion.div>
  );
} 