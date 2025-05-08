'use client';

import BaseTraitSelector from './BaseTraitSelector';

const metabolismOptions = [
  {
    id: 'fast',
    name: 'Fast',
    description: 'High energy consumption, quick reactions',
    icon: '⚡',
  },
  {
    id: 'slow',
    name: 'Slow',
    description: 'Energy efficient, longer lifespan',
    icon: '🐢',
  },
];

export default function MetabolismSelector() {
  return (
    <BaseTraitSelector
      category="metabolism"
      title="Metabolism"
      description="How your organism processes energy"
      options={metabolismOptions}
    />
  );
} 