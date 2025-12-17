# Research Findings: Add Authentication and Personalization to Docusaurus Book

**Branch**: `006-auth-personalization` | **Date**: 2025-11-29 | **Spec**: specs/006-auth-personalization/spec.md

## Research Decisions and Rationale

This section documents key technical decisions made for this feature, even when explicitly provided by the user in the initial specification.

### 1. Authentication Method

- **Decision**: JWT (JSON Web Tokens) with FastAPI backend.
- **Rationale**: User explicitly requested this method for stateless authentication, suitable for API-driven applications and providing a clear mechanism for token-based authorization. HS256 algorithm and 7-day expiration align with common security practices for web applications.
- **Alternatives Considered**: Session-based authentication (rejected due to explicit request for JWT), OAuth2 (more complex than needed for this scope).

### 2. Personalization Engine

- **Decision**: Google Gemini API.
- **Rationale**: User explicitly requested the Google Gemini API for content personalization, leveraging its generative AI capabilities to adapt content difficulty based on user profiles.
- **Alternatives Considered**: Other large language models (e.g., Claude, OpenAI GPT) were not considered due to explicit user directive.

### 3. Client-Side Storage for Session & Edits

- **Decision**: `localStorage`.
- **Rationale**: User explicitly requested `localStorage` for storing user data, JWT tokens, and personal page edits. This provides simple, client-side persistence that meets the requirement for personal edits not requiring a backend database.
- **Alternatives Considered**: `sessionStorage` (rejected as it does not persist across browser sessions), cookies (more suitable for server-side management, though can be used client-side, `localStorage` is simpler for direct key-value storage).

### 4. Backend User Storage

- **Decision**: neondb.
- **Rationale**: User specified "neondb". This provides a scalable and persistent database solution for user data.
- **Alternatives Considered**: PostgreSQL, MongoDB, other relational/NoSQL databases (rejected in favor of neondb for the initial phase).
