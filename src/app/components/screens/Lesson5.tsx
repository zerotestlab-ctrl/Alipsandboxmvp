import React, { useState } from 'react';
import { Web3Button } from '../Web3Button';
import { Web3Card } from '../Web3Card';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, AlertTriangle, CheckCircle, X, Eye, Award, TrendingDown, Lock, ArrowRight, ArrowLeft } from 'lucide-react';

interface Lesson5Props {
  onContinue: () => void;
  onBack: () => void;
}

type ApprovalType = null | 'unlimited' | 'limited';
type QuizAnswer = 'unlimited' | 'limited-safe' | 'reject' | null;

export function Lesson5({ onContinue, onBack }: Lesson5Props) {
  const [showApprovalPopup, setShowApprovalPopup] = useState(true);
  const [showInspector, setShowInspector] = useState(false);
  const [approvalType, setApprovalType] = useState<ApprovalType>(null);
  const [showImpact, setShowImpact] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<QuizAnswer>(null);

  const contractData = {
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    name: 'YieldFarm Protocol',
    reputation: 42, // Low score
    requestedAmount: 'Unlimited',
    riskLevel: 'high' as const
  };

  const handleInspect = () => {
    setShowInspector(true);
  };

  const handleApproval = (type: ApprovalType) => {
    setApprovalType(type);
    setShowApprovalPopup(false);
    setShowInspector(false);
    setShowImpact(true);
    
    setTimeout(() => {
      setShowQuiz(true);
    }, 3000);
  };

  const isCorrectAnswer = quizAnswer === 'limited-safe';

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-6 md:py-8">
      <div className="max-w-2xl mx-auto">
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
              <span className="text-sm text-gray-400">Lesson 5 of 6</span>
              <span className="text-sm font-medium text-gray-300">83%</span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 w-5/6 transition-all duration-500" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Smart Contract Risk Analyzer
          </h1>
          <p className="text-gray-400">
            Learn to inspect and protect your wallet from risky approvals
          </p>
        </div>

        {/* Fake dApp Approval Request */}
        <AnimatePresence>
          {showApprovalPopup && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Web3Card className="mb-6 relative">
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{contractData.name}</h3>
                      <p className="text-xs text-gray-500">Requesting Token Approval</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowApprovalPopup(false)}
                    className="text-gray-500 hover:text-gray-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 mb-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                      <span className="text-gray-500">Contract Address</span>
                      <span className="text-gray-300 font-mono text-xs">{contractData.address.slice(0, 10)}...</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                      <span className="text-gray-500">Token Allowance</span>
                      <span className="text-red-400 font-medium">Unlimited</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Permission Type</span>
                      <span className="text-gray-300">Full Access</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Web3Button
                    onClick={handleInspect}
                    variant="outline"
                    size="sm"
                    className="flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    Inspect Details
                  </Web3Button>
                  <Web3Button
                    onClick={() => handleApproval('unlimited')}
                    size="sm"
                  >
                    Approve
                  </Web3Button>
                </div>
              </Web3Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Inspector View */}
        <AnimatePresence>
          {showInspector && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Web3Card className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-white">Contract Risk Analysis</h3>
                  <button
                    onClick={() => setShowInspector(false)}
                    className="text-gray-500 hover:text-gray-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Risk Level Indicator */}
                <div className="bg-red-500/10 border-2 border-red-500/50 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-6 h-6 text-red-500" />
                      <div>
                        <p className="font-medium text-red-400">High Risk Detected</p>
                        <p className="text-xs text-gray-400">Multiple security concerns identified</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-red-400">{contractData.reputation}/100</p>
                      <p className="text-xs text-gray-500">Trust Score</p>
                    </div>
                  </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="space-y-3 mb-4">
                  <div className="bg-gray-950 border border-red-500/30 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-red-400">Unlimited Token Access</p>
                        <p className="text-xs text-gray-500">Contract can spend all your tokens without asking</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-950 border border-red-500/30 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-orange-400">Unverified Contract</p>
                        <p className="text-xs text-gray-500">Source code not verified on block explorer</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-950 border border-yellow-500/30 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-400">Low Reputation Score</p>
                        <p className="text-xs text-gray-500">Only 42/100 trust rating from security audits</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Risk Simulator Toggle */}
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-4">
                  <h4 className="text-sm font-medium text-white mb-3">Safer Alternative</h4>
                  <p className="text-xs text-gray-400 mb-3">
                    Instead of unlimited approval, you can set a specific amount limit.
                  </p>
                  
                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Recommended Limit</span>
                      <span className="text-sm font-medium text-green-400">100 tokens</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Web3Button
                    onClick={() => handleApproval(null)}
                    variant="outline"
                    className="flex-1"
                  >
                    Reject
                  </Web3Button>
                  <Web3Button
                    onClick={() => handleApproval('limited')}
                    variant="secondary"
                    className="flex-1"
                  >
                    Approve Limited
                  </Web3Button>
                </div>
              </Web3Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wallet Impact Panel */}
        <AnimatePresence>
          {showImpact && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Web3Card className="mb-6">
                {approvalType === 'unlimited' && (
                  <div className="bg-red-500/10 border-2 border-red-500/50 rounded-xl p-6">
                    <div className="text-center mb-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: 2, duration: 0.5 }}
                        className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <AlertTriangle className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-red-400 mb-2">Wallet Vulnerable</h3>
                      <p className="text-sm text-gray-400">
                        You granted unlimited access. The contract can now drain your entire token balance.
                      </p>
                    </div>

                    <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 mb-3">
                      <p className="text-xs text-gray-500 mb-2">Potential Loss:</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Your Token Balance</span>
                        <motion.span
                          initial={{ opacity: 1 }}
                          animate={{ opacity: [1, 0.3, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="text-lg font-bold text-red-400"
                        >
                          1,000 → 0
                        </motion.span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-red-400">
                      <TrendingDown className="w-4 h-4" />
                      <span>Simulated asset drain scenario</span>
                    </div>
                  </div>
                )}

                {approvalType === 'limited' && (
                  <div className="bg-green-500/10 border-2 border-green-500/50 rounded-xl p-6">
                    <div className="text-center mb-4">
                      <motion.div
                        initial={{ scale: 0, rotate: 0 }}
                        animate={{ scale: 1, rotate: 360 }}
                        transition={{ type: "spring" }}
                        className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <CheckCircle className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-green-400 mb-2">Wallet Protected</h3>
                      <p className="text-sm text-gray-400">
                        Limited approval keeps your funds safe. Only 100 tokens can be accessed.
                      </p>
                    </div>

                    <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 mb-3">
                      <p className="text-xs text-gray-500 mb-2">Risk Exposure:</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Maximum Loss</span>
                        <span className="text-lg font-bold text-green-400">100 tokens</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">900 tokens remain fully protected</p>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-green-400">
                      <Lock className="w-4 h-4" />
                      <span>Most of your balance is secured</span>
                    </div>
                  </div>
                )}

                {approvalType === null && (
                  <div className="bg-blue-500/10 border-2 border-blue-500/50 rounded-xl p-6 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Shield className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-blue-400 mb-2">Transaction Rejected</h3>
                    <p className="text-sm text-gray-400">
                      You chose safety first. Your wallet remains fully protected.
                    </p>
                  </div>
                )}
              </Web3Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Educational Insight */}
        {showImpact && (
          <Web3Card className="mb-6">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white mb-2">Why Unlimited Approvals Are Risky</p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Unlimited token approvals give smart contracts complete control over your tokens. If the contract is malicious or gets hacked, you could lose everything. Always approve only what you need.
                  </p>
                </div>
              </div>
            </div>
          </Web3Card>
        )}

        {/* Security Quiz */}
        <AnimatePresence>
          {showQuiz && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Web3Card className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Security Quiz</h3>
                <p className="text-sm text-gray-400 mb-4">What is the safest approval strategy?</p>
                
                <div className="space-y-3">
                  {[
                    { id: 'unlimited', text: 'Always approve unlimited for convenience' },
                    { id: 'limited-safe', text: 'Approve only the amount you need' },
                    { id: 'reject', text: 'Never approve any contracts' }
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setQuizAnswer(option.id as QuizAnswer)}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                        quizAnswer === option.id
                          ? option.id === 'limited-safe'
                            ? 'border-green-500 bg-green-500/10'
                            : 'border-red-500 bg-red-500/10'
                          : 'border-gray-800 bg-gray-900 hover:border-gray-700'
                      }`}
                    >
                      <span className={`${
                        quizAnswer === option.id
                          ? option.id === 'limited-safe'
                            ? 'text-green-500'
                            : 'text-red-500'
                          : 'text-gray-300'
                      }`}>
                        {option.text}
                      </span>
                    </button>
                  ))}
                </div>
                
                {quizAnswer && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4"
                  >
                    <p className={`text-sm ${isCorrectAnswer ? 'text-green-500' : 'text-gray-400'}`}>
                      {isCorrectAnswer 
                        ? '✓ Correct! Limited approvals minimize risk while maintaining functionality.'
                        : 'Not quite. Approving only what you need balances security and usability.'}
                    </p>
                  </motion.div>
                )}
              </Web3Card>

              {/* Achievement Badge */}
              {isCorrectAnswer && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Web3Card className="mb-6">
                    <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-2 border-purple-500/50 rounded-xl p-6 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: 360 }}
                        transition={{ type: "spring", delay: 0.5 }}
                        className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <Award className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-white mb-2">Achievement Unlocked!</h3>
                      <p className="text-sm text-purple-400 mb-1">Security Conscious User</p>
                      <p className="text-xs text-gray-500">You understand smart contract risk management</p>
                    </div>
                  </Web3Card>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue Button */}
        {quizAnswer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Web3Button onClick={onContinue} size="lg" className="w-full">
              Continue to Final Lesson
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Web3Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
