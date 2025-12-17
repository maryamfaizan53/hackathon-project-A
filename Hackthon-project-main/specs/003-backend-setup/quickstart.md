# Quickstart: Backend Setup and Refactoring

**Date**: 2025-11-28
**Feature**: `specs/003-backend-setup`

This guide provides instructions on how to set up and run the refactored backend.

## 1. Prerequisites

- Python 3.9+
- `git`

## 2. Setup and Installation

1.  **Create a `backend` directory in the project root.**

2.  **Clone the source repository and copy the backend code:**
    ```bash
    git clone https://github.com/openai/openai-chatkit-advanced-samples.git .tmp/source
    cp -r .tmp/source/examples/customer-support/backend/* backend/
    rm -rf .tmp
    ```

3.  **Create and activate a virtual environment:**
    ```bash
    python -m venv .venv
    source .venv/bin/activate  # On Windows, use `.venv\Scripts\activate`
    ```

4.  **Install dependencies:**
    ```bash
    pip install -r backend/requirements.txt
    ```
    *(Note: A `requirements.txt` file will be created during the implementation phase based on the dependencies identified in `research.md`)*

## 3. Running the Application

1.  **Navigate to the `backend` directory:**
    ```bash
    cd backend
    ```

2.  **Run the application using uvicorn:**
    ```bash
    uvicorn app.main:app --reload
    ```
    *(Note: The exact command might differ slightly based on the final structure of the `main.py` file)*

## 4. Refactoring Steps (for implementation)

The implementation of this feature will involve the following steps:

1.  Delete `backend/app/meal_preferences.py` and `backend/app/title_agent.py`.
2.  Search and remove all imports and references to `meal_preferences` and `title_agent` in all `*.py` files within the `backend/app` directory.
