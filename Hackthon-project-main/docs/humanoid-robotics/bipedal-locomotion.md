---
id: bipedal-locomotion
title: "Bipedal Locomotion: The Art of Walking"
---

# Bipedal Locomotion: The Art of Walking

Walking on two legs is a remarkably complex task that humans perform with ease, but it is one of the biggest challenges in humanoid robotics. Bipedal locomotion requires a delicate balance of control, perception, and planning.

## The Zero Moment Point (ZMP)

The Zero Moment Point (ZMP) is a key concept in bipedal locomotion. It is the point on the ground where the net moment of the inertial forces and the gravity forces has no horizontal component. In simpler terms, it is the point on the ground where the robot's center of pressure is located.

To maintain balance, the ZMP must always be kept within the support polygon, which is the area on the ground formed by the robot's feet. If the ZMP moves outside the support polygon, the robot will fall over.

## Generating Stable Walking Gaits

There are several approaches to generating stable walking gaits for humanoid robots:

-   **Trajectory-based methods**: These methods involve pre-calculating a trajectory for the robot's center of mass and feet that will keep the ZMP within the support polygon.
-   **Model-based methods**: These methods use a dynamic model of the robot to calculate the joint torques required to maintain balance in real-time. Techniques like Model Predictive Control (MPC) are often used to predict the future state of the robot and optimize the control inputs.
-   **Machine learning-based methods**: Reinforcement learning can be used to train a neural network to control the robot's walking gait. The robot learns through trial and error to find a policy that maximizes a reward function, which is typically related to walking speed, stability, and energy efficiency.
