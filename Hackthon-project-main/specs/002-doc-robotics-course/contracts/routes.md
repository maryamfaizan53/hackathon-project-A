# Documentation Routes

This document defines the URL structure for the documentation website.

## Base URL

The documentation will be served from the `/docs` path.

## Module Routes

Each module will have its own directory under `/docs`. The route for a module will be `/docs/{module-slug}`.

- `/docs/physical-ai`
- `/docs/ros2`
- `/docs/simulation`
- `/docs/isaac-platform`
- `/docs/vla`
- `/docs/humanoid-robotics`
- `/docs/hardware`
- `/docs/projects`

## Page Routes

Each page within a module will have its own markdown file. The route for a page will be `/docs/{module-slug}/{page-slug}`.

- `/docs/ros2/introduction`
- `/docs/ros2/nodes-and-topics`
- `/docs/simulation/gazebo-vs-unity`

## Internationalization (i18n)

Docusaurus handles i18n by adding a locale prefix to the URL.

- **English (default)**: `/docs/ros2/introduction`
- **Urdu**: `/ur/docs/ros2/introduction`
