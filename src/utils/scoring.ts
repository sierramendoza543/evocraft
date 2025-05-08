import { OrganismTraits } from '@/store/useOrganismStore';
import { Biome } from './biomes';

interface EvolutionInput {
  traits: OrganismTraits;
  biome: string;
  generation: number;
  mutation: boolean;
}

interface EvolutionResult {
  survived: boolean;
  adaptationScore: number;
  notes: string[];
  mutation?: {
    trait: string;
    oldValue: string;
    newValue: string;
  };
  traitScores: Record<string, number>;
}

type TraitValue = string;
type CompatibilityLevel = 'Excellent' | 'Good' | 'Poor';

type TraitCompatibility = {
  [trait: string]: {
    [biome in Biome]: {
      [value: string]: CompatibilityLevel;
    };
  };
};

export const traitCompatibility: TraitCompatibility = {
  covering: {
    tundra: { fur: 'Excellent', scales: 'Poor', skin: 'Poor' },
    rainforest: { fur: 'Good', scales: 'Excellent', skin: 'Good' },
    desert: { fur: 'Poor', scales: 'Excellent', skin: 'Good' },
    ocean: { fur: 'Poor', scales: 'Excellent', skin: 'Good' }
  },
  metabolism: {
    tundra: { warm: 'Excellent', cold: 'Poor' },
    rainforest: { warm: 'Good', cold: 'Good' },
    desert: { warm: 'Excellent', cold: 'Poor' },
    ocean: { warm: 'Good', cold: 'Good' }
  },
  behavior: {
    tundra: { social: 'Excellent', solitary: 'Poor' },
    rainforest: { social: 'Good', solitary: 'Good' },
    desert: { social: 'Poor', solitary: 'Excellent' },
    ocean: { social: 'Good', solitary: 'Good' }
  },
  locomotion: {
    tundra: { legs: 'Excellent', fins: 'Poor', wings: 'Good' },
    rainforest: { legs: 'Good', fins: 'Poor', wings: 'Excellent' },
    desert: { legs: 'Excellent', fins: 'Poor', wings: 'Good' },
    ocean: { legs: 'Poor', fins: 'Excellent', wings: 'Poor' }
  },
  reproduction: {
    tundra: { live: 'Poor', eggs: 'Excellent' },
    rainforest: { live: 'Good', eggs: 'Good' },
    desert: { live: 'Poor', eggs: 'Excellent' },
    ocean: { live: 'Poor', eggs: 'Excellent' }
  }
};

// Biome-specific trait compatibility scores
const biomeTraitScores: Record<string, Record<string, Record<string, number>>> = {
  tundra: {
    covering: {
      fur: 90,
      scales: 40,
      feathers: 70,
      skin: 30,
    },
    metabolism: {
      warm: 80,
      cold: 40,
    },
    locomotion: {
      walking: 70,
      swimming: 30,
      flying: 40,
    },
    reproduction: {
      sexual: 60,
      asexual: 70,
    },
    limbs: {
      none: 30,
      legs: 70,
      fins: 20,
      wings: 40,
    },
    senses: {
      sight: 60,
      smell: 80,
      echolocation: 40,
    },
    behavior: {
      social: 80,
      solitary: 40,
      nocturnal: 60,
    },
  },
  rainforest: {
    covering: {
      fur: 60,
      scales: 70,
      feathers: 80,
      skin: 90,
    },
    metabolism: {
      warm: 70,
      cold: 50,
    },
    locomotion: {
      walking: 80,
      swimming: 70,
      flying: 90,
    },
    reproduction: {
      sexual: 80,
      asexual: 60,
    },
    limbs: {
      none: 40,
      legs: 80,
      fins: 60,
      wings: 90,
    },
    senses: {
      sight: 80,
      smell: 70,
      echolocation: 90,
    },
    behavior: {
      social: 60,
      solitary: 70,
      nocturnal: 80,
    },
  },
  desert: {
    covering: {
      fur: 40,
      scales: 80,
      feathers: 60,
      skin: 70,
    },
    metabolism: {
      warm: 40,
      cold: 80,
    },
    locomotion: {
      walking: 70,
      swimming: 30,
      flying: 60,
    },
    reproduction: {
      sexual: 50,
      asexual: 80,
    },
    limbs: {
      none: 50,
      legs: 70,
      fins: 30,
      wings: 60,
    },
    senses: {
      sight: 90,
      smell: 70,
      echolocation: 40,
    },
    behavior: {
      social: 40,
      solitary: 80,
      nocturnal: 90,
    },
  },
  ocean: {
    covering: {
      fur: 20,
      scales: 90,
      feathers: 40,
      skin: 80,
    },
    metabolism: {
      warm: 60,
      cold: 70,
    },
    locomotion: {
      walking: 30,
      swimming: 90,
      flying: 40,
    },
    reproduction: {
      sexual: 70,
      asexual: 60,
    },
    limbs: {
      none: 40,
      legs: 30,
      fins: 90,
      wings: 40,
    },
    senses: {
      sight: 70,
      smell: 60,
      echolocation: 90,
    },
    behavior: {
      social: 80,
      solitary: 40,
      nocturnal: 60,
    },
  },
};

