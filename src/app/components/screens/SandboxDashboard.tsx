import React from 'react';
import { Web3Button } from '../Web3Button';
import { Web3Card } from '../Web3Card';
import { ProgressIndicator } from '../ProgressIndicator';
import { Send, Blocks, FileCheck, ArrowLeft, GraduationCap } from 'lucide-react';

interface SandboxDashboardProps {
  onSelectAction: (action: string) => void;
  onBack: () => void;
}

export function SandboxDashboard({ onSelectAction, onBack }: SandboxDashboardProps) {
  const actions = [
    {
      id: 'lessons',
      icon: GraduationCap,
      title: 'Learning Lessons',
      description: 'Interactive step-by-step tutorials to master Web3 fundamentals',
      color: 'from-yellow-500 to-orange-500',
      featured: true
    },
    {
      id: 'send',
      icon: Send,
      title: 'Send Tokens',
      description: 'Learn how to transfer tokens between wallets securely',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'interact',
      icon: Blocks,
      title: 'Interact with dApp',
      description: 'Connect and interact with decentralized applications',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'approve',
      icon: FileCheck,
      title: 'Approve Contract',
      description: 'Understand smart contract approvals and permissions',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Sandbox Dashboard
              </h1>
              <p className="text-gray-400">
                Choose an action to practice your Web3 skills
              </p>
            </div>
          </div>
          
          <ProgressIndicator currentStep={1} totalSteps={4} showLabels={true} />
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <Web3Card key={action.id} hover className={`flex flex-col h-full ${action.featured ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                {action.featured && (
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full text-xs font-medium text-yellow-400">
                      Recommended
                    </span>
                  </div>
                )}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">
                  {action.title}
                </h3>
                
                <p className="text-gray-400 mb-6 flex-grow">
                  {action.description}
                </p>
                
                <Web3Button
                  onClick={() => onSelectAction(action.id)}
                  variant={action.featured ? 'primary' : 'outline'}
                  className="w-full"
                >
                  {action.featured ? 'Start Learning' : 'Start'}
                </Web3Button>
              </Web3Card>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Transactions', value: '0' },
            { label: 'Completed', value: '0%' },
            { label: 'Time Spent', value: '2m' },
            { label: 'Level', value: 'Beginner' }
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center"
            >
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}