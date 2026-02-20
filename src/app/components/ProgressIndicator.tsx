import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  showLabels?: boolean;
}

export function ProgressIndicator({ currentStep, totalSteps, showLabels = false }: ProgressIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full">
      {showLabels && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Progress</span>
          <span className="text-sm font-medium text-gray-300">{currentStep}/{totalSteps}</span>
        </div>
      )}
      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
