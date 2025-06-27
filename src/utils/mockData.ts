import { Decision, Scenario, EmotionalAnalysis } from '../types';
import { apiService } from './apiService';

export const generateMockScenarios = async (decisionTitle: string): Promise<Scenario[]> => {
  const analysis = await apiService.analyzeDecision({
    title: decisionTitle,
    description: 'Generated from title',
    category: 'general'
  });
  
  return analysis.scenarios;
};

export const generateMockRiskAnalysis = async () => {
  const analysis = await apiService.analyzeDecision({
    title: 'Sample Decision',
    description: 'Sample Description',
    category: 'general'
  });
  
  return analysis.riskAnalysis;
};

export const generateMockEmotionalAnalysis = async (): Promise<EmotionalAnalysis> => {
  const analysis = await apiService.analyzeDecision({
    title: 'Sample Decision',
    description: 'Sample Description',
    category: 'general'
  });
  
  return analysis.emotionalAnalysis;
};

// Keep synchronous versions for backward compatibility
export const generateMockScenariosSync = (decisionTitle: string): Scenario[] => {
  return [
    {
      id: '1',
      type: 'best',
      title: 'Optimal Outcome',
      description: 'Everything goes better than expected. New opportunities emerge, skills develop rapidly, and the decision leads to unprecedented growth and satisfaction.',
      probability: 25,
      timeline: [
        { year: 1, event: 'Successful transition and immediate positive impact', impact: 'positive' },
        { year: 2, event: 'Recognition and new opportunities arise', impact: 'positive' },
        { year: 5, event: 'Significant career advancement and personal fulfillment', impact: 'positive' }
      ],
      emotionalScore: 9,
      financialImpact: 45000,
      happinessIndex: 85,
      stressLevel: 25
    },
    {
      id: '2',
      type: 'realistic',
      title: 'Most Likely Scenario',
      description: 'A balanced outcome with both challenges and rewards. Initial adjustment period followed by steady progress and moderate satisfaction.',
      probability: 50,
      timeline: [
        { year: 1, event: 'Initial challenges but gradual adaptation', impact: 'neutral' },
        { year: 2, event: 'Steady progress and skill development', impact: 'positive' },
        { year: 5, event: 'Solid foundation built with room for growth', impact: 'positive' }
      ],
      emotionalScore: 7,
      financialImpact: 15000,
      happinessIndex: 70,
      stressLevel: 45
    },
    {
      id: '3',
      type: 'worst',
      title: 'Challenging Outcome',
      description: 'Significant obstacles and setbacks occur. The decision leads to unexpected difficulties requiring substantial effort to overcome.',
      probability: 25,
      timeline: [
        { year: 1, event: 'Major challenges and adaptation difficulties', impact: 'negative' },
        { year: 2, event: 'Continued struggles but learning experiences', impact: 'negative' },
        { year: 5, event: 'Recovery and lessons learned, though at significant cost', impact: 'neutral' }
      ],
      emotionalScore: 4,
      financialImpact: -8000,
      happinessIndex: 45,
      stressLevel: 75
    }
  ];
};

export const generateMockRiskAnalysisSync = () => {
  return {
    riskScore: 55,
    regretProbability: 35,
    uncertaintyFactors: [
      'Market conditions may change unexpectedly, affecting the success of this decision',
      'Personal circumstances could evolve, making this choice less suitable over time',
      'External factors beyond your control may influence the outcome significantly',
      'Competition in your field might intensify, creating additional challenges',
      'Economic conditions could impact the financial aspects of this decision'
    ],
    mitigationStrategies: [
      'Create a detailed backup plan with alternative options if the primary choice doesn\'t work out',
      'Build a strong professional network to provide support and opportunities',
      'Develop transferable skills that will be valuable regardless of the specific outcome',
      'Maintain financial reserves to weather any temporary setbacks',
      'Set up regular review points to assess progress and make adjustments as needed',
      'Seek mentorship from others who have made similar decisions successfully'
    ]
  };
};

export const generateMockEmotionalAnalysisSync = (): EmotionalAnalysis => {
  return {
    satisfaction: 75,
    stress: 45,
    regretPotential: 30,
    happiness: 70,
    confidence: 65
  };
};