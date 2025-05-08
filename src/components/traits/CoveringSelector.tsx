'use client';

import BaseTraitSelector from './BaseTraitSelector';

const coveringOptions = [
  {
    id: 'fur',
    name: 'Fur',
    description: 'Provides warmth and camouflage',
    icon: '🦊',
  },
  {
    id: 'scales',
    name: 'Scales',
    description: 'Offers protection and water resistance',
    icon: '🐍',
  },
  {
    id: 'feathers',
    name: 'Feathers',
    description: 'Enables flight and insulation',
    icon: '🦅',
  },
];

export default function CoveringSelector() {
  return (
    <BaseTraitSelector
      category="covering"
      title="Body Covering"
      description="Choose your organism's outer protection"
      options={coveringOptions}
    />
  );
} 