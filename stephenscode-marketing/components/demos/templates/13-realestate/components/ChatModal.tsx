import React, { useEffect, useRef, useState } from 'react';
import { X, Send, Building2 } from 'lucide-react';

interface ChatMessage {
  from: 'user' | 'agent';
  text: string;
}

interface ChatModalProps {
  open: boolean;
  onClose: () => void;
}

const AGENT_REPLIES = [
  'Happy to help with that! Are you looking to buy, sell, or just exploring the market right now?',
  'Great question. I can pull specifics from one of our agents. Could you share your email or phone so we can follow up with details?',
  'Perfect, I have noted that. Would you like me to set up a free consultation with one of our agents this week?',
  'You can also reach us anytime at (555) 123-4567 or info@skylinerealty.com. Is there anything else I can help you with today?',
];

const ChatModal: React.FC<ChatModalProps> = ({ open, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      from: 'agent',
      text: 'Hi there! Welcome to Skyline Realty Group. How can we help you with your real estate goals today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [agentTyping, setAgentTyping] = useState(false);
  const replyIndexRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, agentTyping]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!open) return null;

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { from: 'user', text }]);
    setInput('');
    setAgentTyping(true);
    const reply = AGENT_REPLIES[Math.min(replyIndexRef.current, AGENT_REPLIES.length - 1)];
    replyIndexRef.current += 1;
    timeoutRef.current = setTimeout(() => {
      setAgentTyping(false);
      setMessages((prev) => [...prev, { from: 'agent', text: reply }]);
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-end sm:items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md flex flex-col h-[520px] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#000814] text-white rounded-t-xl p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-[#ffc300] p-2 rounded-full mr-3">
              <Building2 className="w-5 h-5 text-[#000814]" />
            </div>
            <div>
              <div className="font-bold">Skyline Support</div>
              <div className="text-xs text-green-400 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-1 inline-block" />
                Online now
              </div>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close chat" className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                  msg.from === 'user'
                    ? 'bg-[#000814] text-white rounded-br-sm'
                    : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {agentTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-sm">
                <span className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:120ms]" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:240ms]" />
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={sendMessage} className="p-4 border-t flex gap-2">
          <input
            type="text"
            aria-label="Chat message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ffc300] focus:border-transparent"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="bg-[#ffc300] text-[#000814] px-4 rounded-lg font-semibold hover:bg-[#ffcd1a] transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatModal;
