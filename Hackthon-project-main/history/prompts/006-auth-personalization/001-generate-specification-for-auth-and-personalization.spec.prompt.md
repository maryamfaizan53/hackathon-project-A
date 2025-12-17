---
id: 001
title: Generate Specification for Auth and Personalization
stage: spec
date: 2025-11-29
surface: agent
model: gemini-model
feature: 006-auth-personalization
branch: 006-auth-personalization
user: Ahmed
command: /sp.specify # Add Authentication and Personalization to Existing Docusaurus Book (TypeScript)

## Context
I have an EXISTING Docusaurus book already created. I need to ADD authentication and personalization features to it using TypeScript. DO NOT create a new book, only add these features to the existing one.

## Tech Stack
- **Language**: TypeScript (use .tsx and .ts files)
- **Framework**: Docusaurus (existing)
- **Auth**: Custom FastAPI Backend with JWT
- **AI for Personalization**: Google Gemini API (for content personalization)
- **Storage**: localStorage (client-side)

## Requirements

### 1. FastAPI Backend Setup (Python)

**Create a separate FastAPI backend for authentication:**

**Install dependencies:**
```bash
pip install fastapi uvicorn python-jose[cryptography] passlib[bcrypt] python-multipart
```

**File: backend/main.py**

**Requirements:**
- FastAPI app with CORS enabled
- JWT token generation and validation
- Password hashing with bcrypt
- In-memory user storage (for simplicity) or SQLite

**Endpoints needed:**
```python
POST /api/auth/signup
POST /api/auth/login
GET /api/auth/me (verify token)
```

**JWT Configuration:**
- Algorithm: HS256
- Token expiration: 7 days
- Secret key: Generate a secure random key

**User Model:**
```python
{
  "user_id": "uuid",
  "email": "string",
  "name": "string",
  "hashed_password": "string",
  "preferences": {
    "level": "beginner | intermediate | advanced",
    "languages": ["Python", "JavaScript"],
    "ai_experience": "none | basic | intermediate | advanced",
    "hardware_knowledge": "basic | intermediate | advanced"
  }
}
```

**Run backend:**
```bash
uvicorn backend.main:app --reload --port 8000
```

### 2. Frontend Auth Types (TypeScript)

**Install dependencies:**
```bash
npm install axios
npm install @google/generative-ai
npm install lucide-react
```

**Create auth types:**
```typescript
// src/types/user.ts
export interface UserPreferences {
  level: 'beginner' | 'intermediate' | 'advanced';
  languages: string[];
  aiExperience: 'none' | 'basic' | 'intermediate' | 'advanced';
  hardwareKnowledge: 'basic' | 'intermediate' | 'advanced';
}

export interface User {
  userId: string;
  email: string;
  name: string;
  preferences: UserPreferences;
  isLoggedIn: boolean;
  token: string;
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
  preferences: UserPreferences;
}

export interface LoginData {
  email: string;
  password: string;
}
```

**Create API service:**
```typescript
// src/services/authService.ts
import axios from 'axios';
import type { SignupData, LoginData, User } from '../types/user';

const API_BASE_URL = 'http://localhost:8000/api/auth';

export const authService = {
  signup: async (data: SignupData) => {
    const response = await axios.post(`${API_BASE_URL}/signup`, data);
    return response.data;
  },

  login: async (data: LoginData) => {
    const response = await axios.post(`${API_BASE_URL}/login`, data);
    return response.data;
  },

  verifyToken: async (token: string) => {
    const response = await axios.get(`${API_BASE_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};
