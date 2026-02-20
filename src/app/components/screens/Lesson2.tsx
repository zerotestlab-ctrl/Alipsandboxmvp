import React, { useState } from 'react';
import { Web3Button } from '../Web3Button';
import { Web3Card } from '../Web3Card';
import { motion, AnimatePresence } from 'motion/react';
import { Box, Code, Eye, ArrowRight, Loader, CheckCircle, ArrowLeft } from 'lucide-react';

interface Lesson2Props {
  onContinue: () => void;
  onBack: () => void;
}

type DeployStatus = 'idle' | 'compiling' | 'broadcasting' | 'confirmed';
type ContractBlock = 'store' | 'change' | 'read';

export function Lesson2({ onContinue, onBack }: Lesson2Props) {
  const [selectedBlocks, setSelectedBlocks] = useState<ContractBlock[]>([]);
  const [deployStatus, setDeployStatus] = useState<DeployStatus>('idle');
  const [storedValue, setStoredValue] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');
  const [isContractDeployed, setIsContractDeployed] = useState(false);

  const contractBlocks = [
    { id: 'store' as ContractBlock, icon: Box, label: 'Store Value', color: 'from-blue-500 to-cyan-500' },
    { id: 'change' as ContractBlock, icon: Code, label: 'Change Value', color: 'from-purple-500 to-pink-500' },
    { id: 'read' as ContractBlock, icon: Eye, label: 'Read Value', color: 'from-green-500 to-emerald-500' }
  ];

  const handleBlockToggle = (blockId: ContractBlock) => {
    if (selectedBlocks.includes(blockId)) {
      setSelectedBlocks(selectedBlocks.filter(id => id !== blockId));
    } else {
      setSelectedBlocks([...selectedBlocks, blockId]);
    }
  };

  const handleDeploy = () => {
    setDeployStatus('compiling');
    
    setTimeout(() => {
      setDeployStatus('broadcasting');
      setTimeout(() => {
        setDeployStatus('confirmed');
        setIsContractDeployed(true);
      }, 2000);
    }, 2000);
  };

  const handleUpdateContract = () => {
    const newValue = parseInt(inputValue);
    if (!isNaN(newValue)) {
      setStoredValue(newValue);
      setInputValue('');
    }
  };

  const handleReset = () => {
    setSelectedBlocks([]);
    setDeployStatus('idle');
    setIsContractDeployed(false);
    setStoredValue(0);
    setInputValue('');
  };

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
              <span className="text-sm text-gray-400">Lesson 2 of 3</span>
              <span className="text-sm font-medium text-gray-300">67%</span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 w-2/3 transition-all duration-500" />
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Smart Contracts Made Visible
          </h1>
          <p className="text-gray-400">
            Build and deploy your first smart contract visually
          </p>
        </div>

        {/* Explanation Panel */}
        <Web3Card className="mb-6">
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="font-medium text-white">Smart contracts are programs that run on the blockchain.</span> They execute automatically when conditions are met. No middleman needed!
            </p>
          </div>
        </Web3Card>

        {/* Smart Contract Builder Panel */}
        <Web3Card className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Build Your Contract</h3>
          <p className="text-sm text-gray-400 mb-4">Select the building blocks for your smart contract:</p>
          
          <div className="space-y-3 mb-6">
            {contractBlocks.map((block) => {
              const Icon = block.icon;
              const isSelected = selectedBlocks.includes(block.id);
              
              return (
                <motion.button
                  key={block.id}
                  onClick={() => handleBlockToggle(block.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-gray-800 bg-gray-900 hover:border-gray-700'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${block.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className={`font-medium ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                      {block.label}
                    </p>
                    <p className="text-xs text-gray-500">
                      {block.id === 'store' && 'Save data to blockchain'}
                      {block.id === 'change' && 'Update stored values'}
                      {block.id === 'read' && 'Retrieve stored data'}
                    </p>
                  </div>
                  {isSelected && (
                    <CheckCircle className="w-5 h-5 text-purple-500 ml-auto" />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Selected Blocks Preview */}
          {selectedBlocks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-950 border border-gray-800 rounded-xl p-4"
            >
              <p className="text-xs text-gray-500 mb-2">Your Contract Will Include:</p>
              <div className="flex flex-wrap gap-2">
                {selectedBlocks.map((blockId) => {
                  const block = contractBlocks.find(b => b.id === blockId);
                  return (
                    <span
                      key={blockId}
                      className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg text-xs text-purple-300"
                    >
                      {block?.label}
                    </span>
                  );
                })}
              </div>
            </motion.div>
          )}
        </Web3Card>

        {/* Deploy Simulation */}
        {selectedBlocks.length > 0 && (
          <Web3Card className="mb-6">
            <Web3Button
              onClick={handleDeploy}
              disabled={deployStatus !== 'idle'}
              className="w-full mb-4"
            >
              {deployStatus === 'idle' ? 'Deploy Contract' : 'Deploying...'}
            </Web3Button>

            {/* Deploy Status Animation */}
            <AnimatePresence>
              {deployStatus !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  {/* Compiling */}
                  <div className={`flex items-center gap-3 p-3 rounded-lg ${
                    deployStatus === 'compiling' ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-gray-900'
                  }`}>
                    {deployStatus === 'compiling' ? (
                      <Loader className="w-4 h-4 text-blue-500 animate-spin" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                    <span className={`text-sm ${deployStatus === 'compiling' ? 'text-blue-400' : 'text-gray-400'}`}>
                      Compiling contract...
                    </span>
                  </div>

                  {/* Broadcasting */}
                  {(deployStatus === 'broadcasting' || deployStatus === 'confirmed') && (
                    <div className={`flex items-center gap-3 p-3 rounded-lg ${
                      deployStatus === 'broadcasting' ? 'bg-yellow-500/10 border border-yellow-500/30' : 'bg-gray-900'
                    }`}>
                      {deployStatus === 'broadcasting' ? (
                        <Loader className="w-4 h-4 text-yellow-500 animate-spin" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                      <span className={`text-sm ${deployStatus === 'broadcasting' ? 'text-yellow-400' : 'text-gray-400'}`}>
                        Broadcasting to network...
                      </span>
                    </div>
                  )}

                  {/* Confirmed */}
                  {deployStatus === 'confirmed' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-500/10 border border-green-500/30 rounded-lg p-3"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-400">Contract deployed successfully!</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 font-mono">0xabcd...ef12</p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </Web3Card>
        )}

        {/* Contract Interaction Panel */}
        {isContractDeployed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Web3Card className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Interact with Your Contract</h3>
              
              {/* Live State Display */}
              <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 mb-4">
                <p className="text-xs text-gray-500 mb-2">Stored Value:</p>
                <motion.p
                  key={storedValue}
                  initial={{ scale: 1.2, color: '#a855f7' }}
                  animate={{ scale: 1, color: '#ffffff' }}
                  className="text-4xl font-bold text-white"
                >
                  {storedValue}
                </motion.p>
              </div>

              {/* Input and Update */}
              <div className="space-y-3">
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter a new number"
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
                <Web3Button
                  onClick={handleUpdateContract}
                  disabled={!inputValue}
                  variant="outline"
                  className="w-full"
                >
                  Update Contract
                </Web3Button>
              </div>
            </Web3Card>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {isContractDeployed && (
            <Web3Button onClick={handleReset} variant="outline" className="flex-1">
              Try Again
            </Web3Button>
          )}
          {isContractDeployed && (
            <Web3Button onClick={onContinue} className="flex-1">
              Continue
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Web3Button>
          )}
        </div>
      </div>
    </div>
  );
}
