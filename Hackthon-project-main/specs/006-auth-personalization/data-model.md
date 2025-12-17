# Data Model: Add Authentication and Personalization to Docusaurus Book

**Branch**: `006-auth-personalization` | **Date**: 2025-11-29 | **Spec**: specs/006-auth-personalization/spec.md

## Key Entities and Relationships

### 1. User

Represents a registered user of the Docusaurus book.

*   **Attributes**:
    *   `userId` (UUID): Unique identifier for the user. (Backend/Frontend)
    *   `email` (String): User's email address; must be unique. Used for login. (Backend/Frontend)
    *   `name` (String): User's display name. (Backend/Frontend)
    *   `hashed_password` (String): Securely hashed password using bcrypt. (Backend only)
    *   `preferences` (Object - see UserPreferences): Personalization preferences for content adaptation. (Backend/Frontend)
    *   `isLoggedIn` (Boolean): Frontend-only state indicating if the user is currently logged in. (Frontend only)
    *   `token` (String - JWT): JWT token for authentication. (Frontend only, received from backend)

*   **Relationships**:
    *   One-to-One with `UserPreferences`.
    *   One-to-Many with `Page Content` (edited), where `userId` links edited content to the user.

### 2. UserPreferences

Stores the personalization settings for a `User`.

*   **Attributes**:
    *   `level` (Enum: 'beginner', 'intermediate', 'advanced'): User's programming experience level.
    *   `languages` (Array of Strings): Programming languages the user knows.
    *   `aiExperience` (Enum: 'none', 'basic', 'intermediate', 'advanced'): User's AI/ML experience.
    *   `hardwareKnowledge` (Enum: 'basic', 'intermediate', 'advanced'): User's hardware knowledge.

*   **Relationships**:
    *   One-to-One with `User`.

### 3. JWT (JSON Web Token)

A standard for securely transmitting information between parties as a JSON object. Used for authentication.

*   **Attributes (Encoded within token)**:
    *   `sub` (Subject - typically `userId`): Identifies the principal that is the subject of the JWT.
    *   `email` (String): User's email.
    *   `exp` (Expiration Time - Unix timestamp): The time after which the JWT MUST NOT be accepted for processing.
    *   `iat` (Issued At Time - Unix timestamp): The time at which the JWT was issued.
    *   `alg` (Algorithm - HS256): The cryptographic algorithm used to secure the JWT.

*   **Relationships**:
    *   Issued by the Backend for a `User`, consumed by the Frontend.

### 4. Edited Page Content

Represents a user's personalized edits for a specific Docusaurus page, stored client-side.

*   **Attributes**:
    *   `page_identifier` (String): Unique key identifying the Docusaurus page (e.g., "page_intro", "page_chapter1").
    *   `html_content` (String): The edited HTML content of the page.
    *   `userId` (UUID): Identifier of the user who made the edits.

*   **Relationships**:
    *   Many-to-One with `User` (a user can have many edited pages).

## Data Validation Rules

*   **User Email**: Must be a valid email format, unique across all users.
*   **Password**: Minimum length (e.g., 8 characters), must contain a mix of character types (e.g., uppercase, lowercase, number, special character).
*   **UserPreferences Enums**: Values must adhere to the defined enumerations ('beginner', 'intermediate', 'advanced', etc.).
*   **JWT Token**: Must be valid (not expired, correctly signed, and parsed).
*   **Edited Page Content**: HTML content should be sanitized to prevent XSS attacks if rendered directly (though this is client-side, good practice). Size limits apply as per clarified edge cases.
