---
title: Sensor Simulation
---

# Sensor Simulation

Accurate sensor simulation is crucial for developing and testing perception algorithms. Both Gazebo and Unity provide a wide range of sensor models.

## LiDAR

LiDAR (Light Detection and Ranging) sensors are used to create a 3D map of the environment. They work by emitting laser beams and measuring the time it takes for the light to bounce back.

In simulation, LiDAR sensors are typically modeled by casting rays into the environment and detecting intersections with objects. The simulator can then generate a point cloud, which is a collection of 3D points representing the surfaces of objects in the environment.

## Depth Cameras

Depth cameras, also known as RGB-D cameras, provide both a color image (RGB) and a depth image. The depth image contains the distance from the camera to each pixel in the scene.

There are several ways to simulate depth cameras:

-   **Stereo Vision**: Simulate two cameras and use stereo vision algorithms to compute the depth.
-   **Ray Casting**: Cast a ray from the camera for each pixel and measure the distance to the first object it hits.
-   **Z-Buffer**: Use the Z-buffer from the graphics rendering pipeline to get the depth information.

## IMUs (Inertial Measurement Units)

IMUs are used to measure a robot's orientation, velocity, and acceleration. They typically consist of an accelerometer and a gyroscope.

Simulating an IMU involves reading the ground truth state of the robot from the physics engine and adding realistic noise to the measurements.
