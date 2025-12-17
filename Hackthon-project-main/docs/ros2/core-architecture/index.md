---
title: Core Architecture
---

# Core Architecture

At its heart, ROS 2 is a distributed system of processes (called "nodes") that communicate with each other to perform complex tasks.

## DDS (Data Distribution Service)

Unlike the original ROS, which used a custom communication protocol, ROS 2 is built on top of DDS. DDS is an industry-standard middleware for real-time and embedded systems. It provides a publish-subscribe communication model that is decentralized, scalable, and highly reliable.

By using DDS, ROS 2 inherits many of its features, including:

-   **Decentralized Discovery**: Nodes can automatically discover each other on the network without a central master.
-   **Quality of Service (QoS)**: ROS 2 provides a rich set of QoS policies that allow developers to fine-tune the communication between nodes for different use cases (e.g., reliability, durability, latency).
-   **Interoperability**: Different DDS implementations from different vendors can interoperate with each other. ROS 2 supports several DDS vendors, including eProsima Fast DDS (the default), RTI Connext, and Eclipse Cyclone DDS.

## Nodes

A node is the fundamental building block of a ROS 2 system. It is a process that performs a specific task, such as:

-   Controlling a motor
-   Reading data from a sensor
-   Planning a path for the robot to follow
-   Visualizing data

Nodes are typically written in C++ or Python using the ROS 2 client libraries (`rclcpp` and `rclpy`). They can be combined to create complex robot behaviors.

## The ROS Graph

The ROS Graph is the network of ROS 2 nodes and their connections. It is a conceptual representation of how the different parts of the system are communicating with each other. Tools like `rqt_graph` can be used to visualize the ROS Graph and debug the communication between nodes.
