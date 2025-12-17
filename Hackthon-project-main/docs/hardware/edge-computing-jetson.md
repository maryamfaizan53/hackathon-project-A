---
title: Edge Computing and the NVIDIA Jetson
---

# Edge Computing and the NVIDIA Jetson

While your workstation is where you will do most of your development, the code you write will ultimately run on a robot. For many modern robotics applications, this means running AI models and other computationally intensive tasks on an "edge" device—a small, low-power computer that is embedded on the robot itself.

## The Rise of Edge Computing

Edge computing is a paradigm where computation is performed at or near the source of the data, rather than in the cloud. In the context of robotics, this means that the robot can process sensor data and make decisions in real-time, without relying on a network connection.

The benefits of edge computing for robotics are numerous:

-   **Low Latency**: For tasks like obstacle avoidance and real-time control, low latency is critical. By processing data on the robot itself, we can eliminate the network latency associated with sending data to the cloud.
-   **High Bandwidth**: Robots can generate a massive amount of data from their sensors. Processing this data on the edge reduces the need to transmit large amounts of data over a network.
-   **Reliability**: A robot that relies on a cloud connection will fail if that connection is lost. An edge-powered robot can continue to operate autonomously.
-   **Privacy**: For applications that handle sensitive data, processing that data on the edge can be more secure than sending it to the cloud.

## The NVIDIA Jetson Platform

The **NVIDIA Jetson** is a family of powerful, compact, and low-power computers designed for AI at the edge. It is the ideal platform for building intelligent robots and other autonomous machines.

The Jetson platform includes a range of modules with different levels of performance and power consumption, from the small and efficient Jetson Nano to the powerful Jetson AGX Orin. All Jetson modules run the same NVIDIA software stack, making it easy to scale your application from one module to another.
