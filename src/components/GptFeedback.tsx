'use client';

import { motion } from 'framer-motion';
import { useOrganismStore } from '@/store/useOrganismStore';
import { biomeIcons, Biome } from '@/utils/biomes';

export default function GptFeedback() {
  const { traits, selectedBiome, generationResults } = useOrganismStore();
  
  // Ensure we have data to display
  if (!generationResults || generationResults.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 rounded-lg p-6 mb-8"
      >
        <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
          Evolution Analysis
        </h2>
        <div className="bg-gray-700/50 rounded-lg p-6">
          <p className="text-lg text-gray-200 leading-relaxed">
            No simulation data available. Please run a simulation first.
          </p>
        </div>
      </motion.div>
    );
  }

  const finalScore = generationResults[generationResults.length - 1]?.adaptationScore || 0;
  const totalGenerations = generationResults.length;
  const totalMutations = generationResults.filter(g => g.mutation !== undefined).length;

  const getFeedback = () => {
    if (!selectedBiome || !traits) {
      return "Unable to generate feedback. Please ensure all traits and biome are selected.";
    }

    const biomeName = selectedBiome.charAt(0).toUpperCase() + selectedBiome.slice(1);
    const biomeIcon = biomeIcons[selectedBiome as Biome];
    
    if (finalScore >= 80) {
      return `Incredible! Your ${traits.covering}-covered organism thrived in the ${biomeName} ${biomeIcon}! With ${traits.locomotion} for movement and a ${traits.metabolism} metabolism, it survived ${totalGenerations} generations with ${totalMutations} mutations. A true evolutionary success story!`;
    } else if (finalScore >= 60) {
      return `Not bad! Your ${traits.covering}-covered creature adapted well to the ${biomeName} ${biomeIcon}. Its ${traits.locomotion} and ${traits.metabolism} metabolism helped it survive ${totalGenerations} generations, though it faced some challenges with ${totalMutations} mutations.`;
    } else if (finalScore >= 40) {
      return `Your ${traits.covering}-covered organism struggled in the ${biomeName} ${biomeIcon}. Despite its ${traits.locomotion} and ${traits.metabolism} metabolism, it only survived ${totalGenerations} generations with ${totalMutations} mutations. Maybe try different traits next time?`;
    } else {
      return `The ${biomeName} ${biomeIcon} proved too challenging for your ${traits.covering}-covered organism. Its ${traits.locomotion} and ${traits.metabolism} metabolism weren't enough to overcome the harsh conditions, surviving only ${totalGenerations} generations with ${totalMutations} mutations.`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 rounded-lg p-6 mb-8"
    >
      <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
        Evolution Analysis
      </h2>
      
      <div className="bg-gray-700/50 rounded-lg p-6">
        <p className="text-lg text-gray-200 leading-relaxed">
          {getFeedback()}
        </p>
      </div>
    </motion.div>
  );
} 