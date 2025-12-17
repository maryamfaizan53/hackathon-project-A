---
title: The VLA Pipeline
---

# The VLA Pipeline

A typical VLA pipeline consists of three main stages:

## 1. Vision (Perception)

The first step in any VLA system is to perceive the environment. This is typically done using cameras, but can also involve other sensors like LiDAR and depth cameras. The goal of the vision module is to extract meaningful information from the raw sensor data, such as:

-   **Object Detection**: Identifying and localizing objects in the scene.
-   **Scene Segmentation**: Dividing the image into different regions corresponding to different objects or surfaces.
-   **3D Reconstruction**: Building a 3D model of the environment.

## 2. Language (Understanding)

Once the robot has a representation of its environment, it needs to understand the user's intent. This is where natural language processing (NLP) comes in.

-   **Speech-to-Text**: The first step is often to convert spoken language into text using a speech-to-text model like **OpenAI's Whisper**. Whisper is a powerful, open-source model that can transcribe audio with high accuracy, even in noisy environments.
-   **Large Language Models (LLMs)**: The transcribed text is then fed into a Large Language Model (LLM), such as GPT-4 or Llama. The LLM acts as a "reasoning engine," interpreting the user's command and generating a high-level plan to achieve the desired goal.

## 3. Action (Execution)

The final step is to translate the LLM's plan into a sequence of low-level robot actions. This is where the "rubber meets the road," and the robot's physical capabilities come into play.

-   **Tool Use / Function Calling**: A key technique for bridging the gap between high-level language and low-level actions is "tool use" or "function calling." The LLM is given a set of "tools" that correspond to the robot's capabilities (e.g., `move_to(x, y)`, `pick_up(object)`, `open_drawer()`). The LLM can then generate a sequence of tool calls to execute the desired task.
-   **Motion Planning**: For each action, the robot's motion planner needs to generate a collision-free trajectory for the robot to follow.
-   **Control**: The robot's controllers then execute the trajectory by sending commands to the motors.
