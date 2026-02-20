import React from 'react';
import { Web3Button } from '../Web3Button';
import { ProgressIndicator } from '../ProgressIndicator';
import { Sparkles } from 'lucide-react';

interface SandboxEntryProps {
  onStart: () => void;
}

export function SandboxEntry({ onStart }: SandboxEntryProps) {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg shadow-purple-500/30">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Learn Arbitrum Safely in a Sandbox
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto mb-8">
            Practice Web3 transactions in a risk-free environment. No real funds needed—just hands-on learning.
          </p>
          
          <Web3Button onClick={onStart} size="lg" className="w-full md:w-auto">
            Start Sandbox
          </Web3Button>
        </div>
        
        {/* Progress Section */}
        <div className="mt-12">
          <ProgressIndicator currentStep={0} totalSteps={4} showLabels={true} />
        </div>
        
        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Safe Environment', desc: 'No real assets at risk' },
            { title: 'Interactive Learning', desc: 'Hands-on experience' },
            { title: 'Guided Steps', desc: 'Clear instructions' }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center"
            >
              <h3 className="text-sm font-medium text-gray-200 mb-1">{feature.title}</h3>
              <p className="text-xs text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
