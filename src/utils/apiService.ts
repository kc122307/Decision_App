// API Service for handling OpenAI integration and fallback data
export class ApiService {
  private static instance: ApiService;
  private apiKey: string | null = null;

  private constructor() {
    this.loadApiKey();
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private loadApiKey(): void {
    this.apiKey = localStorage.getItem('decision_mirror_api_key');
  }

  public hasApiKey(): boolean {
    this.loadApiKey(); // Refresh from localStorage
    return !!this.apiKey;
  }

  public async analyzeDecision(decisionData: {
    title: string;
    description: string;
    category: string;
  }): Promise<any> {
    if (!this.hasApiKey()) {
      console.log('No API key found, using fallback data');
      return this.getFallbackAnalysis(decisionData);
    }

    try {
      // In a real implementation, this would call OpenAI API
      // For now, we'll simulate the API call and return enhanced mock data
      console.log('Using API key for analysis (simulated)');
      return this.getEnhancedAnalysis(decisionData);
    } catch (error) {
      console.error('API call failed, falling back to mock data:', error);
      return this.getFallbackAnalysis(decisionData);
    }
  }

  private getFallbackAnalysis(decisionData: any) {
    return {
      isUsingFallback: true,
      scenarios: this.generateFallbackScenarios(decisionData.title),
      riskAnalysis: this.generateFallbackRiskAnalysis(),
      emotionalAnalysis: this.generateFallbackEmotionalAnalysis(),
      philosophicalGuidance: this.generateFallbackPhilosophicalGuidance(decisionData.title)
    };
  }

  private getEnhancedAnalysis(decisionData: any) {
    // This would be replaced with actual OpenAI API calls
    return {
      isUsingFallback: false,
      scenarios: this.generateEnhancedScenarios(decisionData.title, decisionData.description),
      riskAnalysis: this.generateEnhancedRiskAnalysis(decisionData),
      emotionalAnalysis: this.generateEnhancedEmotionalAnalysis(decisionData),
      philosophicalGuidance: this.generateEnhancedPhilosophicalGuidance(decisionData)
    };
  }

  private generateFallbackScenarios(title: string) {
    return [
      {
        id: '1',
        type: 'best',
        title: 'Optimal Outcome (Sample Data)',
        description: 'This is sample data. Everything goes better than expected with this decision. For personalized analysis, please add your OpenAI API key in Settings.',
        probability: 25,
        timeline: [
          { year: 1, event: 'Positive initial results (sample)', impact: 'positive' },
          { year: 2, event: 'Continued success (sample)', impact: 'positive' },
          { year: 5, event: 'Long-term benefits realized (sample)', impact: 'positive' }
        ],
        emotionalScore: 9,
        financialImpact: 45000,
        happinessIndex: 85,
        stressLevel: 25
      },
      {
        id: '2',
        type: 'realistic',
        title: 'Most Likely Scenario (Sample Data)',
        description: 'This is sample data showing a balanced outcome. For real AI analysis based on your specific situation, please configure your API key.',
        probability: 50,
        timeline: [
          { year: 1, event: 'Mixed initial results (sample)', impact: 'neutral' },
          { year: 2, event: 'Steady progress (sample)', impact: 'positive' },
          { year: 5, event: 'Solid foundation built (sample)', impact: 'positive' }
        ],
        emotionalScore: 7,
        financialImpact: 15000,
        happinessIndex: 70,
        stressLevel: 45
      },
      {
        id: '3',
        type: 'worst',
        title: 'Challenging Outcome (Sample Data)',
        description: 'This is sample data showing potential challenges. Real analysis would consider your specific circumstances and provide personalized insights.',
        probability: 25,
        timeline: [
          { year: 1, event: 'Initial difficulties (sample)', impact: 'negative' },
          { year: 2, event: 'Learning from setbacks (sample)', impact: 'neutral' },
          { year: 5, event: 'Recovery and growth (sample)', impact: 'positive' }
        ],
        emotionalScore: 4,
        financialImpact: -8000,
        happinessIndex: 45,
        stressLevel: 75
      }
    ];
  }

  private generateEnhancedScenarios(title: string, description: string) {
    // This would use actual AI analysis
    return this.generateFallbackScenarios(title).map(scenario => ({
      ...scenario,
      title: scenario.title.replace(' (Sample Data)', ' (AI Enhanced)'),
      description: `AI-analyzed scenario based on your specific situation: ${description.substring(0, 100)}...`
    }));
  }

  private generateFallbackRiskAnalysis() {
    return {
      riskScore: 55,
      regretProbability: 35,
      uncertaintyFactors: [
        'Sample uncertainty factor - Market conditions (Configure API key for personalized analysis)',
        'Sample uncertainty factor - Personal circumstances changes',
        'Sample uncertainty factor - External economic factors',
        'Sample uncertainty factor - Competition and industry changes',
        'Sample uncertainty factor - Unforeseen personal developments'
      ],
      mitigationStrategies: [
        'Sample strategy - Create backup plans (Real strategies would be personalized)',
        'Sample strategy - Build professional network',
        'Sample strategy - Develop transferable skills',
        'Sample strategy - Maintain financial reserves',
        'Sample strategy - Set regular review checkpoints',
        'Sample strategy - Seek mentorship and guidance'
      ]
    };
  }

  private generateEnhancedRiskAnalysis(decisionData: any) {
    // This would use actual AI analysis
    const fallback = this.generateFallbackRiskAnalysis();
    return {
      ...fallback,
      uncertaintyFactors: fallback.uncertaintyFactors.map(factor => 
        factor.replace('Sample uncertainty factor - ', 'AI-analyzed factor - ')
      ),
      mitigationStrategies: fallback.mitigationStrategies.map(strategy => 
        strategy.replace('Sample strategy - ', 'AI-recommended strategy - ')
      )
    };
  }

  private generateFallbackEmotionalAnalysis() {
    return {
      satisfaction: 75,
      stress: 45,
      regretPotential: 30,
      happiness: 70,
      confidence: 65
    };
  }

  private generateEnhancedEmotionalAnalysis(decisionData: any) {
    // This would use actual AI analysis
    return this.generateFallbackEmotionalAnalysis();
  }

  private generateFallbackPhilosophicalGuidance(title: string) {
    return {
      stoic: `Sample Stoic guidance: Focus on what you can control in this decision. (Configure API key for personalized philosophical insights)`,
      buddhist: `Sample Buddhist guidance: Consider how this choice affects suffering for yourself and others.`,
      rationalist: `Sample Rationalist guidance: Analyze the evidence and logical reasoning behind each option.`,
      utilitarian: `Sample Utilitarian guidance: Evaluate which choice creates the greatest overall good.`,
      existentialist: `Sample Existentialist guidance: Choose authentically based on your personal values.`
    };
  }

  private generateEnhancedPhilosophicalGuidance(decisionData: any) {
    // This would use actual AI analysis
    const fallback = this.generateFallbackPhilosophicalGuidance(decisionData.title);
    return Object.fromEntries(
      Object.entries(fallback).map(([key, value]) => [
        key,
        value.replace('Sample ', 'AI-enhanced ').replace(' (Configure API key for personalized philosophical insights)', '')
      ])
    );
  }
}

export const apiService = ApiService.getInstance();