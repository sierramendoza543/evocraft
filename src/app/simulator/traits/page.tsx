'use client';

import { useRouter } from 'next/navigation';
import { useOrganismStore } from '@/store/useOrganismStore';
import TraitSelector from '@/components/TraitSelector';
import OrganismPreview from '@/components/OrganismPreview';

const traitOptions = {
  covering: [
    { id: 'fur', name: 'Fur', description: 'Thick, insulating fur for cold environments', icon: '🦊' },
    { id: 'scales', name: 'Scales', description: 'Protective scales for defense and water retention', icon: '🐍' },
    { id: 'feathers', name: 'Feathers', description: 'Lightweight feathers for flight and insulation', icon: '🦅' },
    { id: 'skin', name: 'Skin', description: 'Flexible skin for various environments', icon: '🐸' },
  ],
  metabolism: [
    { id: 'warm', name: 'Warm-blooded', description: 'Maintains constant body temperature', icon: '🔥' },
    { id: 'cold', name: 'Cold-blooded', description: 'Body temperature varies with environment', icon: '❄️' },
  ],
  locomotion: [
    { id: 'walking', name: 'Walking', description: 'Efficient movement on land', icon: '🚶' },
    { id: 'swimming', name: 'Swimming', description: 'Aquatic movement', icon: '🏊' },
    { id: 'flying', name: 'Flying', description: 'Aerial movement', icon: '🦋' },
  ],
  reproduction: [
    { id: 'sexual', name: 'Sexual', description: 'Two parents required for reproduction', icon: '❤️' },
    { id: 'asexual', name: 'Asexual', description: 'Single parent reproduction', icon: '🔄' },
  ],
  limbs: [
    { id: 'none', name: 'No Limbs', description: 'No appendages for movement', icon: '🐍' },
    { id: 'legs', name: 'Legs', description: 'Terrestrial limbs for walking and running', icon: '🦒' },
    { id: 'fins', name: 'Fins', description: 'Aquatic appendages for swimming', icon: '🐋' },
    { id: 'wings', name: 'Wings', description: 'Aerial appendages for flight', icon: '🦋' },
  ],
  senses: [
    { id: 'sight', name: 'Sight', description: 'Visual perception of the environment', icon: '👁️' },
    { id: 'smell', name: 'Smell', description: 'Olfactory detection of chemicals', icon: '👃' },
    { id: 'echolocation', name: 'Echolocation', description: 'Sound-based spatial awareness', icon: '🦇' },
  ],
  behavior: [
    { id: 'social', name: 'Social', description: 'Lives and hunts in groups', icon: '🐺' },
    { id: 'solitary', name: 'Solitary', description: 'Lives and hunts alone', icon: '🐯' },
    { id: 'nocturnal', name: 'Nocturnal', description: 'Active during night hours', icon: '🦉' },
  ],
};

export default function TraitSelection() {
  const router = useRouter();
  const { traits } = useOrganismStore();

  const handleComplete = () => {
    router.push('/simulator/biome');
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-[1400px] mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Design Your Organism</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Trait Selection */}
          <div className="lg:col-span-2 space-y-8">
            <TraitSelector
              title="Body Covering"
              description="Choose how your organism protects itself from the environment"
              category="covering"
              options={traitOptions.covering}
            />
            
            <TraitSelector
              title="Metabolism"
              description="Select how your organism regulates its body temperature"
              category="metabolism"
              options={traitOptions.metabolism}
            />
            
            <TraitSelector
              title="Locomotion"
              description="Choose how your organism moves through its environment"
              category="locomotion"
              options={traitOptions.locomotion}
            />
            
            <TraitSelector
              title="Reproduction"
              description="Select how your organism reproduces"
              category="reproduction"
              options={traitOptions.reproduction}
            />

            <TraitSelector
              title="Limbs"
              description="Choose the appendages your organism uses for movement"
              category="limbs"
              options={traitOptions.limbs}
            />

            <TraitSelector
              title="Senses"
              description="Select how your organism perceives its environment"
              category="senses"
              options={traitOptions.senses}
            />

            <TraitSelector
              title="Behavior"
              description="Choose how your organism interacts with others"
              category="behavior"
              options={traitOptions.behavior}
            />
          </div>

          {/* Right Column - Organism Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <OrganismPreview traits={traits} onComplete={handleComplete} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 