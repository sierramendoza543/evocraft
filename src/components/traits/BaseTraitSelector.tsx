'use client';

import { motion } from 'framer-motion';
import { useOrganismStore } from '@/store/useOrganismStore';

interface TraitOption {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface BaseTraitSelectorProps {
  category: keyof ReturnType<typeof useOrganismStore>['traits'];
  title: string;
  description: string;
  options: TraitOption[];
}

export default function BaseTraitSelector({
  category,
  title,
  description,
  options,
}: BaseTraitSelectorProps) {
  const { traits, setTrait } = useOrganismStore();
  const selectedValue = traits[category];

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300 mb-4">{description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {options.map((option) => (
          <motion.label
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedValue === option.id
                ? 'bg-blue-600 ring-2 ring-blue-400'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <input
              type="radio"
              name={category}
              value={option.id}
              checked={selectedValue === option.id}
              onChange={() => setTrait(category, option.id)}
              className="sr-only"
            />
            <div className="flex items-center space-x-3 flex-1">
              <span className="text-2xl">{option.icon}</span>
              <div>
                <div className="font-medium">{option.name}</div>
                <div className="text-sm text-gray-300">{option.description}</div>
              </div>
            </div>
          </motion.label>
        ))}
      </div>
    </div>
  );
} 