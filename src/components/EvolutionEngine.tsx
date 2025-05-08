'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useOrganismStore } from '@/store/useOrganismStore';
import { calculateFitness } from '@/utils/scoring';

interface GenerationCardProps {
  generation: number;
  result: {
    survived: boolean;
    adaptationScore: number;
    notes: string[];
    mutation?: {
      trait: string;
      from: string;
      to: string;
    };
  };
}

function GenerationCard({ generation, result }: GenerationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-lg ${
        result.survived ? 'bg-green-900/50' : 'bg-red-900/50'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Generation {generation}</h3>
        <div className="flex items-center space-x-2">
          <span className="text-2xl">
            {result.survived ? '✅' : '❌'}
          </span>
          <span className="font-medium">
            Score: {Math.round(result.adaptationScore)}%
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        {result.notes.map((note, index) => (
          <p key={index} className="text-gray-300">
            {note}
          </p>
        ))}
        {result.mutation && (
          <p className="text-blue-400">
            Mutation occurred: {result.mutation.trait} changed from {result.mutation.from} to {result.mutation.to}
          </p>
        )}
      </div>
    </motion.div>
  );
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const traitOptions = {
  covering: ['fur', 'scales', 'feathers', 'skin'],
  metabolism: ['warm', 'cold'],
  locomotion: ['walking', 'swimming', 'flying'],
  reproduction: ['sexual', 'asexual'],
  limbs: ['none', 'legs', 'fins', 'wings'],
  senses: ['sight', 'smell', 'echolocation'],
  behavior: ['social', 'solitary', 'nocturnal'],
};

export default function EvolutionEngine() {
  const router = useRouter();
  const { traits, selectedBiome, addGenerationResult } = useOrganismStore();
  const [currentGeneration, setCurrentGeneration] = useState(1);
  const [isSimulating, setIsSimulating] = useState(true);
  const [results, setResults] = useState<Array<{
    survived: boolean;
    adaptationScore: number;
    notes: string[];
    mutation?: {
      trait: string;
      from: string;
      to: string;
    };
  }>>([]);

  useEffect(() => {
    const simulateGeneration = async () => {
      if (isSimulating && currentGeneration <= 5) {
        // Simulate mutation (10-15% chance)
        const mutation = Math.random() < 0.12; // 12% chance
        let mutatedTraits = { ...traits };
        let mutationResult;

        if (mutation) {
          const traitKeys = Object.keys(traits) as Array<keyof typeof traits>;
          const randomTrait = traitKeys[Math.floor(Math.random() * traitKeys.length)];
          const oldValue = traits[randomTrait];
          
          // Get possible values for this trait
          const possibleValues = traitOptions[randomTrait as keyof typeof traitOptions];
          
          // Choose a new value different from the current one
          const newValue = possibleValues.find(v => v !== oldValue) || oldValue;
          
          mutatedTraits[randomTrait] = newValue;
          mutationResult = {
            trait: randomTrait,
            from: oldValue,
            to: newValue,
          };
        }

        const result = calculateFitness({
          traits: mutatedTraits,
          biome: selectedBiome,
          generation: currentGeneration,
          mutation,
        });

        const resultWithMutation = {
          ...result,
          generation: currentGeneration,
          mutation: mutationResult,
        };

        console.log(`Generation ${currentGeneration}:`, resultWithMutation);
        
        setResults(prev => [...prev, resultWithMutation]);
        addGenerationResult(resultWithMutation);
        
        // Wait before next generation
        await delay(2000);
        setCurrentGeneration(prev => prev + 1);
      } else if (currentGeneration > 5) {
        setIsSimulating(false);
        // Wait 3 seconds before redirecting to results
        await delay(3000);
        router.push('/results');
      }
    };

    simulateGeneration();
  }, [currentGeneration, isSimulating, traits, selectedBiome, addGenerationResult, router]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Evolution Simulation</h2>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-gray-300">
            {isSimulating ? 'Simulating...' : 'Simulation Complete'}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {results.map((result, index) => (
            <GenerationCard
              key={index}
              generation={index + 1}
              result={result}
            />
          ))}
        </AnimatePresence>
      </div>

      {!isSimulating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8"
        >
          <p className="text-xl mb-4">
            Simulation complete! Your organism survived {results.filter(r => r.survived).length} out of 5 generations.
          </p>
        </motion.div>
      )}
    </div>
  );
} 