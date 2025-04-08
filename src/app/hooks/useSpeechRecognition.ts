// Define the SpeechRecognition interfaces
interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message?: string;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  start(): void;
  stop(): void;
}

interface SpeechRecognitionConstructor {
  new(): SpeechRecognition;
}

// Extend the Window interface to include SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

export const useSpeechRecognition = (
  onResult: (text: string) => void
): { start: () => void; stop: () => void; isSupported: boolean } => {
  if (typeof window === 'undefined') 
    return { start: () => {}, stop: () => {}, isSupported: false };
  
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    console.warn('SpeechRecognition API is not supported in this browser');
    return { start: () => {}, stop: () => {}, isSupported: false };
  }
  
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';
  
  recognition.onresult = (event: SpeechRecognitionEvent) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };
  
  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    console.error('Speech recognition error:', event.error);
  };
  
  return {
    start: () => {
      try {
        recognition.start();
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
      }
    },
    stop: () => {
      try {
        recognition.stop();
      } catch (error) {
        console.error('Failed to stop speech recognition:', error);
      }
    },
    isSupported: true
  };
};
