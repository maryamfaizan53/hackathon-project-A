# Quickstart Guide: Add Authentication and Personalization to Docusaurus Book

**Branch**: `006-auth-personalization` | **Date**: 2025-11-29 | **Spec**: specs/006-auth-personalization/spec.md

This guide provides a quick overview of how to set up and run the authentication and personalization features for the Docusaurus book.

## 1. Backend Setup (FastAPI)

The backend provides the authentication API for user signup, login, and token verification.

### Prerequisites

*   Python 3.8+
*   `pip` (Python package installer)

### Installation

1.  Navigate to the `backend/` directory in your project root:
    ```bash
    cd backend/
    ```
2.  Install the required Python dependencies:
    ```bash
    pip install fastapi uvicorn python-jose[cryptography] passlib[bcrypt] python-multipart "uvicorn[standard]"
    # Note: If using neondb, ensure you install a PostgreSQL client library (e.g., `psycopg2-binary`) and configure database connection string in your application.
    # pip install psycopg2-binary
    ```

### Configuration

1.  Create a `.env` file in the `backend/` directory:
    ```
    SECRET_KEY=your_secure_jwt_secret_key_here
    ALGORITHM=HS256
    ACCESS_TOKEN_EXPIRE_DAYS=7
    ```
    *Replace `your_secure_jwt_secret_key_here` with a strong, random key.*

### Run the Backend

1.  From the `backend/` directory, start the FastAPI application:
    ```bash
    uvicorn main:app --reload --port 8000
    ```
    The API will be accessible at `http://localhost:8000`.

## 2. Frontend Setup (Docusaurus)

The frontend integrates the authentication and personalization features into the Docusaurus book.

### Prerequisites

*   Node.js (LTS version recommended)
*   `npm` or `yarn` (Node.js package manager)

### Installation

1.  Navigate to the `frontend/` directory in your project root:
    ```bash
    cd frontend/
    ```
2.  Install the required Node.js dependencies:
    ```bash
    npm install axios @google/generative-ai lucide-react
    ```

### Configuration

1.  Create a `.env` file in the `frontend/` directory:
    ```
    GEMINI_API_KEY=your_gemini_api_key_here
    REACT_APP_API_URL=http://localhost:8000
    ```
    *Replace `your_gemini_api_key_here` with your actual Google Gemini API key.*

### Run the Frontend

1.  From the `frontend/` directory, start the Docusaurus application:
    ```bash
    npm start
    ```
    The Docusaurus book will typically be accessible at `http://localhost:3000`.

## 3. Post-Setup

*   **Access the Frontend**: Open your browser to the Docusaurus application URL (e.g., `http://localhost:3000`).
*   **Sign Up/Login**: Use the new signup and login pages to register and authenticate.
*   **Personalization**: Once logged in, navigate to any documentation page and use the "🎯 Personalize for My Level" button.
*   **Editing**: Use the "✏️ Edit Page" button to make and save personal edits.

