# Data Model: PDF Upload and Search System with Qdrant Vector Database

**Branch**: `004-pdf-qdrant-search` | **Date**: 2025-11-29 | **Spec**: [specs/004-pdf-qdrant-search/spec.md](specs/004-pdf-qdrant-search/spec.md)
**Plan**: [specs/004-pdf-qdrant-search/plan.md](specs/004-pdf-qdrant-search/plan.md)
**Research**: [specs/004-pdf-qdrant-search/research.md](specs/004-pdf-qdrant-search/research.md)

## Entities

### PDF Document

Represents a PDF file uploaded to the system.

*   **filename** (string): The original name of the PDF file.
*   **file_path** (string): The local path to the PDF file (for extraction purposes, not stored in Qdrant).
*   **content** (text): The extracted text content of the entire PDF (intermediate, not stored directly in Qdrant).
*   **pages** (list of text): List of text content per page (intermediate, not stored directly in Qdrant).

### Text Chunk

A segment of text extracted from a PDF page, used for embedding and indexing in Qdrant.

*   **text** (string): The actual text content of the chunk.
*   **filename** (string): The name of the source PDF file.
*   **page_number** (int): The page number within the PDF where the chunk originated.
*   **chunk_index** (int): A unique index for the chunk within its source PDF and page.
*   **embedding** (list of floats): The vector representation of the text chunk. This is the primary data stored in Qdrant points.

### Vector Embedding

A numerical representation of a text segment (chunk or search query) in a high-dimensional space.

*   **vector** (list of floats): The array of floating-point numbers representing the text. The size is dependent on the embedding model (e.g., 384 for `all-MiniLM-L6-v2`).

### Qdrant Collection

A named logical container within the Qdrant vector database that stores vector points (embeddings with metadata).

*   **name** (string): User-configurable name for the collection (default: "pdf_documents").
*   **vector_size** (int): Dimensionality of the vectors stored in the collection (e.g., 384).
*   **distance_metric** (string): The metric used for similarity search (e.g., "Cosine").

### Search Query

The natural language input provided by the user to find relevant information.

*   **query_text** (string): The raw text of the user's search query.
*   **query_embedding** (list of floats): The vector representation of the search query text, used for similarity search against stored text chunk embeddings.

## Relationships

*   A **PDF Document** is broken down into multiple **Text Chunks**.
*   Each **Text Chunk** has one associated **Vector Embedding**.
*   **Vector Embeddings** of **Text Chunks** are stored within a **Qdrant Collection** along with **Text Chunk** metadata.
*   A **Search Query** generates a **Query Embedding** which is used to find similar **Vector Embeddings** in the **Qdrant Collection**.
