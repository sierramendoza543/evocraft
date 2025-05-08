'use client';

import BaseTraitSelector from './BaseTraitSelector';

const sensesOptions = [
  {
    id: 'sight',
    name: 'Sight',
    description: 'Visual perception',
    icon: '👁️',
  },
  {
    id: 'smell',
    name: 'Smell',
    description: 'Chemical detection',
    icon: '👃',
  },
  {
    id: 'echolocation',
    name: 'Echolocation',
    description: 'Sound-based navigation',
    icon: '🦇',
  },
];

export default function SensesSelector() {
  return (
    <BaseTraitSelector
      category="senses"
      title="Senses"
      description="Primary sensory system"
      options={sensesOptions}
    />
  );
} 