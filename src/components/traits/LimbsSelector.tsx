'use client';

import BaseTraitSelector from './BaseTraitSelector';

const limbsOptions = [
  {
    id: 'legs',
    name: 'Legs',
    description: 'Good for land movement',
    icon: '🦒',
  },
  {
    id: 'flippers',
    name: 'Flippers',
    description: 'Excellent for swimming',
    icon: '🐋',
  },
  {
    id: 'wings',
    name: 'Wings',
    description: 'Enables flight',
    icon: '🦋',
  },
];

export default function LimbsSelector() {
  return (
    <BaseTraitSelector
      category="limbs"
      title="Limbs"
      description="Choose your organism's appendages"
      options={limbsOptions}
    />
  );
} 