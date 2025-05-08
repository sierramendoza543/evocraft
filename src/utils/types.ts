export type Biome = 'tundra' | 'rainforest' | 'desert' | 'ocean';

export interface OrganismTraits {
  size: 'small' | 'medium' | 'large';
  speed: 'slow' | 'moderate' | 'fast';
  defense: 'low' | 'medium' | 'high';
  intelligence: 'low' | 'medium' | 'high';
}

export interface GenerationResult {
  generation: number;
  adaptationScore: number;
  traitScores: Record<string, number>;
  mutation?: {
    trait: string;
    previousValue: string;
    newValue: string;
  };
} 