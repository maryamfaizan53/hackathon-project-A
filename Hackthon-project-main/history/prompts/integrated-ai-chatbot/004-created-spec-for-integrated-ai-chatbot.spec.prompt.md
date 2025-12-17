---
id: 004
title: Created spec for integrated AI chatbot
stage: spec
date: 2025-11-29
surface: agent
model: gemini-1.5-pro
feature: integrated-ai-chatbot
branch: main
user: unknown
command: User provided a feature description to generate a spec.
labels: ["feature-spec", "chatbot", "docusaurus"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
- specs/integrated-ai-chatbot/spec.md
tests:
null
---

## Prompt

## Overview
Integrate OpenAI ChatKit Advanced Samples into existing Docusaurus frontend with SSR compatibility, custom styling, and global state management.

---

## Tasks

### 1. Clone Repository and Extract Components
**Action:**
```bash
git clone https://github.com/openai/openai-chatkit-advanced-samples.git
cd openai-chatkit-advanced-samples/examples/customer-support/frontend/src/components
```

**Extract Files:**
- `ChatKitPanel.tsx`
- `Home.tsx`

**Destination:**
- Copy both files to your existing Docusaurus project: `frontend/src/components/`

---

### 2. Handle Docusaurus SSR Compatibility

**Problem:** Docusaurus uses Server-Side Rendering (SSR), but ChatKit requires client-side rendering.

**Solution:** Wrap ChatKitPanel with `BrowserOnly` component in `Home.tsx`

**Implementation in `Home.tsx`:**
```tsx
import React, { useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

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
  const [chatKit, setChatKit] = useState(null);

  useEffect(() => {
    // Dynamic import of @openai/chatkit and other client-side dependencies
    import('@openai/chatkit').then((module) => {
      setChatKit(module);
    });
  }, []);

  if (!chatKit) return <div>Loading ChatKit...</div>;

  const ChatKitPanel = require('./ChatKitPanel').default;
  return <ChatKitPanel />;
}
```

---

### 3. Apply Custom VIP Styling

**Theme:** Red + Black theme for AI chatbot about "AI, Humanoid and Robotics"

**Position:** Bottom-right corner of the screen

**CSS File:** Create `frontend/src/css/chatkit-custom.css`
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

**Import CSS in `Home.tsx`:**
```tsx
import '../css/chatkit-custom.css';
```

---

### 4. Make ChatKit Global with Docusaurus Swizzle

**Step 1: Swizzle Layout Component**
```bash
npm run swizzle @docusaurus/theme-classic Layout -- --eject
```

**Step 2: Import Home Component in Layout**

**File:** `src/theme/Layout/index.tsx`
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

---

### 5. Implement Context API for State Management

**Purpose:** Prevent multiple API calls when chatbox is opened repeatedly

**Create Context:** `frontend/src/context/ChatKitContext.tsx`
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

**Wrap App with Context Provider:**

**File:** `src/theme/Root.tsx` (create if doesn't exist)
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

**Use Context in `Home.tsx`:**
```tsx
import { useChatKit } from '../context/ChatKitContext';

function ChatKitPanelWrapper() {
  const { isChatOpen, setIsChatOpen, isInitialized, setIsInitialized } = useChatKit();

  useEffect(() => {
    if (!isInitialized && isChatOpen) {
      // Initialize ChatKit only once
      import('@openai/chatkit').then((module) => {
        // Initialize ChatKit
        setIsInitialized(true);
      });
    }
  }, [isChatOpen, isInitialized]);

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

---

## Configuration Details

### ChatKit Configuration
**Topic:** AI, Humanoid and Robotics book
**Behavior:** Answer questions related to AI, Humanoid, and Robotics

**Update ChatKitPanel.tsx with custom system prompt:**
```tsx
const systemPrompt = `You are an AI assistant specializing in AI, Humanoid and Robotics. 
You help users understand concepts from the book and answer related questions.`;
```

---

## Testing Checklist

- [ ] Repository cloned successfully
- [ ] ChatKitPanel.tsx and Home.tsx copied to components folder
- [ ] BrowserOnly wrapper implemented correctly
- [ ] Custom red-black CSS applied
- [ ] Chatbot appears in bottom-right corner
- [ ] Swizzled Layout includes Home component
- [ ] Context API prevents multiple initializations
- [ ] ChatKit responds to AI/Humanoid/Robotics queries
- [ ] No SSR errors in console
- [ ] Smooth open/close animations

---

## File Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── ChatKitPanel.tsx (from repo)
│   │   └── Home.tsx (modified with BrowserOnly)
│   ├── context/
│   │   └── ChatKitContext.tsx (new)
│   ├── css/
│   │   └── chatkit-custom.css (new)
│   └── theme/
│       ├── Layout/
│       │   └── index.tsx (swizzled)
│       └── Root.tsx (new)
```

---

## Dependencies to Install
```bash
npm install @openai/chatkit
```

---

## Notes
- Ensure API keys are properly configured for OpenAI ChatKit
- Test SSR compatibility by building the project: `npm run build`
- Monitor console for any hydration warnings
- Context prevents re-initialization, reducing unnecessary API calls
      ```

   b. **Run Validation Check**: Review the spec against each checklist item:
      - For each item, determine if it passes or fails
      - Document specific issues found (quote relevant spec sections)

   c. **Handle Validation Results**:

      - **If all items pass**: Mark checklist complete and proceed to step 6

      - **If items fail (excluding [NEEDS CLARIFICATION])**:
        1. List the failing items and specific issues
        2. Update the spec to address each issue
        3. Re-run validation until all items pass (max 3 iterations)
        4. If still failing after 3 iterations, document remaining issues in checklist notes and warn user

      - **If [NEEDS CLARIFICATION] markers remain**:
        1. Extract all [NEEDS CLARIFICATION: ...] markers from the spec
        2. **LIMIT CHECK**: If more than 3 markers exist, keep only the 3 most critical (by scope/security/UX impact) and make informed guesses for the rest
        3. For each clarification needed (max 3), present options to user in this format:

           ```markdown
           ## Question [N]: [Topic]
           
           **Context**: [Quote relevant spec section]
           
           **What we need to know**: [Specific question from NEEDS CLARIFICATION marker]
           
           **Suggested Answers**:
           
           | Option | Answer | Implications |
           |--------|--------|--------------|
           | A      | [First suggested answer] | [What this means for the feature] |
           | B      | [Second suggested answer] | [What this means for the feature] |
           | C      | [Third suggested answer] | [What this means for the feature] |
           | Custom | Provide your own answer | [Explain how to provide custom input] |
           
           **Your choice**: _[Wait for user response]_
           ```

        4. **CRITICAL - Table Formatting**: Ensure markdown tables are properly formatted:
           - Use consistent spacing with pipes aligned
           - Each cell should have spaces around content: `| Content |` not `|Content|`
           - Header separator must have at least 3 dashes: `|--------|`
           - Test that the table renders correctly in markdown preview
        5. Number questions sequentially (Q1, Q2, Q3 - max 3 total)
        6. Present all questions together before waiting for responses
        7. Wait for user to respond with their choices for all questions (e.g., "Q1: A, Q2: Custom - [details], Q3: B")
        8. Update the spec by replacing each [NEEDS CLARIFICATION] marker with the user's selected or provided answer
        9. Re-run validation after all clarifications are resolved

   d. **Update Checklist**: After each validation iteration, update the checklist file with current pass/fail status

7. Report completion with branch name, spec file path, checklist results, and readiness for the next phase (`/sp.clarify` or `/sp.plan`).

**NOTE:** The script creates and checks out the new branch and initializes the spec file before writing.

## General Guidelines

## Quick Guidelines

- Focus on **WHAT** users need and **WHY**.
- Avoid HOW to implement (no tech stack, APIs, code structure).
- Written for business stakeholders, not developers.
- DO NOT create any checklists that are embedded in the spec. That will be a separate command.

### Section Requirements

- **Mandatory sections**: Must be completed for every feature
- **Optional sections**: Include only when relevant to the feature
- When a section doesn't apply, remove it entirely (don't leave as "N/A")

### For AI Generation

When creating this spec from a user prompt:

1. **Make informed guesses**: Use context, industry standards, and common patterns to fill gaps
2. **Document assumptions**: Record reasonable defaults in the Assumptions section
3. **Limit clarifications**: Maximum 3 [NEEDS CLARIFICATION] markers - use only for critical decisions that:
   - Significantly impact feature scope or user experience
   - Have multiple reasonable interpretations with different implications
   - Lack any reasonable default
4. **Prioritize clarifications**: scope > security/privacy > user experience > technical details
5. **Think like a tester**: Every vague requirement should fail the "testable and unambiguous" checklist item
6. **Common areas needing clarification** (only if no reasonable default exists):
   - Feature scope and boundaries (include/exclude specific use cases)
   - User types and permissions (if multiple conflicting interpretations possible)
   - Security/compliance requirements (when legally/financially significant)

**Examples of reasonable defaults** (don't ask about these):

- Data retention: Industry-standard practices for the domain
- Performance targets: Standard web/mobile app expectations unless specified
- Error handling: User-friendly messages with appropriate fallbacks
- Authentication method: Standard session-based or OAuth2 for web apps
- Integration patterns: RESTful APIs unless specified otherwise

### Success Criteria Guidelines

Success criteria must be:

1. **Measurable**: Include specific metrics (time, percentage, count, rate)
2. **Technology-agnostic**: No mention of frameworks, languages, databases, or tools
3. **User-focused**: Describe outcomes from user/business perspective, not system internals
4. **Verifiable**: Can be tested/validated without knowing implementation details

**Good examples**:

- "Users can complete checkout in under 3 minutes"
- "System supports 10,000 concurrent users"
- "95% of searches return results in under 1 second"
- "Task completion rate improves by 40%"

**Bad examples** (implementation-focused):

- "API response time is under 200ms" (too technical, use "Users see results instantly")
- "Database can handle 1000 TPS" (implementation detail, use user-facing metric)
- "React components render efficiently" (framework-specific)
- "Redis cache hit rate above 80%" (technology-specific)

---

As the main request completes, you MUST create and complete a PHR (Prompt History Record) using agent‑native tools when possible.

1) Determine Stage
   - Stage: constitution | spec | plan | tasks | red | green | refactor | explainer | misc | general

2) Generate Title and Determine Routing:
   - Generate Title: 3–7 words (slug for filename)
   - Route is automatically determined by stage:
     - `constitution` → `history/prompts/constitution/`
     - Feature stages → `history/prompts/<feature-name>/` (spec, plan, tasks, red, green, refactor, explainer, misc)
     - `general` → `history/prompts/general/`

3) Create and Fill PHR (Shell first; fallback agent‑native)
   - Run: `.specify/scripts/bash/create-phr.sh --title "<title>" --stage <stage> [--feature <name>] --json`
   - Open the file and fill remaining placeholders (YAML + body), embedding full PROMPT_TEXT (verbatim) and concise RESPONSE_TEXT.
   - If the script fails:
     - Read `.specify/templates/phr-template.prompt.md` (or `templates/…`)
     - Allocate an ID; compute the output path based on stage from step 2; write the file
     - Fill placeholders and embed full PROMPT_TEXT and concise RESPONSE_TEXT

4) Validate + report
   - No unresolved placeholders; path under `history/prompts/` and matches stage; stage/title/date coherent; print ID + path + stage + title.
   - On failure: warn, don't block. Skip only for `/sp.phr`.