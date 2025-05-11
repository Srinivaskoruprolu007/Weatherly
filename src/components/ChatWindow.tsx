import React, { useState, useRef, useEffect } from "react";
import { Send, X, Bot, User } from "lucide-react";
import { sendMessageToGemini } from '@/services/geminiService';

interface ChatWindowProps {
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const botResponse = await sendMessageToGemini(userMessage.text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }


  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-40 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md flex flex-col h-[70vh] max-h-[600px]">
        <header className="bg-sky-500 text-white p-4 flex justify-between items-center rounded-t-lg">
          <h2 className="text-xl font-semibold flex items-center">
            <Bot size={24} className="mr-2" /> Weatherly Assistant
          </h2>
          <button
            onClick={onClose}
            className="hover:bg-sky-600 p-2 rounded-full"
          >
            <X size={24} />
          </button>
        </header>

        <div className="flex-1 p-4 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-sky-500/40 scrollbar-track-transparent">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-sky-500 text-white rounded-br-none"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none"
                }`}
              >
                {msg.sender === "bot" && (
                  <Bot size={18} className="inline-block mr-1 mb-0.5" />
                )}
                {msg.text}
                {msg.sender === "user" && (
                  <User size={18} className="inline-block ml-1 mb-0.5" />
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[70%] p-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none flex items-center">
                <Bot size={18} className="inline-block mr-2" />
                <span className="italic">Typing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} /> {/* For auto-scrolling */}
        </div>

        <footer className="p-4 border-t dark:border-gray-700">
          <div className="flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && !isLoading && handleSendMessage()
              }
              placeholder="Ask about weather, forecasts, or travel..."
              className="flex-1 p-3 border rounded-l-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="bg-sky-500 text-white p-3 rounded-r-lg hover:bg-sky-600 disabled:bg-sky-300 flex items-center justify-center w-16 h-[50px]"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <Send size={24} />
              )}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ChatWindow;
