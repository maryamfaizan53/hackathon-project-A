---

description: "Task list for Add Authentication and Personalization to Docusaurus Book feature"
---

# Tasks: Add Authentication and Personalization to Docusaurus Book

**Input**: Design documents from `/specs/006-auth-personalization/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: The feature specification does not explicitly request test tasks. Therefore, no explicit test tasks are included in this list.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story?] Description with file path`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create backend/frontend project directories and initial files in backend/ and frontend/
- [ ] T002 Configure backend environment (`backend/.env`) in backend/.env
- [ ] T003 Configure frontend environment (`frontend/.env`) in frontend/.env
- [ ] T004 Install backend dependencies (FastAPI, uvicorn, python-jose, passlib, python-multipart, psycopg2-binary) in backend/requirements.txt
- [ ] T005 Install frontend dependencies (axios, @google/generative-ai, lucide-react) in frontend/package.json

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T006 [P] Implement FastAPI app with CORS enabled in backend/main.py
- [ ] T007 [P] Implement JWT utilities (generation, validation, secret key, algorithm, expiration) in backend/auth.py
- [ ] T008 [P] Implement password hashing utilities (bcrypt) in backend/auth.py
- [ ] T009 [P] Create User model (with preferences) for backend in backend/src/models/user.py
- [ ] T010 [P] Implement neondb connection and basic user storage operations in backend/src/services/user_service.py
- [ ] T011 [P] Create user types (UserPreferences, User, SignupData, LoginData) for frontend in frontend/src/types/user.ts
- [ ] T012 [P] Create authentication API service (`authService.ts`) for frontend in frontend/src/services/authService.ts

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - User Signup and Initial Personalization (Priority: P1) 🎯 MVP

**Goal**: A new user can sign up for an account, providing basic authentication details and answering a series of background questions to set up their initial personalization preferences. Upon successful signup, they are automatically logged in, their preferences and token are saved locally, and they are redirected to the book homepage where personalized features become available.

**Independent Test**: Can be fully tested by creating a new user through the signup form and verifying that user data, token, and preferences are correctly stored and that the user is redirected to the homepage with personalized features (like the Personalize and Edit buttons) visible.

### Implementation for User Story 1

- [ ] T013 [US1] Implement POST /api/auth/signup endpoint in backend/main.py (or backend/src/api/auth.py)
- [ ] T014 [P] [US1] Create SignupForm component (including background questions) in frontend/src/components/Auth/SignupForm.tsx
- [ ] T015 [US1] Implement signup logic in SignupForm (call authService.signup, save userData to localStorage, redirect) in frontend/src/components/Auth/SignupForm.tsx
- [ ] T016 [US1] Create dedicated signup page in frontend/src/pages/signup.tsx

---

## Phase 4: User Story 2 - User Login and Session Management (Priority: P1)

**Goal**: A returning user can log in with their credentials. Upon successful login, their JWT token and user data are retrieved and saved locally. The system verifies their token on subsequent page loads to maintain their logged-in state, displaying personalized features if the token is valid, or prompting them to log in if it's expired or invalid.

**Independent Test**: Can be fully tested by logging in with existing credentials, verifying localStorage updates, navigating through pages to confirm persistent login state, and observing behavior when a token is simulated to expire.

### Implementation for User Story 2

- [ ] T017 [US2] Implement POST /api/auth/login endpoint in backend/main.py (or backend/src/api/auth.py)
- [ ] T018 [US2] Implement GET /api/auth/me endpoint for token verification in backend/main.py (or backend/src/api/auth.py)
- [ ] T019 [P] [US2] Create LoginForm component in frontend/src/components/Auth/LoginForm.tsx
- [ ] T020 [US2] Implement login logic in LoginForm (call authService.login, save userData to localStorage, redirect) in frontend/src/components/Auth/LoginForm.tsx
- [ ] T021 [US2] Create dedicated login page in frontend/src/pages/login.tsx

---

## Phase 5: User Story 5 - Navigation Bar Authentication Status (Priority: P3)

**Goal**: The Docusaurus navigation bar dynamically displays "Login" and "Signup" buttons when a user is not logged in, and shows the user's name along with a "Logout" button when they are logged in.

**Independent Test**: Can be tested by logging in, logging out, and observing the navigation bar changes.

### Implementation for User Story 5

- [ ] T022 [US5] Create AuthButton component (Login/Signup vs User Name/Logout) in frontend/src/components/Auth/AuthButton.tsx
- [ ] T023 [US5] Implement logic in AuthButton to check localStorage for login status and verify token (`/api/auth/me`) on component mount in frontend/src/components/Auth/AuthButton.tsx
- [ ] T024 [US5] Integrate AuthButton into Docusaurus Navbar in frontend/src/theme/Navbar/index.tsx

