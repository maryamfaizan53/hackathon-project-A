// src/components/HomepageFeatures/ChatKitPanel.tsx
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

type Props = {
  selectedText?: string | null;
  onThreadChange: (id: string | null) => void;
  onResponseCompleted: () => void;
};

type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
};

// Get backend URL from window config or use default
const getApiUrl = () => {
  if (typeof window === 'undefined') return 'http://localhost:8000';
  if ((window as any).BACKEND_API_URL) {
    return (window as any).BACKEND_API_URL;
  }
  return 'http://localhost:8000';
};

const API_URL = getApiUrl();


export default function ChatKitPanel({ selectedText, onThreadChange, onResponseCompleted }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '👋 Hello! I am your AI assistant for Physical AI & Humanoid Robotics. How can I help you today?',
      timestamp: Date.now()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle selected text
  useEffect(() => {
    if (selectedText) {
      setInputValue(`Explain this: "${selectedText}"`);
    }
  }, [selectedText]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: userMessage.content,
          selected_text: selectedText || null
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      const aiContent = data.choices?.[0]?.message?.content || "I couldn't generate a response.";

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiContent,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, aiMessage]);
      onResponseCompleted();
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: "⚠️ Connection error. Please check if the backend is running or try again in a moment.",
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="chat-interface"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95))',
        backdropFilter: 'blur(20px)',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Messages Area */}
      <div
        className="chat-messages"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          background: 'transparent',
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={clsx('message', msg.role)}
            style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              animation: 'messageSlideIn 0.3s ease-out',
            }}
          >
            <div
              style={{
                maxWidth: '80%',
                padding: '12px 16px',
                borderRadius: '16px',
                fontSize: '14px',
                lineHeight: '1.6',
                boxShadow: msg.role === 'user'
                  ? '0 4px 12px rgba(139, 92, 246, 0.4)'
                  : '0 4px 12px rgba(0, 0, 0, 0.2)',
                background: msg.role === 'user'
                  ? 'linear-gradient(135deg, #8b5cf6, #6366f1)'
                  : msg.role === 'system'
                    ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.2))'
                    : 'linear-gradient(135deg, rgba(51, 65, 85, 0.9), rgba(30, 41, 59, 0.9))',
                color: msg.role === 'user'
                  ? '#ffffff'
                  : msg.role === 'system'
                    ? '#fca5a5'
                    : '#e2e8f0',
                borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
                borderBottomLeftRadius: msg.role === 'assistant' ? '4px' : '16px',
                border: msg.role === 'user'
                  ? '1px solid rgba(255, 255, 255, 0.2)'
                  : '1px solid rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s ease',
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div
              style={{
                padding: '12px 16px',
                borderRadius: '16px',
                borderBottomLeftRadius: '4px',
                background: 'linear-gradient(135deg, rgba(51, 65, 85, 0.9), rgba(30, 41, 59, 0.9))',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
              }}
            >
              <div className="typing-dots">
                <span style={dotStyle}>•</span>
                <span style={{ ...dotStyle, animationDelay: '0.2s' }}>•</span>
                <span style={{ ...dotStyle, animationDelay: '0.4s' }}>•</span>
              </div>
              <span style={{ color: '#94a3b8', fontSize: '14px' }}>AI is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSendMessage}
        style={{
          padding: '16px',
          borderTop: '1px solid rgba(99, 102, 241, 0.2)',
          display: 'flex',
          gap: '12px',
          background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.5), rgba(15, 23, 42, 0.8))',
          backdropFilter: 'blur(10px)',
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: '24px',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            background: 'rgba(30, 41, 59, 0.6)',
            color: '#e2e8f0',
            fontSize: '14px',
            outline: 'none',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(10px)',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#8b5cf6';
            e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(99, 102, 241, 0.3)';
            e.target.style.boxShadow = 'none';
          }}
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: 'none',
            background: inputValue.trim() && !isLoading
              ? 'linear-gradient(135deg, #8b5cf6, #6366f1)'
              : 'rgba(71, 85, 105, 0.5)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isLoading || !inputValue.trim() ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: inputValue.trim() && !isLoading
              ? '0 4px 12px rgba(139, 92, 246, 0.4)'
              : 'none',
            transform: 'scale(1)',
          }}
          onMouseEnter={(e) => {
            if (inputValue.trim() && !isLoading) {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.6)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = inputValue.trim() && !isLoading
              ? '0 4px 12px rgba(139, 92, 246, 0.4)'
              : 'none';
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>

      <style>{`
        @keyframes messageSlideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes typingDot {
          0%, 60%, 100% {
            opacity: 0.3;
            transform: translateY(0);
          }
          30% {
            opacity: 1;
            transform: translateY(-8px);
          }
        }
        
        .chat-messages::-webkit-scrollbar {
          width: 6px;
        }
        
        .chat-messages::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.3);
          border-radius: 10px;
        }
        
        .chat-messages::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #8b5cf6, #6366f1);
          border-radius: 10px;
        }
        
        .chat-messages::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #7c3aed, #4f46e5);
        }
      `}</style>
    </div>
  );
}

const dotStyle: React.CSSProperties = {
  display: 'inline-block',
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: '#8b5cf6',
  animation: 'typingDot 1.4s infinite',
  marginRight: '4px',
};