'use client';

import BaseTraitSelector from './BaseTraitSelector';

const behaviorOptions = [
  {
    id: 'pack',
    name: 'Pack',
    description: 'Social, group-oriented',
    icon: '🐺',
  },
  {
    id: 'solo',
    name: 'Solo',
    description: 'Independent, territorial',
    icon: '🐯',
  },
  {
    id: 'nocturnal',
    name: 'Nocturnal',
    description: 'Active at night',
    icon: '🦉',
  },
];

export default function BehaviorSelector() {
  return (
    <BaseTraitSelector
      category="behavior"
      title="Behavior"
      description="Social and activity patterns"
      options={behaviorOptions}
    />
  );
} 