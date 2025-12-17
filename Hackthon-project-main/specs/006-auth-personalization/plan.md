# Implementation Plan: Add Authentication and Personalization to Docusaurus Book

**Branch**: `006-auth-personalization` | **Date**: 2025-11-29 | **Spec**: specs/006-auth-personalization/spec.md
**Input**: Feature specification from `/specs/006-auth-personalization/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

The plan is to add authentication and personalization features to an existing Docusaurus book. This involves setting up a FastAPI backend for user authentication (signup, login, token verification) using JWT and bcrypt, and integrating Google Gemini API for content personalization based on user preferences. Frontend components in TypeScript will handle user interaction, local storage for session management and personal edits, and integration into the Docusaurus theme.

## Technical Context

**Language/Version**: Python 3.x (for FastAPI backend), TypeScript (for Docusaurus frontend)
**Primary Dependencies**: FastAPI, Uvicorn, python-jose, passlib (bcrypt), python-multipart (for backend); axios, @google/generative-ai, lucide-react (for frontend).
**Storage**: In-memory user storage or SQLite (for backend); localStorage (client-side for frontend).
**Testing**: pytest (for Python backend), Jest/React Testing Library (for TypeScript frontend).
**Target Platform**: Web (Docusaurus served application).
**Project Type**: Web application (frontend + backend).
**Performance Goals**:
*   Backend API: 98% of login/signup attempts successful within 5 seconds.
*   Frontend: Docusaurus book loads and displays content (original, personalized, or edited) for logged-in users within 2 seconds.
*   Personalization: Content personalization feature rewrites page content for 90% of requests to the Gemini API within 10 seconds.
**Constraints**:
*   Backend: JWT token expiration 7 days, HS256 algorithm.
*   Frontend: Content size limits for Gemini API (e.g., 200,000 characters) and localStorage (5-10 MB).
**Scale/Scope**:
*   Authentication: Handling user signup, login, and token verification.
*   Personalization: Content rewriting using Gemini API based on user preferences.
*   Editing: User-specific local page edits.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Constitution Evaluation**: The project's constitution (`.specify/memory/constitution.md`) is currently a template. Therefore, a comprehensive constitution check cannot be performed at this stage. However, based on general software engineering principles and the detailed requirements provided by the user, the proposed implementation aligns with typical best practices for modularity, security (bcrypt, JWT), and user experience. Specific principles regarding testing, observability, etc., will need to be defined in the constitution itself to allow for a proper check.

## Project Structure

### Documentation (this feature)

```text
specs/006-auth-personalization/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
# Option 2: Web application
backend/
├── src/
│   ├── models/           # For user and token models
│   ├── services/         # For database interaction with neondb
│   └── api/              # Main FastAPI app, authentication routes
└── tests/                # Unit and integration tests for backend

frontend/
├── src/
│   ├── components/       # Auth (SignupForm, LoginForm, AuthButton), PersonalizeButton, EditPageButton, ContentWrapper
│   ├── pages/            # signup.tsx, login.tsx
│   ├── services/         # authService.ts
│   ├── types/            # user.ts
│   ├── theme/DocItem/Layout/index.tsx   # Modified for ContentWrapper
│   └── theme/Navbar/index.tsx           # Modified for AuthButton
└── tests/                # Unit and integration tests for frontend
```

**Structure Decision**: The "Option 2: Web application" structure is selected as it directly aligns with the user's request for a separate FastAPI backend and Docusaurus frontend. The placeholder tree has been expanded to reflect the specific components and files mentioned in the feature specification.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A | N/A | N/A |
