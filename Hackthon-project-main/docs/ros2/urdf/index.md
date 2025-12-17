---
title: URDF (Unified Robot Description Format)
---

# URDF (Unified Robot Description Format)

The Unified Robot Description Format (URDF) is an XML format for describing the physical structure of a robot. It is a key component of the ROS ecosystem, used for modeling, simulation, and visualization.

A URDF file defines:

-   **Links**: The rigid parts of the robot.
-   **Joints**: The connections between the links, which can be revolute (rotating), prismatic (sliding), or fixed.
-   **Visual properties**: The shape and appearance of the links.
-   **Collision properties**: The shape of the links used for collision detection.
-   **Inertial properties**: The mass and inertia of the links.

URDF files are used by tools like Gazebo for simulation and RViz for visualization. They are essential for any robotics application that requires a model of the robot's physical structure.
