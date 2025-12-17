# Quickstart Guide: Integrated AI Chatbot

This guide provides the necessary steps to quickly get the Integrated AI Chatbot feature running within the Docusaurus frontend.

## 1. Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- An existing Docusaurus project setup

## 2. Clone ChatKit Advanced Samples

The core components for the chatbot are sourced from the OpenAI ChatKit Advanced Samples.

```bash
git clone https://github.com/openai/openai-chatkit-advanced-samples.git
```

## 3. Copy Chatbot Components

Copy the required `ChatKitPanel.tsx` and `Home.tsx` components from the cloned repository into your Docusaurus project's `frontend/src/components/` directory.

```bash
# Assuming you are in your Docusaurus project root
cp openai-chatkit-advanced-samples/examples/customer-support/frontend/src/components/ChatKitPanel.tsx frontend/src/components/
cp openai-chatkit-advanced-samples/examples/customer-support/frontend/src/components/Home.tsx frontend/src/components/
```

## 4. Install Dependencies

Install the `@openai/chatkit` package in your Docusaurus project.

```bash
cd frontend
npm install @openai/chatkit
# or yarn add @openai/chatkit
cd ..
```

## 5. Implement Custom Styling

Create a new CSS file for the chatbot's custom red and black theme.

Create `frontend/src/css/chatkit-custom.css` with the following content:

```css
/* ChatKit Custom Styling - Red & Black Theme */
.chatkit-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
  width: 400px;
  max-width: 90vw;
  box-shadow: 0 8px 32px rgba(255, 0, 0, 0.3);
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(145deg, #1a1a1a, #000000);
  border: 2px solid #ff0000;
}

.chatkit-header {
  background: linear-gradient(90deg, #ff0000, #cc0000);
  color: white;
  padding: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.chatkit-header h3 {
  margin: 0;
  font-size: 18px;
  color: #ffffff;
}

.chatkit-body {
  background: #0d0d0d;
  color: #e0e0e0;
  padding: 16px;
  max-height: 500px;
  overflow-y: auto;
}

.chatkit-message-user {
  background: #ff0000;
  color: white;
  padding: 10px 14px;
  border-radius: 12px;
  margin: 8px 0;
  align-self: flex-end;
  max-width: 70%;
}

.chatkit-message-bot {
  background: #1a1a1a;
  color: #e0e0e0;
  padding: 10px 14px;
  border-radius: 12px;
  margin: 8px 0;
  border: 1px solid #ff0000;
  max-width: 70%;
}

.chatkit-input {
  background: #1a1a1a;
  border: 2px solid #ff0000;
  color: white;
  padding: 12px;
  border-radius: 8px;
  width: 100%;
  outline: none;
  transition: border-color 0.3s;
}

.chatkit-input:focus {
  border-color: #ff3333;
}

.chatkit-send-button {
  background: linear-gradient(90deg, #ff0000, #cc0000);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.2s;
}

.chatkit-send-button:hover {
  transform: scale(1.05);
  background: linear-gradient(90deg, #ff3333, #ff0000);
}

.chatkit-toggle-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff0000, #cc0000);
  border: 3px solid #000;
  box-shadow: 0 4px 16px rgba(255, 0, 0, 0.5);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9998;
  transition: transform 0.3s;
}

.chatkit-toggle-button:hover {
  transform: scale(1.1);
}

/* Scrollbar styling */
.chatkit-body::-webkit-scrollbar {
  width: 8px;
}

.chatkit-body::-webkit-scrollbar-track {
  background: #000000;
}

.chatkit-body::-webkit-scrollbar-thumb {
  background: #ff0000;
  border-radius: 4px;
}
```

## 6. Update `Home.tsx` for SSR Compatibility and Context

Modify `frontend/src/components/Home.tsx` to include `BrowserOnly` for SSR compatibility and integrate `ChatKitContext`.

```tsx
import React, { useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { useChatKit } from '../context/ChatKitContext'; // Assuming context is created

export default function Home() {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => {
        const ChatKitPanel = require('./ChatKitPanel').default;
        return <ChatKitPanelWrapper />;
      }}
    </BrowserOnly>
  );
}

function ChatKitPanelWrapper() {
  const { isChatOpen, setIsChatOpen, isInitialized, setIsInitialized } = useChatKit();

  useEffect(() => {
    if (!isInitialized && isChatOpen) {
      import('@openai/chatkit').then((module) => {
        // Here you would initialize ChatKit, e.g., with API keys and other configs
        // For now, we just mark it as initialized.
        setIsInitialized(true);
      }).catch(error => console.error("Failed to load ChatKit:", error));
    }
  }, [isChatOpen, isInitialized, setIsInitialized]);

  return (
    <>
      <button 
        className="chatkit-toggle-button"
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        💬
      </button>
      {isChatOpen && <ChatKitPanel />}
    </>
  );
}
```

## 7. Create ChatKit Context

Create a new file `frontend/src/context/ChatKitContext.tsx` for state management.

```tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ChatKitContextType {
  isChatOpen: boolean;
  setIsChatOpen: (isOpen: boolean) => void;
  isInitialized: boolean;
  setIsInitialized: (initialized: boolean) => void;
}

const ChatKitContext = createContext<ChatKitContextType | undefined>(undefined);

export const ChatKitProvider = ({ children }: { children: ReactNode }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  return (
    <ChatKitContext.Provider 
      value={{ isChatOpen, setIsChatOpen, isInitialized, setIsInitialized }}
    >
      {children}
    </ChatKitContext.Provider>
  );
};

export const useChatKit = () => {
  const context = useContext(ChatKitContext);
  if (!context) {
    throw new Error('useChatKit must be used within ChatKitProvider');
  }
  return context;
};
```

## 8. Integrate Context with Docusaurus Root

Create `frontend/src/theme/Root.tsx` (if it doesn't exist) and wrap the application with `ChatKitProvider`.

```tsx
import React from 'react';
import { ChatKitProvider } from '../context/ChatKitContext';

export default function Root({ children }) {
  return (
    <ChatKitProvider>
      {children}
    </ChatKitProvider>
  );
}
```

## 9. Swizzle Docusaurus Layout

To make the chatbot globally available, swizzle the Docusaurus Layout component.

First, run the swizzle command (execute in your `frontend` directory):

```bash
npm run swizzle @docusaurus/theme-classic Layout -- --eject
# or yarn swizzle @docusaurus/theme-classic Layout -- --eject
```

Then, modify the generated `frontend/src/theme/Layout/index.tsx` to import and render the `Home` component.

```tsx
import React from 'react';
import Layout from '@theme-original/Layout';
import Home from '../../components/Home';

export default function LayoutWrapper(props) {
  return (
    <>
      <Layout {...props} />
      <Home />
    </>
  );
}
```

## 10. Configure ChatKit System Prompt

Update `frontend/src/components/ChatKitPanel.tsx` with the specified system prompt for "AI, Humanoid and Robotics" topics. Locate the `systemPrompt` variable and change its value.

```typescript
const systemPrompt = `You are an AI assistant specializing in AI, Humanoid and Robotics.
You help users understand concepts from the book and answer related questions.`;
```

## 11. Import Custom CSS

Ensure `frontend/src/components/Home.tsx` imports the custom CSS. Add this line:

```tsx
import '../css/chatkit-custom.css';
```

## 12. Build and Test

After implementing these changes, build your Docusaurus project to test SSR compatibility and overall functionality.

```bash
cd frontend
npm run build
npm run serve # To test locally
```
