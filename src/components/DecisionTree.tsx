import React, { useState } from 'react';
import { ChevronRight, ChevronDown, GitBranch, Target, Zap } from 'lucide-react';

interface TreeNode {
  id: string;
  label: string;
  description: string;
  children?: TreeNode[];
  probability?: number;
  impact?: 'positive' | 'negative' | 'neutral';
  isExpanded?: boolean;
}

interface DecisionTreeProps {
  decisionTitle: string;
}

const DecisionTree: React.FC<DecisionTreeProps> = ({ decisionTitle }) => {
  const [treeData, setTreeData] = useState<TreeNode>({
    id: 'root',
    label: decisionTitle,
    description: 'Main decision point',
    isExpanded: true,
    children: [
      {
        id: 'accept',
        label: 'Accept the Opportunity',
        description: 'Take the new position',
        probability: 70,
        impact: 'positive',
        isExpanded: false,
        children: [
          {
            id: 'success',
            label: 'Excel in New Role',
            description: 'Perform well and advance quickly',
            probability: 65,
            impact: 'positive',
            children: [
              {
                id: 'promotion',
                label: 'Get Promoted',
                description: 'Advance to leadership role within 2 years',
                probability: 80,
                impact: 'positive'
              },
              {
                id: 'expertise',
                label: 'Become Subject Expert',
                description: 'Develop specialized skills and recognition',
                probability: 75,
                impact: 'positive'
              }
            ]
          },
          {
            id: 'struggle',
            label: 'Face Initial Challenges',
            description: 'Encounter difficulties adapting',
            probability: 35,
            impact: 'negative',
            children: [
              {
                id: 'overcome',
                label: 'Overcome Challenges',
                description: 'Learn and adapt successfully',
                probability: 60,
                impact: 'positive'
              },
              {
                id: 'consider-leaving',
                label: 'Consider Leaving',
                description: 'Look for other opportunities',
                probability: 40,
                impact: 'negative'
              }
            ]
          }
        ]
      },
      {
        id: 'decline',
        label: 'Decline the Opportunity',
        description: 'Stay in current position',
        probability: 30,
        impact: 'neutral',
        isExpanded: false,
        children: [
          {
            id: 'status-quo',
            label: 'Maintain Status Quo',
            description: 'Continue current trajectory',
            probability: 85,
            impact: 'neutral',
            children: [
              {
                id: 'gradual-growth',
                label: 'Gradual Career Growth',
                description: 'Slow but steady advancement',
                probability: 70,
                impact: 'positive'
              },
              {
                id: 'stagnation',
                label: 'Career Stagnation',
                description: 'Limited growth opportunities',
                probability: 30,
                impact: 'negative'
              }
            ]
          },
          {
            id: 'regret',
            label: 'Experience Regret',
            description: 'Wonder about missed opportunity',
            probability: 45,
            impact: 'negative'
          }
        ]
      }
    ]
  });

  const toggleNode = (nodeId: string) => {
    const updateNode = (node: TreeNode): TreeNode => {
      if (node.id === nodeId) {
        return { ...node, isExpanded: !node.isExpanded };
      }
      if (node.children) {
        return {
          ...node,
          children: node.children.map(updateNode)
        };
      }
      return node;
    };

    setTreeData(updateNode(treeData));
  };

  const getImpactColor = (impact?: string) => {
    switch (impact) {
      case 'positive': return 'green';
      case 'negative': return 'red';
      default: return 'blue';
    }
  };

  const getImpactIcon = (impact?: string) => {
    switch (impact) {
      case 'positive': return '↗️';
      case 'negative': return '↘️';
      default: return '→';
    }
  };

  const TreeNodeComponent: React.FC<{ node: TreeNode; level: number }> = ({ node, level }) => {
    const hasChildren = node.children && node.children.length > 0;
    const color = getImpactColor(node.impact);

    return (
      <div className={`ml-${level * 6}`}>
        <div 
          className={`bg-white border-2 border-${color}-200 rounded-xl p-4 mb-4 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105`}
          onClick={() => hasChildren && toggleNode(node.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {hasChildren && (
                <div className={`p-1 rounded text-${color}-600`}>
                  {node.isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </div>
              )}
              <div className={`p-2 bg-${color}-100 rounded-lg`}>
                <GitBranch className={`w-5 h-5 text-${color}-600`} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{node.label}</h4>
                <p className="text-sm text-gray-600">{node.description}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {node.probability && (
                <div className="text-center">
                  <div className={`text-lg font-bold text-${color}-600`}>{node.probability}%</div>
                  <div className="text-xs text-gray-500">Probability</div>
                </div>
              )}
              {node.impact && (
                <div className="text-2xl">{getImpactIcon(node.impact)}</div>
              )}
            </div>
          </div>
        </div>

        {hasChildren && node.isExpanded && (
          <div className="pl-6 border-l-2 border-gray-200 ml-4">
            {node.children!.map((child) => (
              <TreeNodeComponent key={child.id} node={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="p-3 bg-purple-100 rounded-xl">
            <GitBranch className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Decision Tree</h2>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Interactive visualization of your decision paths and their potential outcomes. 
          Click on nodes to explore different branches.
        </p>
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Target className="w-6 h-6 text-purple-600" />
            <span className="text-lg font-semibold text-gray-700">Decision Analysis</span>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-gray-600">Positive Impact</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <span className="text-gray-600">Negative Impact</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span className="text-gray-600">Neutral Impact</span>
            </div>
          </div>
        </div>

        <TreeNodeComponent node={treeData} level={0} />

        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex items-center space-x-3 mb-3">
            <Zap className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-blue-900">AI Insights</h4>
          </div>
          <p className="text-blue-800 text-sm leading-relaxed">
            Based on the probability analysis, accepting the opportunity shows a 65% chance of success 
            with significant positive outcomes. The main risk factors are initial adaptation challenges, 
            but with a 60% recovery probability if difficulties arise.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DecisionTree;