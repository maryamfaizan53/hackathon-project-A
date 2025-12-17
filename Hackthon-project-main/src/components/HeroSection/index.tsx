// HeroSection.tsx
import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

function HeroSection() {
  const {siteConfig} = useDocusaurusContext();
  
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={styles.heroBackground} />
      <div className={styles.heroGrid} />
      
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <span>NEXT-GEN ROBOTICS</span>
          </div>
          
          <Heading as="h1" className={styles.heroTitle}>
            <span className={styles.titleGradient}>Physical AI &</span>
            <br />
            <span className={styles.titleRed}>Humanoid Robotics</span>
          </Heading>
          
          <p className={styles.heroSubtitle}>
            Master the future of embodied intelligence. Build, program, and deploy 
            the next generation of intelligent machines.
          </p>
          
          <div className={styles.buttons}>
            <Link
              className={clsx('button', styles.primaryButton)}
              to="/docs/intro">
              Start Learning
              <span className={styles.arrow}>→</span>
            </Link>
            <Link
              className={clsx('button', styles.secondaryButton)}
              to="/docs/category/physical-ai">
              View Physical AI Fundamentals
            </Link>
          </div>
        </div>
      </div>
      
      <div className={styles.floatingOrb1} />
      <div className={styles.floatingOrb2} />
    </header>
  );
}

export default HeroSection;