# Implementation Plan

1. Scaffold Docusaurus site (book/) and sample docs
2. Implement FastAPI backend (backend/) with auth + chat routers
3. Ingest docs to Qdrant using `ingest.py`
4. Wire frontend chat widget to `/api/chatkit/session` and `/api/query`
5. Add CI: GitHub Actions for GH Pages (book) and Render/Cloud Run (backend)
6. Test end-to-end
