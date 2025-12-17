# Feature Specification: PDF Upload and Search System with Qdrant Vector Database

**Feature Branch**: `004-pdf-qdrant-search`  
**Created**: November 29, 2025  
**Status**: Draft  
**Input**: User description: "# PDF Upload and Search System with Qdrant Vector Database

## Overview
Create a Python script that uploads PDF files to Qdrant vector database and provides search functionality for testing within the same file.

## File Structure
```
current_folder/
├── upload.py
└── (PDF files to be uploaded)
```

## Requirements

### Dependencies
- Python 3.8+
- qdrant-client
- PyPDF2 or pypdf (for PDF text extraction)
- sentence-transformers (for embeddings)
- python-dotenv (optional, for environment variables)

### Installation
```bash
pip install qdrant-client pypdf sentence-transformers python-dotenv
```

## Functionality

### Core Features

#### 1. PDF Upload Mode
- Accept PDF file path as command-line argument
- Extract text content from all pages of the PDF
- Split extracted text into manageable chunks (e.g., 500-1000 characters with overlap)
- Generate vector embeddings using sentence-transformers (e.g., 'all-MiniLM-L6-v2')
- Store vectors with metadata in Qdrant collection
- Metadata should include: filename, page number, chunk index, original text

#### 2. Search Mode
- Accept search query as command-line argument
- Convert query to vector embedding using same model
- Perform similarity search in Qdrant
- Return top K results (e.g., top 5) with:
  - Similarity score
  - Source filename
  - Page number
  - Matched text chunk

#### 3. Qdrant Configuration
- Connection: Local Qdrant instance or Qdrant Cloud
- Collection name: "pdf_documents" (configurable)
- Vector size: Based on embedding model (384 for all-MiniLM-L6-v2)
- Distance metric: Cosine similarity

## Command-Line Interface

### Upload Command
```bash
python upload.py upload <pdf_file_path>
```
Example:
```bash
python upload.py upload document.pdf
```

### Search Command
```bash
python upload.py search "<query_text>"
```
Example:
```bash
python upload.py search "machine learning algorithms"
```

### List Command (Optional)
```bash
python upload.py list
```
Lists all uploaded documents in the collection.

## Configuration

### Environment Variables (Optional)
```
QDRANT_HOST=localhost
QDRANT_PORT=6333
QDRANT_API_KEY=<your_api_key>  # If using Qdrant Cloud
COLLECTION_NAME=pdf_documents
EMBEDDING_MODEL=all-MiniLM-L6-v2
CHUNK_SIZE=800
CHUNK_OVERLAP=200
```

### Default Settings
- Qdrant Host: `localhost:6333` (local instance)
- Collection Name: `pdf_documents`
- Embedding Model: `all-MiniLM-L6-v2`
- Chunk Size: 800 characters
- Chunk Overlap: 200 characters
- Top K Results: 5

## Expected Behavior

### Upload Process
1. Validate PDF file exists
2. Extract text from PDF
3. Chunk the text with overlaps
4. Generate embeddings for each chunk
5. Create/connect to Qdrant collection
6. Upload vectors with metadata
7. Display success message with number of chunks uploaded

### Search Process
1. Validate search query is provided
2. Generate embedding for query
3. Search Qdrant collection
4. Display ranked results with:
   - Rank number
   - Similarity score (0-1)
   - Source file and page
   - Text snippet (first 200 characters)

## Error Handling
- File not found errors
- Qdrant connection errors
- Invalid command-line arguments
- Empty PDF files
- PDF extraction errors
- Embedding generation errors

## Output Format

### Upload Output
```
Uploading PDF: document.pdf
Extracting text... Done
Creating 25 chunks...
Generating embeddings...
Uploading to Qdrant...
✓ Successfully uploaded 25 chunks from document.pdf
```

### Search Output
```
Searching for: "machine learning algorithms"

Results:
1. Score: 0.87 | File: document.pdf | Page: 5
   "Machine learning algorithms are divided into supervised and unsupervised..."

2. Score: 0.82 | File: document.pdf | Page: 12
   "Common algorithms include decision trees, neural networks, and..."

3. Score: 0.78 | File: document.pdf | Page: 8
   "The choice of algorithm depends on the problem type and data..."
```

## Testing Checklist
- [ ] Upload single PDF successfully
- [ ] Upload multiple PDFs
- [ ] Search returns relevant results
- [ ] Search handles typos/variations
- [ ] Empty search query handled
- [ ] Non-existent file handled
- [ ] Qdrant connection failures handled
- [ ] Large PDF files processed correctly
- [ ] Special characters in PDF handled

## Notes
- The script should create the Qdrant collection automatically if it doesn't exist
- Use UTF-8 encoding for text extraction
- Handle multi-page PDFs efficiently
- Consider memory usage for large PDFs
- Embeddings should be generated in batches for efficiency
"

## User Scenarios & Testing

### User Story 1 - Upload a PDF Document (Priority: P1)

As a user, I want to upload a PDF document so that its content is indexed and searchable in the Qdrant database.

**Why this priority**: This is the foundational capability. Without uploading, there's nothing to search.

**Independent Test**: Can be tested by uploading a single PDF and verifying a success message and chunk count.

**Acceptance Scenarios**:

