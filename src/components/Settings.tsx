import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Key, Shield, Save, AlertCircle, Eye, EyeOff, Info } from 'lucide-react';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'demo' | 'real';
  setMode: React.Dispatch<React.SetStateAction<'demo' | 'real'>>;
  onLogout?: () => void;
}

const Settings: React.FC<SettingsProps> = ({ isOpen, onClose, mode, setMode, onLogout }) => {
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showDemoInfo, setShowDemoInfo] = useState(false);

  useEffect(() => {
    // Load API key from localStorage on component mount
    const savedApiKey = localStorage.getItem('decision_mirror_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    } else {
      setIsUsingFallback(true);
    }
    // Load mode from localStorage
    const savedMode = localStorage.getItem('decision_mirror_mode');
    if (savedMode === 'demo' || savedMode === 'real') {
      setMode(savedMode);
    }
  }, []);

  useEffect(() => {
    // Persist mode in localStorage
    localStorage.setItem('decision_mirror_mode', mode);
  }, [mode]);

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('decision_mirror_api_key', apiKey.trim());
      setIsUsingFallback(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  const handleClearApiKey = () => {
    setApiKey('');
    localStorage.removeItem('decision_mirror_api_key');
    setIsUsingFallback(true);
  };

  const handleResetAll = () => {
    setApiKey('');
    localStorage.removeItem('decision_mirror_api_key');
    setIsUsingFallback(true);
    setMode('real');
    localStorage.setItem('decision_mirror_mode', 'real');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <SettingsIcon className="w-6 h-6 text-white" />
            <h2 className="text-xl font-bold text-white">Settings</h2>
            {/* Mode Badge */}
            <span className={`ml-4 px-3 py-1 rounded-full text-xs font-semibold ${mode === 'demo' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'}`}>{mode === 'demo' ? 'Demo Mode' : 'Real Mode'}</span>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-lg transition-all duration-200"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Demo/Real Toggle Section */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <button
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${mode === 'real' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setMode('real')}
              disabled={mode === 'real'}
            >
              Real
            </button>
            <div className="relative flex items-center">
              <button
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${mode === 'demo' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setMode('demo')}
                disabled={mode === 'demo'}
              >
                Demo
              </button>
              <Info className="w-4 h-4 ml-2 text-gray-400 cursor-pointer" onMouseEnter={() => setShowDemoInfo(true)} onMouseLeave={() => setShowDemoInfo(false)} />
              {showDemoInfo && (
                <div className="absolute left-1/2 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-xs text-gray-700 z-10">
                  Demo mode uses hardcoded sample data for safe, offline demonstrations. No API key or internet required.
                </div>
              )}
            </div>
          </div>

          {/* API Key Section */}
          <div className="space-y-4 opacity-100 transition-opacity duration-300" style={{ opacity: mode === 'demo' ? 0.5 : 1, pointerEvents: mode === 'demo' ? 'none' : 'auto' }}>
            <div className="flex items-center space-x-3">
              <Key className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">AI API Configuration</h3>
            </div>
            {mode === 'demo' && (
              <div className="bg-gray-100 border border-gray-200 rounded-xl p-3 text-gray-500 text-sm mb-2">
                API Key is disabled in Demo mode. Switch to Real mode to use your OpenAI API key.
              </div>
            )}
            {isUsingFallback && mode !== 'demo' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800">Using Fallback Data</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      No API key provided. The app is currently using pre-generated sample data. 
                      For real AI analysis, please provide your OpenAI API key below.
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="space-y-3">
              <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
                OpenAI API Key
              </label>
              <div className="relative">
                <input
                  id="apiKey"
                  type={showApiKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-..."
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={mode === 'demo'}
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={mode === 'demo'}
                >
                  {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500">
                Your API key is stored locally in your browser and never shared with anyone.
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleSaveApiKey}
                disabled={!apiKey.trim() || mode === 'demo'}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                <span>{isSaved ? 'Saved!' : 'Save API Key'}</span>
              </button>
              {apiKey && (
                <button
                  onClick={handleClearApiKey}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200"
                  disabled={mode === 'demo'}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Privacy Section */}
          <div className="space-y-4 border-t border-gray-200 pt-6">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Privacy & Security</h3>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <h4 className="font-semibold text-green-800 mb-2">Your Data is Private</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• API keys are stored only in your browser's local storage</li>
                <li>• Decision data never leaves your device without your API key</li>
                <li>• No tracking, analytics, or data collection</li>
                <li>• All processing happens client-side when possible</li>
              </ul>
            </div>
          </div>

          {/* How it Works Section */}
          <div className="space-y-4 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900">How It Works</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p><strong>With API Key:</strong> Your decisions are analyzed using OpenAI's GPT models for personalized, intelligent insights.</p>
              <p><strong>Without API Key:</strong> The app uses pre-generated sample scenarios and analysis to demonstrate functionality.</p>
              <p><strong>Recommendation:</strong> Get your own OpenAI API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">platform.openai.com</a> for the best experience.</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 rounded-b-2xl flex flex-col gap-2">
          <button
            onClick={onClose}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 mb-2"
          >
            Close Settings
          </button>
          {onLogout && (
            <button
              onClick={onLogout}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl font-semibold transition-all duration-200 text-sm mb-2"
            >
              Logout
            </button>
          )}
          <button
            onClick={handleResetAll}
            className="w-full bg-red-100 hover:bg-red-200 text-red-700 py-2 rounded-xl font-semibold transition-all duration-200 text-sm"
          >
            Reset All Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;