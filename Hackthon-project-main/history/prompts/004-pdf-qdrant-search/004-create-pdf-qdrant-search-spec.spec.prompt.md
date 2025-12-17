---
id: 004
title: Create PDF Qdrant Search Spec
stage: spec
date: 2025-11-29
surface: agent
model: gemini-1.5-pro
feature: 004-pdf-qdrant-search
branch: 004-pdf-qdrant-search
user: Ahmed
command: /sp.specify
labels: [spec, feature-creation, qdrant, pdf, search]
links:
  spec: specs/004-pdf-qdrant-search/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/004-pdf-qdrant-search/spec.md
  - specs/004-pdf-qdrant-search/checklists/requirements.md
  - history/prompts/004-pdf-qdrant-search/004-create-pdf-qdrant-search-spec.spec.prompt.md
tests:
  - null
---

## Prompt

# PDF Upload and Search System with Qdrant Vector Database

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

## Response snapshot

Created new feature branch `001-pdf-qdrant-search`, drafted `specs/001-pdf-qdrant-search/spec.md`, and generated `specs/001-pdf-qdrant-search/checklists/requirements.md` checklist.

## Outcome

- ✅ Impact: Feature specification for PDF Upload and Search System with Qdrant Vector Database has been successfully drafted and validated.
- 🧪 Tests: No automated tests were run for this stage.
- 📁 Files: `specs/001-pdf-qdrant-search/spec.md`, `specs/001-pdf-qdrant-search/checklists/requirements.md`, and `history/prompts/001-pdf-qdrant-search/001-create-pdf-qdrant-search-spec.spec.prompt.md` were created/modified.
- 🔁 Next prompts: The next step is to proceed with planning (e.g., `/sp.plan`).
- 🧠 Reflection: The `create-new-feature.ps1` script had an issue with argument parsing, leading to manual checkout and directory creation. This needs to be addressed for future uses.

## Evaluation notes (flywheel)

- Failure modes observed: `create-new-feature.ps1` script argument parsing error.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Debug `create-new-feature.ps1` to correctly parse positional arguments when `-Json` and `-ShortName` are used together.
