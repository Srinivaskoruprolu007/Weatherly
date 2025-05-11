import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn(
    'VITE_GEMINI_API_KEY is not set. Chat functionality will be limited. Please create a .env file in the root of your project and add VITE_GEMINI_API_KEY=YOUR_API_KEY'
  );
}

const genAI = new GoogleGenerativeAI(apiKey || "");

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

export interface GeminiResponse {
  text: string;
  // Add other relevant fields from the Gemini API response
}

/**
 * Sends a message to the Gemini API and returns the response.
 * @param message The user's message string.
 * @returns A promise that resolves to the Gemini API's response.
 */
export const sendMessageToGemini = async (message: string, weatherContext?: string): Promise<string> => {
  if (!apiKey) {
    console.error("Gemini API key is not configured.");
    return "AI service is not configured. Please check the API key.";
  }

  const fullMessage = weatherContext ? `Weather Information: ${weatherContext}\n\nUser's question: ${message}` : message;
  console.log("Sending message to Gemini with context:", fullMessage);

  try {
    const chatSession = model.startChat({
      generationConfig,
      safetySettings,
      history: [], // You can manage chat history here if needed
    });

    const result = await chatSession.sendMessage(fullMessage);
    const botText = result.response.text();
    console.log("Received response from Gemini:", botText);
    return botText;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
        return "The Gemini API key is not valid. Please check your .env file.";
    }
    return "Sorry, I encountered an error while trying to connect to the AI. Please try again later.";
  }
};
