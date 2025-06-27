import React, { useState } from 'react';
import { Brain, Lightbulb, Quote, Star, Book, Compass } from 'lucide-react';
import { PhilosophicalMode } from '../types';

interface PhilosophicalCoachProps {
  decisionTitle: string;
  onModeChange: (mode: PhilosophicalMode) => void;
}

const PhilosophicalCoach: React.FC<PhilosophicalCoachProps> = ({ decisionTitle, onModeChange }) => {
  const [selectedMode, setSelectedMode] = useState<PhilosophicalMode>('stoic');

  const philosophies = [
    {
      id: 'stoic' as PhilosophicalMode,
      name: 'Stoic',
      icon: Compass,
      color: 'blue',
      description: 'Focus on what you can control, accept what you cannot',
      principle: 'Virtue and wisdom through reason and discipline',
      advice: 'Consider this decision through the lens of virtue, wisdom, and what truly matters. Focus on your response to circumstances rather than the circumstances themselves. What would bring you closer to living according to your highest principles?'
    },
    {
      id: 'buddhist' as PhilosophicalMode,
      name: 'Buddhist',
      icon: Star,
      color: 'purple',
      description: 'Seek wisdom through mindfulness and compassion',
      principle: 'Reduce suffering and cultivate compassion',
      advice: 'Examine this decision with mindful awareness. How might each path reduce suffering for yourself and others? Consider the impermanent nature of all outcomes and choose with compassion as your guide.'
    },
    {
      id: 'rationalist' as PhilosophicalMode,
      name: 'Rationalist',
      icon: Brain,
      color: 'green',
      description: 'Logic, evidence, and systematic thinking',
      principle: 'Truth through reason and empirical evidence',
      advice: 'Analyze this decision systematically. Gather all available evidence, identify your assumptions, and use logical reasoning to evaluate each option. What does the data suggest is the most rational choice?'
    },
    {
      id: 'utilitarian' as PhilosophicalMode,
      name: 'Utilitarian',
      icon: Lightbulb,
      color: 'orange',
      description: 'Greatest good for the greatest number',
      principle: 'Maximize overall happiness and well-being',
      advice: 'Consider the consequences of each choice for all affected parties. Which decision would create the greatest overall positive impact? Think beyond immediate effects to long-term outcomes for yourself and others.'
    },
    {
      id: 'existentialist' as PhilosophicalMode,
      name: 'Existentialist',
      icon: Book,
      color: 'red',
      description: 'Authentic choice and personal responsibility',
      principle: 'Create meaning through authentic choices',
      advice: 'This decision is an opportunity to define who you are through your choices. What would be the most authentic decision for you? Consider how each path aligns with your personal values and the meaning you want to create in your life.'
    }
  ];

  const handleModeSelect = (mode: PhilosophicalMode) => {
    setSelectedMode(mode);
    onModeChange(mode);
  };

  const selectedPhilosophy = philosophies.find(p => p.id === selectedMode);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="p-3 bg-indigo-100 rounded-xl">
            <Quote className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Philosophical AI Coach</h2>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore your decision through different philosophical lenses. 
          Each approach offers unique wisdom and perspectives.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
        {philosophies.map((philosophy) => {
          const Icon = philosophy.icon;
          const isSelected = selectedMode === philosophy.id;
          
          return (
            <button
              key={philosophy.id}
              onClick={() => handleModeSelect(philosophy.id)}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 text-center hover:scale-105 ${
                isSelected 
                  ? `border-${philosophy.color}-500 bg-${philosophy.color}-50 shadow-lg` 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-8 h-8 mx-auto mb-3 ${
                isSelected ? `text-${philosophy.color}-600` : 'text-gray-500'
              }`} />
              <h3 className={`font-semibold mb-2 ${
                isSelected ? `text-${philosophy.color}-700` : 'text-gray-700'
              }`}>
                {philosophy.name}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                {philosophy.description}
              </p>
            </button>
          );
        })}
      </div>

      {selectedPhilosophy && (
        <div className={`bg-${selectedPhilosophy.color}-50 border border-${selectedPhilosophy.color}-200 rounded-3xl p-8`}>
          <div className="flex items-center space-x-4 mb-6">
            <div className={`p-4 bg-${selectedPhilosophy.color}-100 rounded-xl`}>
              <selectedPhilosophy.icon className={`w-8 h-8 text-${selectedPhilosophy.color}-600`} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{selectedPhilosophy.name} Perspective</h3>
              <p className={`text-${selectedPhilosophy.color}-700 font-medium`}>{selectedPhilosophy.principle}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-start space-x-4">
              <div className={`p-2 bg-${selectedPhilosophy.color}-100 rounded-lg flex-shrink-0 mt-1`}>
                <Quote className={`w-5 h-5 text-${selectedPhilosophy.color}-600`} />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Guidance for Your Decision:</h4>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {selectedPhilosophy.advice}
                </p>
                
                <div className={`bg-${selectedPhilosophy.color}-50 rounded-xl p-4 border border-${selectedPhilosophy.color}-200`}>
                  <h5 className="font-semibold text-gray-900 mb-2">Key Questions to Consider:</h5>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {selectedPhilosophy.id === 'stoic' && (
                      <>
                        <li>• What aspects of this decision are within your control?</li>
                        <li>• How does each choice align with your core virtues?</li>
                        <li>• What would you advise a friend facing this same decision?</li>
                      </>
                    )}
                    {selectedPhilosophy.id === 'buddhist' && (
                      <>
                        <li>• Which path reduces suffering for yourself and others?</li>
                        <li>• How might attachment to outcomes affect your peace of mind?</li>
                        <li>• What choice comes from compassion rather than fear?</li>
                      </>
                    )}
                    {selectedPhilosophy.id === 'rationalist' && (
                      <>
                        <li>• What evidence supports each option?</li>
                        <li>• What assumptions are you making that should be tested?</li>
                        <li>• How can you gather more data to inform your choice?</li>
                      </>
                    )}
                    {selectedPhilosophy.id === 'utilitarian' && (
                      <>
                        <li>• Who would be affected by each decision?</li>
                        <li>• What are the long-term consequences for overall well-being?</li>
                        <li>• How can you maximize positive outcomes for everyone involved?</li>
                      </>
                    )}
                    {selectedPhilosophy.id === 'existentialist' && (
                      <>
                        <li>• Which choice feels most authentic to who you are?</li>
                        <li>• How does each option reflect your personal values?</li>
                        <li>• What meaning do you want to create through this decision?</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhilosophicalCoach;