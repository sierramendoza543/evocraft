'use client';

import { motion } from 'framer-motion';
import { useOrganismStore } from '@/store/useOrganismStore';

export default function MutationLog() {
  const { generationResults } = useOrganismStore();

  // Filter generations that had mutations
  const mutations = generationResults
    .filter(result => result.mutation !== undefined)
    .map(result => ({
      generation: result.generation,
      ...result.mutation
    }));

  if (mutations.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 rounded-lg p-6 mb-8"
      >
        <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
          Mutation History
        </h2>
        <div className="bg-gray-700/50 rounded-lg p-6">
          <p className="text-lg text-gray-200 leading-relaxed text-center">
            No mutations occurred during this simulation.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 rounded-lg p-6 mb-8"
    >
      <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
        Mutation History
      </h2>

      <div className="space-y-4">
        {mutations.map((mutation, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-700/50 rounded-lg p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🧬</span>
              <h3 className="font-semibold text-white">Generation {mutation.generation}</h3>
            </div>
            <div className="text-gray-300">
              <p>
                <span className="text-gray-400">Trait:</span>{' '}
                <span className="capitalize">{mutation.trait}</span>
              </p>
              <p>
                <span className="text-gray-400">Change:</span>{' '}
                <span className="capitalize">{mutation.oldValue}</span>{' '}
                <span className="text-gray-500">→</span>{' '}
                <span className="capitalize">{mutation.newValue}</span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
} 