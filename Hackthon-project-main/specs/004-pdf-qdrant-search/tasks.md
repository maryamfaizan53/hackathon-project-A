---

description: "Task list template for feature implementation"
---

# Tasks: PDF Upload and Search System with Qdrant Vector Database

**Input**: Design documents from `/specs/004-pdf-qdrant-search/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The feature specification does not explicitly request test generation at this phase. However, unit tests for core functionalities will be included in the "Polish & Cross-Cutting Concerns" phase.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- All paths assume the project root unless otherwise specified. The main script is `upload.py`.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create `requirements.txt` file with specified dependencies (qdrant-client, pypdf, sentence-transformers, python-dotenv, pytest)
- [X] T002 Set up Python virtual environment and install dependencies from `requirements.txt`
- [X] T003 Create `upload.py` file with basic CLI structure (argparse)
- [ ] T004 Create `tests/unit/` directory (CANCELLED - Tests are not being generated)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T005 Implement configuration loading from `.env` file in `upload.py`
- [X] T006 Implement Qdrant client initialization (local or cloud) in `upload.py`
- [X] T007 Implement Qdrant collection creation/connection logic in `upload.py`
- [X] T008 Implement embedding model loading (`sentence-transformers`) in `upload.py`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Upload a PDF Document (Priority: P1) 🎯 MVP

**Goal**: As a user, I want to upload a PDF document so that its content is indexed and searchable in the Qdrant database.

**Independent Test**: Can be tested by uploading a single PDF and verifying a success message and chunk count.

### Implementation for User Story 1

- [X] T009 [US1] Implement command-line argument parsing for `upload` command in `upload.py`
- [X] T010 [US1] Implement PDF text extraction using `pypdf` in `upload.py`
- [X] T011 [US1] Implement text chunking logic (configurable size and overlap) in `upload.py`
- [X] T012 [US1] Implement batch embedding generation for text chunks in `upload.py`
- [X] T013 [US1] Implement storing embeddings with metadata in Qdrant in `upload.py`
- [X] T014 [US1] Implement success message output for upload in `upload.py`
- [X] T015 [US1] Implement error handling for invalid PDF path (file not found) in `upload.py`
- [X] T016 [US1] Implement error handling for empty PDF files in `upload.py`
- [X] T017 [US1] Implement error handling for Qdrant connection during upload in `upload.py`
- [X] T018 [US1] Implement error handling for PDF extraction errors in `upload.py`
- [X] T019 [US1] Implement error handling for embedding generation errors in `upload.py`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Search for Information in Uploaded PDFs (Priority: P1)

**Goal**: As a user, I want to search for information across the uploaded PDF documents using a query, so that I can find relevant content quickly.

**Independent Test**: Can be tested by uploading a PDF, then performing a search query and verifying relevant results are returned.

### Implementation for User Story 2

- [X] T020 [US2] Implement command-line argument parsing for `search` command in `upload.py`
- [X] T021 [US2] Implement embedding generation for search query in `upload.py`
- [X] T022 [US2] Implement similarity search in Qdrant in `upload.py`
- [X] T023 [US2] Implement displaying top K ranked results with score, file, page, and snippet in `upload.py`
- [X] T024 [US2] Implement handling of empty search query in `upload.py`
- [X] T025 [US2] Implement handling of no matching search results in `upload.py`
- [X] T026 [US2] Implement error handling for Qdrant connection during search in `upload.py`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - List Uploaded Documents (Priority: P2)

**Goal**: As a user, I want to see a list of all documents that have been uploaded to the Qdrant database, so I can keep track of the indexed content.

**Independent Test**: Run the list command after uploading documents and verify the correct list is displayed.

### Implementation for User Story 3

- [X] T027 [US3] Implement command-line argument parsing for `list` command in `upload.py`
- [X] T028 [US3] Implement fetching unique filenames from Qdrant in `upload.py`
- [X] T029 [US3] Implement displaying list of uploaded documents in `upload.py`
- [X] T030 [US3] Implement handling for no uploaded documents in `upload.py`
- [X] T031 [US3] Implement error handling for Qdrant connection during list in `upload.py`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T032 Add comprehensive unit tests for all core functionalities in `tests/unit/*.py` (CANCELLED - Tests are not being generated)
- [X] T033 Refine CLI output messages for better user experience in `upload.py`
- [X] T034 Update `README.md` with installation, configuration, and usage instructions in `README.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- **During Phase 3 (US1 Upload)**:
    *   T010 [US1]: Implement PDF text extraction.
    *   T011 [US1]: Implement text chunking logic.
    *   T012 [US1]: Implement batch embedding generation.
    *   T013 [US1]: Implement storing embeddings in Qdrant.
    These can be developed in parallel in separate functions/modules within `upload.py`.
- **During Phase 4 (US2 Search)**:
    *   T021 [US2]: Implement embedding generation for search query.
    *   T022 [US2]: Implement similarity search in Qdrant.
    These can be developed in parallel in separate functions/modules within `upload.py`.
- **Across User Stories (after Foundational)**:
    *   Tasks for US1, US2, and US3 can theoretically be implemented in parallel once Foundational tasks are complete, although US2 and US3 gain more immediate value once US1 is functional.

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies (not explicitly used here as most implementation tasks are within `upload.py`, but parallel development within functions is possible)
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
