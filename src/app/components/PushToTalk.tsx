"use client";

import React from 'react';

interface PushToTalkProps {
  onStart: () => void;
  onStop: () => void;
  listening: boolean;
}

const PushToTalk: React.FC<PushToTalkProps> = ({ onStart, onStop, listening }) => {
  const handleToggle = () => {
    if (listening) {
      onStop();
    } else {
      onStart();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className={`w-24 h-24 rounded-full flex items-center justify-center text-white shadow-lg transition-all ${
          listening ? 'bg-red-500 scale-110' : 'bg-blue-500 hover:bg-blue-600'
        }`}
        onClick={handleToggle}
      >
        {listening ? (
          <span className="animate-pulse">Listening...</span>
        ) : (
          <span>Click to Talk</span>
        )}
      </button>
      <p className="mt-3 text-sm text-gray-500">
        {listening ? 'Click again when finished' : 'Click to start speaking'}
      </p>
    </div>
  );
};

export default PushToTalk;
