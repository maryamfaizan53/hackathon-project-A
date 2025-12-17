import type {ReactNode} from 'react';
import Layout from '@theme/Layout';
import HeroSection from '@site/src/components/HeroSection';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import { useInView } from 'react-intersection-observer';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

import styles from './index.module.css';

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
}

const FadeInSection = ({ children, className }: FadeInSectionProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref} className={clsx(className, styles.fadeInSection, { [styles.isVisible]: inView })}>
      {children}
    </div>
  );
};

export default function Home(): ReactNode {
  return (
    <Layout
      title="Home"
      description="The ultimate guide to Embodied AI and Humanoid Robotics.">
      <main className={styles.mainContent}>
        {/* Hero Section */}
        <HeroSection />
        
        {/* Overview Section */}
        <FadeInSection className={clsx('container padding-vert--xl', styles.overviewSection)}>
          <div className="row">
            <div className="col col--8 col--offset-2 text--center">
              <h2 className={clsx('margin-bottom--lg', styles.sectionTitle)}>
                <span className={styles.titleUnderline}>Course Overview</span>
              </h2>
              <p className={clsx('hero__subtitle', styles.overviewText)}>
                The "Physical AI & Humanoid Robotics" course delves into the fascinating world of embodied artificial intelligence, exploring how intelligent systems can interact with the physical world. This course covers the theoretical foundations and practical applications of robotics, focusing on advanced concepts such as robotic operating systems, simulation environments, AI-powered robot brains, and vision-language-action models. Prepare to build, program, and understand the next generation of intelligent machines.
              </p>
            </div>
          </div>
        </FadeInSection>
        
        {/* Modules Section */}
        <FadeInSection className={clsx('container padding-vert--xl text--center', styles.modulesSection)}>
          <h2 className={clsx('margin-bottom--lg', styles.sectionTitle)}>
            <span className={styles.titleUnderline}>Course Modules</span>
          </h2>
          <HomepageFeatures />
        </FadeInSection>
        
        {/* Learning Outcomes Section */}
        <FadeInSection className={clsx('container padding-vert--xl', styles.outcomesSection)}>
          <div className="row">
            <div className="col col--8 col--offset-2 text--center">
              <h2 className={clsx('margin-bottom--lg', styles.sectionTitle)}>
                <span className={styles.titleUnderline}>Learning Outcomes</span>
              </h2>
              <p className={clsx('hero__subtitle margin-bottom--xl', styles.outcomesIntro)}>
                Upon successful completion of this course, students will be able to:
              </p>
              <div className="row">
                <div className="col col--6">
                  <ul className={clsx('text--left', styles.outcomesList)}>
                    <li>
                      <span className={styles.bulletIcon}>✅</span>
                      <span>Master ROS 2 for robot control and communication.</span>
                    </li>
                    <li>
                      <span className={styles.bulletIcon}>✅</span>
                      <span>Develop and simulate robotic systems in Gazebo and Unity.</span>
                    </li>
                    <li>
                      <span className={styles.bulletIcon}>✅</span>
                      <span>Implement AI-powered perception and navigation with NVIDIA Isaac.</span>
                    </li>
                    <li>
                      <span className={styles.bulletIcon}>✅</span>
                      <span>Design and integrate Vision-Language-Action (VLA) models.</span>
                    </li>
                  </ul>
                </div>
                <div className="col col--6">
                  <ul className={clsx('text--left', styles.outcomesList)}>
                    <li>
                      <span className={styles.bulletIcon}>✅</span>
                      <span>Understand sim-to-real transfer techniques for robotics.</span>
                    </li>
                    <li>
                      <span className={styles.bulletIcon}>✅</span>
                      <span>Apply machine learning to solve complex robotics problems.</span>
                    </li>
                    <li>
                      <span className={styles.bulletIcon}>✅</span>
                      <span>Troubleshoot and debug robotic hardware and software.</span>
                    </li>
                    <li>
                      <span className={styles.bulletIcon}>✅</span>
                      <span>Contribute to the future of humanoid and physical AI development.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
        
        {/* Why Physical AI Matters Section */}
        <FadeInSection className={clsx('hero hero--primary margin-bottom--xl', styles.quoteSection)}>
          <div className="container">
            <div className="row">
              <div className="col col--10 col--offset-1 text--center">
                <div className={styles.quoteIcon}>"</div>
                <h2 className={clsx('hero__title', styles.quoteTitle)}>Why Physical AI Matters</h2>
                <p className={clsx('hero__subtitle', styles.quoteText)}>
                  The future of AI isn't just in the cloud; it's in the physical world, where robots and intelligent agents will collaborate with humans to solve real-world problems, from healthcare to exploration.
                </p>
                <span className={clsx('hero__subtitle', styles.quoteAuthor)}>— Leading AI Researcher</span>
              </div>
            </div>
          </div>
        </FadeInSection>
        
        {/* Hardware Requirements Section */}
        <FadeInSection className={clsx('container padding-vert--xl text--center', styles.hardwareSection)}>
          <h2 className={clsx('margin-bottom--lg', styles.sectionTitle)}>
            <span className={styles.titleUnderline}>Hardware Requirements</span>
          </h2>
          <p className={clsx('hero__subtitle margin-bottom--xl', styles.hardwareIntro)}>
            To get the most out of this course, we recommend having access to the following hardware:
          </p>
          <div className="row">
            <div className="col col--4">
              <div className={clsx('card padding--lg', styles.hardwareCard)}>
                <div className={styles.hardwareCardInner}>
                  <div className={styles.hardwareIconWrapper}>
                    <span className={styles.hardwareIcon}>🖥️</span>
                  </div>
                  <Heading as="h3" className={styles.hardwareTitle}>Workstation</Heading>
                  <p className={styles.hardwareDescription}>A powerful PC with a dedicated NVIDIA GPU (RTX 3060 or higher) for simulations and AI model training.</p>
                </div>
              </div>
            </div>
            <div className="col col--4">
              <div className={clsx('card padding--lg', styles.hardwareCard)}>
                <div className={styles.hardwareCardInner}>
                  <div className={styles.hardwareIconWrapper}>
                    <span className={styles.hardwareIcon}>⚡</span>
                  </div>
                  <Heading as="h3" className={styles.hardwareTitle}>Edge AI Kit</Heading>
                  <p className={styles.hardwareDescription}>An NVIDIA Jetson Nano, Xavier, or Orin development kit for deploying AI models to the edge.</p>
                </div>
              </div>
            </div>
            <div className="col col--4">
              <div className={clsx('card padding--lg', styles.hardwareCard)}>
                <div className={styles.hardwareCardInner}>
                  <div className={styles.hardwareIconWrapper}>
                    <span className={styles.hardwareIcon}>🤖</span>
                  </div>
                  <Heading as="h3" className={styles.hardwareTitle}>ROS-Compatible Robot</Heading>
                  <p className={styles.hardwareDescription}>Access to a ROS 2 compatible robot (e.g., TurtleBot, Unitree Go1) for hands-on physical deployment.</p>
                </div>
              </div>
            </div>
          </div>
          <div className={clsx('margin-top--xl', styles.hardwareButtonWrapper)}>
            <Link
              className={clsx('button button--primary button--lg', styles.hardwareButton)}
              to="/docs/category/7-hardware-setup">
              <span>See Full Hardware Details</span>
              <span className={styles.buttonArrowHardware}>→</span>
            </Link>
          </div>
        </FadeInSection>
      </main>
    </Layout>
  );
}