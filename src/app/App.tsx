import React, { useState } from 'react';
import { SandboxEntry } from './components/screens/SandboxEntry';
import { SandboxDashboard } from './components/screens/SandboxDashboard';
import { TransactionSimulator } from './components/screens/TransactionSimulator';
import { SuccessScreen } from './components/screens/SuccessScreen';
import { Lesson1 } from './components/screens/Lesson1';
import { Lesson2 } from './components/screens/Lesson2';
import { Lesson3 } from './components/screens/Lesson3';
import { Lesson4 } from './components/screens/Lesson4';
import { Lesson5 } from './components/screens/Lesson5';
import { Lesson6 } from './components/screens/Lesson6';
import { SendTokensLesson } from './components/screens/SendTokensLesson';
import { InteractDappLesson } from './components/screens/InteractDappLesson';
import { ApproveContractLesson } from './components/screens/ApproveContractLesson';

type Screen = 'entry' | 'dashboard' | 'simulator' | 'success' | 'lesson1' | 'lesson2' | 'lesson3' | 'lesson4' | 'lesson5' | 'lesson6' | 'lessons-complete' | 'send-tokens' | 'interact-dapp' | 'approve-contract';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('entry');

  const handleStart = () => {
    setCurrentScreen('dashboard');
  };

  const handleSelectAction = (action: string) => {
    // Route to appropriate screen based on action
    if (action === 'lessons') {
      setCurrentScreen('lesson1');
    } else if (action === 'send') {
      setCurrentScreen('send-tokens');
    } else if (action === 'interact') {
      setCurrentScreen('interact-dapp');
    } else if (action === 'approve') {
      setCurrentScreen('approve-contract');
    } else {
      setCurrentScreen('simulator');
    }
  };

  const handleComplete = () => {
    setCurrentScreen('success');
  };

  const handleExplore = () => {
    // In a real app, this would navigate to the ecosystem page
    alert('Navigating to Arbitrum Ecosystem...');
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
  };

  const handleBackToEntry = () => {
    setCurrentScreen('entry');
  };

  // Lesson navigation handlers
  const handleLesson1Continue = () => {
    setCurrentScreen('lesson2');
  };

  const handleLesson2Continue = () => {
    setCurrentScreen('lesson3');
  };

  const handleLesson3Complete = () => {
    setCurrentScreen('lesson4');
  };

  const handleLesson4Continue = () => {
    setCurrentScreen('lesson5');
  };

  const handleLesson5Continue = () => {
    setCurrentScreen('lesson6');
  };

  const handleLesson6Complete = () => {
    setCurrentScreen('lessons-complete');
  };

  const handleLessonsCompleteExplore = () => {
    setCurrentScreen('dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {currentScreen === 'entry' && (
        <SandboxEntry onStart={handleStart} />
      )}
      
      {currentScreen === 'dashboard' && (
        <SandboxDashboard 
          onSelectAction={handleSelectAction} 
          onBack={handleBackToEntry}
        />
      )}
      
      {currentScreen === 'simulator' && (
        <TransactionSimulator 
          onComplete={handleComplete} 
          onBack={handleBackToDashboard}
        />
      )}
      
      {currentScreen === 'success' && (
        <SuccessScreen 
          onExplore={handleExplore} 
          onBack={handleBackToDashboard}
        />
      )}

      {currentScreen === 'lesson1' && (
        <Lesson1
          onContinue={handleLesson1Continue}
          onBack={handleBackToDashboard}
        />
      )}

      {currentScreen === 'lesson2' && (
        <Lesson2
          onContinue={handleLesson2Continue}
          onBack={handleBackToDashboard}
        />
      )}

      {currentScreen === 'lesson3' && (
        <Lesson3
          onComplete={handleLesson3Complete}
          onBack={handleBackToDashboard}
        />
      )}

      {currentScreen === 'lesson4' && (
        <Lesson4
          onContinue={handleLesson4Continue}
          onBack={handleBackToDashboard}
        />
      )}

      {currentScreen === 'lesson5' && (
        <Lesson5
          onContinue={handleLesson5Continue}
          onBack={handleBackToDashboard}
        />
      )}

      {currentScreen === 'lesson6' && (
        <Lesson6
          onComplete={handleLesson6Complete}
          onBack={handleBackToDashboard}
        />
      )}

      {currentScreen === 'send-tokens' && (
        <SendTokensLesson
          onComplete={handleBackToDashboard}
          onBack={handleBackToDashboard}
        />
      )}

      {currentScreen === 'interact-dapp' && (
        <InteractDappLesson
          onComplete={handleBackToDashboard}
          onBack={handleBackToDashboard}
        />
      )}

      {currentScreen === 'approve-contract' && (
        <ApproveContractLesson
          onComplete={handleBackToDashboard}
          onBack={handleBackToDashboard}
        />
      )}

      {currentScreen === 'lessons-complete' && (
        <SuccessScreen 
          onExplore={handleLessonsCompleteExplore} 
          onBack={handleBackToDashboard}
        />
      )}
    </div>
  );
}