1.  **Given** a valid PDF file path, **When** the upload command is executed, **Then** the system should extract text, chunk it, generate embeddings, and store them in Qdrant, displaying a success message with the number of chunks.
2.  **Given** an invalid PDF file path, **When** the upload command is executed, **Then** the system should display a "file not found" error.
3.  **Given** an empty PDF file, **When** the upload command is executed, **Then** the system should display an appropriate error or warning and not upload any chunks.
4.  **Given** a Qdrant connection error, **When** the upload command is executed, **Then** the system should display a connection error message.

---

### User Story 2 - Search for Information in Uploaded PDFs (Priority: P1)

As a user, I want to search for information across the uploaded PDF documents using a query, so that I can find relevant content quickly.

**Why this priority**: This is the primary value proposition of the system.

**Independent Test**: Can be tested by uploading a PDF and then performing a search query and verifying the results.

**Acceptance Scenarios**:

1.  **Given** uploaded PDF documents and a valid search query, **When** the search command is executed, **Then** the system should return the top K relevant results, including similarity score, filename, page number, and a text snippet.
2.  **Given** an empty search query, **When** the search command is executed, **Then** the system should display an error message for an invalid query.
3.  **Given** a search query with no matching results, **When** the search command is executed, **Then** the system should indicate that no relevant results were found.
4.  **Given** a Qdrant connection error, **When** the search command is executed, **Then** the system should display a connection error message.

---

### User Story 3 - List Uploaded Documents (Priority: P2)

As a user, I want to see a list of all documents that have been uploaded to the Qdrant database, so I can keep track of the indexed content.

**Why this priority**: This provides visibility and management capability, useful after core functionality is established.

**Independent Test**: Can be tested by running the list command after uploading documents.

**Acceptance Scenarios**:

1.  **Given** uploaded PDF documents, **When** the list command is executed, **Then** the system should display a list of all unique filenames that have been processed and stored in Qdrant.
2.  **Given** no uploaded PDF documents, **When** the list command is executed, **Then** the system should indicate that no documents have been uploaded.

---

### Edge Cases

-   **What happens when** a PDF contains images without extractable text?
    -   **Handling**: The system will only index text content. Non-textual content will be ignored.
-   **How does system handle** very large PDF files (e.g., hundreds or thousands of pages)?
    -   **Handling**: The system will process page by page, chunking text and generating embeddings in batches to manage memory.
-   **What if** text extraction from a PDF fails for a specific page or the entire document?
    -   **Handling**: The system will log the error for the problematic page/document and attempt to continue processing other pages/documents. For entirely failed PDFs, it will report the failure to the user.
-   **What if** the embedding model is unavailable or fails to generate embeddings for a chunk?
    -   **Handling**: The system will report an embedding generation error and skip uploading that specific chunk.

## Requirements

### Functional Requirements

-   **FR-001**: The system MUST accept a PDF file path as a command-line argument for upload.
-   **FR-002**: The system MUST extract text content from all pages of the provided PDF.
-   **FR-003**: The system MUST split extracted text into manageable chunks (configurable size and overlap).
-   **FR-004**: The system MUST generate vector embeddings for each text chunk using a specified sentence-transformer model.
-   **FR-005**: The system MUST store these vector embeddings in a Qdrant collection, along with metadata (filename, page number, chunk index, original text).
-   **FR-006**: The system MUST automatically create the Qdrant collection if it does not exist, with a configurable name, vector size (based on embedding model), and cosine distance metric.
-   **FR-007**: The system MUST accept a search query as a command-line argument for searching.
-   **FR-008**: The system MUST convert the search query into a vector embedding using the same model used for PDF content.
-   **FR-009**: The system MUST perform a similarity search in the Qdrant collection.
-   **FR-010**: The system MUST return the top K (configurable) most similar results, displaying similarity score, source filename, page number, and the matched text chunk.
-   **FR-011**: The system MUST provide an optional command to list all unique filenames of documents uploaded to the Qdrant collection.
-   **FR-012**: The system MUST handle command-line argument parsing and validation.
-   **FR-013**: The system MUST gracefully handle file not found errors for PDF paths.
-   **FR-014**: The system MUST gracefully handle Qdrant connection errors.
-   **FR-015**: The system MUST gracefully handle empty PDF files or PDF extraction errors.
-   **FR-016**: The system MUST support UTF-8 encoding for text extraction.
-   **FR-017**: The system MUST allow configuration via environment variables (QDRANT_HOST, QDRANT_PORT, QDRANT_API_KEY, COLLECTION_NAME, EMBEDDING_MODEL, CHUNK_SIZE, CHUNK_OVERLAP).

### Key Entities

-   **PDF Document**: A digital document in PDF format from which text is extracted.
-   **Text Chunk**: A segment of text extracted from a PDF page, used for embedding and indexing.
-   **Vector Embedding**: A numerical representation of a text chunk or search query, generated by a sentence-transformer model.
-   **Qdrant Collection**: A named store within the Qdrant vector database where vector embeddings and their metadata are stored.
-   **Search Query**: The natural language input from the user to find relevant information.

## Success Criteria

### Measurable Outcomes

-   **SC-001**: 95% of successful PDF uploads (for valid, non-empty PDFs) should complete within 1 second per page for documents up to 50 pages.
-   **SC-002**: 90% of search queries should return results within 500 milliseconds.
-   **SC-003**: The system should accurately extract text from 99% of valid PDF documents without corruption or omission of textual content.
-   **SC-004**: Search results for a given query should consistently include the most relevant chunks with a similarity score of 0.7 or higher, if such content exists in the indexed documents.
-   **SC-005**: The system should successfully connect to Qdrant (local or cloud) on the first attempt 99% of the time, given correct configuration.