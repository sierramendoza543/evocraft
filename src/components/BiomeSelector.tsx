'use client';

import { motion } from 'framer-motion';
import { useOrganismStore } from '@/store/useOrganismStore';
import { Biome } from '@/utils/biomes';
import { validateBiome, ValidationError, VALID_BIOMES } from '@/utils/validation';
import { useState } from 'react';

interface BiomeOption {
  id: Biome;
  name: string;
  description: string;
  icon: string;
  challenges: string[];
}

interface BiomeSelectorProps {
  onComplete?: () => void;
}

const biomes: BiomeOption[] = VALID_BIOMES.map(biome => {
  switch (biome) {
    case 'tundra':
      return {
        id: biome,
        name: 'Tundra',
        description: 'A harsh, cold environment with limited resources and extreme temperatures.',
        icon: '❄️',
        challenges: ['Extreme cold', 'Limited food sources', 'Long winters'],
      };
    case 'rainforest':
      return {
        id: biome,
        name: 'Rainforest',
        description: 'A humid, biodiverse environment with intense competition and dense vegetation.',
        icon: '🌴',
        challenges: ['High humidity', 'Intense competition', 'Dense vegetation'],
      };
    case 'desert':
      return {
        id: biome,
        name: 'Desert',
        description: 'A hot, arid environment with scarce water and extreme heat.',
        icon: '🏜️',
        challenges: ['Water scarcity', 'Extreme heat', 'Limited shelter'],
      };
    case 'ocean':
      return {
        id: biome,
        name: 'Ocean',
        description: 'A vast aquatic environment with unique pressures like water pressure and salinity levels.',
        icon: '🌊',
        challenges: ['Water pressure', 'Salinity levels', 'Limited oxygen'],
      };
  }
});

export default function BiomeSelector({ onComplete }: BiomeSelectorProps) {
  const { selectedBiome, setBiome } = useOrganismStore();
  const [error, setError] = useState<string | null>(null);

  const handleBiomeSelect = (biomeId: Biome) => {
    try {
      validateBiome(biomeId);
      setBiome(biomeId);
      setError(null);
    } catch (err) {
      setError(err instanceof ValidationError ? err.message : 'Invalid biome selection');
    }
  };

  return (
    <div className="space-y-8">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg"
        >
          {error}
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {biomes.map((biome) => (
          <motion.div
            key={biome.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleBiomeSelect(biome.id)}
            className={`p-6 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedBiome === biome.id
                ? 'bg-blue-600/50 border-2 border-blue-500 shadow-lg shadow-blue-500/20'
                : 'bg-gray-800/50 hover:bg-gray-700/50'
            }`}
          >
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-4xl">{biome.icon}</span>
              <h3 className="text-xl font-semibold">{biome.name}</h3>
            </div>
            <p className="text-gray-300 mb-4">{biome.description}</p>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-200">Environmental Challenges:</h4>
              <ul className="list-disc list-inside text-gray-300">
                {biome.challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedBiome && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onComplete}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium shadow-lg shadow-blue-500/20"
          >
            Continue to Simulation →
          </motion.button>
        </motion.div>
      )}
    </div>
  );
} 