import React, { useState } from "react";
import { MessageSquare } from "lucide-react";
import ChatWindow from './ChatWindow';

interface ChatBubbleProps {
  currentWeatherData?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ currentWeatherData }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-8 right-8 bg-sky-500 hover:bg-sky-600 text-white p-4 rounded-full shadow-lg z-50 transition-transform duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
        aria-label="Toggle chat"
      >
        <MessageSquare size={28} />
      </button>
      {isChatOpen && <ChatWindow onClose={toggleChat} currentWeatherData={currentWeatherData} />}
    </>
  );
};

export default ChatBubble;
