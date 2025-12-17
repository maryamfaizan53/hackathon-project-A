---
title: Communication Patterns
---

# Communication Patterns

ROS 2 provides several communication patterns for nodes to exchange data.

## Topics

Topics are the most common communication pattern in ROS 2. They provide an asynchronous, one-to-many communication channel based on the publish-subscribe model.

-   A node can **publish** messages to a topic.
-   Any number of other nodes can **subscribe** to that topic to receive the messages.

Topics are ideal for continuous data streams, such as sensor data (e.g., camera images, LiDAR scans) or robot state information (e.g., joint positions, odometry).

Each topic has a specific **message type**, which defines the structure of the data being sent. ROS 2 provides a large set of standard message types, and developers can also create their own custom message types.

## Services

Services provide a synchronous, one-to-one communication pattern based on the request-response model.

-   A **client** node sends a request to a **server** node.
-   The server processes the request and sends back a response.

Services are used for short, transactional interactions, such as:

-   Querying the current state of a robot.
-   Triggering a specific action (e.g., taking a picture).
-   Requesting a computation to be performed.

## Actions

Actions are used for long-running, asynchronous tasks that provide feedback during their execution.

-   An **action client** sends a **goal** to an **action server**.
-   The action server starts executing the goal and provides periodic **feedback** to the client.
-   When the task is complete, the server sends a final **result** to the client.

Actions are ideal for tasks like:

-   Navigating to a specific location.
-   Executing a complex manipulation task.
-   Following a predefined trajectory.

The action client can also cancel the goal at any time.