```

### 3. Signup Component (TypeScript)

**File: src/components/Auth/SignupForm.tsx**

**Requirements:**
- Create a React component using TypeScript
- Call FastAPI `/api/auth/signup` endpoint
- Collect the following information:

**Basic Auth Fields:**
- Email (input type="email")
- Password (input type="password")
- Name (input type="text")

**Background Questions (collect during signup):**

1.  **Programming Experience** (radio buttons):
    - Beginner (new to programming)
    - Intermediate (1-3 years)
    - Advanced (3+ years)

2.  **Known Programming Languages** (checkboxes - multiple select):
    - Python
    - JavaScript
    - TypeScript
    - Java
    - C++
    - Other

3.  **AI/ML Experience** (dropdown/select):
    - None
    - Basic
    - Intermediate
    - Advanced

4.  **Hardware Knowledge** (dropdown/select):
    - Basic
    - Intermediate
    - Advanced

**After signup success:**
- Receive JWT token from backend
- Save user data + token to localStorage with key "userData"
- Format:
```json
{
  "userId": "uuid_from_backend",
  "email": "user@example.com",
  "name": "John Doe",
  "token": "jwt_token_here",
  "preferences": {
    "level": "beginner",
    "languages": ["Python", "JavaScript"],
    "aiExperience": "basic",
    "hardwareKnowledge": "intermediate"
  },
  "isLoggedIn": true
}
```
- Redirect to book homepage after successful signup

### 4. Login Component (TypeScript)

**File: src/components/Auth/LoginForm.tsx**

**Requirements:**
- Simple email/password login form
- Call FastAPI `/api/auth/login` endpoint
- On successful login:
  - Receive JWT token from backend
  - Save token + user data to localStorage
  - Set isLoggedIn to true
  - Redirect to homepage

### 5. Auth Button in Navbar (TypeScript)

**File: src/components/Auth/AuthButton.tsx**

**Requirements:**
- Show "Login" and "Signup" buttons if user NOT logged in
- Show user name and "Logout" button if user IS logged in
- Check localStorage on component mount
- Verify JWT token validity on mount (call `/api/auth/me`)
- If token expired, clear localStorage and show login
- Integrate into Docusaurus navbar

**Modify: src/theme/Navbar/index.tsx** (if needed)

### 6. Content Personalization Button (TypeScript + Gemini API)

**File: src/components/PersonalizeButton.tsx**

**Requirements:**
- Button visible ONLY when user is logged in
- Button text: "🎯 Personalize for My Level"
- Position: Top of every chapter/page

**When clicked:**
1. Get user's programming level from localStorage (beginner/intermediate/advanced)
2. Get current page content
3. Send to **Google Gemini API** with this prompt:
```typescript
const prompt = `
Rewrite the following content for a ${userLevel} level programmer.

Guidelines:
- If beginner: Use simple language, add more explanations, use real-world analogies, avoid complex jargon, add more examples
- If intermediate: Balanced technical depth, assume basic programming knowledge, moderate complexity
- If advanced: Technical and concise, assume strong fundamentals, use advanced terminology, be brief

Original Content:
${pageContent}

Rewritten Content:
`;
```

4. Replace page content with Gemini's response
5. Show loading spinner during API call
6. Handle errors gracefully

**Gemini API Integration:**
```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Use model.generateContent(prompt) to get personalized content
```

**Environment Variable needed:**
```
GEMINI_API_KEY=your_gemini_api_key_here
```

### 7. Edit Page Button (TypeScript)

**File: src/components/EditPageButton.tsx**

**Requirements:**
- Button visible ONLY when user is logged in
- Button text: "✏️ Edit Page"
- Position: Top-right corner of page

**Functionality:**
- Click "Edit Page" → enable contenteditable on page content
- Show "Save Changes" and "Cancel" buttons when editing
- On "Save Changes":
  - Save edited HTML to localStorage
  - Key format: `editedPages_${userId}`
  - Value format:
```json
  {
    "page_intro": "<edited HTML>",
    "page_chapter1": "<edited HTML>",
    "page_chapter2": "<edited HTML>"
  }
