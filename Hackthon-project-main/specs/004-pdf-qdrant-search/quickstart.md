# Quickstart Guide: PDF Upload and Search System

**Branch**: `004-pdf-qdrant-search` | **Date**: 2025-11-29 | **Spec**: [specs/004-pdf-qdrant-search/spec.md](specs/004-pdf-qdrant-search/spec.md)
**Plan**: [specs/004-pdf-qdrant-search/plan.md](specs/004-pdf-qdrant-search/plan.md)
**Research**: [specs/004-pdf-qdrant-search/research.md](specs/004-pdf-qdrant-search/research.md)
**Data Model**: [specs/004-pdf-qdrant-search/data-model.md](specs/004-pdf-qdrant-search/data-model.md)
**CLI Contracts**: [specs/004-pdf-qdrant-search/contracts/cli_interface.md](specs/004-pdf-qdrant-search/contracts/cli_interface.md)

## Overview

This guide provides a quick setup and usage instructions for the PDF Upload and Search System with Qdrant.

## Prerequisites

*   Python 3.8+ installed.
*   A running Qdrant instance (local or Qdrant Cloud).
    *   For a local instance, you can run it via Docker: `docker run -p 6333:6333 -p 6334:6334 qdrant/qdrant`

## Installation

1.  **Clone the repository** (if applicable, otherwise navigate to your project directory).
2.  **Install dependencies**:
    ```bash
    pip install qdrant-client pypdf sentence-transformers python-dotenv
    ```

## Configuration (Optional)

You can configure the system using environment variables. Create a `.env` file in the same directory as `upload.py` with the following content (adjust values as needed):

```dotenv
QDRANT_HOST=localhost
QDRANT_PORT=6333
QDRANT_API_KEY=
COLLECTION_NAME=pdf_documents
EMBEDDING_MODEL=all-MiniLM-L6-v2
CHUNK_SIZE=800
CHUNK_OVERLAP=200
```
*   `QDRANT_HOST`: Address of your Qdrant instance.
*   `QDRANT_PORT`: Port of your Qdrant instance.
*   `QDRANT_API_KEY`: Your API key if using Qdrant Cloud (leave empty for local).
*   `COLLECTION_NAME`: The name of the Qdrant collection to use.
*   `EMBEDDING_MODEL`: The sentence-transformer model to use for embeddings.
*   `CHUNK_SIZE`: Size of text chunks for embedding.
*   `CHUNK_OVERLAP`: Overlap between text chunks.

## Usage

Ensure you are in the directory containing `upload.py`.

### 1. Upload a PDF

To upload a PDF document:

```bash
python upload.py upload <path_to_your_pdf_file.pdf>
```
Example:
```bash
python upload.py upload my_document.pdf
```
Upon successful upload, you will see a confirmation message indicating the number of chunks uploaded.

### 2. Search PDF Content

To search for information within the uploaded PDFs:

```bash
python upload.py search "<your_search_query>"
```
Example:
```bash
python upload.py search "machine learning applications"
```
The system will return a ranked list of relevant text snippets, including similarity score, source file, and page number.

### 3. List Uploaded Documents (Optional)

To see a list of all PDFs currently indexed in the Qdrant collection:

```bash
python upload.py list
```
This will display the filenames of all documents that have been successfully uploaded.
