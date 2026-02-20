import React, { useState } from 'react';
import { Web3Button } from '../Web3Button';
import { Web3Card } from '../Web3Card';
import { motion } from 'motion/react';
import { Wallet, Code, Monitor, ArrowRight, Plus, Minus, Trophy, Sparkles, ArrowLeft } from 'lucide-react';

interface Lesson3Props {
  onComplete: () => void;
  onBack: () => void;
}

export function Lesson3({ onComplete, onBack }: Lesson3Props) {
  const [counter, setCounter] = useState(0);
  const [showAchievement, setShowAchievement] = useState(false);
  const [transactionCount, setTransactionCount] = useState(0);

  const handleIncrement = () => {
    setCounter(counter + 1);
    setTransactionCount(transactionCount + 1);
    if (!showAchievement && transactionCount >= 2) {
      setShowAchievement(true);
    }
  };

  const handleDecrement = () => {
    setCounter(counter - 1);
    setTransactionCount(transactionCount + 1);
    if (!showAchievement && transactionCount >= 2) {
      setShowAchievement(true);
    }
  };

  const handleShare = () => {
    alert('Achievement shared! 🎉');
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
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Lesson 3 of 3</span>
              <span className="text-sm font-medium text-gray-300">100%</span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 w-full transition-all duration-500" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Build a Mini App
          </h1>
          <p className="text-gray-400">
            Connect wallet, contract, and UI to create a complete Web3 application
          </p>
        </div>

        {/* App Builder Workspace */}
        <Web3Card className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-6">App Architecture</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Wallet Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              className="bg-gray-950 border-2 border-blue-500/50 rounded-xl p-4"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-3">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-medium text-white mb-2">Wallet</h4>
              <p className="text-xs text-gray-400">Signs transactions</p>
            </motion.div>

            {/* Smart Contract Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-950 border-2 border-purple-500/50 rounded-xl p-4"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-3">
                <Code className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-medium text-white mb-2">Smart Contract</h4>
              <p className="text-xs text-gray-400">Updates state</p>
            </motion.div>

            {/* UI Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-950 border-2 border-green-500/50 rounded-xl p-4"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-3">
                <Monitor className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-medium text-white mb-2">User Interface</h4>
              <p className="text-xs text-gray-400">Reflects changes</p>
            </motion.div>
          </div>

          {/* Flow Arrows */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <ArrowRight className="w-4 h-4 text-gray-600" />
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <ArrowRight className="w-4 h-4 text-gray-600" />
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>

          <p className="text-xs text-center text-gray-500">
            Wallet signs → Contract updates → UI reflects the change
          </p>
        </Web3Card>

        {/* Interactive Mini App */}
        <Web3Card className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Your Counter App</h3>
          
          {/* Counter Display */}
          <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-purple-500/30 rounded-2xl p-8 mb-6">
            <p className="text-sm text-gray-400 text-center mb-2">Current Count</p>
            <motion.p
              key={counter}
              initial={{ scale: 1.3, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="text-6xl md:text-7xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              {counter}
            </motion.p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Web3Button
              onClick={handleDecrement}
              variant="outline"
              className="flex items-center justify-center gap-2"
            >
              <Minus className="w-5 h-5" />
              Decrement
            </Web3Button>
            <Web3Button
              onClick={handleIncrement}
              className="flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Increment
            </Web3Button>
          </div>

          {/* Transaction Log */}
          {transactionCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-gray-950 border border-gray-800 rounded-xl p-3"
            >
              <p className="text-xs text-gray-500 mb-1">Transactions Signed</p>
              <p className="text-sm text-white font-medium">{transactionCount}</p>
            </motion.div>
          )}
        </Web3Card>

        {/* Achievement Panel */}
        {showAchievement && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
          >
            <Web3Card className="mb-6 relative overflow-hidden">
              {/* Confetti Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-purple-500/10 to-pink-500/10"></div>
              
              <div className="relative">
                <div className="flex flex-col items-center text-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-4 shadow-2xl shadow-yellow-500/50"
                  >
                    <Trophy className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Achievement Unlocked!
                    </h3>
                    <p className="text-gray-400 mb-1">You Built Your First Web3 App</p>
                    <div className="flex items-center justify-center gap-1 text-yellow-500">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-sm">+100 XP</span>
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </motion.div>
                </div>

                <div className="bg-gray-950/50 border border-gray-800 rounded-xl p-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-blue-400">{transactionCount}</p>
                      <p className="text-xs text-gray-500">Transactions</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-400">3</p>
                      <p className="text-xs text-gray-500">Lessons Done</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-400">100%</p>
                      <p className="text-xs text-gray-500">Progress</p>
                    </div>
                  </div>
                </div>
              </div>
            </Web3Card>
          </motion.div>
        )}

        {/* Summary Box */}
        <Web3Card className="mb-6">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-purple-500/30 rounded-xl p-4">
            <h4 className="font-medium text-white mb-2">How It All Works Together</h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              Your <span className="text-blue-400">wallet</span> signs each action. The <span className="text-purple-400">smart contract</span> processes and stores the state on-chain. The <span className="text-green-400">user interface</span> reads the updated state and displays it instantly. This is the foundation of every Web3 app!
            </p>
          </div>
        </Web3Card>

        {/* Final CTA Buttons */}
        {showAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Web3Button onClick={handleShare} variant="outline" className="flex-1">
              Share Achievement
            </Web3Button>
            <Web3Button onClick={onComplete} className="flex-1">
              Explore Advanced Sandbox
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Web3Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
