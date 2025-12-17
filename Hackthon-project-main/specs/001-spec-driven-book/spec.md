# Spec: Spec-Driven AI Book + Embedded RAG Chatbot

## Overview
Build a Docusaurus book that teaches Spec-Driven AI development and includes an embedded RAG chatbot. The chatbot must answer general questions and support 'answer only from selected text' mode.

## Acceptance Criteria
- Docusaurus site under `book/` with sample docs
- FastAPI backend with endpoints `/api/chatkit/session` and `/api/query`
- `ingest.py` to index docs into Qdrant
- GitHub Actions to deploy book to GH Pages and backend to Render/Cloud Run
