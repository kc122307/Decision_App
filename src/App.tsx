import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import DecisionInput from './components/DecisionInput';
import ScenarioDisplay from './components/ScenarioDisplay';
import RiskAnalysis from './components/RiskAnalysis';
import DecisionTree from './components/DecisionTree';
import PhilosophicalCoach from './components/PhilosophicalCoach';
import DecisionJournal from './components/DecisionJournal';
import { Decision, DecisionCategory, PhilosophicalMode } from './types';
import { generateMockScenariosSync, generateMockRiskAnalysisSync, generateMockEmotionalAnalysisSync } from './utils/mockData';
import { apiService } from './utils/apiService';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [currentDecision, setCurrentDecision] = useState<Decision | null>(null);
  const [philosophicalMode, setPhilosophicalMode] = useState<PhilosophicalMode>('stoic');
  const [mode, setMode] = useState<'demo' | 'real'>('real');
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('auth_token'));

  const handleDecisionSubmit = async (decisionData: { title: string; description: string; category: DecisionCategory }) => {
    let newDecision: Decision;
    if (mode === 'demo') {
      newDecision = {
        id: Date.now().toString(),
        title: decisionData.title,
        description: decisionData.description,
        category: decisionData.category,
        createdAt: new Date(),
        status: 'analyzing',
        scenarios: generateMockScenariosSync(decisionData.title),
        riskScore: 55,
        emotionalImpact: generateMockEmotionalAnalysisSync(),
        values: ['growth', 'stability', 'authenticity', 'impact']
      };
      setCurrentDecision(newDecision);
      setCurrentView('analysis');
    } else {
      newDecision = {
        id: Date.now().toString(),
        title: decisionData.title,
        description: decisionData.description,
        category: decisionData.category,
        createdAt: new Date(),
        status: 'analyzing',
        scenarios: generateMockScenariosSync(decisionData.title), // Use sync version for immediate display
        riskScore: 55,
        emotionalImpact: generateMockEmotionalAnalysisSync(),
        values: ['growth', 'stability', 'authenticity', 'impact']
      };
      setCurrentDecision(newDecision);
      setCurrentView('analysis');
      try {
        const analysis = await apiService.analyzeDecision(decisionData);
        setCurrentDecision(prev => prev ? {
          ...prev,
          scenarios: analysis.scenarios,
          riskScore: analysis.riskAnalysis.riskScore,
          emotionalImpact: analysis.emotionalAnalysis
        } : null);
      } catch (error) {
        console.error('Failed to get enhanced analysis:', error);
      }
    }
  };

  const handlePhilosophicalModeChange = (mode: PhilosophicalMode) => {
    setPhilosophicalMode(mode);
  };

  const handleStartAnalysis = () => {
    setCurrentView('input');
  };

  const handleViewDemo = () => {
    setMode('demo');
    setCurrentView('input');
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentView('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
    setCurrentView('home');
  };

  const renderCurrentView = () => {
    if (!isAuthenticated) {
      return authView === 'login' ? (
        <Login onSwitchToRegister={() => setAuthView('register')} onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Register onSwitchToLogin={() => setAuthView('login')} />
      );
    }

    switch (currentView) {
      case 'home':
        return <Hero onStartAnalysis={handleStartAnalysis} onViewDemo={handleViewDemo} />;
      
      case 'input':
        return <DecisionInput onSubmit={handleDecisionSubmit} />;
      
      case 'analysis':
        if (!currentDecision) {
          return (
            <div className="max-w-4xl mx-auto px-4 py-12 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Decision to Analyze</h2>
              <p className="text-gray-600 mb-8">Please submit a decision first to see the analysis.</p>
              <button
                onClick={() => setCurrentView('input')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Create New Decision
              </button>
            </div>
          );
        }
        
        const riskAnalysis = generateMockRiskAnalysisSync();
        
        return (
          <div className="space-y-16">
            {!apiService.hasApiKey() && (
              <div className="max-w-4xl mx-auto px-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-yellow-600">⚠️</div>
                    <div>
                      <h4 className="font-semibold text-yellow-800">Using Sample Data</h4>
                      <p className="text-sm text-yellow-700">
                        For personalized AI analysis, please add your OpenAI API key in Settings.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <ScenarioDisplay scenarios={currentDecision.scenarios} />
            <RiskAnalysis
              riskScore={riskAnalysis.riskScore}
              regretProbability={riskAnalysis.regretProbability}
              uncertaintyFactors={riskAnalysis.uncertaintyFactors}
              mitigationStrategies={riskAnalysis.mitigationStrategies}
            />
          </div>
        );
      
      case 'tree':
        if (!currentDecision) {
          return (
            <div className="max-w-4xl mx-auto px-4 py-12 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Decision to Visualize</h2>
              <p className="text-gray-600 mb-8">Please submit a decision first to see the decision tree.</p>
              <button
                onClick={() => setCurrentView('input')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Create New Decision
              </button>
            </div>
          );
        }
        return <DecisionTree decisionTitle={currentDecision.title} />;
      
      case 'coach':
        if (!currentDecision) {
          return (
            <div className="max-w-4xl mx-auto px-4 py-12 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Decision for Coaching</h2>
              <p className="text-gray-600 mb-8">Please submit a decision first to get philosophical guidance.</p>
              <button
                onClick={() => setCurrentView('input')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Create New Decision
              </button>
            </div>
          );
        }
        return (
          <PhilosophicalCoach
            decisionTitle={currentDecision.title}
            onModeChange={handlePhilosophicalModeChange}
          />
        );
      
      case 'journal':
        return <DecisionJournal />;
      
      default:
        return <Hero />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentView={currentView} onViewChange={setCurrentView} mode={mode} setMode={setMode} onLogout={handleLogout} />
      <main>
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;