# Research: Backend Setup and Refactoring

**Date**: 2025-11-28
**Feature**: `specs/003-backend-setup`

This document summarizes the research conducted to resolve the `NEEDS CLARIFICATION` markers in the implementation plan.

## 1. Python Dependencies

### Decision
The Python dependencies for the customer support backend are defined in the `pyproject.toml` file located in `examples/customer-support/backend`.

### Rationale
A `pyproject.toml` file was found in the target directory of the source repository. This file explicitly lists the project's dependencies.

### Findings
The required dependencies are:
- `fastapi>=0.114.1,<0.116`
- `httpx>=0.28,<0.29`
- `uvicorn[standard]>=0.36,<0.37`
- `openai>=1.40`
- `openai-chatkit>=1.1.2,<2`

The development dependencies are:
- `ruff>=0.6.4,<0.7`
- `mypy>=1.8,<2`

## 2. Testing Strategy

### Decision
No existing test suite was found for the backend. Therefore, the testing strategy will be to rely on manual testing and running the application to ensure the refactoring was successful. If new functionality were being added, a testing framework like `pytest` would be introduced.

### Rationale
A full recursive search of the `examples/customer-support/backend` directory in the source repository revealed no testing-related files or directories (e.g., a `tests/` directory or files named `test_*.py`).

### Alternatives considered
- Introducing `pytest` and writing a basic test suite for the refactoring. This was rejected as it is out of scope for the current task, which is only to remove existing functionality.
