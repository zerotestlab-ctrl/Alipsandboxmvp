import React, { useState } from 'react';
import { Web3Button } from '../Web3Button';
import { Web3Card } from '../Web3Card';
import { motion, AnimatePresence } from 'motion/react';
import { Wallet, Link2, FileCode, CheckCircle, X, ArrowRight, ArrowLeft, Clock, Award, Eye, Shield, AlertTriangle, Code } from 'lucide-react';

interface InteractDappLessonProps {
  onComplete: () => void;
  onBack: () => void;
}

type Mode = null | 'intermediate' | 'expert';
type IntermediateStep = 'intro' | 'connect' | 'stake' | 'confirm';
type ExpertStep = 'scenario' | 'evaluate';

export function InteractDappLesson({ onComplete, onBack }: InteractDappLessonProps) {
  const [mode, setMode] = useState<Mode>(null);
  const [intermediateStep, setIntermediateStep] = useState<IntermediateStep>('intro');
  const [expertStep, setExpertStep] = useState<ExpertStep>('scenario');
  
  const [walletConnected, setWalletConnected] = useState(false);
  const [showConnectionPopup, setShowConnectionPopup] = useState(false);
  const [showStakePopup, setShowStakePopup] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [stakeConfirmed, setStakeConfirmed] = useState(false);
  const [showCalldata, setShowCalldata] = useState(false);
  const [expertDecision, setExpertDecision] = useState<string | null>(null);
  const [showReward, setShowReward] = useState(false);

  const usdcBalance = 500;
  const apy = 12;

  const contractData = {
    address: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    function: 'deposit(uint256 amount)',
    verified: false,
    gasEstimate: 185000,
    reputationScore: 23
  };

  const handleConnectWallet = () => {
    setShowConnectionPopup(true);
  };

  const handleApproveConnection = () => {
    setWalletConnected(true);
    setShowConnectionPopup(false);
    setTimeout(() => {
      setIntermediateStep('connect');
    }, 500);
  };

  const handleStake = () => {
    setShowStakePopup(true);
  };

  const handleConfirmStake = () => {
    setShowStakePopup(false);
    setStakeConfirmed(true);
    setIntermediateStep('confirm');
    setTimeout(() => {
      setShowReward(true);
    }, 2000);
  };

  const handleExpertDecision = (decision: string) => {
    setExpertDecision(decision);
    if (decision === 'reject') {
      setTimeout(() => {
        setShowReward(true);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-6 md:py-8">
      <div className="max-w-3xl mx-auto">
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            INTERACT WITH A DAPP
          </h1>
          <p className="text-gray-400">
            What Really Happens When You Click
          </p>
        </div>

        {/* Mode Selection */}
        {!mode && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Web3Card className="cursor-pointer hover:border-purple-500 transition-all" onClick={() => setMode('intermediate')}>
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Link2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Intermediate Mode</h3>
                <p className="text-sm text-gray-400 mb-4">Learn wallet connection and contract interactions</p>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>~4 minutes</span>
                </div>
              </div>
            </Web3Card>

            <Web3Card className="cursor-pointer hover:border-orange-500 transition-all" onClick={() => setMode('expert')}>
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Expert Mode</h3>
                <p className="text-sm text-gray-400 mb-4">Evaluate unknown protocols and inspect contracts</p>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>~3 minutes</span>
                </div>
              </div>
            </Web3Card>
          </div>
        )}

        {/* INTERMEDIATE MODE */}
        {mode === 'intermediate' && (
          <>
            {/* Mock DeFi Dashboard */}
            {intermediateStep === 'intro' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Web3Card className="mb-6">
                  <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-6 mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">YieldFarm Protocol</h2>
                    <p className="text-sm text-gray-400">Stake tokens and earn passive income</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-950 border border-gray-800 rounded-xl p-4">
                      <p className="text-xs text-gray-500 mb-1">Your Balance</p>
                      <p className="text-2xl font-bold text-white">{usdcBalance} USDC</p>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                      <p className="text-xs text-gray-500 mb-1">APY</p>
                      <p className="text-2xl font-bold text-green-400">{apy}%</p>
                    </div>
                  </div>

                  {!walletConnected ? (
                    <Web3Button onClick={handleConnectWallet} className="w-full">
                      <Wallet className="w-5 h-5 mr-2 inline" />
                      Connect Wallet
                    </Web3Button>
                  ) : (
                    <Web3Button onClick={handleStake} className="w-full">
                      Stake USDC
                    </Web3Button>
                  )}
                </Web3Card>

                {/* Connection Popup */}
                <AnimatePresence>
                  {showConnectionPopup && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4"
                      onClick={() => setShowConnectionPopup(false)}
                    >
                      <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-gray-900 border-2 border-purple-500 rounded-2xl p-6 max-w-md w-full"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-xl font-bold text-white">Connect Wallet</h3>
                          <button
                            onClick={() => setShowConnectionPopup(false)}
                            className="text-gray-500 hover:text-gray-300"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 mb-6">
                          <p className="text-sm text-gray-400 mb-4">This site wants to:</p>
                          <div className="space-y-2">
                            <div className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-300">View your wallet address</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-300">Request approval for transactions</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 mb-6">
                          <p className="text-xs text-blue-400 flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            Connecting wallet does NOT cost gas
                          </p>
                        </div>

                        <div className="flex gap-3">
                          <Web3Button
                            onClick={() => setShowConnectionPopup(false)}
                            variant="outline"
                            className="flex-1"
                          >
                            Cancel
                          </Web3Button>
                          <Web3Button
                            onClick={handleApproveConnection}
                            className="flex-1"
                          >
                            Connect
                          </Web3Button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Step 2: Wallet Connected */}
            {intermediateStep === 'connect' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Web3Card className="mb-6">
                  <div className="bg-green-500/10 border-2 border-green-500/50 rounded-xl p-6 mb-6 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-green-400 mb-2">Wallet Connected!</h3>
                    <p className="text-sm text-gray-400">
                      0x742d...5a9f
                    </p>
                  </div>

                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 mb-6">
                    <p className="text-sm text-purple-400 font-medium mb-2">💡 What Just Happened?</p>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      You gave the dApp permission to see your wallet address and request transactions. 
                      No transaction was sent, so no gas was paid. The dApp can now show your balances and prepare transactions for you to sign.
                    </p>
                  </div>

                  <Web3Button onClick={() => setIntermediateStep('stake')} className="w-full">
                    Continue to Staking
                    <ArrowRight className="w-5 h-5 ml-2 inline" />
                  </Web3Button>
                </Web3Card>
              </motion.div>
            )}

            {/* Step 3: Stake Transaction */}
            {intermediateStep === 'stake' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Web3Card className="mb-6">
                  <h2 className="text-xl font-bold text-white mb-6">Ready to Stake</h2>

                  <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-400">Amount</span>
                      <span className="text-white font-medium">500 USDC</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-400">Expected APY</span>
                      <span className="text-green-400 font-medium">12%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Est. Monthly Yield</span>
                      <span className="text-white font-medium">~5 USDC</span>
                    </div>
                  </div>

                  <Web3Button onClick={handleStake} className="w-full mb-4">
                    Stake Tokens
                  </Web3Button>

                  {/* Quiz */}
                  <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
                    <p className="text-sm font-medium text-white mb-3">
                      ❓ Does signing a message cost gas?
                    </p>
                    <div className="space-y-2">
                      {[
                        { id: 'yes', text: 'Yes, every wallet action costs gas' },
                        { id: 'no', text: 'No, only transactions cost gas' }
                      ].map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setQuizAnswer(option.id)}
                          className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                            quizAnswer === option.id
                              ? option.id === 'no'
                                ? 'border-green-500 bg-green-500/10'
                                : 'border-red-500 bg-red-500/10'
                              : 'border-gray-800 bg-gray-900 hover:border-gray-700'
                          }`}
                        >
                          <span className={`text-sm ${
                            quizAnswer === option.id
                              ? option.id === 'no' ? 'text-green-400' : 'text-red-400'
                              : 'text-gray-300'
                          }`}>
                            {option.text}
                          </span>
                        </button>
                      ))}
                    </div>
                    {quizAnswer === 'no' && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-green-400 mt-3"
                      >
                        ✓ Correct! Signing messages (like connecting wallet) is free. Only transactions that change blockchain state cost gas.
                      </motion.p>
                    )}
                  </div>
                </Web3Card>

                {/* Transaction Popup */}
                <AnimatePresence>
                  {showStakePopup && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4"
                      onClick={() => setShowStakePopup(false)}
                    >
                      <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-gray-900 border-2 border-purple-500 rounded-2xl p-6 max-w-md w-full"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-xl font-bold text-white">Confirm Transaction</h3>
                          <button
                            onClick={() => setShowStakePopup(false)}
                            className="text-gray-500 hover:text-gray-300"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 mb-4">
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                              <span className="text-gray-500">Function</span>
                              <span className="text-purple-400 font-mono text-xs">deposit(uint256)</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                              <span className="text-gray-500">Amount</span>
                              <span className="text-white">500 USDC</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                              <span className="text-gray-500">Contract</span>
                              <span className="text-gray-300 font-mono text-xs">0x1f98...F984</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-500">Gas Fee</span>
                              <span className="text-white">~$2.50</span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => setShowCalldata(!showCalldata)}
                          className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-200 transition-colors mb-4"
                        >
                          <Code className="w-4 h-4" />
                          {showCalldata ? 'Hide' : 'View'} Calldata
                        </button>

                        {showCalldata && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="bg-gray-950 border border-gray-800 rounded-lg p-3 mb-4 overflow-hidden"
                          >
                            <p className="text-xs font-mono text-gray-400 break-all">
                              0xb6b55f250000000000000000000000000000000000000000000000000000000001e84800
                            </p>
                          </motion.div>
                        )}

                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 mb-6">
                          <p className="text-xs text-blue-400">
                            💡 This is a contract call. Your wallet will execute the deposit() function on the smart contract.
                          </p>
                        </div>

                        <div className="flex gap-3">
                          <Web3Button
                            onClick={() => setShowStakePopup(false)}
                            variant="outline"
                            className="flex-1"
                          >
                            Reject
                          </Web3Button>
                          <Web3Button
                            onClick={handleConfirmStake}
                            className="flex-1"
                          >
                            Confirm
                          </Web3Button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Step 4: After Confirmation */}
            {intermediateStep === 'confirm' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Web3Card className="mb-6">
                  <div className="bg-green-500/10 border-2 border-green-500/50 rounded-xl p-6 mb-6 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: 360 }}
                      transition={{ type: "spring" }}
                      className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-green-400 mb-2">Stake Confirmed!</h3>
                    <p className="text-sm text-gray-400">
                      Your 500 USDC is now earning 12% APY
                    </p>
                  </div>

                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 mb-6">
                    <p className="text-sm text-purple-400 font-medium mb-2">🎓 What You Learned</p>
                    <p className="text-xs text-gray-300 leading-relaxed mb-3">
                      Your wallet called a smart contract function. The contract is now managing your tokens. 
                      Every dApp interaction is a contract call — you must read what you're signing.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                        <span>Connecting wallet = Free (no tx)</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        <span>Contract call = Costs gas (writes to blockchain)</span>
                      </div>
                    </div>
                  </div>
                </Web3Card>

                {showReward && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <Web3Card className="mb-6">
                      <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-2 border-purple-500/50 rounded-xl p-6 text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"
                        >
                          <Award className="w-8 h-8 text-white" />
                        </motion.div>
                        <h3 className="text-xl font-bold text-white mb-2">+400 XP</h3>
                        <p className="text-sm text-purple-400">dApp Interaction Master</p>
                      </div>
                    </Web3Card>

                    <Web3Button onClick={onComplete} className="w-full">
                      Complete Lesson
                      <ArrowRight className="w-5 h-5 ml-2 inline" />
                    </Web3Button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </>
        )}

        {/* EXPERT MODE */}
        {mode === 'expert' && (
          <>
            {expertStep === 'scenario' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Web3Card className="mb-6">
                  <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-6 mb-6">
                    <h2 className="text-2xl font-bold text-white mb-3">Unknown Protocol Warning</h2>
                    <p className="text-gray-300">
                      You are about to interact with an unverified protocol. Evaluate before proceeding.
                    </p>
                  </div>

                  {/* Security Dashboard */}
                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-950 border border-red-500/30 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-white">Contract Verification</span>
                        <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
                          Not Verified
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">Source code not available on Etherscan</p>
                    </div>

                    <div className="bg-gray-950 border border-yellow-500/30 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-white">Gas Estimate</span>
                        <span className="text-yellow-400 font-medium">{contractData.gasEstimate.toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-gray-400">Unusually high for standard deposit function</p>
                    </div>

                    <div className="bg-gray-950 border border-red-500/30 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-white">Security Score</span>
                        <span className="text-2xl font-bold text-red-400">{contractData.reputationScore}/100</span>
                      </div>
                      <p className="text-xs text-red-400">⚠️ High Risk - Low reputation score</p>
                    </div>
                  </div>

                  {/* Contract ABI Viewer */}
                  <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-white">Function Details</h3>
                      <FileCode className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="bg-gray-900 rounded-lg p-3">
                      <p className="text-xs font-mono text-gray-400 mb-2">{contractData.function}</p>
                      <p className="text-xs text-gray-500">Contract: {contractData.address}</p>
                    </div>
                  </div>

                  {/* Decoded Parameters */}
                  <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 mb-6">
                    <h3 className="text-sm font-medium text-white mb-3">Decoded Parameters</h3>
                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-gray-500">amount:</span>
                        <span className="text-gray-300">500000000 (500 USDC)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">recipient:</span>
                        <span className="text-red-400">SUSPICIOUS_ADDRESS</span>
                      </div>
                    </div>
                  </div>

                  {/* Risk Evaluation */}
                  <div className="bg-red-500/10 border-2 border-red-500/50 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <AlertTriangle className="w-6 h-6 text-red-400" />
                      <h3 className="text-sm font-bold text-red-400">Multiple Red Flags Detected</h3>
                    </div>
                    <ul className="space-y-2 text-xs text-gray-400">
                      <li className="flex items-start gap-2">
                        <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Contract not verified (can't review source code)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Suspiciously high gas estimate</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Very low security score (23/100)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Unexpected recipient parameter</span>
                      </li>
                    </ul>
                  </div>

                  {/* Decision */}
                  <div className="space-y-3">
                    <p className="text-sm text-white font-medium">What should you do?</p>
                    <button
                      onClick={() => handleExpertDecision('reject')}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        expertDecision === 'reject'
                          ? 'border-green-500 bg-green-500/10'
                          : 'border-gray-800 bg-gray-900 hover:border-green-500'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <Shield className="w-5 h-5 text-green-400" />
                        <span className="font-medium text-white">Reject Transaction</span>
                      </div>
                      <p className="text-xs text-gray-400">Too many red flags - do not proceed</p>
                    </button>

                    <button
                      onClick={() => handleExpertDecision('proceed')}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        expertDecision === 'proceed'
                          ? 'border-red-500 bg-red-500/10'
                          : 'border-gray-800 bg-gray-900 hover:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                        <span className="font-medium text-white">Proceed Anyway</span>
                      </div>
                      <p className="text-xs text-gray-400">Ignore warnings and confirm transaction</p>
                    </button>
                  </div>
                </Web3Card>

                {expertDecision === 'reject' && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Web3Card className="mb-6">
                      <div className="bg-green-500/10 border-2 border-green-500/50 rounded-xl p-6 text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                        >
                          <Shield className="w-8 h-8 text-white" />
                        </motion.div>
                        <h3 className="text-xl font-bold text-green-400 mb-2">Smart Decision!</h3>
                        <p className="text-sm text-gray-400">
                          You correctly identified the risks and rejected the transaction
                        </p>
                      </div>
                    </Web3Card>

                    <Web3Card className="mb-6">
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                        <p className="text-sm text-blue-400 font-medium mb-2">🎓 Expert Insight</p>
                        <p className="text-xs text-gray-300 leading-relaxed mb-3">
                          Every dApp interaction is a contract call. You must read before signing. 
                          Unverified contracts, suspicious parameters, and abnormal gas usage are all red flags.
                        </p>
                        <div className="bg-gray-950 border border-gray-800 rounded-lg p-3">
                          <p className="text-xs text-gray-400 font-medium mb-2">Expert Checklist:</p>
                          <ul className="space-y-1 text-xs text-gray-500">
                            <li>✓ Always verify contract source code</li>
                            <li>✓ Check security audits and scores</li>
                            <li>✓ Review decoded function parameters</li>
                            <li>✓ Question unusually high gas estimates</li>
                            <li>✓ When in doubt, reject</li>
                          </ul>
                        </div>
                      </div>
                    </Web3Card>
                  </motion.div>
                )}

                {expertDecision === 'proceed' && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Web3Card>
                      <div className="bg-red-500/10 border-2 border-red-500/50 rounded-xl p-6 text-center">
                        <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-red-400 mb-2">Risky Choice</h3>
                        <p className="text-sm text-gray-400">
                          In a real scenario, this could lead to loss of funds. Always prioritize security.
                        </p>
                      </div>
                    </Web3Card>
                  </motion.div>
                )}

                {showReward && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <Web3Card className="mb-6">
                      <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-500/50 rounded-xl p-6 text-center">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1, rotate: 360 }}
                          transition={{ type: "spring" }}
                          className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4"
                        >
                          <Award className="w-10 h-10 text-white" />
                        </motion.div>
                        <h3 className="text-2xl font-bold text-white mb-2">+800 XP</h3>
                        <p className="text-sm text-orange-400 mb-1">Security Expert</p>
                        <p className="text-xs text-gray-500">You can identify and avoid risky contracts</p>
                      </div>
                    </Web3Card>

                    <Web3Button onClick={onComplete} className="w-full">
                      Complete Lesson
                      <ArrowRight className="w-5 h-5 ml-2 inline" />
                    </Web3Button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
