// src/context/ChatContext.tsx
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface ChatContextType {
  isOpen: boolean;
  hasOpenedOnce: boolean;
  showPopup: boolean;
  threadId: string | null;
  selectedText: string | null;
  toggleChat: () => void;
  setShowPopup: (show: boolean) => void;
  handleThreadChange: (id: string | null) => void;
  handleResponseCompleted: () => void;
  setSelectedText: (text: string | null) => void;
  openChatWithSelection: (text: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [selectedText, setSelectedText] = useState<string | null>(null);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => {
      const newState = !prev;
      if (newState && !hasOpenedOnce) {
        setHasOpenedOnce(true);
        setShowPopup(false);
      }
      // Clear selected text when closing
      if (!newState) {
        setSelectedText(null);
      }
      return newState;
    });
  }, [hasOpenedOnce]);

  const openChatWithSelection = useCallback((text: string) => {
    setSelectedText(text);
    if (!hasOpenedOnce) {
      setHasOpenedOnce(true);
      setShowPopup(false);
    }
    setIsOpen(true);
  }, [hasOpenedOnce]);

  const handleThreadChange = useCallback((id: string | null) => {
    console.log('🔄 Thread ID updated:', id);
    setThreadId(id);
  }, []);

  const handleResponseCompleted = useCallback(() => {
    console.log('✅ Response completed for thread:', threadId);
  }, [threadId]);

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        hasOpenedOnce,
        showPopup,
        threadId,
        selectedText,
        toggleChat,
        setShowPopup,
        handleThreadChange,
        handleResponseCompleted,
        setSelectedText,
        openChatWithSelection,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within ChatProvider');
  }
  return context;
}