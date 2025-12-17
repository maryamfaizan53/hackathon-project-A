import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/login',
    component: ComponentCreator('/login', 'f43'),
    exact: true
  },
  {
    path: '/signup',
    component: ComponentCreator('/signup', '312'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'e8d'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', 'a89'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', 'b7b'),
            routes: [
              {
                path: '/docs/category/2-ros-2-robot-operating-system',
                component: ComponentCreator('/docs/category/2-ros-2-robot-operating-system', '3c8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/category/3-robot-simulation',
                component: ComponentCreator('/docs/category/3-robot-simulation', 'f41'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/category/5-vision-language-action-vla',
                component: ComponentCreator('/docs/category/5-vision-language-action-vla', '7ee'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/category/6-humanoid-robotics',
                component: ComponentCreator('/docs/category/6-humanoid-robotics', '28e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/category/7-hardware-setup',
                component: ComponentCreator('/docs/category/7-hardware-setup', 'fa4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/category/physical-ai',
                component: ComponentCreator('/docs/category/physical-ai', '963'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/hardware/',
                component: ComponentCreator('/docs/hardware/', 'f18'),
                exact: true
              },
              {
                path: '/docs/hardware/conclusion/',
                component: ComponentCreator('/docs/hardware/conclusion/', 'c50'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/hardware/edge-computing-jetson',
                component: ComponentCreator('/docs/hardware/edge-computing-jetson', 'bd2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/hardware/introduction/',
                component: ComponentCreator('/docs/hardware/introduction/', 'b35'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/hardware/lab-infrastructure',
                component: ComponentCreator('/docs/hardware/lab-infrastructure', '0c4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/hardware/sensors-actuators',
                component: ComponentCreator('/docs/hardware/sensors-actuators', '853'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/hardware/workstation-requirements',
                component: ComponentCreator('/docs/hardware/workstation-requirements', '345'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/humanoid-robotics/',
                component: ComponentCreator('/docs/humanoid-robotics/', 'cb9'),
                exact: true
              },
              {
                path: '/docs/humanoid-robotics/bipedal-locomotion',
                component: ComponentCreator('/docs/humanoid-robotics/bipedal-locomotion', 'f07'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/humanoid-robotics/conclusion/',
                component: ComponentCreator('/docs/humanoid-robotics/conclusion/', 'ea5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/humanoid-robotics/human-robot-interaction',
                component: ComponentCreator('/docs/humanoid-robotics/human-robot-interaction', '30b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/humanoid-robotics/introduction/',
                component: ComponentCreator('/docs/humanoid-robotics/introduction/', '854'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/humanoid-robotics/kinematics-dynamics',
                component: ComponentCreator('/docs/humanoid-robotics/kinematics-dynamics', '679'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/humanoid-robotics/manipulation-grasping',
                component: ComponentCreator('/docs/humanoid-robotics/manipulation-grasping', '78d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/intro',
                component: ComponentCreator('/docs/intro', '61d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/physical-ai/',
                component: ComponentCreator('/docs/physical-ai/', '22b'),
                exact: true
              },
              {
                path: '/docs/physical-ai/conclusion/',
                component: ComponentCreator('/docs/physical-ai/conclusion/', '6ea'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/physical-ai/core-principles/',
                component: ComponentCreator('/docs/physical-ai/core-principles/', '44a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/physical-ai/digital-to-physical-transition/',
                component: ComponentCreator('/docs/physical-ai/digital-to-physical-transition/', 'da4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/physical-ai/introduction/',
                component: ComponentCreator('/docs/physical-ai/introduction/', 'd83'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/ros2/',
                component: ComponentCreator('/docs/ros2/', '735'),
                exact: true
              },
              {
                path: '/docs/ros2/communication-patterns/',
                component: ComponentCreator('/docs/ros2/communication-patterns/', '6f4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/ros2/conclusion/',
                component: ComponentCreator('/docs/ros2/conclusion/', '37c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/ros2/core-architecture/',
                component: ComponentCreator('/docs/ros2/core-architecture/', '75c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/ros2/introduction/',
                component: ComponentCreator('/docs/ros2/introduction/', '609'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/ros2/python-integration-rclpy/',
                component: ComponentCreator('/docs/ros2/python-integration-rclpy/', 'a07'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/ros2/urdf/',
                component: ComponentCreator('/docs/ros2/urdf/', 'e36'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/simulation/',
                component: ComponentCreator('/docs/simulation/', '501'),
                exact: true
              },
              {
                path: '/docs/simulation/conclusion/',
                component: ComponentCreator('/docs/simulation/conclusion/', 'ac5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/simulation/introduction/',
                component: ComponentCreator('/docs/simulation/introduction/', 'fdb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/simulation/platforms/',
                component: ComponentCreator('/docs/simulation/platforms/', 'f95'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/simulation/sensor-simulation/',
                component: ComponentCreator('/docs/simulation/sensor-simulation/', '88b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/vla/',
                component: ComponentCreator('/docs/vla/', '02b'),
                exact: true
              },
              {
                path: '/docs/vla/conclusion/',
                component: ComponentCreator('/docs/vla/conclusion/', '3e9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/vla/introduction/',
                component: ComponentCreator('/docs/vla/introduction/', '642'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/vla/llm-role',
                component: ComponentCreator('/docs/vla/llm-role', '396'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/docs/vla/pipeline',
                component: ComponentCreator('/docs/vla/pipeline', '931'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
