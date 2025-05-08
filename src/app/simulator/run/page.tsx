'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useOrganismStore } from '@/store/useOrganismStore';
import EvolutionEngine from '@/components/EvolutionEngine';

export default function SimulationRun() {
  const router = useRouter();
  const { traits, selectedBiome } = useOrganismStore();

  // Redirect if no traits or biome selected
  useEffect(() => {
    const hasTraits = Object.values(traits).every(value => value !== '');
    if (!hasTraits) {
      router.push('/simulator/traits');
    } else if (!selectedBiome) {
      router.push('/simulator/biome');
    }
  }, [traits, selectedBiome, router]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Evolution Simulation
        </h1>

        <EvolutionEngine />
      </div>
    </main>
  );
} 