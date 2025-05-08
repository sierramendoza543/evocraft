import { create } from 'zustand';
import { Biome } from '@/utils/biomes';

export interface OrganismTraits {
  covering: string;
  metabolism: string;
  locomotion: string;
  reproduction: string;
  limbs: string;
  senses: string;
  behavior: string;
}

export interface GenerationResult {
  generation: number;
  adaptationScore: number;
  mutation?: {
    trait: keyof OrganismTraits;
    oldValue: string;
    newValue: string;
  };
  traitScores: Record<keyof OrganismTraits, number>;
}

interface OrganismState {
  traits: OrganismTraits;
  selectedBiome: Biome | null;
  generationResults: GenerationResult[];
  setTrait: (category: keyof OrganismTraits, value: string) => void;
  setBiome: (biome: Biome) => void;
  addGenerationResult: (result: GenerationResult) => void;
  resetTraits: () => void;
  resetSimulation: () => void;
}

export const useOrganismStore = create<OrganismState>((set) => ({
  traits: {
    covering: '',
    metabolism: '',
    locomotion: '',
    reproduction: '',
    limbs: '',
    senses: '',
    behavior: '',
  },
  selectedBiome: null,
  generationResults: [],
  setTrait: (category, value) =>
    set((state) => ({
      traits: {
        ...state.traits,
        [category]: value,
      },
    })),
  setBiome: (biome) =>
    set({
      selectedBiome: biome,
    }),
  addGenerationResult: (result) =>
    set((state) => ({
      generationResults: [...state.generationResults, result],
    })),
  resetTraits: () =>
    set({
      traits: {
        covering: '',
        metabolism: '',
        locomotion: '',
        reproduction: '',
        limbs: '',
        senses: '',
        behavior: '',
      },
    }),
  resetSimulation: () =>
    set({
      selectedBiome: null,
      generationResults: [],
    }),
})); 