```
- On "Cancel" → restore original content without saving
- Add "Reset to Original" button to restore default content

**Important:**
- Edits are PERSONAL (saved in user's localStorage only)
- Check localStorage on page load to show user's edited version
- If edited version exists, show it; otherwise show original

### 8. Content Wrapper Component (TypeScript)

**File: src/components/ContentWrapper.tsx**

**Requirements:**
- Wrap all page content
- Check if user is logged in (verify JWT token)
- If logged in:
  - Show PersonalizeButton
  - Show EditPageButton
  - Check for saved edits in localStorage
  - Display personalized or edited content if exists
- If NOT logged in:
  - Show original content only
  - Hide all edit/personalize features

### 9. Integration with Existing Docusaurus

**Modify: src/theme/DocItem/Layout/index.tsx**
- Wrap existing layout with ContentWrapper
- This automatically adds personalize and edit buttons to ALL pages

**Create: src/pages/signup.tsx**
- Dedicated signup page

**Create: src/pages/login.tsx**
- Dedicated login page

## File Structure:

### Backend (FastAPI):
```
backend/
├── main.py                    (FastAPI app with JWT auth)
├── models.py                  (User models)
├── auth.py                    (JWT utilities)
└── requirements.txt
```

### Frontend (Docusaurus):
```
src/
├── types/
│   └── user.ts                     (NEW - TypeScript interfaces)
├── services/
│   └── authService.ts              (NEW - API calls to FastAPI)
├── components/
│   ├── Auth/
│   │   ├── SignupForm.tsx          (NEW)
│   │   ├── LoginForm.tsx           (NEW)
│   │   └── AuthButton.tsx          (NEW)
│   ├── PersonalizeButton.tsx       (NEW - uses Gemini)
│   ├── EditPageButton.tsx          (NEW)
│   └── ContentWrapper.tsx          (NEW)
├── theme/
│   ├── DocItem/
│   │   └── Layout/index.tsx        (MODIFY)
│   └── Navbar/index.tsx            (MODIFY - add auth buttons)
└── pages/
    ├── signup.tsx                  (NEW)
    └── login.tsx                   (NEW)
```

## Environment Variables:

**Frontend (.env):**
```
GEMINI_API_KEY=your_gemini_api_key_here
REACT_APP_API_URL=http://localhost:8000
```

**Backend (.env):**
```
SECRET_KEY=your_jwt_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_DAYS=7
```

## LocalStorage Keys Used:
- `userData` - stores user info, preferences, and JWT token
- `editedPages_${userId}` - stores user's page edits

## User Flow:

### First Time User:
1. Visits book → sees "Login/Signup" buttons in navbar
2. Clicks "Signup" → fills form with 5 background questions
3. Backend creates user and returns JWT token
4. Frontend saves token + user data to localStorage
5. Redirected to book homepage
6. Every page now shows:
   - "🎯 Personalize for My Level" button (top)
   - "✏️ Edit Page" button (top-right)
7. Clicks "Personalize" → Gemini API adjusts content to their level
8. Clicks "Edit" → can modify content, saves to localStorage

### Returning User (Login):
1. Clicks "Login" → enters credentials
2. Backend validates credentials and returns JWT token
3. Frontend saves token to localStorage
4. Logged in → sees their name in navbar
5. All pages show their previous edits (if any)
6. Can personalize any page with one click
7. Can continue editing pages

## Important Notes:
- Use TypeScript for ALL frontend components (.tsx files)
- Use Python for FastAPI backend
- JWT tokens for authentication (no sessions)
- Use Gemini API (NOT Claude) for content personalization
- All edits stored in localStorage (no backend/database for edits)
- User data stored in FastAPI backend (in-memory or SQLite)
- Edits are personal (not shared between users)
- Existing Docusaurus book content remains unchanged
- Features added as wrapper components around existing content
- Handle API errors gracefully (show error message, don't crash)
- Show loading states during API calls
- CORS must be enabled in FastAPI for frontend to connect

## Success Criteria:
✅ FastAPI backend with JWT authentication working
✅ Signup collects 5 background questions
✅ Login validates credentials and returns JWT token
✅ Token verification on protected routes
✅ Personalize button uses Gemini API to adjust content difficulty
✅ Edit button saves personal edits to localStorage
✅ All features visible only when logged in
✅ Type-safe TypeScript code throughout
✅ Works with existing Docusaurus book without breaking it
```
labels: ["authentication", "personalization", "docusaurus", "specification"]
links:
  spec: specs/006-auth-personalization/spec.md
  ticket: null
  adr: null
  pr: null
files:
- specs/006-auth-personalization/spec.md
- specs/006-auth-personalization/checklists/requirements.md
tests:
[]
---

## Prompt

