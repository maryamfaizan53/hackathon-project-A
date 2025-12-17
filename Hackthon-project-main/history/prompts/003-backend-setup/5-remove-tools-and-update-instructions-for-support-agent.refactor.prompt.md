---
id: 5
title: Remove Tools and Update Instructions for Support Agent
stage: refactor
date: 2025-11-29
surface: agent
model: gemini-1.5-pro
feature: 003-backend-setup
branch: 003-backend-setup
user: Ahmed
command: okay now remove all the tools from supportagent and also give instructions that you are a chatbot that always first use search tool and its a Humaniod & Robotic AI agent
labels: ["refactor", "support-agent", "tools", "instructions"]
links:
  spec: specs/003-backend-setup/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - backend/app/support_agent.py
tests: null
---

## Prompt

okay now remove all the tools from supportagent and also give instructions that you are a chatbot that always first use search tool and its a Humaniod & Robotic AI agent

## Response snapshot

Modified `backend/app/support_agent.py` to remove all function tools and clear the tools list within `build_support_agent`. The `SUPPORT_AGENT_INSTRUCTIONS` string was updated to reflect the new persona as a Humanoid & Robotic AI agent that prioritizes a search tool.

## Outcome

- ✅ Impact: The `support_agent.py` file has been modified to remove all tool definitions and update the agent's instructions, successfully changing its persona and capabilities as requested.
- 🧪 Tests: No automated tests were executed. Manual validation will be required by running the application.
- 📁 Files: 1 file was modified.
- 🔁 Next prompts: Continue with implementation tasks or further modifications.
- 🧠 Reflection: The refactoring was performed successfully according to the user's instructions. The specific changes were targeted and executed using the `replace` tool.

## Evaluation notes (flywheel)

- Failure modes observed: N/A
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
