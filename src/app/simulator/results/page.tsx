'use client';

import { motion } from 'framer-motion';
import { useOrganismStore } from '@/store/useOrganismStore';
import TraitSummary from '@/components/TraitSummary';
import MutationLog from '@/components/MutationLog';
import ResultsChart from '@/components/ResultsChart';
import EvolutionSummary from '@/components/EvolutionSummary';
import GptFeedback from '@/components/GptFeedback';
import FinalActions from '@/components/FinalActions';
import PageWrapper from '@/components/PageWrapper';

export default function ResultsPage() {
  const { generationResults } = useOrganismStore();

  // Early return if no simulation data is available
  if (!generationResults || generationResults.length === 0) {
    return (
      <PageWrapper>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-gray-800/50 rounded-lg p-6 mb-8"
        >
          <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
            Evolution Results
          </h1>
          <div className="bg-gray-700/50 rounded-lg p-6">
            <p className="text-lg text-gray-200 leading-relaxed text-center">
              No simulation data available. Please run a simulation first.
            </p>
          </div>
        </motion.div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-gray-800/50 rounded-lg p-6 mb-8"
      >
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
          Evolution Results
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        className="space-y-8"
      >
        <EvolutionSummary />
        <ResultsChart />
        <TraitSummary />
        <MutationLog />
        <GptFeedback />
        <FinalActions />
      </motion.div>
    </PageWrapper>
  );
} 