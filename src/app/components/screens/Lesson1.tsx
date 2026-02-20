import React, { useState } from 'react';
import { Web3Button } from '../Web3Button';
import { Web3Card } from '../Web3Card';
import { motion, AnimatePresence } from 'motion/react';
import { Wallet, ArrowRight, CheckCircle, Clock, Zap, ArrowLeft } from 'lucide-react';

interface Lesson1Props {
  onContinue: () => void;
  onBack: () => void;
}

type TransactionStatus = 'idle' | 'pending' | 'confirmed';
type QuizAnswer = 'sent' | 'signed' | 'confirmed' | null;

export function Lesson1({ onContinue, onBack }: Lesson1Props) {
  const [txStatus, setTxStatus] = useState<TransactionStatus>('idle');
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<QuizAnswer>(null);
  const [showGasFee, setShowGasFee] = useState(false);

  const handleSendTokens = () => {
    setTxStatus('pending');
    setShowGasFee(true);
    
    setTimeout(() => {
      setTxStatus('confirmed');
      setTimeout(() => {
        setShowQuiz(true);
      }, 1500);
    }, 3000);
  };

  const handleAnswerSelect = (answer: QuizAnswer) => {
    setSelectedAnswer(answer);
  };

  const isCorrectAnswer = selectedAnswer === 'confirmed';

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
              <span className="text-sm text-gray-400">Lesson 1 of 3</span>
              <span className="text-sm font-medium text-gray-300">33%</span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 w-1/3 transition-all duration-500" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Your First On-Chain Action
          </h1>
          <p className="text-gray-400">
            Understand how blockchain transactions actually work
          </p>
        </div>

        {/* Interactive Simulation Card */}
        <Web3Card className="mb-6">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Test Wallet</p>
                <p className="text-xs text-gray-500 font-mono">0x742d...3a9f</p>
              </div>
            </div>

            <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-400 mb-1">Balance</p>
              <p className="text-2xl font-bold text-white">1.0 TEST</p>
            </div>

            <Web3Button
              onClick={handleSendTokens}
              disabled={txStatus !== 'idle'}
              className="w-full"
            >
              {txStatus === 'idle' ? 'Send 0.1 TEST' : txStatus === 'pending' ? 'Sending...' : 'Sent!'}
            </Web3Button>
          </div>

          {/* Transaction Status Animation */}
          <AnimatePresence>
            {txStatus !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* Pending State */}
                {txStatus === 'pending' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-yellow-500 animate-pulse" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-yellow-500">Transaction Pending</p>
                        <p className="text-xs text-gray-400">Waiting for network confirmation...</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Confirmed State */}
                {txStatus === 'confirmed' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-500/10 border border-green-500/30 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-500">Transaction Confirmed</p>
                        <p className="text-xs text-gray-400">Your transaction is on the blockchain!</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Gas Fee Tooltip */}
                {showGasFee && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-900 border border-gray-800 rounded-xl p-4"
                  >
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-white mb-1">Gas Fee</p>
                        <p className="text-xs text-gray-400">
                          A small fee (0.002 TEST) is paid to network validators to process your transaction.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </Web3Card>

        {/* Learning Panel */}
        <Web3Card className="mb-6">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="font-medium text-white">Every blockchain action is a transaction.</span> You sign it with your wallet. The network verifies it. Then it becomes permanent and unchangeable.
            </p>
          </div>
        </Web3Card>

        {/* Visual Feedback - Blockchain Explorer */}
        {txStatus === 'confirmed' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Web3Card className="mb-6">
              <h3 className="text-sm font-medium text-gray-400 mb-4">Blockchain Explorer</h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                  <span className="text-gray-500">Transaction Hash</span>
                  <span className="text-gray-300 font-mono">0x1a2b...9z0t</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                  <span className="text-gray-500">Block Number</span>
                  <span className="text-gray-300">#2,847,392</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                  <span className="text-gray-500">Confirmations</span>
                  <span className="text-green-500 font-medium">12/12</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-green-500 font-medium">Success</span>
                </div>
              </div>
            </Web3Card>
          </motion.div>
        )}

        {/* Reflection Prompt */}
        <AnimatePresence>
          {showQuiz && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Web3Card className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">What just happened?</h3>
                <div className="space-y-3">
                  {[
                    { id: 'sent', text: 'I sent tokens' },
                    { id: 'signed', text: 'I signed a transaction' },
                    { id: 'confirmed', text: 'The network confirmed my action' }
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleAnswerSelect(option.id as QuizAnswer)}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                        selectedAnswer === option.id
                          ? option.id === 'confirmed'
                            ? 'border-green-500 bg-green-500/10'
                            : 'border-red-500 bg-red-500/10'
                          : 'border-gray-800 bg-gray-900 hover:border-gray-700'
                      }`}
                    >
                      <span className={`${
                        selectedAnswer === option.id
                          ? option.id === 'confirmed'
                            ? 'text-green-500'
                            : 'text-red-500'
                          : 'text-gray-300'
                      }`}>
                        {option.text}
                      </span>
                    </button>
                  ))}
                </div>
                
                {selectedAnswer && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4"
                  >
                    <p className={`text-sm ${isCorrectAnswer ? 'text-green-500' : 'text-gray-400'}`}>
                      {isCorrectAnswer 
                        ? '✓ Correct! All three happened, but the key learning is that the network confirmed your action, making it permanent.'
                        : 'Not quite. All of these happened, but the most important part is that the network confirmed your action!'}
                    </p>
                  </motion.div>
                )}
              </Web3Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue Button */}
        {selectedAnswer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Web3Button onClick={onContinue} size="lg" className="w-full">
              I Get It — Continue
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Web3Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
