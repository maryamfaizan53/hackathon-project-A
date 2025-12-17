---
title: ROS 2 (Robot Operating System)
---

# ROS 2 (Robot Operating System)

## Introduction to ROS 2

The Robot Operating System (ROS) is a flexible framework for writing robot software. It is a collection of tools, libraries, and conventions that aim to simplify the task of creating complex and robust robot behavior across a wide variety of robotic platforms.

ROS 2 is a complete redesign of the original ROS, built to address the needs of modern robotics applications, including multi-robot systems, real-time control, and commercial products. It is built on top of the Data Distribution Service (DDS) standard, which provides a robust and scalable communication layer.

This chapter will provide a comprehensive overview of ROS 2, from its high-level architecture to its core communication patterns and development tools.

## Core Architecture

At its heart, ROS 2 is a distributed system of processes (called "nodes") that communicate with each other to perform complex tasks.

### DDS (Data Distribution Service)

Unlike the original ROS, which used a custom communication protocol, ROS 2 is built on top of DDS. DDS is an industry-standard middleware for real-time and embedded systems. It provides a publish-subscribe communication model that is decentralized, scalable, and highly reliable.

By using DDS, ROS 2 inherits many of its features, including:

-   **Decentralized Discovery**: Nodes can automatically discover each other on the network without a central master.
-   **Quality of Service (QoS)**: ROS 2 provides a rich set of QoS policies that allow developers to fine-tune the communication between nodes for different use cases (e.g., reliability, durability, latency).
-   **Interoperability**: Different DDS implementations from different vendors can interoperate with each other. ROS 2 supports several DDS vendors, including eProsima Fast DDS (the default), RTI Connext, and Eclipse Cyclone DDS.

### Nodes

A node is the fundamental building block of a ROS 2 system. It is a process that performs a specific task, such as:

-   Controlling a motor
-   Reading data from a sensor
-   Planning a path for the robot to follow
-   Visualizing data

Nodes are typically written in C++ or Python using the ROS 2 client libraries (`rclcpp` and `rclpy`). They can be combined to create complex robot behaviors.

### The ROS Graph

The ROS Graph is the network of ROS 2 nodes and their connections. It is a conceptual representation of how the different parts of the system are communicating with each other. Tools like `rqt_graph` can be used to visualize the ROS Graph and debug the communication between nodes.

## Communication Patterns

ROS 2 provides several communication patterns for nodes to exchange data.

### Topics

Topics are the most common communication pattern in ROS 2. They provide an asynchronous, one-to-many communication channel based on the publish-subscribe model.

-   A node can **publish** messages to a topic.
-   Any number of other nodes can **subscribe** to that topic to receive the messages.

Topics are ideal for continuous data streams, such as sensor data (e.g., camera images, LiDAR scans) or robot state information (e.g., joint positions, odometry).

Each topic has a specific **message type**, which defines the structure of the data being sent. ROS 2 provides a large set of standard message types, and developers can also create their own custom message types.

### Services

Services provide a synchronous, one-to-one communication pattern based on the request-response model.

-   A **client** node sends a request to a **server** node.
-   The server processes the request and sends back a response.

Services are used for short, transactional interactions, such as:

-   Querying the current state of a robot.
-   Triggering a specific action (e.g., taking a picture).
-   Requesting a computation to be performed.

### Actions

Actions are used for long-running, asynchronous tasks that provide feedback during their execution.

-   An **action client** sends a **goal** to an **action server**.
-   The action server starts executing the goal and provides periodic **feedback** to the client.
-   When the task is complete, the server sends a final **result** to the client.

Actions are ideal for tasks like:

-   Navigating to a specific location.
-   Executing a complex manipulation task.
-   Following a predefined trajectory.

The action client can also cancel the goal at any time.

## Python Integration (rclpy)

`rclpy` is the official Python client library for ROS 2. It provides a Pythonic interface to all the core ROS 2 concepts, allowing developers to write ROS 2 nodes, publishers, subscribers, services, and actions in Python.

Here is a simple example of a "hello world" publisher in `rclpy`:

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class HelloWorldPublisher(Node):

    def __init__(self):
        super().__init__('hello_world_publisher')
        self.publisher_ = self.create_publisher(String, 'hello_world', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello, ROS 2!'
        self.publisher_.publish(msg)
        self.get_logger().info('Publishing: "%s"' % msg.data)

def main(args=None):
    rclpy.init(args=args)
    hello_world_publisher = HelloWorldPublisher()
    rclpy.spin(hello_world_publisher)
    hello_world_publisher.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## URDF (Unified Robot Description Format)

The Unified Robot Description Format (URDF) is an XML format for describing the physical structure of a robot. It is a key component of the ROS ecosystem, used for modeling, simulation, and visualization.

A URDF file defines:

-   **Links**: The rigid parts of the robot.
-   **Joints**: The connections between the links, which can be revolute (rotating), prismatic (sliding), or fixed.
-   **Visual properties**: The shape and appearance of the links.
-   **Collision properties**: The shape of the links used for collision detection.
-   **Inertial properties**: The mass and inertia of the links.

URDF files are used by tools like Gazebo for simulation and RViz for visualization. They are essential for any robotics application that requires a model of the robot's physical structure.

## Conclusion

ROS 2 is a powerful and flexible framework for robotics development. Its modular architecture, robust communication patterns, and strong community support make it an ideal choice for a wide range of robotics applications, from simple hobbyist projects to complex industrial and commercial systems. This chapter has provided a solid foundation for understanding the core concepts of ROS 2. In the following chapters, we will dive deeper into each of these topics and learn how to use them to build our own robotic systems.
