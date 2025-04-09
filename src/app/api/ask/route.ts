import { NextResponse } from 'next/server';

// Predefined responses for different types of queries
const responses = {
  greeting: [
    "Hello! How can I assist you today?",
    "Hi there! What can I help you with?",
    "Greetings! How may I be of service?"
  ],
  farewell: [
    "Goodbye! Have a great day!",
    "See you later! Feel free to ask if you need anything else.",
    "Take care! I'm here if you need assistance in the future."
  ],
  weather: [
    "I don't have real-time weather data, but I can suggest checking a weather app or website for accurate information.",
    "Weather forecasts change frequently. Consider checking a dedicated weather service for the most current information."
  ],
  help: [
    "I can answer questions, provide information, or just chat. What would you like to know?",
    "I'm here to assist with information and conversation. How can I help you specifically?"
  ],
  unknown: [
    "I'm not sure I understand. Could you rephrase that?",
    "I don't have information about that. Could I help with something else?",
    "I don't have a specific answer for that query. Is there another way I can assist you?"
  ]
};

// Function to find the appropriate response category
function findResponseCategory(message: string): keyof typeof responses {
  message = message.toLowerCase();
  
  if (message.match(/\b(hi|hello|hey|greetings)\b/)) {
    return 'greeting';
  }
  if (message.match(/\b(bye|goodbye|see you|farewell)\b/)) {
    return 'farewell';
  }
  if (message.match(/\b(weather|temperature|forecast|rain|snow)\b/)) {
    return 'weather';
  }
  if (message.match(/\b(help|assist|support|what can you do)\b/)) {
    return 'help';
  }
  
  return 'unknown';
}

function getResponse(category: keyof typeof responses, message: string): string {
  const options = responses[category];

  const charSum = message.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const index = charSum % options.length;
  return options[index];
}

// Next.js App Router API route handler
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request: message is required' },
        { status: 400 }
      );
    }

    const category = findResponseCategory(message);
    const response = getResponse(category, message);
    
    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error generating response:', error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}
