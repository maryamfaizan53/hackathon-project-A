# Feature Specification: Add Authentication and Personalization to Docusaurus Book

**Feature Branch**: `006-auth-personalization`  
**Created**: 2025-11-29  
**Status**: Draft  
**Input**: User description: "Add Authentication and Personalization to Existing Docusaurus Book (TypeScript)"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - User Signup and Initial Personalization (Priority: P1)

*   **Description**: A new user can sign up for an account, providing basic authentication details and answering a series of background questions to set up their initial personalization preferences. Upon successful signup, they are automatically logged in, their preferences and token are saved locally, and they are redirected to the book homepage where personalized features become available.
*   **Why this priority**: Essential for onboarding new users and enabling personalization features. Without signup, no user-specific features are accessible.
*   **Independent Test**: Can be fully tested by creating a new user through the signup form and verifying that user data, token, and preferences are correctly stored and that the user is redirected to the homepage with personalized features (like the Personalize and Edit buttons) visible.
*   **Acceptance Scenarios**:
    1.  **Given** a user is on the signup page, **When** they fill in all required basic auth fields (email, password, name) and background questions (programming experience, languages, AI/ML experience, hardware knowledge), and submit the form, **Then** a new user account is created in the backend, a JWT token is returned, the token and user data (including preferences) are saved to localStorage, `isLoggedIn` is set to `true`, and the user is redirected to the book homepage.
    2.  **Given** a user is on the signup page, **When** they attempt to sign up with an email that already exists, **Then** an error message is displayed, and no new account is created.
    3.  **Given** a user is on the signup page, **When** they omit a required field, **Then** a validation error is displayed, and the form is not submitted.

### User Story 2 - User Login and Session Management (Priority: P1)

*   **Description**: A returning user can log in with their credentials. Upon successful login, their JWT token and user data are retrieved and saved locally. The system verifies their token on subsequent page loads to maintain their logged-in state, displaying personalized features if the token is valid, or prompting them to log in if it's expired or invalid.
*   **Why this priority**: Crucial for retaining existing users and allowing them to access their personalized experience.
*   **Independent Test**: Can be fully tested by logging in with existing credentials, verifying localStorage updates, navigating through pages to confirm persistent login state, and observing behavior when a token is simulated to expire.
*   **Acceptance Scenarios**:
    1.  **Given** a user is on the login page, **When** they enter valid email and password and submit the form, **Then** a JWT token is returned from the backend, the token and user data are saved to localStorage, `isLoggedIn` is set to `true`, and the user is redirected to the book homepage.
    2.  **Given** a user is on the login page, **When** they enter invalid credentials, **Then** an error message is displayed, and no token is saved.
    3.  **Given** a user is logged in, **When** they navigate to a new page or refresh the current page, **Then** the system checks for a valid JWT token in localStorage, verifies it with the backend (`/api/auth/me`), and maintains their logged-in status if valid, displaying personalized features.
    4.  **Given** a user is logged in with an expired or invalid token, **When** they refresh the page or navigate, **Then** the localStorage user data is cleared, and personalized features are hidden (user is effectively logged out).

### User Story 3 - Content Personalization (Priority: P2)

*   **Description**: A logged-in user can click a "Personalize for My Level" button on any chapter/page to dynamically rewrite the content to match their declared programming experience level (beginner, intermediate, advanced) using the Google Gemini API.
*   **Why this priority**: Delivers the core personalization value proposition of the feature.
*   **Independent Test**: Can be tested by logging in, navigating to a page, clicking the personalize button, and observing the content change according to the user's set preference. Requires mock Gemini API responses or a real API key for full verification.
*   **Acceptance Scenarios**:
    1.  **Given** a user is logged in, **When** they click "🎯 Personalize for My Level" button on a page, **Then** a loading indicator is shown, the page content and user's experience level are sent to the Gemini API, and the original page content is replaced with the Gemini API's rewritten response.
    2.  **Given** a user is logged in, **When** they click "🎯 Personalize for My Level" and the Gemini API call fails, **Then** an error message is displayed, and the page content remains unchanged.
    3.  **Given** a user is NOT logged in, **When** they view any page, **Then** the "🎯 Personalize for My Level" button is not visible.

