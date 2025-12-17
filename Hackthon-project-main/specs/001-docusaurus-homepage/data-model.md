# Data Model for Docusaurus Homepage

## Overview

This document defines the data structures used for the Docusaurus homepage feature. As this is a frontend-only implementation, the data models represent the shape of props passed to React components.

## 1. CourseModule

This entity represents one of the four main course modules displayed on the homepage.

- **Source**: `src/components/HomepageFeatures/index.tsx`
- **Description**: A card containing an icon, title, description, and a link to a documentation page.

### Fields

| Name        | Type   | Description                                     | Required | Example                                           |
|-------------|--------|-------------------------------------------------|----------|---------------------------------------------------|
| `icon`      | string | Emoji character or class name for an SVG icon.  | Yes      | `🤖`                                              |
| `title`     | string | The title of the module.                        | Yes      | `"The Robotic Nervous System (ROS 2)"`            |
| `description` | string | A brief summary of the module's content.      | Yes      | `"Master middleware for robot control..."`        |
| `link`      | string | The URL path to the module's detailed chapter.  | Yes      | `"/docs/ros-2"`                                   |

### Example Usage (TypeScript Interface)

```typescript
interface CourseModule {
  icon: string;
  title: string;
  description: string;
  link: string;
}

const modules: CourseModule[] = [
  {
    icon: '🤖',
    title: 'The Robotic Nervous System (ROS 2)',
    description: 'Master middleware for robot control with ROS 2 nodes, topics, and services',
    link: '/docs/intro'
  },
  // ...other modules
];
```