// Random environmental events that can affect adaptation
const environmentalEvents = [
  { name: 'Sudden temperature change', impact: -10 },
  { name: 'Food scarcity', impact: -15 },
  { name: 'Predator increase', impact: -20 },
  { name: 'Favorable conditions', impact: 15 },
  { name: 'Resource abundance', impact: 10 },
  { name: 'Competition decrease', impact: 20 },
];

export function calculateFitness(input: EvolutionInput): EvolutionResult {
  const { traits, biome, generation, mutation } = input;
  const notes: string[] = [];
  
  // Calculate base adaptation score from trait compatibility
  let adaptationScore = 0;
  const traitScores: Record<string, number> = {};
  
  Object.entries(traits).forEach(([trait, value]) => {
    const compatibility = traitCompatibility[trait]?.[biome]?.[value] ?? "Unknown";
    const score = biomeTraitScores[biome][trait][value] || 50;
    traitScores[trait] = score;
    adaptationScore += score;
  });
  
  // Normalize score to 0-100 range
  adaptationScore = Math.round(adaptationScore / Object.keys(traits).length);
  
  // Apply random environmental event
  const randomEvent = environmentalEvents[Math.floor(Math.random() * environmentalEvents.length)];
  adaptationScore += randomEvent.impact;
  notes.push(`Environmental event: ${randomEvent.name}`);
  
  // Adjust for generation difficulty
  const generationDifficulty = Math.min(generation * 5, 20); // Increases difficulty up to 20%
  adaptationScore -= generationDifficulty;
  notes.push(`Generation ${generation} difficulty: -${generationDifficulty}%`);
  
  // Ensure score stays within 0-100 range
  adaptationScore = Math.max(0, Math.min(100, adaptationScore));
  
  // Determine survival
  const survived = adaptationScore >= 30;
  notes.push(survived ? 'Organism survived!' : 'Organism failed to adapt');
  
  // Add mutation note if applicable
  let mutationResult = undefined;
  if (mutation) {
    const traitKeys = Object.keys(traits);
    const randomTrait = traitKeys[Math.floor(Math.random() * traitKeys.length)];
    const currentValue = traits[randomTrait];
    const possibleValues = Object.keys(traitCompatibility[randomTrait]?.[biome] ?? {});
    const newValue = possibleValues[Math.floor(Math.random() * possibleValues.length)];
    
    mutationResult = {
      trait: randomTrait,
      oldValue: currentValue,
      newValue: newValue
    };
    
    notes.push(`Mutation occurred: ${randomTrait} changed from ${currentValue} to ${newValue}`);
  }
  
  return {
    survived,
    adaptationScore,
    notes,
    mutation: mutationResult,
    traitScores
  };
} 