### User Story 4 - Personal Page Editing (Priority: P2)

*   **Description**: A logged-in user can click an "Edit Page" button to enable content editing for the current page. Their edits are saved locally to their browser's localStorage, allowing them to maintain a personalized version of specific pages that persists across sessions. They can also reset to the original content.
*   **Why this priority**: Adds significant value by allowing users to tailor content beyond AI-driven personalization.
*   **Independent Test**: Can be tested by logging in, editing content on a page, saving changes, refreshing the page to confirm persistence, and then resetting changes.
*   **Acceptance Scenarios**:
    1.  **Given** a user is logged in, **When** they click "✏️ Edit Page" button, **Then** the page content becomes editable (contenteditable=true), and "Save Changes" and "Cancel" buttons appear.
    2.  **Given** a user is editing a page, **When** they make changes and click "Save Changes", **Then** the edited HTML is saved to localStorage under a user-specific key (`editedPages_${userId}`), and the "Save Changes" and "Cancel" buttons disappear.
    3.  **Given** a user has saved edited content for a page, **When** they revisit that page, **Then** their previously saved edited content is displayed instead of the original content.
    4.  **Given** a user is editing a page, **When** they click "Cancel", **Then** the page content reverts to its state before editing began (either original or previously saved edited content), and "Save Changes" and "Cancel" buttons disappear.
    5.  **Given** a user has edited content, **When** they click "Reset to Original", **Then** the edited content for that page is removed from localStorage, and the original page content is displayed.
    6.  **Given** a user is NOT logged in, **When** they view any page, **Then** the "✏️ Edit Page" button is not visible.

### User Story 5 - Navigation Bar Authentication Status (Priority: P3)

*   **Description**: The Docusaurus navigation bar dynamically displays "Login" and "Signup" buttons when a user is not logged in, and shows the user's name along with a "Logout" button when they are logged in.
*   **Why this priority**: Enhances user experience by providing clear visual cues about their authentication status and easy access to auth actions.
*   **Independent Test**: Can be tested by logging in, logging out, and observing the navigation bar changes.
*   **Acceptance Scenarios**:
    1.  **Given** a user is not logged in, **When** they view any page, **Then** the navigation bar displays "Login" and "Signup" buttons.
    2.  **Given** a user is logged in, **When** they view any page, **Then** the navigation bar displays the user's name and a "Logout" button.
    3.  **Given** a user is logged in, **When** they click the "Logout" button, **Then** their local storage is cleared, `isLoggedIn` is set to `false`, and the navigation bar reverts to showing "Login" and "Signup" buttons.

### Edge Cases

- **What happens when** the backend API is unreachable during signup/login/token verification?
    - The frontend should display a user-friendly error message (e.g., "Service unavailable, please try again later") and prevent form submission or content personalization.
- **How does the system handle** a user whose Gemini API key is invalid or reaches rate limits?
    - The frontend should display an error message (e.g., "Personalization service temporarily unavailable") and revert to showing the original content.
- **What happens when** a user clears their browser's local storage manually while logged in?
    - The system should detect the absence of `userData` on the next page load/refresh, treat the user as logged out, and prompt them to log in again.
- What happens when the Docusaurus content structure changes, and previously edited pages (stored in localStorage) no longer match the current page's content?
    - If a significant structural mismatch is detected, the system MUST always display the original Docusaurus content and notify the user that their saved edits are outdated and offer an option to delete them.
- How does the system handle very large page content being sent to the Gemini API for personalization, or very large edited content being saved to localStorage?
    - The system MUST adhere to the default payload limits of the Gemini API (e.g., 200,000 characters for prompt, actual limit depends on model and API version) and the browser's `localStorage` limit (typically 5-10 MB). Client-side validation and user warnings MUST be implemented if content exceeds these limits.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide endpoints for user registration (`POST /api/auth/signup`), user login (`POST /api/auth/login`), and JWT token verification (`GET /api/auth/me`) via a FastAPI backend.
