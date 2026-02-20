import React from 'react';
import { Web3Button } from '../Web3Button';
import { CheckCircle, TrendingUp, Clock, Award, ArrowLeft } from 'lucide-react';

interface SuccessScreenProps {
  onExplore: () => void;
  onBack: () => void;
}

export function SuccessScreen({ onExplore, onBack }: SuccessScreenProps) {
  const stats = [
    { icon: TrendingUp, label: 'Transactions Completed', value: '3', color: 'from-green-500 to-emerald-500' },
    { icon: Clock, label: 'Time Spent', value: '12m', color: 'from-blue-500 to-cyan-500' },
    { icon: Award, label: 'Skills Learned', value: '5', color: 'from-purple-500 to-pink-500' }
  ];

  const achievements = [
    'Sent your first token transfer',
    'Interacted with a smart contract',
    'Approved a contract interaction',
    'Reviewed gas fees and costs',
    'Completed sandbox training'
  ];

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-8">
      <div className="max-w-3xl w-full">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full mb-6 shadow-2xl shadow-green-500/30 animate-pulse">
            <CheckCircle className="w-14 h-14 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Congratulations!
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            You've successfully completed the Arbitrum sandbox training. You're now ready to explore the ecosystem.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Achievements */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">What You've Learned</h2>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-start gap-3 text-gray-300"
              >
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>{achievement}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Web3Button onClick={onExplore} size="lg" className="flex-1">
            Explore Ecosystem
          </Web3Button>
          <Web3Button onClick={onBack} variant="outline" size="lg" className="flex-1">
            Return to Dashboard
          </Web3Button>
        </div>

        {/* Next Steps */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Ready to dive deeper? Check out our advanced tutorials and documentation.
          </p>
        </div>
      </div>
    </div>
  );
}
