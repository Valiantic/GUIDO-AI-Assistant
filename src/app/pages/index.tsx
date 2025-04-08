"use client";

import { useState } from 'react';
import PushToTalk from '../components/PushToTalk';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { speak } from '../utils/speak';

export default function Home() {
  const [message, setMessage] = useState('');
  const [listening, setListening] = useState(false);
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { start, stop, isSupported } = useSpeechRecognition(async (text: string) => {
    setMessage(text);
    setIsLoading(true);
    
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      setResponse(data.response);
      speak(data.response);
    } catch (error) {
      console.error('Error processing request:', error);
      setResponse('Sorry, there was an error processing your request.');
    } finally {
      setIsLoading(false);
    }
  });

  const handleStart = () => {
    setListening(true);
    start();
  };

  const handleStop = () => {
    setListening(false);
    stop();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6 bg-gray-50 text-center p-4">
      <h1 className="text-7xl text-black font-bold">GUIDO</h1>
      
      {!isSupported ? (
        <p className="text-red-500">Speech recognition is not supported in your browser.</p>
      ) : (
        <PushToTalk 
          onStart={handleStart} 
          onStop={handleStop} 
          listening={listening} 
          assistantResponding={isLoading}
        />
      )}
      
      {message && <p className="text-lg text-gray-600">You said: "{message}"</p>}
      
      {isLoading && <p className="text-lg">Thinking...</p>}
      
      {response && <p className="text-lg text-green-600">GUIDO: "{response}"</p>}
    </div>
  );
}
