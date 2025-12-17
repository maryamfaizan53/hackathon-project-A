# claude.md - How to use Claude Code + Spec-Kit Plus for this repo

## Quick usage

Use your Spec-Kit Plus ai wrapper (ai.ps1 or ai.sh) and run the following commands from repo root:

1. /sp.constitution
   .\ai.ps1 "/sp.constitution Project: Spec-Driven AI Book + RAG Chatbot. Author: <SAMAD>. Writing style: concise, tutorial-first, step-by-step with runnable examples. License: MIT. CI: GitHub Actions for site deploy. Security: Never commit secrets; use .env and GitHub Secrets. Tests: include local run instructions & smoke tests. Target: GitHub Pages for book, Render/Cloud Run for backend."

2. /sp.specify
   .\ai.ps1 "/sp.specify Build a Docusaurus book that teaches Spec-Driven AI development. The book will include chapters on Spec-Kit Plus workflow, Docusaurus setup, and building a RAG chatbot. Add an integrated RAG chatbot embedded in the site using a FastAPI backend, Qdrant Cloud free tier as vector DB, and OpenAI Chat/ChatKit for inference. The chatbot must be able to answer general book questions and support 'answer only from selected text' mode where the user highlights text on a page and the answer must come only from that selection."

3. /sp.plan  (copy/paste from plans/001-implementation/plan.md)
4. /sp.tasks (copy/paste from tasks/tasks.md)
5. /sp.implement Implement tasks 1..8 to scaffold and generate missing files

Use these commands to have Claude generate or iterate on code in this repository. After the agent has scaffolded, review files in `book/` and `backend/` and run local tests.
