'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useOrganismStore } from '@/store/useOrganismStore';
import TraitSummary from '@/components/TraitSummary';
import MutationLog from '@/components/MutationLog';
import ResultsChart from '@/components/ResultsChart';
import GptFeedback from '@/components/GptFeedback';
import FinalActions from '@/components/FinalActions';
import EvolutionSummary from '@/components/EvolutionSummary';

export default function ResultsPage() {
  const router = useRouter();
  const { generationResults, selectedBiome } = useOrganismStore();

  useEffect(() => {
    // Redirect if no simulation has been run
    if (generationResults.length === 0) {
      router.push('/simulator/traits');
    }
  }, [generationResults.length, router]);

  if (generationResults.length === 0) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text mb-12">
          Evolution Results
        </h1>

        <EvolutionSummary />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TraitSummary />
          <MutationLog />
        </div>

        <ResultsChart />
        <GptFeedback />
        <FinalActions />
      </div>
    </main>
  );
} 