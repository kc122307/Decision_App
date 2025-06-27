import React, { useState } from 'react';
import { BookOpen, Calendar, TrendingUp, Heart, Brain, Filter, Search } from 'lucide-react';

interface JournalEntry {
  id: string;
  title: string;
  category: string;
  date: Date;
  decision: string;
  reasoning: string;
  outcome?: string;
  satisfaction: number;
  lessonsLearned?: string;
  status: 'pending' | 'decided' | 'completed';
}

const DecisionJournal: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - in a real app, this would come from a database
  const [journalEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      title: 'Should I accept the job offer from TechCorp?',
      category: 'career',
      date: new Date(2024, 0, 15),
      decision: 'Accept the offer',
      reasoning: 'Better salary, growth opportunities, and company culture align with my values. The risk of leaving my current stable position is outweighed by the potential benefits.',
      outcome: 'Excellent decision - promoted within 8 months and gained valuable experience in AI/ML.',
      satisfaction: 9,
      lessonsLearned: 'Taking calculated risks for career growth pays off. Company culture research was crucial.',
      status: 'completed'
    },
    {
      id: '2',
      title: 'Should I move to San Francisco?',
      category: 'lifestyle',
      date: new Date(2024, 1, 20),
      decision: 'Stay in current city',
      reasoning: 'Cost of living too high, away from family support system. Career opportunities exist locally too.',
      satisfaction: 7,
      status: 'decided'
    },
    {
      id: '3',
      title: 'Should I start my own consulting business?',
      category: 'business',
      date: new Date(2024, 2, 10),
      decision: 'Still analyzing',
      reasoning: 'Considering market demand, financial stability, and personal readiness. Need to build stronger network first.',
      satisfaction: 5,
      status: 'pending'
    }
  ]);

  const categories = ['all', 'career', 'relationship', 'financial', 'health', 'education', 'lifestyle', 'business'];
  const statuses = ['all', 'pending', 'decided', 'completed'];

  const filteredEntries = journalEntries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.reasoning.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || entry.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || entry.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'green';
      case 'decided': return 'blue';
      default: return 'orange';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'career': return '💼';
      case 'relationship': return '❤️';
      case 'financial': return '💰';
      case 'health': return '🏥';
      case 'education': return '🎓';
      case 'lifestyle': return '🏠';
      case 'business': return '🚀';
      default: return '📝';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="p-3 bg-emerald-100 rounded-xl">
            <BookOpen className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Decision Journal</h2>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Track your decisions over time, reflect on outcomes, and learn from your choices 
          to make better decisions in the future.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search decisions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Journal Entries */}
      <div className="space-y-6">
        {filteredEntries.map(entry => {
          const statusColor = getStatusColor(entry.status);
          
          return (
            <div key={entry.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">{getCategoryIcon(entry.category)}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{entry.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{entry.date.toLocaleDateString()}</span>
                        </div>
                        <div className={`px-3 py-1 bg-${statusColor}-100 text-${statusColor}-700 rounded-full font-medium`}>
                          {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {entry.satisfaction && (
                    <div className="text-center">
                      <div className="flex items-center space-x-1 mb-1">
                        <Heart className="w-4 h-4 text-pink-500" />
                        <span className="text-lg font-bold text-gray-900">{entry.satisfaction}/10</span>
                      </div>
                      <div className="text-xs text-gray-500">Satisfaction</div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Decision Made:</h4>
                    <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">{entry.decision}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Reasoning:</h4>
                    <p className="text-gray-700 leading-relaxed">{entry.reasoning}</p>
                  </div>

                  {entry.outcome && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Outcome:</h4>
                      <p className="text-gray-700 bg-green-50 p-3 rounded-lg">{entry.outcome}</p>
                    </div>
                  )}

                  {entry.lessonsLearned && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Lessons Learned:</h4>
                      <p className="text-gray-700 bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-400">
                        {entry.lessonsLearned}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredEntries.length === 0 && (
        <div className="text-center py-12">
          <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No decisions found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters.</p>
        </div>
      )}

      {/* Statistics */}
      <div className="mt-12 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Your Decision Making Insights</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-2">{journalEntries.length}</div>
            <div className="text-gray-600">Total Decisions</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {journalEntries.filter(e => e.status === 'completed').length}
            </div>
            <div className="text-gray-600">Completed</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {(journalEntries.filter(e => e.satisfaction).reduce((acc, e) => acc + e.satisfaction, 0) / 
                journalEntries.filter(e => e.satisfaction).length || 0).toFixed(1)}
            </div>
            <div className="text-gray-600">Avg. Satisfaction</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {journalEntries.filter(e => e.category === 'career').length}
            </div>
            <div className="text-gray-600">Career Decisions</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionJournal;