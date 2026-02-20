import React, { useState } from 'react';
import { Web3Button } from '../Web3Button';
import { Web3Card } from '../Web3Card';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, AlertTriangle, CheckCircle, X, ArrowRight, ArrowLeft, Clock, Award, TrendingDown, Repeat, Eye } from 'lucide-react';

interface ApproveContractLessonProps {
  onComplete: () => void;
  onBack: () => void;
}

type Mode = null | 'intermediate' | 'expert';
type IntermediateStep = 'intro' | 'approval' | 'risk';
type ExpertStep = 'dashboard' | 'revoke';

export function ApproveContractLesson({ onComplete, onBack }: ApproveContractLessonProps) {
  const [mode, setMode] = useState<Mode>(null);
  const [intermediateStep, setIntermediateStep] = useState<IntermediateStep>('intro');
  const [expertStep, setExpertStep] = useState<ExpertStep>('dashboard');
  
  const [showApprovalPopup, setShowApprovalPopup] = useState(false);
  const [approvalChoice, setApprovalChoice] = useState<'unlimited' | 'limited' | null>(null);
  const [customLimit, setCustomLimit] = useState('100');
  const [showRiskSimulation, setShowRiskSimulation] = useState(false);
  const [selectedAllowance, setSelectedAllowance] = useState<string | null>(null);
  const [revoking, setRevoking] = useState(false);
  const [showReward, setShowReward] = useState(false);

  const allowances = [
    { id: '1', protocol: 'DEX A', token: 'USDC', amount: 'Unlimited', risk: 'high', address: '0x1f98...F984' },
    { id: '2', protocol: 'NFT Market', token: 'DAI', amount: '500 DAI', risk: 'low', address: '0x7a25...488D' },
    { id: '3', protocol: 'Unknown Contract', token: 'USDC', amount: 'Unlimited', risk: 'critical', address: '0x9c3b...2f1a' }
  ];

  const handleApprovalDecision = (choice: 'unlimited' | 'limited') => {
    setApprovalChoice(choice);
    setShowApprovalPopup(false);
    setTimeout(() => {
      setIntermediateStep('approval');
    }, 500);
  };

  const handleShowRisk = () => {
    setShowRiskSimulation(true);
    setIntermediateStep('risk');
    setTimeout(() => {
      setShowReward(true);
    }, 3000);
  };

  const handleRevoke = () => {
    if (selectedAllowance) {
      setRevoking(true);
      setTimeout(() => {
        setRevoking(false);
        setShowReward(true);
      }, 2000);
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
            APPROVE CONTRACT
          </h1>
          <p className="text-gray-400">
            Understanding Token Permissions
          </p>
        </div>

        {/* Mode Selection */}
        {!mode && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Web3Card className="cursor-pointer hover:border-purple-500 transition-all" onClick={() => setMode('intermediate')}>
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Intermediate Mode</h3>
                <p className="text-sm text-gray-400 mb-4">Learn about ERC20 approvals and their risks</p>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>~4 minutes</span>
                </div>
              </div>
            </Web3Card>

            <Web3Card className="cursor-pointer hover:border-orange-500 transition-all" onClick={() => setMode('expert')}>
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Expert Mode</h3>
                <p className="text-sm text-gray-400 mb-4">Audit and revoke dangerous allowances</p>
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
            {/* Step 1: Scenario */}
            {intermediateStep === 'intro' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Web3Card className="mb-6">
                  <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-xl p-6 mb-6">
                    <h2 className="text-2xl font-bold text-white mb-3">Token Swap Scenario</h2>
                    <p className="text-gray-300">
                      You want to swap 100 USDC on a decentralized exchange. But first, you need approval.
                    </p>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      <h3 className="text-sm font-bold text-yellow-400">Approval Required</h3>
                    </div>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      ERC20 tokens require approval before a contract can spend them on your behalf. 
                      This is a safety feature, but it comes with risks.
                    </p>
                  </div>

                  <Web3Button onClick={() => setShowApprovalPopup(true)} className="w-full">
                    Continue to Approval
                    <ArrowRight className="w-5 h-5 ml-2 inline" />
                  </Web3Button>
                </Web3Card>

                {/* Approval Popup */}
                <AnimatePresence>
                  {showApprovalPopup && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4"
                      onClick={() => setShowApprovalPopup(false)}
                    >
                      <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-gray-900 border-2 border-purple-500 rounded-2xl p-6 max-w-md w-full"
                      >
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-xl font-bold text-white">Token Approval</h3>
                          <button
                            onClick={() => setShowApprovalPopup(false)}
                            className="text-gray-500 hover:text-gray-300"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 mb-6">
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                              <span className="text-gray-500">Spender Address</span>
                              <span className="text-gray-300 font-mono text-xs">0x1f98...F984</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                              <span className="text-gray-500">Token</span>
                              <span className="text-white">USDC</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-500">Allowance</span>
                              <span className="text-yellow-400 font-medium">Unlimited</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mb-6">
                          <p className="text-xs text-orange-400 mb-3">Should you approve unlimited?</p>
                          <div className="space-y-2">
                            <button
                              onClick={() => handleApprovalDecision('unlimited')}
                              className="w-full p-3 rounded-lg border border-gray-800 bg-gray-900 hover:border-orange-500 transition-all text-left"
                            >
                              <p className="text-sm font-medium text-white mb-1">✓ Yes (Convenient)</p>
                              <p className="text-xs text-gray-400">Only approve once, never again</p>
                            </button>
                            <button
                              onClick={() => handleApprovalDecision('limited')}
                              className="w-full p-3 rounded-lg border border-gray-800 bg-gray-900 hover:border-green-500 transition-all text-left"
                            >
                              <p className="text-sm font-medium text-white mb-1">✓ No (Set custom limit)</p>
                              <p className="text-xs text-gray-400">More secure, but need to approve again later</p>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Step 2: Approval Decision */}
            {intermediateStep === 'approval' && approvalChoice && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Web3Card className="mb-6">
                  {approvalChoice === 'unlimited' ? (
                    <div className="bg-orange-500/10 border-2 border-orange-500/50 rounded-xl p-6 mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <AlertTriangle className="w-6 h-6 text-orange-400" />
                        <div>
                          <h3 className="text-lg font-bold text-orange-400">Unlimited Approved</h3>
                          <p className="text-sm text-gray-400">The contract now has full access to your USDC</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-green-500/10 border-2 border-green-500/50 rounded-xl p-6 mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <CheckCircle className="w-6 h-6 text-green-400" />
                        <div>
                          <h3 className="text-lg font-bold text-green-400">Limited Approval</h3>
                          <p className="text-sm text-gray-400">You set a custom limit of {customLimit} USDC</p>
                        </div>
                      </div>
                      <div className="bg-gray-950 border border-gray-800 rounded-lg p-3">
                        <label className="text-xs text-gray-500 mb-2 block">Custom Limit</label>
                        <input
                          type="number"
                          value={customLimit}
                          onChange={(e) => setCustomLimit(e.target.value)}
                          className="w-full px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-green-500"
                        />
                      </div>
                    </div>
                  )}

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-6">
                    <p className="text-sm text-blue-400 font-medium mb-2">Tradeoffs Explained</p>
                    <div className="space-y-3 text-xs text-gray-300">
                      <div>
                        <p className="text-white font-medium mb-1">Unlimited Approval:</p>
                        <ul className="space-y-1 text-gray-400">
                          <li>• ✓ Only need to approve once (saves gas)</li>
                          <li>• ✗ Contract can drain all your tokens if hacked</li>
                          <li>• ✗ You need to remember to revoke later</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-white font-medium mb-1">Limited Approval:</p>
                        <ul className="space-y-1 text-gray-400">
                          <li>• ✓ Limits exposure if contract is compromised</li>
                          <li>• ✓ More control over your funds</li>
                          <li>• ✗ Need to approve again when limit is reached</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Web3Button onClick={handleShowRisk} className="w-full">
                    See Risk Simulation
                    <ArrowRight className="w-5 h-5 ml-2 inline" />
                  </Web3Button>
                </Web3Card>
              </motion.div>
            )}

            {/* Step 3: Risk Simulation */}
            {intermediateStep === 'risk' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Web3Card className="mb-6">
                  <h2 className="text-xl font-bold text-white mb-6">6 Months Later...</h2>

                  {approvalChoice === 'unlimited' && (
                    <div className="bg-red-500/10 border-2 border-red-500/50 rounded-xl p-6 mb-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: 2, duration: 0.5 }}
                        className="text-center mb-4"
                      >
                        <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-red-400 mb-2">Contract Hacked!</h3>
                        <p className="text-sm text-gray-400 mb-4">
                          The DEX contract was exploited. Your unlimited approval allowed hackers to drain your wallet.
                        </p>
                      </motion.div>

                      <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 mb-4">
                        <h4 className="text-sm font-medium text-white mb-3">Wallet Drain Simulation</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Your USDC Balance</span>
                            <motion.span
                              initial={{ opacity: 1 }}
                              animate={{ opacity: [1, 0.3, 1] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                              className="text-red-400 font-bold"
                            >
                              5,000 → 0
                            </motion.span>
                          </div>
                          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: '100%' }}
                              animate={{ width: '0%' }}
                              transition={{ duration: 2, ease: "easeOut" }}
                              className="h-full bg-red-500"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-red-400">
                        <TrendingDown className="w-4 h-4" />
                        <span>If this contract is hacked, it can drain all your USDC</span>
                      </div>
                    </div>
                  )}

                  {approvalChoice === 'limited' && (
                    <div className="bg-green-500/10 border-2 border-green-500/50 rounded-xl p-6 mb-6">
                      <div className="text-center mb-4">
                        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-green-400 mb-2">Funds Protected!</h3>
                        <p className="text-sm text-gray-400 mb-4">
                          The DEX was hacked, but your limited approval saved your funds.
                        </p>
                      </div>

                      <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 mb-4">
                        <h4 className="text-sm font-medium text-white mb-3">Limited Exposure</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Approved Amount</span>
                            <span className="text-yellow-400">{customLimit} USDC</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Maximum Loss</span>
                            <span className="text-yellow-400">{customLimit} USDC</span>
                          </div>
                          <div className="flex justify-between items-center pt-3 border-t border-gray-800">
                            <span className="text-gray-400">Remaining Balance</span>
                            <span className="text-green-400 font-bold">{5000 - parseInt(customLimit)} USDC</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-green-400">
                        <Shield className="w-4 h-4" />
                        <span>Limited approvals minimize your risk exposure</span>
                      </div>
                    </div>
                  )}

                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 mb-6">
                    <p className="text-sm text-purple-400 font-medium mb-2">💡 Key Takeaway</p>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Approvals are invisible risks that persist forever until revoked. 
                      Unlimited approvals are convenient but dangerous. Experts regularly audit and revoke old approvals.
                    </p>
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
                        <h3 className="text-xl font-bold text-white mb-2">+500 XP</h3>
                        <p className="text-sm text-purple-400">Approval Safety Awareness</p>
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
            {expertStep === 'dashboard' && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Web3Card className="mb-6">
                  <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-6 mb-6">
                    <h2 className="text-2xl font-bold text-white mb-3">Security Audit</h2>
                    <p className="text-gray-300">
                      You forgot you approved unlimited tokens months ago. Time to audit and clean up.
                    </p>
                  </div>

                  {/* Allowance Dashboard */}
                  <div className="space-y-3 mb-6">
                    <h3 className="text-sm font-medium text-white">Active Allowances</h3>
                    {allowances.map((allowance) => (
                      <button
                        key={allowance.id}
                        onClick={() => setSelectedAllowance(allowance.id)}
                        className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                          selectedAllowance === allowance.id
                            ? 'border-purple-500 bg-purple-500/10'
                            : allowance.risk === 'critical'
                            ? 'border-red-500/30 bg-red-500/5'
                            : 'border-gray-800 bg-gray-900 hover:border-gray-700'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-sm font-medium text-white">{allowance.protocol}</p>
                            <p className="text-xs text-gray-500 font-mono">{allowance.address}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            allowance.risk === 'critical'
                              ? 'bg-red-500/20 text-red-400'
                              : allowance.risk === 'high'
                              ? 'bg-orange-500/20 text-orange-400'
                              : 'bg-green-500/20 text-green-400'
                          }`}>
                            {allowance.risk.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">{allowance.token}</span>
                          <span className={`text-sm font-medium ${
                            allowance.amount === 'Unlimited' ? 'text-yellow-400' : 'text-gray-300'
                          }`}>
                            {allowance.amount}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Selected Allowance Details */}
                  {selectedAllowance && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-950 border border-gray-800 rounded-xl p-4 mb-6"
                    >
                      {(() => {
                        const selected = allowances.find(a => a.id === selectedAllowance);
                        if (!selected) return null;
                        return (
                          <>
                            <h4 className="text-sm font-medium text-white mb-3">Allowance Details</h4>
                            <div className="space-y-2 text-xs mb-4">
                              <div className="flex justify-between">
                                <span className="text-gray-500">Protocol</span>
                                <span className="text-gray-300">{selected.protocol}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Contract</span>
                                <span className="text-gray-300 font-mono">{selected.address}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Token</span>
                                <span className="text-gray-300">{selected.token}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Current Allowance</span>
                                <span className={selected.amount === 'Unlimited' ? 'text-yellow-400' : 'text-gray-300'}>
                                  {selected.amount}
                                </span>
                              </div>
                            </div>

                            {selected.risk === 'critical' && (
                              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-3">
                                <p className="text-xs text-red-400 flex items-center gap-2">
                                  <AlertTriangle className="w-4 h-4" />
                                  Unknown contract with unlimited access - HIGH RISK
                                </p>
                              </div>
                            )}

                            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mb-4">
                              <p className="text-xs text-blue-400 mb-2">💡 Revoke Cost</p>
                              <p className="text-xs text-gray-400">
                                Revoking approval requires a transaction. Gas fee: ~$1.50
                              </p>
                            </div>

                            {!revoking ? (
                              <Web3Button
                                onClick={handleRevoke}
                                variant="outline"
                                className="w-full border-red-500 text-red-400 hover:bg-red-500/10"
                              >
                                Revoke Approval
                              </Web3Button>
                            ) : (
                              <div className="text-center py-4">
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                  className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-2"
                                />
                                <p className="text-sm text-gray-400">Revoking approval...</p>
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </motion.div>
                  )}

                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                    <p className="text-sm text-purple-400 font-medium mb-2">🎓 Expert Practice</p>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      Approvals are invisible risks. Experts monitor and revoke regularly using tools like Revoke.cash. 
                      Always revoke unlimited approvals for contracts you no longer use.
                    </p>
                  </div>
                </Web3Card>

                {showReward && (
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
                        <h3 className="text-xl font-bold text-green-400 mb-2">Approval Revoked!</h3>
                        <p className="text-sm text-gray-400">
                          The risky allowance has been removed from your wallet
                        </p>
                      </div>

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
                          <h3 className="text-2xl font-bold text-white mb-2">+700 XP</h3>
                          <p className="text-sm text-orange-400 mb-1">Permission Master</p>
                          <p className="text-xs text-gray-500">You understand allowance management</p>
                        </div>
                      </Web3Card>

                      <Web3Button onClick={onComplete} className="w-full">
                        Complete Lesson
                        <ArrowRight className="w-5 h-5 ml-2 inline" />
                      </Web3Button>
                    </Web3Card>
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
