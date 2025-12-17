---
title: Workstation Requirements
---

# Workstation Requirements

Your workstation is the command center of your robotics development. It is where you will write code, run simulations, and analyze data. The requirements for a robotics workstation can vary depending on the complexity of your projects, but here are some general guidelines:

-   **Operating System**: **Linux (e.g., Ubuntu)** is the operating system of choice for the vast majority of the robotics community. ROS (Robot Operating System) is primarily developed and tested on Linux, and you will find the best support and compatibility on this platform.
-   **Processor (CPU)**: A modern, multi-core CPU is essential for compiling code and running simulations. An **Intel Core i5/i7, AMD Ryzen 5/7, or equivalent** is a good starting point.
-   **Memory (RAM)**: Robotics development can be memory-intensive, especially when running simulations. **16GB of RAM** is a minimum requirement, but **32GB or more** is highly recommended for a smooth experience.
-   **Graphics Card (GPU)**: A powerful GPU is crucial for two main reasons:
    1.  **Simulation**: Modern robotics simulators like Gazebo and NVIDIA Isaac Sim use the GPU for rendering and physics calculations.
    2.  **AI and Machine Learning**: Training and running deep learning models for perception and control is a computationally intensive task that is best handled by a GPU. An **NVIDIA GPU** is strongly recommended due to the widespread support for NVIDIA's CUDA platform in the AI and robotics community. Look for a card with at least **8GB of VRAM**.
-   **Storage**: A **fast Solid State Drive (SSD)** will significantly improve your workflow, reducing boot times, compilation times, and data loading times.
