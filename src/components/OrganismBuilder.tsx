'use client';

import { motion } from 'framer-motion';
import { useOrganismStore } from '@/store/useOrganismStore';
import CoveringSelector from '@/components/traits/CoveringSelector';
import MetabolismSelector from '@/components/traits/MetabolismSelector';
import LimbsSelector from '@/components/traits/LimbsSelector';
import SensesSelector from '@/components/traits/SensesSelector';
import BehaviorSelector from '@/components/traits/BehaviorSelector';
import OrganismPreview from '@/components/OrganismPreview';

interface OrganismBuilderProps {
  onComplete?: () => void;
}

export default function OrganismBuilder({ onComplete }: OrganismBuilderProps) {
  const { traits } = useOrganismStore();

  const allTraitsSelected = Object.values(traits).every(value => value !== '');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <CoveringSelector />
        <MetabolismSelector />
        <LimbsSelector />
        <SensesSelector />
        <BehaviorSelector />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onComplete}
          disabled={!allTraitsSelected}
          className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-colors ${
            allTraitsSelected
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
              : 'bg-gray-600 cursor-not-allowed'
          }`}
        >
          {allTraitsSelected ? 'Continue to Biome Selection →' : 'Select All Traits to Continue'}
        </motion.button>
      </div>

      <div className="hidden lg:block">
        <OrganismPreview />
      </div>
    </div>
  );
} 