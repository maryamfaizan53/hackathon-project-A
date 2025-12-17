# Tasks: Backend Setup and Refactoring

**Input**: Design documents from `specs/003-backend-setup/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and code acquisition.

- [X] T001 Create `backend` directory in the project root.
- [X] T002 Clone `https://github.com/openai/openai-chatkit-advanced-samples.git` into a temporary directory `.tmp/source`.
- [X] T003 Copy the contents of `.tmp/source/examples/customer-support/backend` to the `backend` directory.
- [X] T004 Create a `requirements.txt` file in the `backend` directory with the dependencies from `research.md`.
- [X] T005 [P] Create and activate a Python virtual environment (e.g., in `.venv`).
- [X] T006 Install the dependencies from `backend/requirements.txt` into the virtual environment.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: No foundational tasks are required for this feature, as it is a refactoring of an existing application.

---

## Phase 3: User Story 1 - Simplified Backend Maintenance (Priority: P1) 🎯 MVP

**Goal**: Refactor the backend to remove `meal_preferences` and `title_agent` functionality, simplifying the codebase for easier maintenance.

**Independent Test**: The refactored backend can be run, and its core functionalities can be tested manually. Verification will show that the meal preference and title agent features are completely gone and the application runs without errors.

### Implementation for User Story 1

- [X] T007 [US1] Delete the file `backend/app/meal_preferences.py`.
- [X] T008 [US1] Delete the file `backend/app/title_agent.py`.
- [X] T009 [US1] In `backend/app/main.py`, remove the imports for `meal_preferences` and `title_agent`.
- [X] T010 [US1] In `backend/app/main.py`, remove any function calls or router configurations related to meal preferences.
- [X] T011 [US1] In `backend/app/main.py`, remove any function calls or router configurations related to the title agent.
- [X] T012 [P] [US1] Search for and remove any remaining references to `meal_preferences` or `title_agent` in all other `*.py` files under the `backend/app` directory.

**Checkpoint**: At this point, the backend should be free of the removed features and should be runnable.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Verify the refactoring and clean up.

- [ ] T013 Run the application using `uvicorn app.main:app --reload` from the `backend` directory to ensure it starts without errors.
- [ ] T014 Manually test the core functionality of the support agent (e.g., by sending a message) to verify it still works as expected.
- [ ] T015 [P] Clean up any temporary files or directories created during the setup process (e.g., `.tmp/source`).
- [ ] T016 [P] Validate that the `quickstart.md` instructions are accurate.

---

## Dependencies & Execution Order

### Phase Dependencies
- **Setup (Phase 1)**: Must be completed first.
- **User Story 1 (Phase 3)**: Depends on Setup completion.
- **Polish (Phase 4)**: Depends on User Story 1 completion.

### Parallel Opportunities
- Within Setup (Phase 1), T005 can be done in parallel with T002-T004.
- Within User Story 1 (Phase 3), T012 can be done in parallel with T009-T011 after T007 and T008 are complete.
- Within Polish (Phase 4), T015 and T016 can be done in parallel.

---

## Implementation Strategy

### MVP First (User Story 1 Only)
1.  Complete Phase 1: Setup.
2.  Complete Phase 3: User Story 1.
3.  Complete Phase 4: Polish.
4.  **STOP and VALIDATE**: Test the final application manually to ensure the refactoring was successful and the application is stable.
