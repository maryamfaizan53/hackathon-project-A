---
title: Kinematics and Dynamics
---

# Kinematics and Dynamics

The motion of a humanoid robot is governed by the principles of kinematics and dynamics.

## Kinematics: The Geometry of Motion

Kinematics is the study of motion without considering the forces that cause it. In the context of humanoid robotics, kinematics is used to describe the relationship between the robot's joint angles and the position and orientation of its limbs.

-   **Forward Kinematics (FK)**: Given a set of joint angles, forward kinematics is used to calculate the position and orientation of the robot's end-effectors (e.g., hands, feet). This is a relatively straightforward calculation that is used for planning and control.
-   **Inverse Kinematics (IK)**: Inverse kinematics is the reverse problem: given a desired position and orientation for an end-effector, what are the corresponding joint angles? This is a much more challenging problem, especially for a high-degree-of-freedom robot like a humanoid. IK is essential for tasks like reaching for an object or taking a step.

## Dynamics: The Physics of Motion

Dynamics is the study of motion with consideration of the forces and torques that cause it. A dynamic model of a humanoid robot is essential for designing controllers that can stabilize the robot and generate fluid, life-like motions.

The dynamic model takes into account the robot's mass, inertia, and the forces of gravity and friction. It can be used to calculate the joint torques required to achieve a desired motion.
