---
id: 1
title: Initialize Project Constitution
stage: constitution
date: 2025-11-28
surface: agent
model: Gemini
feature: none
branch: master
user: Ahmed
command: /sp.constitution
labels: [constitution, initialization]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .specify/memory/constitution.md
 - .specify/templates/plan-template.md
tests:
 - none
---

## Prompt

## Project Mission
Create a comprehensive AI-native textbook for "Physical AI & Humanoid Robotics" course using Docusaurus, deployed on GitHub Pages with integrated RAG chatbot.

## Technical Stack
- **Frontend**: Docusaurus (React-based)
- **Backend**: FastAPI (Python)
- **Database**: Neon Serverless Postgres
- **Vector Store**: Qdrant Cloud (Free Tier)
- **AI**: OpenAI Agents/ChatKit SDK for RAG
- **Auth**: Better-auth for user authentication
- **Tools**: Spec-Kit Plus, Claude Code

## Course Content Structure

### Weeks 1-2: Introduction to Physical AI
- Foundations of Physical AI and embodied intelligence
- From digital AI to robots understanding physical laws
- Humanoid robotics landscape overview
- Sensor systems: LIDAR, cameras, IMUs, force/torque sensors

### Weeks 3-5: ROS 2 Fundamentals (Module 1)
- ROS 2 architecture and core concepts
- Nodes, topics, services, and actions
- Building ROS 2 packages with Python (rclpy)
- Launch files and parameter management
- URDF (Unified Robot Description Format) for humanoids

### Weeks 6-7: Robot Simulation (Module 2)
- Gazebo simulation environment setup
- URDF and SDF robot description formats
- Physics simulation: gravity, collisions
- Sensor simulation: LiDAR, Depth Cameras, IMUs
- Unity for high-fidelity rendering and visualization

### Weeks 8-10: NVIDIA Isaac Platform (Module 3)
- NVIDIA Isaac SDK and Isaac Sim
- Photorealistic simulation and synthetic data generation
- Isaac ROS: Hardware-accelerated VSLAM
- AI-powered perception and manipulation
- Nav2: Path planning for bipedal movement
- Reinforcement learning for robot control
- Sim-to-real transfer techniques

### Weeks 11-12: Humanoid Robot Development
- Humanoid robot kinematics and dynamics
- Bipedal locomotion and balance control
- Manipulation and grasping with humanoid hands
- Natural human-robot interaction design

### Week 13: Vision-Language-Action (Module 4)
- Voice-to-Action using OpenAI Whisper
- Cognitive Planning: LLMs translating natural language to ROS 2 actions
- Multi-modal interaction: speech, gesture, vision
- Integrating GPT models for conversational robotics
- **Capstone Project**: Autonomous Humanoid (voice command → path planning → navigation → object identification → manipulation)

## Hardware Requirements Coverage

### Digital Twin Workstation
- GPU: NVIDIA RTX 4070 Ti (12GB VRAM) minimum, RTX 4090 (24GB) ideal
- CPU: Intel Core i7 (13th Gen+) or AMD Ryzen 9
- RAM: 64 GB DDR5 (32 GB minimum)
- OS: Ubuntu 22.04 LTS

### Physical AI Edge Kit
- Brain: NVIDIA Jetson Orin Nano (8GB) or Orin NX (16GB)
- Eyes: Intel RealSense D435i or D455
- IMU: BNO055 or built-in
- Voice: USB Microphone/Speaker (ReSpeaker)

### Robot Options
- Budget: Unitree Go2 Edu ($1,800-$3,000)
- Miniature: Unitree G1 (~$16k) or Hiwonder TonyPi Pro (~$600)
- Premium: Unitree G1 Humanoid for sim-to-real

### Economy Jetson Student Kit (~$700)
- Jetson Orin Nano Super Dev Kit: $249
- Intel RealSense D435i: $349
- ReSpeaker USB Mic Array: $69
- SD Card + misc: $30

### Cloud Alternative
- AWS g5.2xlarge instances (~$1.50/hour)
- NVIDIA Isaac Sim on Omniverse Cloud
- Estimated: ~$205 per quarter + edge hardware

## RAG Chatbot Features
- Answer questions about entire book content
- Support text selection-based queries
- Context-aware responses using vector embeddings
- Citation of specific chapters/sections
- Fast response time (<3 seconds)

## Authentication & Personalization
- User signup/signin with Better-auth
- Background questionnaire at signup (software/hardware experience)
- Per-chapter personalization button (content adapted to user background)
- Per-chapter Urdu translation button
- User preferences stored in Neon Postgres

## Content Quality Standards
- Professional textbook-level writing
- Clear explanations with practical examples
- Proper technical terminology and citations
- Code snippets where applicable
- Visual diagrams for complex concepts
- Hands-on projects and assessments

## Assessments Coverage
- ROS 2 package development project
- Gazebo simulation implementation
- Isaac-based perception pipeline
- Capstone: Simulated humanoid robot with conversational AI

## File Structure
```
/
├── docs/              # Docusaurus markdown files (all chapters)
├── src/
│   ├── chatbot/      # RAG implementation
│   ├── auth/         # Better-auth setup
│   └── api/          # FastAPI endpoints
├── static/           # Images, diagrams
├── docusaurus.config.js
└── README.md
```

## Learning Outcomes to Emphasize
- Understanding Physical AI principles and embodied intelligence
- Mastering ROS 2 for robotic control
- Simulating robots with Gazebo and Unity
- Developing with NVIDIA Isaac AI platform
- Designing humanoid robots for natural interactions
- Integrating GPT models for conversational robotics

## Why Physical AI Matters
Humanoid robots excel in human-centered environments due to shared physical form and abundant training data from human interactions. This represents the shift from digital AI to embodied intelligence in physical space.

## Code Standards
- Clean, modular, well-documented code
- Type hints for Python
- Responsive design for all devices
- Proper error handling
- Secure authentication implementation

## Response snapshot

I have updated the project constitution to version 1.0.0, incorporating the principles from your project description. I also updated the `plan-template.md` to reflect these new principles.

## Outcome
- ✅ Impact: The project constitution is now aligned with the project's mission and technical standards.
- 🧪 Tests: none
- 📁 Files: 
  - .specify/memory/constitution.md
  - .specify/templates/plan-template.md
- 🔁 Next prompts: none
- 🧠 Reflection: The constitution provides a solid foundation for the project.

## Evaluation notes (flywheel)
- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
