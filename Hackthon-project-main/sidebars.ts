import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro', // Top-level introduction
    {
      type: 'category',
      label: '1. Physical AI Fundamentals',
      link: {
        type: 'generated-index',
        title: 'Physical AI Fundamentals',
        slug: '/category/physical-ai'
      },
      items: [
        'physical-ai/introduction/index',
        'physical-ai/core-principles/index',
        'physical-ai/digital-to-physical-transition/index',
        'physical-ai/conclusion/index'
      ],
      collapsible: true,
      collapsed: true,
    },
    {
      type: 'category',
      label: '2. ROS 2 (Robot Operating System)',
      link: {
        type: 'generated-index',
        title: 'ROS 2 (Robot Operating System)'
      },
      items: [
        'ros2/introduction/index',
        'ros2/core-architecture/index',
        'ros2/communication-patterns/index',
        'ros2/python-integration-rclpy/index',
        'ros2/urdf/index',
        'ros2/conclusion/index'
      ],
      collapsible: true,
      collapsed: true,
    },
    {
      type: 'category',
      label: '3. Robot Simulation',
      link: {
        type: 'generated-index',
        title: 'Robot Simulation'
      },
      items: [
        'simulation/introduction/index',
        'simulation/platforms/index',
        'simulation/sensor-simulation/index',
        'simulation/conclusion/index'
      ],
      collapsible: true,
      collapsed: true,
    },
    
    {
      type: 'category',
      label: '5. Vision-Language-Action (VLA)',
      link: {
        type: 'generated-index',
        title: 'Vision-Language-Action (VLA)'
      },
      items: [
        'vla/introduction/index',
        'vla/pipeline', // This is a file, not a directory with index.md
        'vla/llm-role', // This is a file, not a directory with index.md
        'vla/conclusion/index'
      ],
      collapsible: true,
      collapsed: true,
    },
    {
      type: 'category',
      label: '6. Humanoid Robotics',
      link: {
        type: 'generated-index',
        title: 'Humanoid Robotics'
      },
      items: [
        'humanoid-robotics/introduction/index',
        'humanoid-robotics/kinematics-dynamics', // This is a file, not a directory with index.md
        'humanoid-robotics/bipedal-locomotion', // This is a file, not a directory with index.md
        'humanoid-robotics/manipulation-grasping', // This is a file, not a directory with index.md
        'humanoid-robotics/human-robot-interaction', // This is a file, not a directory with index.md
        'humanoid-robotics/conclusion/index'
      ],
      collapsible: true,
      collapsed: true,
    },
    {
      type: 'category',
      label: '7. Hardware Setup',
      link: {
        type: 'generated-index',
        title: 'Hardware Setup'
      },
      items: [
        'hardware/introduction/index',
        'hardware/workstation-requirements', // This is a file, not a directory with index.md
        'hardware/edge-computing-jetson', // This is a file, not a directory with index.md
        'hardware/sensors-actuators', // This is a file, not a directory with index.md
        'hardware/lab-infrastructure', // This is a file, not a directory with index.md
        'hardware/conclusion/index'
      ],
      collapsible: true,
      collapsed: true,
    },
  ],
};

export default sidebars;