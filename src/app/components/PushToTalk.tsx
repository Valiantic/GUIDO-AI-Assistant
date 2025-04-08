"use client";

import React from 'react';

interface PushToTalkProps {
  onStart: () => void;
  onStop: () => void;
  listening: boolean;
}

const PushToTalk: React.FC<PushToTalkProps> = ({ onStart, onStop, listening }) => {
  return (
    <div className="flex flex-col items-center">
      <button
        className={`w-24 h-24 rounded-full flex items-center justify-center text-white shadow-lg transition-all ${
          listening ? 'bg-red-500 scale-110' : 'bg-blue-500 hover:bg-blue-600'
        }`}
        onMouseDown={onStart}
        onMouseUp={onStop}
        onMouseLeave={listening ? onStop : undefined}
        onTouchStart={onStart}
        onTouchEnd={onStop}
      >
        {listening ? (
          <span className="animate-pulse">Listening...</span>
        ) : (
          <span>Hold to Talk</span>
        )}
      </button>
      <p className="mt-3 text-sm text-gray-500">
        {listening ? 'Release when finished' : 'Press and hold to speak'}
      </p>
    </div>
  );
};

export default PushToTalk;
