---
id: 005
title: Plan PDF Qdrant Search
stage: plan
date: 2025-11-29
surface: agent
model: gemini-1.5-pro
feature: 004-pdf-qdrant-search
branch: 004-pdf-qdrant-search
user: Ahmed
command: /sp.plan
labels: [plan, feature-planning, qdrant, pdf, search]
links:
  spec: specs/004-pdf-qdrant-search/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/004-pdf-qdrant-search/plan.md
  - specs/004-pdf-qdrant-search/research.md
  - specs/004-pdf-qdrant-search/data-model.md
  - specs/004-pdf-qdrant-search/contracts/cli_interface.md
  - specs/004-pdf-qdrant-search/quickstart.md
  - GEMINI.md
tests:
  - null
---

## Prompt

description: Execute the implementation planning workflow using the plan template to generate design artifacts.

## User Input

```text
$ARGUMENTS
```

## Outline

1. **Setup**: Run `.specify/scripts/powershell/setup-plan.ps1 -Json` from repo root and parse JSON for FEATURE_SPEC, IMPL_PLAN, SPECS_DIR, BRANCH. For single quotes in args like "I'm Groot", use escape syntax: e.g 'I'm Groot' (or double-quote if possible: "I'm Groot").

2. **Load context**: Read FEATURE_SPEC and `.specify/memory/constitution.md`. Load IMPL_PLAN template (already copied).

3. **Execute plan workflow**: Follow the structure in IMPL_PLAN template to:
   - Fill Technical Context (mark unknowns as "NEEDS CLARIFICATION")
   - Fill Constitution Check section from constitution
   - Evaluate gates (ERROR if violations unjustified)
   - Phase 0: Generate research.md (resolve all NEEDS CLARIFICATION)
   - Phase 1: Generate data-model.md, contracts/, quickstart.md
   - Phase 1: Update agent context by running the agent script
   - Re-evaluate Constitution Check post-design

4. **Stop and report**: Command ends after Phase 2 planning. Report branch, IMPL_PLAN path, and generated artifacts.

## Phases

### Phase 0: Outline & Research

1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:

   ```text
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

### Phase 1: Design & Contracts

**Prerequisites:** `research.md` complete

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Agent context update**:
   - Run `.specify/scripts/powershell/update-agent-context.ps1 -AgentType gemini`
   - These scripts detect which AI agent is in use
   - Update the appropriate agent-specific context file
   - Add only new technology from current plan
   - Preserve manual additions between markers

**Output**: data-model.md, /contracts/*, quickstart.md, agent-specific file

## Key rules

- Use absolute paths
- ERROR on gate failures or unresolved clarifications

## Response snapshot

Completed planning for feature `004-pdf-qdrant-search`.
Generated `specs/004-pdf-qdrant-search/plan.md`, `specs/004-pdf-qdrant-search/research.md`, `specs/004-pdf-qdrant-search/data-model.md`, `specs/004-pdf-qdrant-search/contracts/cli_interface.md`, `specs/004-pdf-qdrant-search/quickstart.md`, and updated `GEMINI.md`.

## Outcome

- ✅ Impact: The implementation plan, research, data model, CLI contracts, and quickstart guide have been generated for feature `004-pdf-qdrant-search`. The agent's context has been updated with relevant technology information.
- 🧪 Tests: No automated tests were run for this stage.
- 📁 Files: `specs/004-pdf-qdrant-search/plan.md`, `specs/004-pdf-qdrant-search/research.md`, `specs/004-pdf-qdrant-search/data-model.md`, `specs/004-pdf-qdrant-search/contracts/cli_interface.md`, `specs/004-pdf-qdrant-search/quickstart.md`, and `history/prompts/004-pdf-qdrant-search/005-plan-pdf-qdrant-search.plan.prompt.md` were created/modified. `GEMINI.md` was also updated.
- 🔁 Next prompts: The next step is to create implementation tasks (e.g., `/sp.tasks`).
- 🧠 Reflection: The planning process was smooth, with no ambiguities requiring user clarification. The `constitution.md` template issue remains, but was handled by marking as not applicable.

## Evaluation notes (flywheel)

- Failure modes observed: None during the planning process itself.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Address the `constitution.md` template to contain actual principles or provide a mechanism to configure them.
