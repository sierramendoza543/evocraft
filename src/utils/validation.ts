import { Biome, OrganismTraits, GenerationResult } from './types';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const VALID_BIOMES: Biome[] = ['tundra', 'rainforest', 'desert', 'ocean'];

export const VALID_TRAITS = {
  size: ['small', 'medium', 'large'],
  speed: ['slow', 'moderate', 'fast'],
  defense: ['low', 'medium', 'high'],
  intelligence: ['low', 'medium', 'high'],
} as const;

export function validateBiome(biome: unknown): asserts biome is Biome {
  if (!VALID_BIOMES.includes(biome as Biome)) {
    throw new ValidationError(`Invalid biome: ${biome}`);
  }
}

export function validateTraits(traits: unknown): asserts traits is OrganismTraits {
  if (!traits || typeof traits !== 'object') {
    throw new ValidationError('Traits must be an object');
  }

  const traitKeys = Object.keys(VALID_TRAITS);
  for (const key of traitKeys) {
    if (!(key in traits)) {
      throw new ValidationError(`Missing trait: ${key}`);
    }

    const value = (traits as Partial<OrganismTraits>)[key as keyof OrganismTraits];
    if (!value || !VALID_TRAITS[key as keyof typeof VALID_TRAITS].includes(value)) {
      throw new ValidationError(`Invalid value for trait ${key}: ${value}`);
    }
  }
}

export function validateGenerationResult(result: unknown): asserts result is GenerationResult {
  if (!result || typeof result !== 'object') {
    throw new ValidationError('Generation result must be an object');
  }

  const requiredFields = ['generation', 'adaptationScore', 'traitScores'];
  for (const field of requiredFields) {
    if (!(field in result)) {
      throw new ValidationError(`Missing required field: ${field}`);
    }
  }

  const { generation, adaptationScore, traitScores, mutation } = result as GenerationResult;

  if (typeof generation !== 'number' || generation < 0) {
    throw new ValidationError('Generation must be a non-negative number');
  }

  if (typeof adaptationScore !== 'number' || adaptationScore < 0 || adaptationScore > 100) {
    throw new ValidationError('Adaptation score must be a number between 0 and 100');
  }

  if (!traitScores || typeof traitScores !== 'object') {
    throw new ValidationError('Trait scores must be an object');
  }

  if (mutation !== undefined) {
    if (typeof mutation !== 'object') {
      throw new ValidationError('Mutation must be an object or undefined');
    }

    const mutationFields = ['trait', 'previousValue', 'newValue'];
    for (const field of mutationFields) {
      if (!(field in mutation)) {
        throw new ValidationError(`Missing required mutation field: ${field}`);
      }
    }
  }
}

export function safeGet<T>(obj: any, path: string[], defaultValue: T): T {
  return path.reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : defaultValue), obj);
} 