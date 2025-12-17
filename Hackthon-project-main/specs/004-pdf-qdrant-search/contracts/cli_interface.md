# CLI Interface Contracts: PDF Upload and Search System

**Branch**: `004-pdf-qdrant-search` | **Date**: 2025-11-29 | **Spec**: [specs/004-pdf-qdrant-search/spec.md](specs/004-pdf-qdrant-search/spec.md)
**Plan**: [specs/004-pdf-qdrant-search/plan.md](specs/004-pdf-qdrant-search/plan.md)
**Research**: [specs/004-pdf-qdrant-search/research.md](specs/004-pdf-qdrant-search/research.md)
**Data Model**: [specs/004-pdf-qdrant-search/data-model.md](specs/004-pdf-qdrant-search/data-model.md)

## Overview

This document defines the command-line interface (CLI) contracts for the PDF Upload and Search System. The system will expose its functionality through a single Python script (`upload.py`) that accepts subcommands and arguments.

## Commands

### 1. `upload` Command

**Description**: Uploads a PDF file, extracts its text, generates embeddings, and stores them in Qdrant.

*   **Usage**: `python upload.py upload <pdf_file_path>`
*   **Arguments**:
    *   `<pdf_file_path>` (required): Path to the PDF file to be uploaded.
*   **Input**:
    *   PDF file content from `<pdf_file_path>`.
    *   Optional environment variables for Qdrant connection and chunking parameters.
*   **Output (stdout)**:
    ```
    Uploading PDF: <filename>
    Extracting text... Done
    Creating <N> chunks...
    Generating embeddings...
    Uploading to Qdrant...
    ✓ Successfully uploaded <N> chunks from <filename>
    ```
*   **Output (stderr)**: Error messages for file not found, PDF extraction errors, Qdrant connection issues, etc.
*   **Exit Codes**:
    *   `0`: Success.
    *   `1`: Failure (e.g., file not found, invalid arguments, Qdrant error).

### 2. `search` Command

**Description**: Searches the indexed PDF content in Qdrant for a given query.

*   **Usage**: `python upload.py search "<query_text>"`
*   **Arguments**:
    *   `<query_text>` (required): The search query string.
*   **Input**:
    *   Search query string.
    *   Optional environment variables for Qdrant connection.
*   **Output (stdout)**: Top K ranked results.
    ```
    Searching for: "<query_text>"

    Results:
    1. Score: <similarity_score> | File: <filename> | Page: <page_number>
       "<text_snippet>"
    ... (up to Top K results)
    ```
    If no results:
    ```
    Searching for: "<query_text>"
    No relevant results found.
    ```
*   **Output (stderr)**: Error messages for invalid arguments, Qdrant connection issues.
*   **Exit Codes**:
    *   `0`: Success (results found or no results found gracefully).
    *   `1`: Failure (e.g., invalid arguments, Qdrant error).

### 3. `list` Command (Optional)

**Description**: Lists all unique filenames of documents that have been uploaded to the Qdrant collection.

*   **Usage**: `python upload.py list`
*   **Arguments**: None.
*   **Input**: Optional environment variables for Qdrant connection.
*   **Output (stdout)**: List of uploaded filenames.
    ```
    Uploaded Documents:
    - document1.pdf
    - document2.pdf
    ```
    If no documents:
    ```
    No documents uploaded yet.
    ```
*   **Output (stderr)**: Error messages for Qdrant connection issues.
*   **Exit Codes**:
    *   `0`: Success.
    *   `1`: Failure (e.g., Qdrant error).

## Configuration (via Environment Variables)

The following environment variables can be used to configure the system:

*   `QDRANT_HOST`
*   `QDRANT_PORT`
*   `QDRANT_API_KEY`
*   `COLLECTION_NAME`
*   `EMBEDDING_MODEL`
*   `CHUNK_SIZE`
*   `CHUNK_OVERLAP`

## Error Handling

*   **File Not Found**: System should output an informative error message to `stderr`.
*   **Qdrant Connection Errors**: System should output an informative error message to `stderr`.
*   **Invalid Command-Line Arguments**: System should output usage information and an error message to `stderr`.
*   **PDF Extraction Errors**: System should log/report specific page/document extraction failures and continue processing other parts if possible.
*   **Embedding Generation Errors**: System should report error and skip processing affected chunks.
