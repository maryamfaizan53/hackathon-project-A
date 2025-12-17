# Data Model for Course Documentation

This document outlines the structure of the documentation content. The documentation is organized hierarchically.

## 1. Course

The root entity, representing the entire Physical AI & Humanoid Robotics course.

- **Attributes**:
  - `title`: The title of the course.
  - `description`: A brief description of the course.
- **Relationships**:
  - Has many `Modules`.

## 2. Module

A major section of the course, corresponding to a top-level topic.

- **Attributes**:
  - `title`: The title of the module (e.g., "ROS 2", "Robot Simulation").
  - `slug`: The URL-friendly version of the title (e.g., "ros2", "robot-simulation").
- **Relationships**:
  - Belongs to a `Course`.
  - Has many `Pages`.

## 3. Page

A specific documentation page within a module.

- **Attributes**:
  - `title`: The title of the page (e.g., "Nodes and Topics", "Gazebo vs. Unity").
  - `slug`: The URL-friendly version of the title.
  - `content`: The markdown content of the page.
- **Relationships**:
  - Belongs to a `Module`.

## Example Structure

```
Course: Physical AI & Humanoid Robotics
└── Module: ROS 2 (`/docs/ros2`)
    ├── Page: Introduction to ROS 2 (`/docs/ros2/introduction`)
    ├── Page: Nodes and Topics (`/docs/ros2/nodes-and-topics`)
    └── Page: Services and Actions (`/docs/ros2/services-and-actions`)
```
