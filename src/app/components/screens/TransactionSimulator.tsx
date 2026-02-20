import React, { useState } from 'react';
import { Web3Button } from '../Web3Button';
import { Web3Card } from '../Web3Card';
import { ProgressIndicator } from '../ProgressIndicator';
import { Wallet, ArrowRight, Check, ArrowLeft, Zap } from 'lucide-react';

interface TransactionSimulatorProps {
  onComplete: () => void;
  onBack: () => void;
}

export function TransactionSimulator({ onComplete, onBack }: TransactionSimulatorProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const steps = [
    { id: 1, title: 'Review Transaction', status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'active' : 'pending' },
    { id: 2, title: 'Confirm & Sign', status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'active' : 'pending' },
    { id: 3, title: 'Transaction Sent', status: currentStep === 3 ? 'active' : 'pending' }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Transaction Simulator
          </h1>
          
          <ProgressIndicator currentStep={2} totalSteps={4} showLabels={true} />
        </div>

        {/* Main Content - 3 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Panel - Wallet Info */}
          <div className="lg:col-span-3">
            <Web3Card>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Your Wallet</p>
                  <p className="text-xs text-gray-500 font-mono">0x742d...3a9f</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Balance</p>
                  <p className="text-lg font-semibold text-white">10.5 ETH</p>
                </div>
                
                <div>
                  <p className="text-xs text-gray-500 mb-1">Network</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-sm text-white">Arbitrum One</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-800">
                  <p className="text-xs text-gray-500 mb-2">Gas Fee</p>
                  <p className="text-sm text-white">~$2.50</p>
                </div>
              </div>
            </Web3Card>
          </div>

          {/* Center Panel - Transaction Steps */}
          <div className="lg:col-span-6">
            <Web3Card className="mb-6">
              {/* Step Indicator */}
              <div className="flex items-center justify-between mb-8">
                {steps.map((step, index) => (
                  <React.Fragment key={step.id}>
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                          step.status === 'completed'
                            ? 'bg-green-600'
                            : step.status === 'active'
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                            : 'bg-gray-800 border border-gray-700'
                        }`}
                      >
                        {step.status === 'completed' ? (
                          <Check className="w-5 h-5 text-white" />
                        ) : (
                          <span className={`text-sm ${step.status === 'active' ? 'text-white' : 'text-gray-500'}`}>
                            {step.id}
                          </span>
                        )}
                      </div>
                      <p className={`text-xs text-center ${step.status === 'active' ? 'text-white' : 'text-gray-500'}`}>
                        {step.title}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`h-px flex-1 mx-2 mb-6 ${step.status === 'completed' ? 'bg-green-600' : 'bg-gray-800'}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Step Content */}
              <div className="space-y-6">
                {currentStep === 1 && (
                  <>
                    <h3 className="text-xl font-semibold text-white">Review Your Transaction</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-3 border-b border-gray-800">
                        <span className="text-gray-400">Action</span>
                        <span className="text-white">Send Tokens</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-800">
                        <span className="text-gray-400">To</span>
                        <span className="text-white font-mono text-sm">0x89ab...4f2c</span>
                      </div>
                      <div className="flex justify-between items-center py-3 border-b border-gray-800">
                        <span className="text-gray-400">Amount</span>
                        <span className="text-white">1.5 ETH</span>
                      </div>
                      <div className="flex justify-between items-center py-3">
                        <span className="text-gray-400">Estimated Gas</span>
                        <span className="text-white">0.002 ETH</span>
                      </div>
                    </div>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <h3 className="text-xl font-semibold text-white">Confirm & Sign Transaction</h3>
                    <div className="bg-gray-950 border border-gray-800 rounded-xl p-4">
                      <p className="text-sm text-gray-400 mb-4">
                        By signing this transaction, you authorize the transfer of 1.5 ETH to the recipient address.
                      </p>
                      <div className="flex items-center gap-2 text-yellow-500">
                        <Zap className="w-4 h-4" />
                        <p className="text-sm">This is a simulated transaction</p>
                      </div>
                    </div>
                  </>
                )}

                {currentStep === 3 && (
                  <>
                    <h3 className="text-xl font-semibold text-white">Transaction Processing</h3>
                    <div className="bg-gray-950 border border-gray-800 rounded-xl p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Check className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-gray-400 mb-2">Transaction Hash</p>
                      <p className="text-xs text-gray-500 font-mono break-all">
                        0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z
                      </p>
                    </div>
                  </>
                )}
              </div>
            </Web3Card>

            <div className="flex gap-4">
              <Web3Button
                onClick={handleNext}
                size="lg"
                className="flex-1"
              >
                {currentStep === totalSteps ? 'Complete' : 'Continue'}
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Web3Button>
            </div>
          </div>

          {/* Right Panel - Info */}
          <div className="lg:col-span-3">
            <Web3Card>
              <h3 className="font-semibold text-white mb-4">Transaction Details</h3>
              
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-1">Status</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <p className="text-white">
                      {currentStep === 1 ? 'Reviewing' : currentStep === 2 ? 'Awaiting Signature' : 'Processing'}
                    </p>
                  </div>
                </div>
                
                <div>
                  <p className="text-gray-500 mb-1">Block Confirmations</p>
                  <p className="text-white">0/12</p>
                </div>
                
                <div>
                  <p className="text-gray-500 mb-1">Transaction Type</p>
                  <p className="text-white">ERC-20 Transfer</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-800">
                <h4 className="text-sm font-medium text-white mb-3">Learning Tips</h4>
                <ul className="space-y-2 text-xs text-gray-400">
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Always verify the recipient address</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Check gas fees before confirming</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Transactions cannot be reversed</span>
                  </li>
                </ul>
              </div>
            </Web3Card>
          </div>
        </div>
      </div>
    </div>
  );
}