---

## Phase 6: User Story 3 - Content Personalization (Priority: P2)

**Goal**: A logged-in user can click a "Personalize for My Level" button on any chapter/page to dynamically rewrite the content to match their declared programming experience level (beginner, intermediate, advanced) using the Google Gemini API.

**Independent Test**: Can be tested by logging in, navigating to a page, clicking the personalize button, and observing the content change according to the user's set preference.

### Implementation for User Story 3

- [ ] T025 [P] [US3] Create PersonalizeButton component in frontend/src/components/PersonalizeButton.tsx
- [ ] T026 [US3] Implement Gemini API integration and content rewriting logic in PersonalizeButton in frontend/src/components/PersonalizeButton.Button.tsx
- [ ] T027 [US3] Add loading spinner and error handling to PersonalizeButton in frontend/src/components/PersonalizeButton.tsx

---

## Phase 7: User Story 4 - Personal Page Editing (Priority: P2)

**Goal**: A logged-in user can click an "Edit Page" button to enable content editing for the current page. Their edits are saved locally to their browser's localStorage, allowing them to maintain a personalized version of specific pages that persists across sessions. They can also reset to the original content.

**Independent Test**: Can be tested by logging in, editing content on a page, saving changes, refreshing the page to confirm persistence, and then resetting changes.

### Implementation for User Story 4

- [ ] T028 [P] [US4] Create EditPageButton component in frontend/src/components/EditPageButton.tsx
- [ ] T029 [US4] Implement logic to enable `contenteditable` and show Save/Cancel/Reset buttons in EditPageButton in frontend/src/components/EditPageButton.tsx
- [ ] T030 [US4] Implement logic to save/load/reset edited HTML content to localStorage (`editedPages_${userId}`) in EditPageButton in frontend/src/components/EditPageButton.tsx

---

## Phase 8: Final Integration & Polish

**Purpose**: Integrate features and handle cross-cutting concerns.

- [ ] T031 [P] Create ContentWrapper component (check login status, show personalize/edit buttons, load saved edits) in frontend/src/components/ContentWrapper.tsx
- [ ] T032 [P] Integrate ContentWrapper into Docusaurus DocItem Layout in frontend/src/theme/DocItem/Layout/index.tsx
- [ ] T033 Global error handling for API calls across frontend in frontend/src/services/authService.ts (or a dedicated error handler)
- [ ] T034 Run quickstart.md validation and ensure all steps are clear
- [ ] T035 Code cleanup and refactoring
- [ ] T036 Update documentation (if any new configuration or usage instructions)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 5 (P3)**: Depends on User Story 1 and User Story 2 for login/logout functionality.
- **User Story 3 (P2)**: Depends on User Story 2 for login state.
- **User Story 4 (P2)**: Depends on User Story 2 for login state.

### Within Each User Story

- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel.
- All Foundational tasks marked [P] can run in parallel (within Phase 2).
- Once Foundational phase completes, User Story 1 and User Story 2 can start in parallel.
- Once User Story 2 is complete, User Story 3 and User Story 4 can start in parallel.
- All tasks for a user story marked [P] can run in parallel.
- Different user stories can be worked on in parallel by different team members, respecting dependencies.

---

## Parallel Example: User Story 1

```bash
# Launch all components for User Story 1 that can be implemented in parallel:
Task: "Create SignupForm component (including background questions) in frontend/src/components/Auth/SignupForm.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1.  Complete Phase 1: Setup
2.  Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3.  Complete Phase 3: User Story 1
4.  **STOP and VALIDATE**: Test User Story 1 independently
5.  Deploy/demo if ready

### Incremental Delivery

1.  Complete Setup + Foundational → Foundation ready
2.  Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3.  Add User Story 2 → Test independently → Deploy/Demo
4.  Add User Story 5 → Test independently → Deploy/Demo
5.  Add User Story 3 → Test independently → Deploy/Demo
6.  Add User Story 4 → Test independently → Deploy/Demo
7.  Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1.  Team completes Setup + Foundational together
2.  Once Foundational is done:
    -   Developer A: User Story 1 (Signup)
    -   Developer B: User Story 2 (Login/Session)
3.  Once US1 & US2 are done:
    -   Developer C: User Story 5 (Navbar Auth)
    -   Developer D: User Story 3 (Personalization)
    -   Developer E: User Story 4 (Editing)
4.  Stories complete and integrate independently.

---

## Notes

-   [P] tasks = different files, no dependencies
-   [Story] label maps task to specific user story for traceability
-   Each user story should be independently completable and testable
-   Verify tests fail before implementing (if test tasks are added in the future)
-   Commit after each task or logical group
-   Stop at any checkpoint to validate story independently
-   Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