```text
# Add Authentication and Personalization to Existing Docusaurus Book (TypeScript)

## Context
I have an EXISTING Docusaurus book already created. I need to ADD authentication and personalization features to it using TypeScript. DO NOT create a new book, only add these features to the existing one.

## Tech Stack
- **Language**: TypeScript (use .tsx and .ts files)
- **Framework**: Docusaurus (existing)
- **Auth**: Custom FastAPI Backend with JWT
- **AI for Personalization**: Google Gemini API (for content personalization)
- **Storage**: localStorage (client-side)

## Requirements

### 1. FastAPI Backend Setup (Python)

**Create a separate FastAPI backend for authentication:**

**Install dependencies:**
```bash
pip install fastapi uvicorn python-jose[cryptography] passlib[bcrypt] python-multipart
```

**File: backend/main.py**

**Requirements:**
- FastAPI app with CORS enabled
- JWT token generation and validation
- Password hashing with bcrypt
- In-memory user storage (for simplicity) or SQLite

**Endpoints needed:**
```python
POST /api/auth/signup
POST /api/auth/login
GET /api/auth/me (verify token)
```

**JWT Configuration:**
- Algorithm: HS256
- Token expiration: 7 days
- Secret key: Generate a secure random key

**User Model:**
```python
{
  "user_id": "uuid",
  "email": "string",
  "name": "string",
  "hashed_password": "string",
  "preferences": {
    "level": "beginner | intermediate | advanced",
    "languages": ["Python", "JavaScript"],
    "ai_experience": "none | basic | intermediate | advanced",
    "hardware_knowledge": "basic | intermediate | advanced"
  }
}
```

**Run backend:**
```bash
uvicorn backend.main:app --reload --port 8000
```

### 2. Frontend Auth Types (TypeScript)

**Install dependencies:**
```bash
npm install axios
npm install @google/generative-ai
npm install lucide-react
```

**Create auth types:**
```typescript
// src/types/user.ts
export interface UserPreferences {
  level: 'beginner' | 'intermediate' | 'advanced';
  languages: string[];
  aiExperience: 'none' | 'basic' | 'intermediate' | 'advanced';
  hardwareKnowledge: 'basic' | 'intermediate' | 'advanced';
}

export interface User {
  userId: string;
  email: string;
  name: string;
  preferences: UserPreferences;
  isLoggedIn: boolean;
  token: string;
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
  preferences: UserPreferences;
}

export interface LoginData {
  email: string;
  password: string;
}
```

**Create API service:**
```typescript
// src/services/authService.ts
import axios from 'axios';
import type { SignupData, LoginData, User } from '../types/user';

const API_BASE_URL = 'http://localhost:8000/api/auth';

