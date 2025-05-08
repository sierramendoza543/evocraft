'use client';

import { motion } from 'framer-motion';
import { OrganismTraits } from '@/store/useOrganismStore';

interface OrganismPreviewProps {
  traits: OrganismTraits;
  onComplete: () => void;
}

export default function OrganismPreview({ traits, onComplete }: OrganismPreviewProps) {
  const allTraitsSelected = Object.values(traits).every(value => value !== '');

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Organism Preview</h2>
      
      <div className="space-y-6">
        <div className="flex justify-center">
          <div className="w-32 h-32 bg-gray-700/50 rounded-full flex items-center justify-center text-6xl">
            {traits.covering === 'fur' && '🦊'}
            {traits.covering === 'scales' && '🐍'}
            {traits.covering === 'feathers' && '🦅'}
            {traits.covering === 'skin' && '🐸'}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-300">Selected Traits</h3>
            <div className="mt-2 space-y-2">
              {Object.entries(traits).map(([trait, value]) => (
                <div key={trait} className="flex justify-between items-center">
                  <span className="text-sm text-gray-400 capitalize">{trait}</span>
                  <span className="text-sm font-medium">{value || 'Not selected'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onComplete}
          disabled={!allTraitsSelected}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            allTraitsSelected
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
              : 'bg-gray-700/50 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue to Biome Selection
        </motion.button>
      </div>
    </div>
  );
} 