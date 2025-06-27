import React from 'react';
import { Brain, Compass, TrendingUp, Shield } from 'lucide-react';

interface HeroProps {
  onStartAnalysis: () => void;
  onViewDemo: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartAnalysis, onViewDemo }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-200 rounded-full animate-pulse opacity-75"></div>
              <div className="relative bg-blue-500 p-4 rounded-full">
                <Brain className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Decision
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {' '}Mirror
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            AI-powered decision architect that simulates your future scenarios, 
            analyzes risks, and guides you toward choices aligned with your deepest values.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              onClick={onStartAnalysis}
            >
              Start Your Analysis
            </button>
            <button
              className="bg-white hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border-2 border-gray-200 hover:border-gray-300"
              onClick={onViewDemo}
            >
              View Demo
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center group">
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Compass className="w-10 h-10 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Scenario Simulation</h3>
                <p className="text-gray-600">Explore multiple future paths with AI-generated best, worst, and realistic outcomes.</p>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <TrendingUp className="w-10 h-10 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Emotional Intelligence</h3>
                <p className="text-gray-600">Understand the psychological impact and alignment with your core values.</p>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Shield className="w-10 h-10 text-purple-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Risk Analysis</h3>
                <p className="text-gray-600">Comprehensive risk scoring with regret probability and uncertainty factors.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;