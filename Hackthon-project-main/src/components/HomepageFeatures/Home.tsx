// src/components/HomepageFeatures/Home.tsx

import React, { useEffect } from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import { useChatContext } from "@site/src/context/ChatKitContext";
import '../../../src/css/chatkit-custom.css';

export default function MainHome() {
  const {
    isOpen,
    hasOpenedOnce,
    showPopup,
    selectedText,
    toggleChat,
    setShowPopup,
    handleThreadChange,
    handleResponseCompleted,
    openChatWithSelection,
    setSelectedText
  } = useChatContext();

  const [showSelectionButton, setShowSelectionButton] = React.useState(false);
  const [selectionPosition, setSelectionPosition] = React.useState({ x: 0, y: 0 });
  const [currentSelection, setCurrentSelection] = React.useState("");

  // Handle text selection
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();

      if (text && text.length > 0) {
        const range = selection?.getRangeAt(0);
        const rect = range?.getBoundingClientRect();

        if (rect) {
          setCurrentSelection(text);
          setSelectionPosition({
            x: rect.left + rect.width / 2,
            y: rect.top - 10,
          });
          setShowSelectionButton(true);
        }
      } else {
        setShowSelectionButton(false);
      }
    };

    document.addEventListener("mouseup", handleSelection);
    document.addEventListener("selectionchange", handleSelection);

    return () => {
      document.removeEventListener("mouseup", handleSelection);
      document.removeEventListener("selectionchange", handleSelection);
    };
  }, []);

  const handleAskAboutSelection = () => {
    if (currentSelection) {
      openChatWithSelection(currentSelection);
      setShowSelectionButton(false);
    }
  };

  return (
    <>
      {/* Unified Chat Trigger - Pill Design */}
      {!isOpen && (
        <div
          className={`chatkit-unified-trigger ${showPopup ? 'extended' : ''}`}
          onClick={toggleChat}
        >
          <div className="chatkit-trigger-icon-wrapper">
            <svg
              className="chatkit-fab-icon"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>

          {showPopup && (
            <>
              <div className="chatkit-trigger-text">How can I help you?</div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPopup(false);
                }}
                className="chatkit-trigger-close-button"
              >
                ×
              </button>
            </>
          )}
        </div>
      )}

      {/* Minimized Toggle Button (Only shown when popup closed but chat closed) */}
      {!showPopup && !isOpen && (
        /* This state is covered by the unified trigger in non-extended mode */
        null
      )}

      {/* Close Button when Chat is Open */}
      {isOpen && (
        <div onClick={toggleChat} className="chatkit-toggle-button close-mode">
          <svg
            className="chatkit-fab-icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
      )}

      {/* Chat Window */}
      {hasOpenedOnce && (
        <div className={`chatkit-container ${isOpen ? "open" : "closed"}`}>
          {/* Chat Header */}
          <div className="chatkit-header">
            <span>Physical AI & Humanoid Robotics Assistant</span>
            <button onClick={toggleChat} className="chatkit-close-button">
              ×
            </button>
          </div>

          {/* Selected Text Preview */}
          {selectedText && (
            <div className="chatkit-selected-text-preview">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="chatkit-selected-text-icon"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>

              <div className="chatkit-selected-text-content-wrapper">
                <div className="chatkit-selected-text-label">Selected text:</div>
                <div className="chatkit-selected-text-content">"{selectedText}"</div>
              </div>

              <button
                onClick={() => setSelectedText(null)}
                className="chatkit-selected-text-close-button"
              >
                ×
              </button>
            </div>
          )}

          {/* Chat Content */}
          <div className="chatkit-body">
            <BrowserOnly
              fallback={
                <div className="chatkit-loading-fallback">
                  <div className="chatkit-loading-spinner" />
                  <div className="chatkit-loading-text">Loading chat...</div>
                </div>
              }
            >
              {() => {
                try {
                  const ChatKitPanel =
                    require("../HomepageFeatures/ChatKitPanel").default;
                  return (
                    <ChatKitPanel
                      selectedText={selectedText}
                      onThreadChange={handleThreadChange}
                      onResponseCompleted={handleResponseCompleted}
                    />
                  );
                } catch (err: any) {
                  console.error("❌ Error loading ChatKitPanel:", err);
                  return (
                    <div className="chatkit-error-fallback">
                      <svg
                        className="chatkit-error-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>

                      <div>
                        <div className="chatkit-error-title">Failed to load chat</div>
                        <div className="chatkit-error-message">{err.message}</div>
                      </div>
                    </div>
                  );
                }
              }}
            </BrowserOnly>
          </div>
        </div>
      )}
    </>
  );
}