export const authService = {
  signup: async (data: SignupData) => {
    const response = await axios.post(`${API_BASE_URL}/signup`, data);
    return response.data;
  },

  login: async (data: LoginData) => {
    const response = await axios.post(`${API_BASE_URL}/login`, data);
    return response.data;
  },

  verifyToken: async (token: string) => {
    const response = await axios.get(`${API_BASE_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};
```

### 3. Signup Component (TypeScript)

**File: src/components/Auth/SignupForm.tsx**

**Requirements:**
- Create a React component using TypeScript
- Call FastAPI `/api/auth/signup` endpoint
- Collect the following information:

**Basic Auth Fields:**
- Email (input type="email")
- Password (input type="password")
- Name (input type="text")

**Background Questions (collect during signup):**

1.  **Programming Experience** (radio buttons):
    - Beginner (new to programming)
    - Intermediate (1-3 years)
    - Advanced (3+ years)

2.  **Known Programming Languages** (checkboxes - multiple select):
    - Python
    - JavaScript
    - TypeScript
    - Java
    - C++
    - Other

3.  **AI/ML Experience** (dropdown/select):
    - None
    - Basic
    - Intermediate
    - Advanced

4.  **Hardware Knowledge** (dropdown/select):
    - Basic
    - Intermediate
    - Advanced

**After signup success:**
- Receive JWT token from backend
- Save user data + token to localStorage with key "userData"
- Format:
```json
{
  "userId": "uuid_from_backend",
  "email": "user@example.com",
  "name": "John Doe",
  "token": "jwt_token_here",
  "preferences": {
    "level": "beginner",
    "languages": ["Python", "JavaScript"],
    "aiExperience": "basic",
    "hardwareKnowledge": "intermediate"
  },
  "isLoggedIn": true
}
```
- Redirect to book homepage after successful signup

### 4. Login Component (TypeScript)

**File: src/components/Auth/LoginForm.tsx**

**Requirements:**
- Simple email/password login form
- Call FastAPI `/api/auth/login` endpoint
- On successful login:
  - Receive JWT token from backend
  - Save token + user data to localStorage
  - Set isLoggedIn to true
  - Redirect to homepage

### 5. Auth Button in Navbar (TypeScript)

**File: src/components/Auth/AuthButton.tsx**

**Requirements:**
- Show "Login" and "Signup" buttons if user NOT logged in
- Show user name and "Logout" button if user IS logged in
- Check localStorage on component mount
- Verify JWT token validity on mount (call `/api/auth/me`)
- If token expired, clear localStorage and show login
- Integrate into Docusaurus navbar

**Modify: src/theme/Navbar/index.tsx** (if needed)

### 6. Content Personalization Button (TypeScript + Gemini API)

**File: src/components/PersonalizeButton.tsx**

**Requirements:**
- Button visible ONLY when user is logged in
- Button text: "🎯 Personalize for My Level"
- Position: Top of every chapter/page

**When clicked:**
1. Get user's programming level from localStorage (beginner/intermediate/advanced)
2. Get current page content
3. Send to **Google Gemini API** with this prompt:
```typescript
const prompt = `
Rewrite the following content for a ${userLevel} level programmer.

Guidelines:
- If beginner: Use simple language, add more explanations, use real-world analogies, avoid complex jargon, add more examples
- If intermediate: Balanced technical depth, assume basic programming knowledge, moderate complexity
- If advanced: Technical and concise, assume strong fundamentals, use advanced terminology, be brief

Original Content:
${pageContent}

Rewritten Content:
`;
```

4. Replace page content with Gemini's response
5. Show loading spinner during API call
6. Handle errors gracefully

**Gemini API Integration:**
```typescript
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Use model.generateContent(prompt) to get personalized content
```

**Environment Variable needed:**
```
GEMINI_API_KEY=your_gemini_api_key_here
```

### 7. Edit Page Button (TypeScript)

**File: src/components/EditPageButton.tsx**

**Requirements:**
- Button visible ONLY when user is logged in
- Button text: "✏️ Edit Page"
- Position: Top-right corner of page

**Functionality:**
- Click "Edit Page" → enable contenteditable on page content
- Show "Save Changes" and "Cancel" buttons when editing
- On "Save Changes":
  - Save edited HTML to localStorage
  - Key format: `editedPages_${userId}`
  - Value format:
```json
  {
    "page_intro": "<edited HTML>",
    "page_chapter1": "<edited HTML>",
    "page_chapter2": "<edited HTML>"
  }
```
- On "Cancel" → restore original content without saving
- Add "Reset to Original" button to restore default content

**Important:**
- Edits are PERSONAL (saved in user's localStorage only)
- Check localStorage on page load to show user's edited version
- If edited version exists, show it; otherwise show original

### 8. Content Wrapper Component (TypeScript)

**File: src/components/ContentWrapper.tsx**

**Requirements:**
- Wrap all page content
- Check if user is logged in (verify JWT token)
- If logged in:
  - Show PersonalizeButton
  - Show EditPageButton
  - Check for saved edits in localStorage
  - Display personalized or edited content if exists
- If NOT logged in:
  - Show original content only
  - Hide all edit/personalize features

### 9. Integration with Existing Docusaurus

**Modify: src/theme/DocItem/Layout/index.tsx**
- Wrap existing layout with ContentWrapper
- This automatically adds personalize and edit buttons to ALL pages

**Create: src/pages/signup.tsx**
- Dedicated signup page

**Create: src/pages/login.tsx**
- Dedicated login page

## File Structure:

### Backend (FastAPI):
```
backend/
├── main.py                    (FastAPI app with JWT auth)
├── models.py                  (User models)
├── auth.py                    (JWT utilities)
└── requirements.txt
```

### Frontend (Docusaurus):
```
src/
├── types/
│   └── user.ts                     (NEW - TypeScript interfaces)
├── services/
│   └── authService.ts              (NEW - API calls to FastAPI)
├── components/
│   ├── Auth/
│   │   ├── SignupForm.tsx          (NEW)
│   │   ├── LoginForm.tsx           (NEW)
│   │   └── AuthButton.tsx          (NEW)
│   ├── PersonalizeButton.tsx       (NEW - uses Gemini)
│   ├── EditPageButton.tsx          (NEW)
│   └── ContentWrapper.tsx          (NEW)
├── theme/
│   ├── DocItem/
│   │   └── Layout/index.tsx        (MODIFY)
│   └── Navbar/index.tsx            (MODIFY - add auth buttons)
└── pages/
    ├── signup.tsx                  (NEW)
    └── login.tsx                   (NEW)
```

## Environment Variables:

**Frontend (.env):**
```
GEMINI_API_KEY=your_gemini_api_key_here
REACT_APP_API_URL=http://localhost:8000
```

**Backend (.env):
```
SECRET_KEY=your_jwt_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_DAYS=7
```

## LocalStorage Keys Used:
- `userData` - stores user info, preferences, and JWT token
- `editedPages_${userId}` - stores user's page edits

## User Flow:

### First Time User:
1. Visits book → sees "Login/Signup" buttons in navbar
2. Clicks "Signup" → fills form with 5 background questions
3. Backend creates user and returns JWT token
4. Frontend saves token + user data to localStorage
5. Redirected to book homepage
6. Every page now shows:
   - "🎯 Personalize for My Level" button (top)
   - "✏️ Edit Page" button (top-right)
7. Clicks "Personalize" → Gemini API adjusts content to their level
8. Clicks "Edit" → can modify content, saves to localStorage

### Returning User (Login):
1. Clicks "Login" → enters credentials
2. Backend validates credentials and returns JWT token
3. Frontend saves token to localStorage
4. Logged in → sees their name in navbar
5. All pages show their previous edits (if any)
6. Can personalize any page with one click
7. Can continue editing pages

## Important Notes:
- Use TypeScript for ALL frontend components (.tsx files)
- Use Python for FastAPI backend
- JWT tokens for authentication (no sessions)
- Use Gemini API (NOT Claude) for content personalization
- All edits stored in localStorage (no backend/database for edits)
- User data stored in FastAPI backend (in-memory or SQLite)
- Edits are personal (not shared between users)
- Existing Docusaurus book content remains unchanged
- Features added as wrapper components around existing content
- Handle API errors gracefully (show error message, don't crash)
- Show loading states during API calls
- CORS must be enabled in FastAPI for frontend to connect

## Success Criteria:
✅ FastAPI backend with JWT authentication working
✅ Signup collects 5 background questions
✅ Login validates credentials and returns JWT token
✅ Token verification on protected routes
✅ Personalize button uses Gemini API to adjust content difficulty
✅ Edit button saves personal edits to localStorage
✅ All features visible only when logged in
✅ Type-safe TypeScript code throughout
✅ Works with existing Docusaurus book without breaking it
```

## Response snapshot

The agent successfully generated a feature specification (`spec.md`) and a quality checklist (`requirements.md`) for adding authentication and personalization to an existing Docusaurus book. It clarified two edge cases with the user and incorporated the decisions into the specification. The agent noted that some technical details were retained in the FRs as an accepted deviation from strict specification guidelines, due to the detailed nature of the user's initial prompt.

## Outcome

- ✅ Impact: A comprehensive feature specification has been created, laying the groundwork for further development.
- 🧪 Tests: No automated tests were run or added in this stage.
- 📁 Files: 
    - specs/006-auth-personalization/spec.md
    - specs/006-auth-personalization/checklists/requirements.md
- 🔁 Next prompts: The user can now proceed with `/sp.plan` to create a detailed plan for implementing this feature.
- 🧠 Reflection: The agent successfully handled clarification questions and adapted to the user's explicit technical requirements, while also documenting the deviations from standard specification practices. The error in running the `create-phr.sh` script highlighted the need for robust cross-platform scripting or agent-native PHR creation.

## Evaluation notes (flywheel)

- Failure modes observed: Attempted to run a bash script in a PowerShell environment, leading to failure.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Improve cross-platform compatibility of shell scripts or provide more direct agent-native PHR creation methods.
