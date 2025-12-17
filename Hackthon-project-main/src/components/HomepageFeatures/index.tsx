import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';

import styles from './styles.module.css';

interface CourseModule {
  icon: string;
  title: string;
  description: string;
  link: string;
}

const ModuleList: CourseModule[] = [
  {
    icon: '🤖',
    title: 'The Robot Operating System (ROS 2)',
    description: 'Master middleware for robot control with ROS 2 nodes, topics, and services',
    link: '/docs/category/2-ros-2-robot-operating-system',
  },
  {
    icon: '🎮',
    title: 'The Digital Twin (Gazebo & Unity)',
    description: 'Build physics simulations and high-fidelity virtual environments',
    link: '/docs/simulation/platforms/',
  },
  {
    icon: '🧠',
    title: 'The AI-Robot Brain (NVIDIA Isaac)',
    description: 'Advanced perception, training, and sim-to-real transfer techniques',
    link: '/docs/simulation/platforms/',
  },
  {
    icon: '🗣️',
    title: 'Vision-Language-Action (VLA)',
    description: 'Integrate voice commands and LLMs for cognitive robot planning',
    link: '/docs/category/5-vision-language-action-vla',
  },
];

function ModuleCard({ icon, title, description, link }: CourseModule) {
  return (
    <div className={clsx('col col--6', styles.moduleCol)}>
      <div className={clsx('card', styles.moduleCard)}>
        <div className={styles.cardGlow}></div>
        <div className={styles.cardContent}>
          <div className={styles.iconWrapper}>
            <div className={styles.iconBackground}></div>
            <span className={styles.moduleIcon}>{icon}</span>
            <div className={styles.orbitParticle}></div>
          </div>
          <div className="card__header">
            <Heading as="h3" className={styles.moduleTitle}>{title}</Heading>
          </div>
          <div className="card__body">
            <p className={styles.moduleDescription}>{description}</p>
          </div>
          <div className={clsx('card__footer', styles.cardFooter)}>
            <Link
              className={clsx('button button--secondary button--outline', styles.moduleButton)}
              to={link}>
              <span className={styles.buttonText}>Explore Module</span>
              <span className={styles.buttonArrow}>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function HomepageFeatures() {
  return (
    <section className={clsx('container', styles.features)}>
      <div className="row">
        {ModuleList.map((props, idx) => (
          <ModuleCard key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}