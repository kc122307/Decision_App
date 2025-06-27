import React, { useState } from 'react';
import { Send, Mic, FileText, Heart, Briefcase, DollarSign, Activity, GraduationCap, Home, Shield } from 'lucide-react';
import { DecisionCategory } from '../types';

interface DecisionInputProps {
  onSubmit: (decision: { title: string; description: string; category: DecisionCategory }) => void;
}

const DecisionInput: React.FC<DecisionInputProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<DecisionCategory>('career');
  const [isListening, setIsListening] = useState(false);

  const categories = [
    { id: 'career' as DecisionCategory, label: 'Career', icon: Briefcase, color: 'blue' },
    { id: 'relationship' as DecisionCategory, label: 'Relationship', icon: Heart, color: 'pink' },
    { id: 'financial' as DecisionCategory, label: 'Financial', icon: DollarSign, color: 'green' },
    { id: 'health' as DecisionCategory, label: 'Health', icon: Activity, color: 'red' },
    { id: 'education' as DecisionCategory, label: 'Education', icon: GraduationCap, color: 'purple' },
    { id: 'lifestyle' as DecisionCategory, label: 'Lifestyle', icon: Home, color: 'orange' }
  ];

  const templates = [
    "Should I accept the job offer from company X?",
    "Is it the right time to move to a new city?",
    "Should I start my own business?",
    "Is it worth going back to school for an MBA?",
    "Should I end my current relationship?",
    "Is now the right time to buy a house?"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      onSubmit({ title, description, category });
      setTitle('');
      setDescription('');
    }
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input implementation would go here
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white mb-2">What Decision Are You Facing?</h2>
          <p className="text-blue-100">Describe your situation and let AI guide you through the analysis.</p>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Decision Category</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map(({ id, label, icon: Icon, color }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setCategory(id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center space-y-2 ${
                      category === id 
                        ? `border-${color}-500 bg-${color}-50` 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`w-6 h-6 ${category === id ? `text-${color}-600` : 'text-gray-500'}`} />
                    <span className={`text-sm font-medium ${category === id ? `text-${color}-700` : 'text-gray-600'}`}>
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                Decision Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Should I accept the job offer from TechCorp?"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                Detailed Description
              </label>
              <div className="relative">
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your situation in detail. Include context, constraints, goals, and any concerns you have..."
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                  required
                />
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  className={`absolute bottom-3 right-3 p-2 rounded-lg transition-all duration-300 ${
                    isListening 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  <Mic className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">Quick Templates:</p>
              <div className="flex flex-wrap gap-2">
                {templates.map((template, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setTitle(template)}
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    {template}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <FileText className="w-4 h-4" />
                  <span>AI Analysis</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span>Private & Secure</span>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={!title.trim() || !description.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 disabled:cursor-not-allowed transform hover:scale-105 disabled:transform-none shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5" />
                <span>Analyze Decision</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DecisionInput;