import { Biome, OrganismTraits, GenerationResult } from './types';
import { validateTraits, validateBiome, validateGenerationResult, ValidationError } from './validation';

interface TraitCompatibility {
  [key: string]: {
    [key: string]: number;
  };
}

const traitCompatibility: TraitCompatibility = {
  size: {
    small: 1,
    medium: 0.8,
    large: 0.6,
  },
  speed: {
    slow: 0.6,
    moderate: 0.8,
    fast: 1,
  },
  defense: {
    low: 0.6,
    medium: 0.8,
    high: 1,
  },
  intelligence: {
    low: 0.6,
    medium: 0.8,
    high: 1,
  },
};

const biomeTraitScores: Record<Biome, Partial<Record<keyof OrganismTraits, number>>> = {
  tundra: {
    size: 0.8,
    speed: 0.6,
    defense: 0.9,
    intelligence: 0.7,
  },
  rainforest: {
    size: 0.7,
    speed: 0.9,
    defense: 0.8,
    intelligence: 0.9,
  },
  desert: {
    size: 0.6,
    speed: 0.8,
    defense: 0.7,
    intelligence: 0.8,
  },
  ocean: {
    size: 0.9,
    speed: 0.7,
    defense: 0.8,
    intelligence: 0.8,
  },
};

export function calculateFitness(
  traits: OrganismTraits,
  biome: Biome,
  generation: number,
  mutationChance: number = 0.3
): GenerationResult {
  try {
    // Validate inputs
    validateTraits(traits);
    validateBiome(biome);

    // Calculate base trait scores
    const traitScores = Object.entries(traits).reduce((acc, [trait, value]) => {
      const compatibility = traitCompatibility[trait]?.[value] || 0;
      const biomeScore = biomeTraitScores[biome]?.[trait as keyof OrganismTraits] || 0.5;
      acc[trait] = Math.round((compatibility * biomeScore) * 100);
      return acc;
    }, {} as Record<string, number>);

    // Calculate overall adaptation score
    const adaptationScore = Math.round(
      Object.values(traitScores).reduce((sum, score) => sum + score, 0) / Object.keys(traits).length
    );

    // Determine if mutation occurs
    const mutation = Math.random() < mutationChance ? {
      trait: Object.keys(traits)[Math.floor(Math.random() * Object.keys(traits).length)],
      previousValue: traits[Object.keys(traits)[Math.floor(Math.random() * Object.keys(traits).length)] as keyof OrganismTraits],
      newValue: Object.values(traitCompatibility)[Math.floor(Math.random() * Object.keys(traits).length)][0],
    } : undefined;

    const result: GenerationResult = {
      generation,
      adaptationScore,
      traitScores,
      mutation,
    };

    // Validate the result before returning
    validateGenerationResult(result);
    return result;
  } catch (err) {
    if (err instanceof ValidationError) {
      throw err;
    }
    throw new ValidationError('Error calculating fitness score');
  }
} 