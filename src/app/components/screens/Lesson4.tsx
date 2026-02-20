import React, { useState, useEffect } from 'react';
import { Web3Button } from '../Web3Button';
import { Web3Card } from '../Web3Card';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, Zap, AlertTriangle, CheckCircle, TrendingUp, ArrowRight, ArrowLeft, Gauge } from 'lucide-react';

interface Lesson4Props {
  onContinue: () => void;
  onBack: () => void;
}

type GasLevel = 'low' | 'medium' | 'high';
type TransactionOutcome = null | 'delayed' | 'optimal' | 'wasteful';

export function Lesson4({ onContinue, onBack }: Lesson4Props) {
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedGas, setSelectedGas] = useState<GasLevel | null>(null);
  const [networkCongestion, setNetworkCongestion] = useState(75); // High congestion
  const [outcome, setOutcome] = useState<TransactionOutcome>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<GasLevel | null>(null);

  const gasOptions = {
    low: { label: 'Low (Slow)', gwei: 20, time: '~45 seconds', cost: '$0.15', speedScore: 30 },
    medium: { label: 'Medium', gwei: 35, time: '~15 seconds', cost: '$0.26', speedScore: 70 },
    high: { label: 'High (Fast)', gwei: 55, time: '~5 seconds', cost: '$0.41', speedScore: 95 }
  };

  // Countdown timer
  useEffect(() => {
    if (timeRemaining > 0 && !outcome) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeRemaining, outcome]);

  // Network congestion animation
  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkCongestion(prev => {
        const change = Math.random() > 0.5 ? 5 : -5;
        return Math.max(60, Math.min(90, prev + change));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSendTransaction = () => {
    if (!selectedGas) return;

    // Determine outcome based on gas selection and congestion
    if (selectedGas === 'low' && networkCongestion > 70) {
      setOutcome('delayed');
    } else if (selectedGas === 'high' && networkCongestion < 60) {
      setOutcome('wasteful');
    } else {
      setOutcome('optimal');
    }

    setTimeout(() => {
      setShowQuiz(true);
    }, 3000);
  };

  const isCorrectAnswer = quizAnswer === 'medium';

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
              <span className="text-sm text-gray-400">Lesson 4 of 6</span>
              <span className="text-sm font-medium text-gray-300">67%</span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 w-2/3 transition-all duration-500" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            High-Stakes Token Transfer
          </h1>
          <p className="text-gray-400">
            Send tokens quickly under network pressure
          </p>
        </div>

        {/* Scenario Panel */}
        <Web3Card className="mb-6">
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-4 mb-4">
            <div className="flex items-start gap-3 mb-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-white mb-1">Market Opportunity</p>
                <p className="text-sm text-gray-300">
                  You need to send tokens quickly before a time-sensitive swap opportunity expires.
                </p>
              </div>
            </div>

            {/* Countdown Timer */}
            {!outcome && (
              <div className="flex items-center justify-center gap-3 mt-4 py-3 bg-gray-950 rounded-lg">
                <Clock className={`w-5 h-5 ${timeRemaining < 30 ? 'text-red-500 animate-pulse' : 'text-orange-400'}`} />
                <div className="text-center">
                  <p className="text-xs text-gray-500">Time Remaining</p>
                  <motion.p
                    key={timeRemaining}
                    initial={{ scale: 1.2, color: timeRemaining < 30 ? '#ef4444' : '#fb923c' }}
                    animate={{ scale: 1 }}
                    className={`text-2xl font-bold ${timeRemaining < 30 ? 'text-red-400' : 'text-orange-400'}`}
                  >
                    {timeRemaining}s
                  </motion.p>
                </div>
              </div>
            )}
          </div>
        </Web3Card>

        {/* Network Congestion Indicator */}
        <Web3Card className="mb-6">
          <h3 className="text-sm font-medium text-white mb-4">Network Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Gauge className={`w-4 h-4 ${networkCongestion > 75 ? 'text-red-400' : 'text-yellow-400'}`} />
                <span className="text-sm text-gray-400">Congestion Level</span>
              </div>
              <span className={`text-sm font-medium ${networkCongestion > 75 ? 'text-red-400' : 'text-yellow-400'}`}>
                {networkCongestion}%
              </span>
            </div>
            
            <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: `${networkCongestion}%` }}
                transition={{ duration: 0.5 }}
                className={`h-full ${
                  networkCongestion > 75
                    ? 'bg-gradient-to-r from-red-600 to-red-500'
                    : 'bg-gradient-to-r from-yellow-600 to-yellow-500'
                }`}
              />
            </div>

            <div className="flex justify-between text-xs text-gray-600">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>

          {networkCongestion > 75 && selectedGas === 'low' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3"
            >
              <p className="text-xs text-yellow-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Warning: Low gas may cause delays during high congestion
              </p>
            </motion.div>
          )}
        </Web3Card>

        {/* Advanced Transaction Builder */}
        {!outcome && (
          <Web3Card className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Build Transaction</h3>
            
            <div className="space-y-4">
              {/* Recipient Input */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Recipient Address</label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="0x..."
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 font-mono text-sm"
                />
              </div>

              {/* Amount Input */}
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Amount (ETH)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.0"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Gas Selector */}
              <div>
                <label className="text-sm text-gray-400 mb-3 block">Gas Priority</label>
                <div className="space-y-3">
                  {(Object.keys(gasOptions) as GasLevel[]).map((level) => {
                    const option = gasOptions[level];
                    return (
                      <button
                        key={level}
                        onClick={() => setSelectedGas(level)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                          selectedGas === level
                            ? 'border-purple-500 bg-purple-500/10'
                            : 'border-gray-800 bg-gray-900 hover:border-gray-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            level === 'low' ? 'bg-blue-600/20' :
                            level === 'medium' ? 'bg-purple-600/20' :
                            'bg-orange-600/20'
                          }`}>
                            <Zap className={`w-5 h-5 ${
                              level === 'low' ? 'text-blue-400' :
                              level === 'medium' ? 'text-purple-400' :
                              'text-orange-400'
                            }`} />
                          </div>
                          <div className="text-left">
                            <p className={`text-sm font-medium ${selectedGas === level ? 'text-white' : 'text-gray-300'}`}>
                              {option.label}
                            </p>
                            <p className="text-xs text-gray-500">{option.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-medium ${selectedGas === level ? 'text-white' : 'text-gray-400'}`}>
                            {option.cost}
                          </p>
                          <p className="text-xs text-gray-600">{option.gwei} Gwei</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Live Fee Estimator */}
              {selectedGas && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-950 border border-gray-800 rounded-xl p-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">Estimated Speed</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                          style={{ width: `${gasOptions[selectedGas].speedScore}%` }}
                        />
                      </div>
                      <span className="text-sm text-white">{gasOptions[selectedGas].speedScore}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Total Cost</span>
                    <span className="text-sm font-medium text-white">{gasOptions[selectedGas].cost}</span>
                  </div>
                </motion.div>
              )}

              <Web3Button
                onClick={handleSendTransaction}
                disabled={!recipient || !amount || !selectedGas}
                className="w-full"
              >
                Send Transaction
              </Web3Button>
            </div>
          </Web3Card>
        )}

        {/* Outcome Simulation */}
        <AnimatePresence>
          {outcome && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Web3Card className="mb-6">
                {outcome === 'delayed' && (
                  <div className="bg-red-500/10 border-2 border-red-500/50 rounded-xl p-6 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                      className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <Clock className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-red-400 mb-2">Transaction Delayed</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Your transaction is stuck in the mempool. The gas was too low during high network congestion.
                    </p>
                    <div className="bg-gray-950 border border-gray-800 rounded-lg p-3">
                      <p className="text-xs text-gray-500">Opportunity missed due to delay</p>
                    </div>
                  </div>
                )}

                {outcome === 'optimal' && (
                  <div className="bg-green-500/10 border-2 border-green-500/50 rounded-xl p-6 text-center">
                    <motion.div
                      initial={{ scale: 0, rotate: 0 }}
                      animate={{ scale: 1, rotate: 360 }}
                      transition={{ type: "spring" }}
                      className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-green-400 mb-2">Perfect Timing!</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Transaction confirmed quickly with optimal gas pricing. You balanced speed and cost perfectly.
                    </p>
                    <div className="bg-gray-950 border border-gray-800 rounded-lg p-3">
                      <p className="text-xs text-gray-500">Opportunity captured successfully</p>
                    </div>
                  </div>
                )}

                {outcome === 'wasteful' && (
                  <div className="bg-yellow-500/10 border-2 border-yellow-500/50 rounded-xl p-6 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                      className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <TrendingUp className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-yellow-400 mb-2">Overpaid Gas</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Transaction confirmed, but you paid more than necessary. Network wasn't congested enough to require high gas.
                    </p>
                    <div className="bg-gray-950 border border-gray-800 rounded-lg p-3">
                      <p className="text-xs text-gray-500">Wasted $0.15 on excess gas fees</p>
                    </div>
                  </div>
                )}
              </Web3Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Educational Insight Panel */}
        {outcome && (
          <Web3Card className="mb-6">
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white mb-2">Gas Pricing Strategy</p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Gas fees are like priority fees. Higher gas = faster processing. During congestion, low gas transactions wait longer. Monitor network status and adjust gas accordingly for optimal speed and cost balance.
                  </p>
                </div>
              </div>
            </div>
          </Web3Card>
        )}

        {/* Reflection Challenge */}
        <AnimatePresence>
          {showQuiz && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Web3Card className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Reflection Challenge</h3>
                <p className="text-sm text-gray-400 mb-4">What gas option is best during high network congestion?</p>
                
                <div className="space-y-3">
                  {(Object.keys(gasOptions) as GasLevel[]).map((level) => (
                    <button
                      key={level}
                      onClick={() => setQuizAnswer(level)}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                        quizAnswer === level
                          ? level === 'medium'
                            ? 'border-green-500 bg-green-500/10'
                            : 'border-red-500 bg-red-500/10'
                          : 'border-gray-800 bg-gray-900 hover:border-gray-700'
                      }`}
                    >
                      <span className={`${
                        quizAnswer === level
                          ? level === 'medium'
                            ? 'text-green-500'
                            : 'text-red-500'
                          : 'text-gray-300'
                      }`}>
                        {gasOptions[level].label}
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
                        ? '✓ Correct! Medium gas offers the best balance during congestion—fast enough without overpaying.'
                        : 'Not quite. Medium gas balances speed and cost during congestion. Low risks delays, high wastes money.'}
                    </p>
                  </motion.div>
                )}
              </Web3Card>
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
              Optimize Like a Pro
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Web3Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
