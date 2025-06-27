import React from 'react';
import { TrendingUp, TrendingDown, Minus, Clock, Heart, Brain, DollarSign } from 'lucide-react';
import { Scenario } from '../types';

interface ScenarioDisplayProps {
  scenarios: Scenario[];
}

const ScenarioDisplay: React.FC<ScenarioDisplayProps> = ({ scenarios }) => {
  const getScenarioIcon = (type: string) => {
    switch (type) {
      case 'best': return TrendingUp;
      case 'worst': return TrendingDown;
      default: return Minus;
    }
  };

  const getScenarioColor = (type: string) => {
    switch (type) {
      case 'best': return 'green';
      case 'worst': return 'red';
      default: return 'blue';
    }
  };

  const getScenarioLabel = (type: string) => {
    switch (type) {
      case 'best': return 'Best Case';
      case 'worst': return 'Worst Case';
      default: return 'Most Likely';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Future Scenarios</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          AI has analyzed your decision and generated three possible future outcomes based on various factors and probabilities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {scenarios.map((scenario) => {
          const Icon = getScenarioIcon(scenario.type);
          const color = getScenarioColor(scenario.type);
          const label = getScenarioLabel(scenario.type);

          return (
            <div key={scenario.id} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className={`bg-gradient-to-r from-${color}-500 to-${color}-600 px-6 py-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon className="w-6 h-6 text-white" />
                    <h3 className="text-lg font-bold text-white">{label}</h3>
                  </div>
                  <span className="text-white text-sm bg-white/20 px-3 py-1 rounded-full">
                    {scenario.probability}% likely
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{scenario.title}</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">{scenario.description}</p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-pink-500" />
                      <span className="text-sm font-medium text-gray-700">Happiness</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div 
                          className={`h-2 bg-${color}-500 rounded-full transition-all duration-1000`}
                          style={{ width: `${scenario.happinessIndex}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{scenario.happinessIndex}/100</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Brain className="w-4 h-4 text-purple-500" />
                      <span className="text-sm font-medium text-gray-700">Stress Level</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-red-500 rounded-full transition-all duration-1000"
                          style={{ width: `${scenario.stressLevel}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{scenario.stressLevel}/100</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-700">Financial Impact</span>
                    </div>
                    <span className={`text-sm font-semibold ${scenario.financialImpact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {scenario.financialImpact >= 0 ? '+' : ''}${scenario.financialImpact.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-semibold text-gray-700">Timeline</span>
                  </div>
                  <div className="space-y-2">
                    {scenario.timeline.slice(0, 3).map((event, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          event.impact === 'positive' ? 'bg-green-400' :
                          event.impact === 'negative' ? 'bg-red-400' : 'bg-gray-400'
                        }`}></div>
                        <div>
                          <span className="text-xs font-medium text-gray-500">Year {event.year}</span>
                          <p className="text-sm text-gray-700">{event.event}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScenarioDisplay;