import React, { useState } from 'react';
import { Web3Button } from '../Web3Button';
import { Web3Card } from '../Web3Card';
import { motion, AnimatePresence } from 'motion/react';
import { Wallet, ArrowLeftRight, Repeat, Droplets, CheckCircle, Trophy, Sparkles, ArrowRight, ArrowLeft, TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';

interface Lesson6Props {
  onComplete: () => void;
  onBack: () => void;
}

type WorkflowStep = 'bridge' | 'swap' | 'liquidity' | 'yield' | null;
type StepStatus = 'pending' | 'active' | 'completed';

interface PortfolioState {
  ethBalance: number;
  usdcBalance: number;
  lpTokens: number;
  yieldEarned: number;
}

export function Lesson6({ onComplete, onBack }: Lesson6Props) {
  const [currentStep, setCurrentStep] = useState<WorkflowStep>(null);
  const [completedSteps, setCompletedSteps] = useState<WorkflowStep[]>([]);
  const [showCelebration, setShowCelebration] = useState(false);
  const [portfolio, setPortfolio] = useState<PortfolioState>({
    ethBalance: 0,
    usdcBalance: 0,
    lpTokens: 0,
    yieldEarned: 0
  });

  const steps = [
    { 
      id: 'bridge' as WorkflowStep, 
      icon: ArrowLeftRight, 
      title: 'Bridge', 
      description: 'Move to Arbitrum',
      color: 'from-blue-500 to-cyan-500',
      details: 'Bridge 5 ETH from Ethereum to Arbitrum',
      action: 'Bridge Now'
    },
    { 
      id: 'swap' as WorkflowStep, 
      icon: Repeat, 
      title: 'Swap', 
      description: 'Exchange tokens',
      color: 'from-purple-500 to-pink-500',
      details: 'Swap 2.5 ETH for 5,000 USDC on DEX',
      action: 'Execute Swap'
    },
    { 
      id: 'liquidity' as WorkflowStep, 
      icon: Droplets, 
      title: 'Add Liquidity', 
      description: 'Provide to pool',
      color: 'from-green-500 to-emerald-500',
      details: 'Add 2.5 ETH + 5,000 USDC to liquidity pool',
      action: 'Add Liquidity'
    },
    { 
      id: 'yield' as WorkflowStep, 
      icon: TrendingUp, 
      title: 'Stake LP', 
      description: 'Earn rewards',
      color: 'from-orange-500 to-yellow-500',
      details: 'Stake LP tokens to earn 15% APY',
      action: 'Stake Tokens'
    }
  ];

  const getStepStatus = (stepId: WorkflowStep): StepStatus => {
    if (completedSteps.includes(stepId)) return 'completed';
    if (currentStep === stepId) return 'active';
    return 'pending';
  };

  const handleStepClick = (stepId: WorkflowStep) => {
    const stepIndex = steps.findIndex(s => s.id === stepId);
    const canAccess = stepIndex === 0 || completedSteps.includes(steps[stepIndex - 1].id);
    
    if (!completedSteps.includes(stepId) && canAccess) {
      setCurrentStep(stepId);
    }
  };

  const handleStepComplete = () => {
    if (currentStep) {
      const newCompleted = [...completedSteps, currentStep];
      setCompletedSteps(newCompleted);
      
      // Update portfolio based on step
      const newPortfolio = { ...portfolio };
      if (currentStep === 'bridge') {
        newPortfolio.ethBalance = 5;
      } else if (currentStep === 'swap') {
        newPortfolio.ethBalance = 2.5;
        newPortfolio.usdcBalance = 5000;
      } else if (currentStep === 'liquidity') {
        newPortfolio.ethBalance = 0;
        newPortfolio.usdcBalance = 0;
        newPortfolio.lpTokens = 7500; // LP token value
      } else if (currentStep === 'yield') {
        newPortfolio.yieldEarned = 1125; // 15% APY simulated
      }
      setPortfolio(newPortfolio);
      
      setCurrentStep(null);
      
      if (newCompleted.length === 4) {
        setTimeout(() => {
          setShowCelebration(true);
        }, 500);
      }
    }
  };

  const totalValue = portfolio.ethBalance * 2000 + portfolio.usdcBalance + portfolio.lpTokens + portfolio.yieldEarned;
  const riskScore = completedSteps.length >= 3 ? 'Medium' : 'Low';

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-6 md:py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Lesson 6 of 6</span>
              <span className="text-sm font-medium text-gray-300">100%</span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 w-full transition-all duration-500" />
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Full DeFi Strategy Simulator
            </h1>
            <Sparkles className="w-6 h-6 text-yellow-500" />
          </div>
          <p className="text-gray-400">
            Master the complete DeFi workflow on Arbitrum
          </p>
        </div>

        {/* Strategy Dashboard */}
        <Web3Card className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-6">DeFi Strategy Workflow</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const status = getStepStatus(step.id);
              const prevStepCompleted = index === 0 || completedSteps.includes(steps[index - 1].id);
              const isLocked = !prevStepCompleted && status === 'pending';
              
              return (
                <motion.button
                  key={step.id}
                  onClick={() => handleStepClick(step.id)}
                  disabled={status === 'completed' || isLocked}
                  whileHover={!isLocked && status !== 'completed' ? { scale: 1.05 } : {}}
                  whileTap={!isLocked && status !== 'completed' ? { scale: 0.95 } : {}}
                  className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                    status === 'completed'
                      ? 'border-green-500 bg-green-500/10 cursor-default'
                      : status === 'active'
                      ? 'border-purple-500 bg-purple-500/10'
                      : isLocked
                      ? 'border-gray-800 bg-gray-900/50 cursor-not-allowed opacity-50'
                      : 'border-gray-800 bg-gray-900 hover:border-gray-700'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-3 relative ${isLocked ? 'opacity-50' : ''}`}>
                    {status === 'completed' ? (
                      <CheckCircle className="w-7 h-7 text-white" />
                    ) : (
                      <Icon className="w-7 h-7 text-white" />
                    )}
                    {status === 'active' && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <p className={`text-sm font-medium text-center mb-1 ${
                    status === 'completed' ? 'text-green-400' : status === 'active' ? 'text-white' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-600 text-center">{step.description}</p>
                </motion.button>
              );
            })}
          </div>

          {/* Flow Arrows */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className={`w-2 h-2 rounded-full ${completedSteps.includes(step.id) ? 'bg-green-500' : 'bg-gray-700'}`}></div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 w-8 ${completedSteps.includes(step.id) ? 'bg-green-500' : 'bg-gray-700'}`}></div>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="bg-gray-950 border border-gray-800 rounded-xl p-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Strategy Progress</span>
              <span className="text-sm font-medium text-white">{completedSteps.length}/4 Complete</span>
            </div>
          </div>
        </Web3Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Interactive Workflow */}
          <div className="lg:col-span-2 space-y-6">
            {/* Interactive Step Panel */}
            <AnimatePresence mode="wait">
              {currentStep && (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Web3Card>
                    {(() => {
                      const step = steps.find(s => s.id === currentStep);
                      if (!step) return null;
                      const Icon = step.icon;

                      return (
                        <>
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center`}>
                              <Icon className="w-7 h-7 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-white text-lg">{step.title}</h3>
                              <p className="text-sm text-gray-500">{step.description}</p>
                            </div>
                          </div>

                          <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 mb-4">
                            <p className="text-sm text-gray-400 mb-3">Transaction Details:</p>
                            <p className="text-white mb-4">{step.details}</p>
                            
                            <div className="space-y-2 text-xs">
                              <div className="flex justify-between">
                                <span className="text-gray-500">Network</span>
                                <span className="text-gray-300">Arbitrum</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Gas Fee</span>
                                <span className="text-green-400">~$0.18</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Status</span>
                                <span className="text-yellow-400">Ready to Execute</span>
                              </div>
                            </div>
                          </div>

                          <Web3Button onClick={handleStepComplete} className="w-full">
                            {step.action}
                            <CheckCircle className="w-5 h-5 ml-2 inline" />
                          </Web3Button>
                        </>
                      );
                    })()}
                  </Web3Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Educational Breakdown */}
            {completedSteps.length > 0 && !showCelebration && (
              <Web3Card>
                <h3 className="text-lg font-semibold text-white mb-4">How DeFi Protocols Connect</h3>
                <div className="space-y-3">
                  {completedSteps.includes('bridge') && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-3 bg-gray-950 border border-gray-800 rounded-lg p-3"
                    >
                      <ArrowLeftRight className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-white">Bridge Protocol</p>
                        <p className="text-xs text-gray-400">Securely moved assets from Ethereum L1 to Arbitrum L2</p>
                      </div>
                    </motion.div>
                  )}
                  
                  {completedSteps.includes('swap') && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-start gap-3 bg-gray-950 border border-gray-800 rounded-lg p-3"
                    >
                      <Repeat className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-white">DEX Aggregator</p>
                        <p className="text-xs text-gray-400">Used automated market maker to swap tokens instantly</p>
                      </div>
                    </motion.div>
                  )}

                  {completedSteps.includes('liquidity') && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-start gap-3 bg-gray-950 border border-gray-800 rounded-lg p-3"
                    >
                      <Droplets className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-white">Liquidity Pool</p>
                        <p className="text-xs text-gray-400">Provided liquidity to earn trading fees from pool activity</p>
                      </div>
                    </motion.div>
                  )}

                  {completedSteps.includes('yield') && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-start gap-3 bg-gray-950 border border-gray-800 rounded-lg p-3"
                    >
                      <TrendingUp className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-white">Yield Farming</p>
                        <p className="text-xs text-gray-400">Staked LP tokens in protocol to earn additional rewards</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </Web3Card>
            )}
          </div>

          {/* Right Column - Risk & Reward Panel */}
          <div className="space-y-6">
            <Web3Card>
              <h3 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                Portfolio Overview
              </h3>
              
              <div className="space-y-3 mb-4">
                <div className="bg-gray-950 border border-gray-800 rounded-lg p-3">
                  <p className="text-xs text-gray-500 mb-1">Total Value</p>
                  <motion.p
                    key={totalValue}
                    initial={{ scale: 1.2, color: '#a855f7' }}
                    animate={{ scale: 1, color: '#ffffff' }}
                    className="text-2xl font-bold text-white"
                  >
                    ${totalValue.toLocaleString()}
                  </motion.p>
                </div>

                {portfolio.ethBalance > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">ETH Balance</span>
                    <span className="text-white font-medium">{portfolio.ethBalance} ETH</span>
                  </div>
                )}

                {portfolio.usdcBalance > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">USDC Balance</span>
                    <span className="text-white font-medium">${portfolio.usdcBalance.toLocaleString()}</span>
                  </div>
                )}

                {portfolio.lpTokens > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">LP Tokens</span>
                    <span className="text-green-400 font-medium">${portfolio.lpTokens.toLocaleString()}</span>
                  </div>
                )}

                {portfolio.yieldEarned > 0 && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Yield Earned</span>
                    <span className="text-orange-400 font-medium">+${portfolio.yieldEarned.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </Web3Card>

            {completedSteps.length >= 2 && (
              <Web3Card>
                <h3 className="text-sm font-medium text-white mb-4">Risk & Reward</h3>
                
                <div className="space-y-3">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-xs font-medium text-green-400">Expected APY</span>
                    </div>
                    <p className="text-lg font-bold text-green-400">15%</p>
                  </div>

                  {completedSteps.includes('liquidity') && (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="w-4 h-4 text-yellow-400" />
                        <span className="text-xs font-medium text-yellow-400">Impermanent Loss</span>
                      </div>
                      <p className="text-xs text-gray-400">Low risk due to correlated assets</p>
                    </div>
                  )}

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-4 h-4 text-blue-400" />
                      <span className="text-xs font-medium text-blue-400">Total Fees</span>
                    </div>
                    <p className="text-lg font-bold text-blue-400">$0.72</p>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-gray-800">
                    <span className="text-xs text-gray-500">Risk Score</span>
                    <span className={`text-xs font-medium ${riskScore === 'Low' ? 'text-green-400' : 'text-yellow-400'}`}>
                      {riskScore}
                    </span>
                  </div>
                </div>
              </Web3Card>
            )}
          </div>
        </div>

        {/* Completion Celebration */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="mt-6"
            >
              <Web3Card className="relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-orange-500/10 to-pink-500/10"></div>
                
                <div className="relative">
                  <div className="flex flex-col items-center text-center mb-6">
                    <motion.div
                      initial={{ scale: 0, rotate: 0 }}
                      animate={{ scale: 1, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                      className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-500 via-orange-500 to-pink-500 flex items-center justify-center mb-4 shadow-2xl shadow-yellow-500/50"
                    >
                      <Trophy className="w-12 h-12 text-white" />
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Sparkles className="w-6 h-6 text-yellow-500" />
                        <h3 className="text-3xl font-bold text-white">
                          DeFi Master!
                        </h3>
                        <Sparkles className="w-6 h-6 text-yellow-500" />
                      </div>
                      <p className="text-lg text-orange-400 mb-2">DeFi Strategist Badge Earned</p>
                      <p className="text-sm text-gray-400 max-w-md mb-4">
                        You've completed the full DeFi workflow. You're now at Intermediate level!
                      </p>
                    </motion.div>

                    <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-purple-500/30 rounded-full px-4 py-2">
                      <TrendingUp className="w-4 h-4 text-purple-400" />
                      <span className="text-sm font-medium text-purple-400">Level Up: Intermediate</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-950/50 border border-gray-800 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-blue-400">4</p>
                      <p className="text-xs text-gray-500">Steps Mastered</p>
                    </div>
                    <div className="bg-gray-950/50 border border-gray-800 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-green-400">${portfolio.yieldEarned}</p>
                      <p className="text-xs text-gray-500">Yield Earned</p>
                    </div>
                    <div className="bg-gray-950/50 border border-gray-800 rounded-xl p-4 text-center">
                      <p className="text-2xl font-bold text-orange-400">15%</p>
                      <p className="text-xs text-gray-500">APY Achieved</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Web3Button 
                      onClick={() => alert('Achievement shared! 🎉')} 
                      variant="outline" 
                      className="flex-1"
                    >
                      Share Achievement
                    </Web3Button>
                    <Web3Button onClick={onComplete} className="flex-1">
                      Enter Advanced Sandbox
                      <ArrowRight className="w-5 h-5 ml-2 inline" />
                    </Web3Button>
                  </div>
                </div>
              </Web3Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
