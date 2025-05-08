'use client';

import { motion } from 'framer-motion';
import { useOrganismStore } from '@/store/useOrganismStore';
import { biomeIcons, Biome } from '@/utils/biomes';
import { traitCompatibility } from '@/utils/scoring';

const compatibilityToScore = {
  'Excellent': 100,
  'Good': 75,
  'Poor': 40,
  'Unknown': 25
} as const;

export default function TraitSummary() {
  const { traits, selectedBiome, generationResults } = useOrganismStore();

  // Early return if required data is missing
  if (!traits || !selectedBiome || !generationResults || generationResults.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-gray-800/50 rounded-lg p-6 mb-8"
      >
        <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
          Trait Analysis
        </h2>
        <div className="bg-gray-700/50 rounded-lg p-6">
          <p className="text-lg text-gray-200 leading-relaxed">
            No trait data available. Please complete a simulation first.
          </p>
        </div>
      </motion.div>
    );
  }

  const biomeName = selectedBiome.charAt(0).toUpperCase() + selectedBiome.slice(1);
  const biomeIcon = biomeIcons[selectedBiome as Biome] || '🌍';

  // Define trait categories and their display names
  const traitCategories = {
    covering: 'Body Covering',
    locomotion: 'Movement',
    metabolism: 'Metabolism',
    behavior: 'Behavior',
    reproduction: 'Reproduction'
  } as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-gray-800/50 rounded-lg p-6 mb-8"
    >
      <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
        Trait Analysis
      </h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-300 mb-4">
          Selected Biome: {biomeName} {biomeIcon}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(traitCategories).map(([category, displayName], index) => {
          const trait = traits[category as keyof typeof traits];
          const compatibility = traitCompatibility?.[category]?.[selectedBiome]?.[trait] ?? "Unknown";
          const score = compatibilityToScore[compatibility];
          
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
              className="bg-gray-700/50 rounded-lg p-4"
            >
              <h4 className="text-lg font-semibold text-gray-300 mb-2">{displayName}</h4>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Selected Trait:</span>
                <span className="font-medium text-white capitalize">{trait}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Compatibility:</span>
                <span className={`font-medium ${
                  compatibility === 'Excellent' ? 'text-green-400' :
                  compatibility === 'Good' ? 'text-yellow-400' :
                  compatibility === 'Poor' ? 'text-red-400' :
                  'text-gray-400'
                }`}>
                  {compatibility}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Score:</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-600 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.1 }}
                      className={`h-full ${
                        score >= 75 ? 'bg-green-400' :
                        score >= 50 ? 'bg-yellow-400' :
                        'bg-red-400'
                      }`}
                    />
                  </div>
                  <span className={`font-medium ${
                    score >= 75 ? 'text-green-400' :
                    score >= 50 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {score}%
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
} 