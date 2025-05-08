'use client';

import { motion } from 'framer-motion';
import { useOrganismStore, OrganismTraits } from '@/store/useOrganismStore';

interface TraitOption {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface TraitSelectorProps {
  title: string;
  description: string;
  category: keyof OrganismTraits;
  options: TraitOption[];
}

export default function TraitSelector({ title, description, category, options }: TraitSelectorProps) {
  const { traits, setTrait } = useOrganismStore();
  const selectedValue = traits[category];

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {options.map((option) => (
          <motion.div
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setTrait(category, option.id)}
            className={`min-w-[180px] min-h-[160px] max-w-sm bg-gray-800/50 rounded-xl p-5 shadow-md transition-all duration-200 ${
              selectedValue === option.id
                ? 'ring-2 ring-blue-400 scale-[1.02] shadow-lg shadow-blue-500/20'
                : 'hover:ring-1 hover:ring-white/20'
            }`}
          >
            <div className="flex flex-col justify-between h-full text-center space-y-3">
              <span className="text-4xl">{option.icon}</span>
              <h4 className="text-lg font-semibold">{option.name}</h4>
              <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                {option.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
} 
 