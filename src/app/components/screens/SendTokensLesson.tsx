import React, { useState, useEffect } from 'react';
import { Web3Button } from '../Web3Button';
import { Web3Card } from '../Web3Card';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Wallet, Zap, Clock, AlertTriangle, CheckCircle, TrendingUp, ArrowRight, ArrowLeft, ChevronDown, Info, Award, Trophy } from 'lucide-react';

interface SendTokensLessonProps {
  onComplete: () => void;
  onBack: () => void;
}

type Frame = 
  // Mode selection
  | 'mode-selection'
  // Intermediate frames
  | 'int-1-scenario'
  | 'int-2-builder'
  | 'int-3-preview'
  | 'int-4-simulation'
  | 'int-5-complete'
  // Expert frames
  | 'exp-1-scenario'
  | 'exp-2-resolve'
  | 'exp-3-complete';

export function SendTokensLesson({ onComplete, onBack }: SendTokensLessonProps) {
  const [currentFrame, setCurrentFrame] = useState<Frame>('mode-selection');
  const [gasPrice, setGasPrice] = useState(45);
  const [timeRemaining, setTimeRemaining] = useState(60);
  
  // Transaction builder state
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [gasLevel, setGasLevel] = useState<'standard' | 'fast' | 'custom'>('standard');
  const [customGas, setCustomGas] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Quiz and simulation state
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [simulationAction, setSimulationAction] = useState<string | null>(null);
  
  // Expert mode state
  const [replacementNonce, setReplacementNonce] = useState('');

  const walletBalance = 1.2;
  const estimatedGas = gasLevel === 'custom' && customGas ? parseFloat(customGas) / 1000 : gasPrice / 1000;
  const totalCost = parseFloat(amount || '0') + estimatedGas;

  // Countdown timer for scenario
  useEffect(() => {
    if (currentFrame === 'int-1-scenario' && timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [currentFrame, timeRemaining]);

  // Gas price fluctuation
  useEffect(() => {
    if (currentFrame === 'int-2-builder' || currentFrame === 'int-3-preview') {
      const interval = setInterval(() => {
        setGasPrice(prev => {
          const change = Math.random() > 0.5 ? 2 : -2;
          return Math.max(40, Math.min(60, prev + change));
        });
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [currentFrame]);

  const getProgressPercentage = () => {
    const progressMap: Record<Frame, number> = {
      'mode-selection': 0,
      'int-1-scenario': 20,
      'int-2-builder': 40,
      'int-3-preview': 60,
      'int-4-simulation': 80,
      'int-5-complete': 100,
      'exp-1-scenario': 33,
      'exp-2-resolve': 66,
      'exp-3-complete': 100
    };
    return progressMap[currentFrame] || 0;
  };

  const getCurrentStep = () => {
    if (currentFrame.startsWith('int-')) {
      return parseInt(currentFrame.split('-')[1]) || 1;
    }
    if (currentFrame.startsWith('exp-')) {
      return parseInt(currentFrame.split('-')[1]) || 1;
    }
    return 0;
  };

  const getTotalSteps = () => {
    if (currentFrame.startsWith('int-')) return 5;
    if (currentFrame.startsWith('exp-')) return 3;
    return 0;
  };

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-6 md:py-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Button (except on mode selection) */}
        {currentFrame !== 'mode-selection' && (
          <button
            onClick={() => {
              if (currentFrame === 'int-1-scenario' || currentFrame === 'exp-1-scenario') {
                setCurrentFrame('mode-selection');
              } else {
                onBack();
              }
            }}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        )}

        {/* Progress Bar (not on mode selection or complete screens) */}
        {currentFrame !== 'mode-selection' && !currentFrame.includes('complete') && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">
                Step {getCurrentStep()} of {getTotalSteps()}
              </span>
              <span className="text-sm font-medium text-gray-300">{getProgressPercentage()}%</span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${getProgressPercentage()}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
              />
            </div>
          </div>
        )}

        {/* FRAME: Mode Selection */}
        <AnimatePresence mode="wait">
          {currentFrame === 'mode-selection' && (
            <motion.div
              key="mode-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="mb-8">
                <button
                  onClick={onBack}
                  className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors mb-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Dashboard
                </button>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  SEND TOKENS
                </h1>
                <p className="text-gray-400">
                  From Basic Transfer to Network Mastery
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Web3Card 
                  className="cursor-pointer hover:border-purple-500 transition-all"
                  onClick={() => setCurrentFrame('int-1-scenario')}
                >
                  <div className="text-center py-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Intermediate Mode</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Learn transaction building and gas management
                    </p>
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-4">
                      <Clock className="w-4 h-4" />
                      <span>~5 minutes</span>
                    </div>
                    <Web3Button className="w-full">
                      Start Intermediate
                    </Web3Button>
                  </div>
                </Web3Card>

                <Web3Card 
                  className="cursor-pointer hover:border-orange-500 transition-all"
                  onClick={() => setCurrentFrame('exp-1-scenario')}
                >
                  <div className="text-center py-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Expert Mode</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Master nonce conflicts and transaction replacement
                    </p>
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500 mb-4">
                      <Clock className="w-4 h-4" />
                      <span>~3 minutes</span>
                    </div>
                    <Web3Button variant="outline" className="w-full border-orange-500 text-orange-400 hover:bg-orange-500/10">
                      Start Expert
                    </Web3Button>
                  </div>
                </Web3Card>
              </div>
            </motion.div>
          )}

          {/* INTERMEDIATE FRAME 1: Scenario Introduction */}
          {currentFrame === 'int-1-scenario' && (
            <motion.div
              key="int-1"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Scenario: Pay a Freelancer</h2>
              
              <Web3Card className="mb-6">
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-purple-500/30 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-3">You Need to Pay a Freelancer</h3>
                  <p className="text-gray-300">
                    You owe 0.25 ETH to a developer. You must send it correctly and avoid overpaying gas fees.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-950 border border-gray-800 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Wallet className="w-5 h-5 text-blue-400" />
                        <span className="text-sm text-gray-400">Wallet Balance</span>
                      </div>
                      <span className="text-xl font-bold text-white">{walletBalance} ETH</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Network</span>
                      <span className="text-sm text-gray-300">Ethereum Mainnet</span>
                    </div>
                  </div>

                  <div className="bg-gray-950 border border-gray-800 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-400">Time Remaining</span>
                      <motion.span
                        key={timeRemaining}
                        initial={{ scale: 1.2, color: timeRemaining < 30 ? '#ef4444' : '#fb923c' }}
                        animate={{ scale: 1 }}
                        className={`text-2xl font-bold ${timeRemaining < 30 ? 'text-red-400' : 'text-orange-400'}`}
                      >
                        {timeRemaining}s
                      </motion.span>
                    </div>
                    <p className="text-xs text-gray-500">Opportunity expires soon!</p>
                  </div>

                  <div className="bg-gray-950 border border-gray-800 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Current Gas Estimate</span>
                      <motion.span
                        key={gasPrice}
                        initial={{ scale: 1.2, color: '#a855f7' }}
                        animate={{ scale: 1, color: '#ffffff' }}
                        className="text-sm font-medium text-white"
                      >
                        {gasPrice} Gwei
                      </motion.span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        animate={{ width: `${(gasPrice / 100) * 100}%` }}
                        className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Gas prices fluctuate in real-time</p>
                  </div>
                </div>
              </Web3Card>

              <Web3Button onClick={() => setCurrentFrame('int-2-builder')} size="lg" className="w-full">
                Prepare Transaction
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Web3Button>
            </motion.div>
          )}

          {/* INTERMEDIATE FRAME 2: Transaction Builder */}
          {currentFrame === 'int-2-builder' && (
            <motion.div
              key="int-2"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Build Your Transaction</h2>

              <Web3Card className="mb-6">
                <div className="space-y-4">
                  {/* To Address */}
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">To Address</label>
                    <input
                      type="text"
                      value={toAddress}
                      onChange={(e) => setToAddress(e.target.value)}
                      placeholder="0x742d35Cc6634C0532925a3b844Bc9e7595f5a9f"
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 font-mono text-sm"
                    />
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Amount (ETH)</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.25"
                      step="0.01"
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {/* Gas Price Strategy */}
                  <div>
                    <label className="text-sm text-gray-400 mb-3 block flex items-center gap-2">
                      Gas Price Strategy
                      <div className="group relative">
                        <Info className="w-4 h-4 text-gray-600 cursor-help" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-900 border border-gray-700 rounded-lg p-2 text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          Gas price determines transaction speed. Higher gas = faster confirmation.
                        </div>
                      </div>
                    </label>
                    <div className="space-y-2">
                      {[
                        { id: 'standard', label: 'Standard', gwei: gasPrice, time: '~30 seconds' },
                        { id: 'fast', label: 'Fast', gwei: gasPrice + 10, time: '~15 seconds' },
                        { id: 'custom', label: 'Custom', gwei: null, time: 'Set your own' }
                      ].map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setGasLevel(option.id as any)}
                          className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                            gasLevel === option.id
                              ? 'border-purple-500 bg-purple-500/10'
                              : 'border-gray-800 bg-gray-900 hover:border-gray-700'
                          }`}
                        >
                          <div className="text-left">
                            <p className="text-sm font-medium text-white">{option.label}</p>
                            <p className="text-xs text-gray-500">{option.time}</p>
                          </div>
                          <span className="text-sm text-gray-400">
                            {option.gwei ? `~${option.gwei} Gwei` : 'Custom'}
                          </span>
                        </button>
                      ))}
                    </div>
                    {gasLevel === 'custom' && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                        <input
                          type="number"
                          value={customGas}
                          onChange={(e) => setCustomGas(e.target.value)}
                          placeholder="Enter Gwei"
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 mt-2"
                        />
                      </motion.div>
                    )}
                  </div>

                  {/* Fee Summary */}
                  <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Estimated Fee</span>
                      <span className="text-white font-medium">{estimatedGas.toFixed(4)} ETH</span>
                    </div>
                    <div className="flex justify-between text-sm border-t border-gray-800 pt-2">
                      <span className="text-gray-400">Total Cost</span>
                      <span className="text-white font-bold">{totalCost.toFixed(4)} ETH</span>
                    </div>
                    {totalCost > walletBalance && (
                      <p className="text-xs text-red-400">⚠️ Insufficient balance</p>
                    )}
                  </div>

                  {/* Tooltips */}
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                    <p className="text-xs text-blue-400 font-medium mb-2">💡 Transaction Tips</p>
                    <ul className="text-xs text-gray-400 space-y-1">
                      <li>• <span className="text-gray-300">Base fee</span>: Minimum required to include your tx</li>
                      <li>• <span className="text-gray-300">Priority fee</span>: Tip to miners for faster processing</li>
                      <li>• Transactions can fail if gas is too low during congestion</li>
                    </ul>
                  </div>
                </div>
              </Web3Card>

              <Web3Button
                onClick={() => setCurrentFrame('int-3-preview')}
                disabled={!toAddress || !amount || totalCost > walletBalance}
                size="lg"
                className="w-full"
              >
                Preview Transaction
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Web3Button>
            </motion.div>
          )}

          {/* INTERMEDIATE FRAME 3: Transaction Preview with Quiz */}
          {currentFrame === 'int-3-preview' && (
            <motion.div
              key="int-3"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Review Transaction</h2>

              <Web3Card className="mb-6">
                <div className="bg-gray-950 border border-gray-800 rounded-xl p-6 mb-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-800">
                      <span className="text-gray-400">You are sending</span>
                      <span className="text-2xl font-bold text-white">{amount} ETH</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-gray-800">
                      <span className="text-gray-400">To Address</span>
                      <span className="text-sm font-mono text-gray-300">{toAddress.slice(0, 10)}...{toAddress.slice(-8)}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-gray-800">
                      <span className="text-gray-400">Estimated Gas</span>
                      <span className="text-lg font-medium text-white">{estimatedGas.toFixed(4)} ETH</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Total Deducted</span>
                      <span className="text-2xl font-bold text-purple-400">{totalCost.toFixed(4)} ETH</span>
                    </div>
                  </div>
                </div>

                {/* Critical Thinking Quiz */}
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mb-4">
                  <p className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-400" />
                    If gas spikes before confirmation, what happens?
                  </p>
                  <div className="space-y-2">
                    {[
                      { id: 'A', text: 'Transaction fails automatically', correct: false },
                      { id: 'B', text: 'Transaction stays pending', correct: true },
                      { id: 'C', text: 'Funds are lost', correct: false }
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setQuizAnswer(option.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                          quizAnswer === option.id
                            ? option.correct
                              ? 'border-green-500 bg-green-500/10'
                              : 'border-red-500 bg-red-500/10'
                            : 'border-gray-800 bg-gray-900 hover:border-gray-700'
                        }`}
                      >
                        <span className={`text-sm ${
                          quizAnswer === option.id
                            ? option.correct ? 'text-green-400' : 'text-red-400'
                            : 'text-gray-300'
                        }`}>
                          {option.id}. {option.text}
                        </span>
                      </button>
                    ))}
                  </div>
                  
                  {quizAnswer === 'B' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3">
                      <p className="text-xs text-green-400">
                        ✓ Correct! The transaction stays in the mempool until gas prices normalize or you take action.
                      </p>
                    </motion.div>
                  )}
                </div>
              </Web3Card>

              <Web3Button
                onClick={() => setCurrentFrame('int-4-simulation')}
                disabled={quizAnswer !== 'B'}
                size="lg"
                className="w-full"
              >
                Continue to Simulation
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Web3Button>
            </motion.div>
          )}

          {/* INTERMEDIATE FRAME 4: Gas Spike Simulation */}
          {currentFrame === 'int-4-simulation' && (
            <motion.div
              key="int-4"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Transaction Status</h2>

              {!simulationAction ? (
                <Web3Card className="mb-6">
                  <div className="bg-yellow-500/10 border-2 border-yellow-500/50 rounded-xl p-6 mb-6 text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full mx-auto mb-4"
                    />
                    <h3 className="text-xl font-bold text-yellow-400 mb-2">Transaction Stuck!</h3>
                    <p className="text-sm text-gray-400">
                      Gas prices spiked! Your transaction is now pending...
                    </p>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
                    <p className="text-sm text-blue-400 font-medium mb-2">What can you do?</p>
                    <p className="text-xs text-gray-400">
                      Choose an action to handle your stuck transaction:
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => setSimulationAction('speedup')}
                      className="w-full p-4 bg-gray-900 border-2 border-gray-800 rounded-xl hover:border-purple-500 transition-all text-left"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-purple-400" />
                        </div>
                        <span className="font-medium text-white">Speed Up</span>
                      </div>
                      <p className="text-xs text-gray-400 ml-13">
                        Replace transaction with higher gas using same nonce
                      </p>
                    </button>

                    <button
                      onClick={() => setSimulationAction('cancel')}
                      className="w-full p-4 bg-gray-900 border-2 border-gray-800 rounded-xl hover:border-red-500 transition-all text-left"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-red-600/20 flex items-center justify-center">
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                        </div>
                        <span className="font-medium text-white">Cancel</span>
                      </div>
                      <p className="text-xs text-gray-400 ml-13">
                        Send 0 ETH to yourself with same nonce to cancel
                      </p>
                    </button>

                    <button
                      onClick={() => setSimulationAction('wait')}
                      className="w-full p-4 bg-gray-900 border-2 border-gray-800 rounded-xl hover:border-gray-700 transition-all text-left"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-gray-600/20 flex items-center justify-center">
                          <Clock className="w-5 h-5 text-gray-400" />
                        </div>
                        <span className="font-medium text-white">Wait</span>
                      </div>
                      <p className="text-xs text-gray-400 ml-13">
                        Wait for gas prices to drop (could take hours)
                      </p>
                    </button>
                  </div>
                </Web3Card>
              ) : (
                <Web3Card className="mb-6">
                  {simulationAction === 'speedup' && (
                    <div className="bg-green-500/10 border-2 border-green-500/50 rounded-xl p-6 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1, rotate: 360 }}
                        transition={{ type: "spring" }}
                        className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                      >
                        <CheckCircle className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-green-400 mb-2">Transaction Confirmed!</h3>
                      <p className="text-sm text-gray-400 mb-4">
                        You successfully sped up the transaction by increasing gas
                      </p>
                      <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                        <p className="text-xs text-gray-500 mb-1">Transaction Hash</p>
                        <p className="text-xs font-mono text-gray-400">0x742d35cc...5a9f</p>
                      </div>
                    </div>
                  )}

                  {simulationAction === 'cancel' && (
                    <div className="bg-blue-500/10 border-2 border-blue-500/50 rounded-xl p-6 text-center">
                      <CheckCircle className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-blue-400 mb-2">Transaction Cancelled</h3>
                      <p className="text-sm text-gray-400">
                        You cancelled the transaction. Your funds remain in your wallet.
                      </p>
                    </div>
                  )}

                  {simulationAction === 'wait' && (
                    <div className="bg-yellow-500/10 border-2 border-yellow-500/50 rounded-xl p-6 text-center">
                      <Clock className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                      <h3 className="text-xl font-bold text-yellow-400 mb-2">Waiting...</h3>
                      <p className="text-sm text-gray-400">
                        Transaction will confirm when gas prices normalize. This could take a while.
                      </p>
                    </div>
                  )}

                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 mt-6">
                    <p className="text-sm text-purple-400 font-medium mb-2">💡 Key Learning</p>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Speed Up replaces your transaction with a new one using the same nonce but higher gas. 
                      Only one transaction with the same nonce can be confirmed.
                    </p>
                  </div>
                </Web3Card>
              )}

              {simulationAction && (
                <Web3Button onClick={() => setCurrentFrame('int-5-complete')} size="lg" className="w-full">
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2 inline" />
                </Web3Button>
              )}
            </motion.div>
          )}

          {/* INTERMEDIATE FRAME 5: Complete */}
          {currentFrame === 'int-5-complete' && (
            <motion.div
              key="int-5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Web3Card className="mb-6">
                <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-2 border-purple-500/50 rounded-xl p-8 text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/50"
                  >
                    <Trophy className="w-12 h-12 text-white" />
                  </motion.div>
                  
                  <h2 className="text-3xl font-bold text-white mb-3">Lesson Complete!</h2>
                  <p className="text-lg text-purple-400 mb-4">+500 XP</p>
                  <p className="text-sm text-gray-400 mb-6">
                    You now understand how to build transactions, manage gas, and handle stuck transactions.
                  </p>

                  <div className="bg-gray-950/50 border border-gray-800 rounded-xl p-4 mb-6">
                    <h3 className="text-sm font-medium text-white mb-3">What You Learned</h3>
                    <ul className="text-xs text-gray-400 space-y-2 text-left">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>How to build and preview transactions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Gas price strategies and their impact</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>How to handle stuck transactions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>Transaction replacement using nonce</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Web3Card>

              <div className="flex gap-4">
                <Web3Button
                  onClick={() => setCurrentFrame('mode-selection')}
                  variant="outline"
                  className="flex-1"
                >
                  Try Expert Mode
                </Web3Button>
                <Web3Button onClick={onComplete} className="flex-1">
                  Back to Dashboard
                </Web3Button>
              </div>
            </motion.div>
          )}

          {/* EXPERT FRAME 1: Nonce Conflict Scenario */}
          {currentFrame === 'exp-1-scenario' && (
            <motion.div
              key="exp-1"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Nonce Conflict Emergency</h2>

              <Web3Card className="mb-6">
                <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                    Critical Issue Detected
                  </h3>
                  <p className="text-gray-300 mb-4">
                    You accidentally reused nonce #42. Two transactions are competing for the same nonce!
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                      <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
                      <span className="text-gray-300">Transaction A: Stuck (nonce 42, 30 Gwei)</span>
                    </div>
                    <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                      <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0" />
                      <span className="text-gray-300">Transaction B: Pending (nonce 42, 35 Gwei)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 mb-6">
                  <h4 className="text-sm font-medium text-white mb-3">Understand the Problem</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    When two transactions share the same nonce, only ONE can be confirmed. 
                    The network will choose the transaction with the highest gas price. 
                    The other will be dropped from the mempool.
                  </p>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                  <p className="text-xs text-blue-400 font-medium mb-2">💡 Expert Tip</p>
                  <p className="text-xs text-gray-300">
                    Nonces ensure transaction ordering and prevent replay attacks. 
                    Each transaction must have a unique, sequential nonce.
                  </p>
                </div>
              </Web3Card>

              <Web3Button onClick={() => setCurrentFrame('exp-2-resolve')} size="lg" className="w-full">
                Resolve Conflict
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Web3Button>
            </motion.div>
          )}

          {/* EXPERT FRAME 2: Resolve Nonce Conflict */}
          {currentFrame === 'exp-2-resolve' && (
            <motion.div
              key="exp-2"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Replace Transaction</h2>

              <Web3Card className="mb-6">
                <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 mb-6">
                  <h4 className="text-sm font-medium text-white mb-4">Current Situation</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Stuck Transaction</span>
                      <span className="text-red-400">Nonce 42, 30 Gwei</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Competing Transaction</span>
                      <span className="text-orange-400">Nonce 42, 35 Gwei</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      Enter the correct nonce to replace the stuck transaction:
                    </label>
                    <input
                      type="text"
                      value={replacementNonce}
                      onChange={(e) => setReplacementNonce(e.target.value)}
                      placeholder="Enter nonce (e.g., 42)..."
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  {replacementNonce && replacementNonce !== '42' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-red-500/10 border border-red-500/30 rounded-lg p-3"
                    >
                      <p className="text-xs text-red-400 flex items-center gap-2">
                        <X className="w-4 h-4" />
                        Incorrect. You must use the same nonce (42) with higher gas to replace it.
                      </p>
                    </motion.div>
                  )}

                  {replacementNonce === '42' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-green-500/10 border border-green-500/30 rounded-lg p-3"
                    >
                      <p className="text-xs text-green-400 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Correct! Now set a higher gas price to ensure your transaction is prioritized.
                      </p>
                    </motion.div>
                  )}

                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                    <p className="text-xs text-purple-400 font-medium mb-2">How to Fix</p>
                    <ol className="text-xs text-gray-300 space-y-1">
                      <li>1. Use the same nonce (42)</li>
                      <li>2. Set gas higher than 35 Gwei</li>
                      <li>3. Submit replacement transaction</li>
                      <li>4. The higher gas tx will be confirmed</li>
                    </ol>
                  </div>
                </div>
              </Web3Card>

              <Web3Button
                onClick={() => setCurrentFrame('exp-3-complete')}
                disabled={replacementNonce !== '42'}
                size="lg"
                className="w-full"
              >
                Submit Replacement
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Web3Button>
            </motion.div>
          )}

          {/* EXPERT FRAME 3: Complete */}
          {currentFrame === 'exp-3-complete' && (
            <motion.div
              key="exp-3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Web3Card className="mb-6">
                <div className="bg-green-500/10 border-2 border-green-500/50 rounded-xl p-6 mb-6 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-green-400 mb-2">Conflict Resolved!</h3>
                  <p className="text-sm text-gray-400">
                    You successfully replaced the transaction using the same nonce with higher gas
                  </p>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
                  <p className="text-sm text-blue-400 font-medium mb-2">🎓 Expert Insight</p>
                  <p className="text-xs text-gray-300 leading-relaxed mb-3">
                    You now understand how wallets construct raw Ethereum transactions. 
                    The nonce ensures transactions are processed in order and provides replay protection. 
                    Mastering nonce management is key to becoming an expert user.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-500/50 rounded-xl p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ type: "spring", delay: 0.3 }}
                    className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <Award className="w-12 h-12 text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white mb-2">+1000 XP</h3>
                  <p className="text-lg text-orange-400 mb-1">Network Mastery Achieved</p>
                  <p className="text-sm text-gray-500">Expert Level Unlocked</p>
                </div>
              </Web3Card>

              <Web3Button onClick={onComplete} size="lg" className="w-full">
                Complete Lesson
              </Web3Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
