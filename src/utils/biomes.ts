export type Biome = 'tundra' | 'rainforest' | 'desert' | 'ocean';

export const biomeIcons: Record<Biome, string> = {
  tundra: '❄️',
  rainforest: '🌴',
  desert: '🌵',
  ocean: '🌊'
};

export const biomeDescriptions: Record<Biome, string> = {
  tundra: 'A cold, treeless biome with permafrost and low biodiversity.',
  rainforest: 'A hot, humid biome with dense vegetation and high biodiversity.',
  desert: 'A dry biome with extreme temperatures and sparse vegetation.',
  ocean: 'A vast aquatic biome with diverse marine life and varying depths.'
}; 