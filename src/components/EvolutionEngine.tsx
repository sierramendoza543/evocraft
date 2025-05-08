'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useOrganismStore, OrganismTraits, GenerationResult } from '@/store/useOrganismStore';
import { calculateFitness } from '@/utils/scoring';
import { Biome } from '@/utils/biomes';
import { validateTraits, validateBiome, validateGenerationResult, ValidationError, VALID_TRAITS } from '@/utils/validation';

interface GenerationCardProps {
  generation: number;
  result: GenerationResult;
}

function GenerationCard({ generation, result }: GenerationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-6 rounded-lg ${
        result.adaptationScore >= 30 ? 'bg-green-900/50' : 'bg-red-900/50'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Generation {generation}</h3>
        <div className="flex items-center space-x-2">
          <span className="text-2xl">
            {result.adaptationScore >= 30 ? '✅' : '❌'}
          </span>
          <span className="font-medium">
            Score: {Math.round(result.adaptationScore)}%
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        {result.mutation && (
          <p className="text-blue-400">
            Mutation occurred: {String(result.mutation.trait)} changed from {result.mutation.oldValue} to {result.mutation.newValue}
          </p>
        )}
      </div>
    </motion.div>
  );
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export default function EvolutionEngine() {
  const router = useRouter();
  const { traits, selectedBiome, addGenerationResult } = useOrganismStore();
  const [currentGeneration, setCurrentGeneration] = useState(1);
  const [isSimulating, setIsSimulating] = useState(true);
  const [results, setResults] = useState<GenerationResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Early return if required data is missing
  if (!selectedBiome || !traits) {
    return (
      <div className="text-center p-8">
        <p className="text-red-400">Missing required data. Please select a biome and traits first.</p>
      </div>
    );
  }

  useEffect(() => {
    const simulateGeneration = async () => {
      try {
        if (isSimulating && currentGeneration <= 5 && selectedBiome) {
          // Validate inputs
          validateTraits(traits);
          validateBiome(selectedBiome);

          // Simulate mutation (10-15% chance)
          const mutation = Math.random() < 0.12; // 12% chance
          const mutatedTraits = { ...traits };
          let mutationResult: GenerationResult['mutation'] | undefined;

          if (mutation) {
            const traitKeys = Object.keys(traits) as Array<keyof OrganismTraits>;
            const randomTrait = traitKeys[Math.floor(Math.random() * traitKeys.length)];
            const oldValue = traits[randomTrait];
            
            // Get possible values for this trait
            const possibleValues = VALID_TRAITS[randomTrait];
            
            // Choose a new value different from the current one
            const newValue = possibleValues.find(v => v !== oldValue) || oldValue;
            
            mutatedTraits[randomTrait] = newValue;
            mutationResult = {
              trait: randomTrait,
              oldValue,
              newValue,
            };
          }

          const result = calculateFitness({
            traits: mutatedTraits,
            biome: selectedBiome,
            generation: currentGeneration,
            mutation,
          });

          const resultWithMutation: GenerationResult = {
            ...result,
            generation: currentGeneration,
            mutation: mutationResult,
          };

          // Validate the result before adding it
          validateGenerationResult(resultWithMutation);

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
      } catch (err) {
        setError(err instanceof ValidationError ? err.message : 'An unexpected error occurred');
        setIsSimulating(false);
      }
    };

    simulateGeneration();
  }, [currentGeneration, isSimulating, traits, selectedBiome, addGenerationResult, router]);

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-400">{error}</p>
        <button
          onClick={() => router.push('/simulator/traits')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Start Over
        </button>
      </div>
    );
  }

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
            Simulation complete! Your organism survived {results.filter(r => r.adaptationScore >= 30).length} out of 5 generations.
          </p>
        </motion.div>
      )}
    </div>
  );
} 