import React from 'react';
import { AlertTriangle, Shield, TrendingUp, Target, Clock, Users } from 'lucide-react';

interface RiskAnalysisProps {
  riskScore: number;
  regretProbability: number;
  uncertaintyFactors: string[];
  mitigationStrategies: string[];
}

const RiskAnalysis: React.FC<RiskAnalysisProps> = ({ 
  riskScore, 
  regretProbability, 
  uncertaintyFactors, 
  mitigationStrategies 
}) => {
  const getRiskLevel = (score: number) => {
    if (score >= 80) return { level: 'High', color: 'red', bg: 'red-50' };
    if (score >= 50) return { level: 'Medium', color: 'yellow', bg: 'yellow-50' };
    return { level: 'Low', color: 'green', bg: 'green-50' };
  };

  const risk = getRiskLevel(riskScore);
  const regret = getRiskLevel(regretProbability);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Risk Analysis</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Comprehensive evaluation of potential risks, uncertainties, and mitigation strategies for your decision.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Risk Score Card */}
        <div className={`bg-${risk.bg} border border-${risk.color}-200 rounded-2xl p-8`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className={`p-3 bg-${risk.color}-100 rounded-xl`}>
                <AlertTriangle className={`w-6 h-6 text-${risk.color}-600`} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Overall Risk Score</h3>
                <p className="text-sm text-gray-600">Based on multiple risk factors</p>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-3xl font-bold text-${risk.color}-600`}>{riskScore}/100</div>
              <div className={`text-sm font-medium text-${risk.color}-600`}>{risk.level} Risk</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className={`h-3 bg-${risk.color}-500 rounded-full transition-all duration-1000`}
              style={{ width: `${riskScore}%` }}
            ></div>
          </div>
        </div>

        {/* Regret Probability Card */}
        <div className={`bg-${regret.bg} border border-${regret.color}-200 rounded-2xl p-8`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className={`p-3 bg-${regret.color}-100 rounded-xl`}>
                <Target className={`w-6 h-6 text-${regret.color}-600`} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Regret Probability</h3>
                <p className="text-sm text-gray-600">Likelihood of future regret</p>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-3xl font-bold text-${regret.color}-600`}>{regretProbability}%</div>
              <div className={`text-sm font-medium text-${regret.color}-600`}>{regret.level} Chance</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className={`h-3 bg-${regret.color}-500 rounded-full transition-all duration-1000`}
              style={{ width: `${regretProbability}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Uncertainty Factors */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-orange-100 rounded-xl">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Uncertainty Factors</h3>
              <p className="text-sm text-gray-600">Elements that could affect outcomes</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {uncertaintyFactors.map((factor, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm leading-relaxed">{factor}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mitigation Strategies */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Mitigation Strategies</h3>
              <p className="text-sm text-gray-600">Ways to reduce risks and uncertainties</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {mitigationStrategies.map((strategy, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm leading-relaxed">{strategy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Risk Breakdown */}
      <div className="mt-12 bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-purple-100 rounded-xl">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Risk Breakdown</h3>
            <p className="text-sm text-gray-600">Detailed analysis of risk components</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Financial Risk', value: 65, color: 'green' },
            { label: 'Career Impact', value: 45, color: 'blue' },
            { label: 'Personal Stress', value: 30, color: 'yellow' },
            { label: 'Opportunity Cost', value: 55, color: 'purple' }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-3">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={`var(--${item.color}-500)`}
                    strokeWidth="2"
                    strokeDasharray={`${item.value}, 100`}
                    className={`text-${item.color}-500`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-lg font-bold text-${item.color}-600`}>{item.value}%</span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-700">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskAnalysis;