"use client";

import React, { useEffect } from 'react';

interface PushToTalkProps {
  onStart: () => void;
  onStop: () => void;
  listening: boolean;
  assistantResponding?: boolean;
  isSupported?: boolean;
}

const PushToTalk: React.FC<PushToTalkProps> = ({ 
  onStart, 
  onStop, 
  listening, 
  assistantResponding = false,
  isSupported = true
}) => {
  const handleToggle = () => {
    if (listening) {
      onStop();
    } else {
      onStart();
    }
  };

  useEffect(() => {
    if (assistantResponding && listening) {
      onStop();
    }
  }, [assistantResponding, listening, onStop]);

  return (
    <div className="flex flex-col items-center">
      <div className={`rounded-full ${listening && !assistantResponding ? 'animate-pulse bg-red-300 p-2' : 'p-0'}`}>
        <button
          className={`p-1 w-24 h-24 rounded-full flex items-center justify-center text-white shadow-lg transition-all ${
            !isSupported ? 'bg-gray-400' :
            listening && !assistantResponding ? 'bg-red-500 scale-110' : 'bg-blue-500 hover:bg-blue-600'
          }`}
          onClick={handleToggle}
          disabled={assistantResponding || !isSupported}
        >
          {listening && !assistantResponding ? (
            <span className="animate-pulse">Listening...</span>
          ) : (
            <span>Push to Talk</span>
          )}
        </button>
      </div>
      <p className="mt-3 text-sm text-gray-500">
        {!isSupported ? 'Speech recognition unavailable' :
          assistantResponding 
            ? 'Please wait...' 
            : (listening ? 'Push again when finished' : 'Click to start speaking')}
      </p>
    </div>
  );
};

export default PushToTalk;
