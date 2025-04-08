import type { NextApiRequest, NextApiResponse } from 'next';

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

// Get a deterministic response based on the input message
function getResponse(category: keyof typeof responses, message: string): string {
  const options = responses[category];
  // Use the sum of char codes in the message to select a response
  // This ensures the same input always gets the same response
  const charSum = message.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const index = charSum % options.length;
  return options[index];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Invalid request: message is required' });
  }

  try {
    // Find appropriate response based on message content
    const category = findResponseCategory(message);
    const response = getResponse(category, message);
    
    return res.status(200).json({ response });
  } catch (error) {
    console.error('Error generating response:', error);
    return res.status(500).json({ error: 'Failed to generate response' });
  }
}