- **FR-002**: The backend MUST generate and validate JWT tokens using HS256 algorithm with a 7-day expiration.
- **FR-003**: The backend MUST securely store user passwords using bcrypt hashing.
- **FR-004**: The backend MUST store user data, including unique `userId`, `email`, `name`, `hashed_password`, and `preferences` (level, languages, AI experience, hardware knowledge).
- **FR-005**: The frontend MUST allow new users to sign up, collecting email, password, name, and personalization preferences.
- **FR-006**: The frontend MUST allow existing users to log in with email and password.
- **FR-007**: The frontend MUST store the JWT token and user data (including `isLoggedIn` status) in `localStorage` with the key "userData" upon successful signup or login.
- **FR-008**: The frontend MUST verify the JWT token with the backend (`/api/auth/me`) on component mount (e.g., `AuthButton`, `ContentWrapper`) to validate login status.
- **FR-009**: The frontend MUST display a "Login" and "Signup" button in the navigation bar when the user is not logged in.
- **FR-010**: The frontend MUST display the logged-in user's name and a "Logout" button in the navigation bar when the user is logged in.
- **FR-011**: The frontend MUST provide a "🎯 Personalize for My Level" button on each documentation page, visible only to logged-in users.
- **FR-012**: When the "Personalize for My Level" button is clicked, the frontend MUST send the current page content and the user's stored `level` preference to the Google Gemini API for rewriting.
- **FR-013**: The frontend MUST replace the current page content with the response from the Google Gemini API.
- **FR-014**: The frontend MUST display a loading spinner during API calls for personalization and authentication.
- **FR-015**: The frontend MUST handle API errors gracefully, displaying user-friendly messages instead of crashing.
- **FR-016**: The frontend MUST provide an "✏️ Edit Page" button on each documentation page, visible only to logged-in users.
- **FR-017**: When the "Edit Page" button is clicked, the frontend MUST enable `contenteditable` for the page content and display "Save Changes" and "Cancel" buttons.
- **FR-018**: When "Save Changes" is clicked during editing, the frontend MUST store the edited HTML content in `localStorage` under a key `editedPages_${userId}`.
- **FR-019**: On page load, the frontend MUST check `localStorage` for `editedPages_${userId}` and display the user's edited content if available, otherwise display the original content.
- **FR-020**: When "Cancel" is clicked during editing, the frontend MUST revert the page content to its state before the current editing session (either original or previously saved edited content).
- **FR-021**: The frontend MUST provide a "Reset to Original" button during editing to remove the user's edited content from `localStorage` and display the original page content.
- **FR-022**: The frontend MUST wrap all Docusaurus page content with a `ContentWrapper` component to manage the display of personalization and editing features based on login status.
- **FR-023**: The frontend MUST include dedicated signup and login pages (`src/pages/signup.tsx`, `src/pages/login.tsx`).

### Key Entities *(include if feature involves data)*

-   **User**: Represents a registered user with a unique ID, email, name, hashed password, and personalization preferences.
-   **Preferences**: Stores a user's chosen programming experience level, known programming languages, AI experience, and hardware knowledge, used for content personalization.
-   **JWT (JSON Web Token)**: A secure token used for authenticating API requests and maintaining user sessions.
-   **Page Content**: The text and HTML structure of a Docusaurus documentation page, which can be personalized by AI or edited by the user.

## Success Criteria *(mandatory)*

### Measurable Outcomes

-   **SC-001**: 95% of users successfully complete the signup process within 3 minutes on their first attempt.
-   **SC-002**: 98% of login attempts by registered users are successful within 5 seconds.
-   **SC-003**: The Docusaurus book loads and displays content (original, personalized, or edited) for logged-in users within 2 seconds.
-   **SC-004**: The content personalization feature successfully rewrites page content for 90% of requests to the Gemini API within 10 seconds.
-   **SC-005**: 100% of user edits to page content are successfully saved to and retrieved from `localStorage`.
-   **SC-006**: The authentication status in the navigation bar accurately reflects the user's logged-in state within 1 second of page load or auth action.
