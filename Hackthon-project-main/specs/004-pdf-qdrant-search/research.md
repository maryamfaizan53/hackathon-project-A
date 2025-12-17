# Research Findings: PDF Upload and Search System with Qdrant Vector Database

**Branch**: `004-pdf-qdrant-search` | **Date**: 2025-11-29 | **Spec**: [specs/004-pdf-qdrant-search/spec.md](specs/004-pdf-qdrant-search/spec.md)
**Plan**: [specs/004-pdf-qdrant-search/plan.md](specs/004-pdf-qdrant-search/plan.md)

## Summary

The technical context for this feature was largely self-contained within the user's initial prompt. No significant ambiguities or external research requirements were identified during the initial planning phase.

## Decisions

*   **Decision**: Use `pypdf` for PDF text extraction.
    *   **Rationale**: The user suggested `PyPDF2` or `pypdf`. `pypdf` is the successor and actively maintained, offering similar functionality.
    *   **Alternatives considered**: `PyPDF2` (older, less maintained).
*   **Decision**: Use `sentence-transformers` with `all-MiniLM-L6-v2` for embeddings.
    *   **Rationale**: Explicitly requested by the user. This is a common and efficient model for sentence embeddings.
    *   **Alternatives considered**: Other embedding models (not explored as user specified).
*   **Decision**: Use `qdrant-client` for Qdrant interaction.
    *   **Rationale**: Explicitly requested by the user.
    *   **Alternatives considered**: None (user specified).
*   **Decision**: Use `python-dotenv` for environment variable loading.
    *   **Rationale**: Explicitly mentioned as an optional dependency by the user for configuration.
    *   **Alternatives considered**: Direct OS environment variables (less convenient for local development).
*   **Decision**: Use `pytest` for testing.
    *   **Rationale**: Common and robust testing framework for Python projects.
    *   **Alternatives considered**: `unittest` (built-in, but `pytest` is generally preferred for its features and ease of use).

## Further Considerations

None identified at this stage. All necessary technical choices and dependencies were clearly articulated or implicitly derivable from the user's detailed request.
