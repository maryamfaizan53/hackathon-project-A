import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

require('dotenv').config();

const config: Config = {
  title: 'Physical AI & Humanoid Robotics',
  tagline: 'The Ultimate Guide to Embodied Intelligence',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  scripts: [
    {
      src: "/config.js",
      async: false,
    },
    {
      src: "https://cdn.platform.openai.com/deployments/chatkit/chatkit.js",
      async: true,
    },
  ],

  url: 'https://full-project-kappa.vercel.app', // Your Vercel URL
  baseUrl: '/', // Base URL for Vercel (root)

  organizationName: 'samade747', // Your GitHub username
  projectName: 'full-project', // Your repository name

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ur'],
  },

  clientModules: [
    require.resolve('./src/components/Root.tsx'),
  ],

  customFields: {
    geminiApiKey: process.env.GEMINI_API_KEY,
    backendApiUrl: process.env.BACKEND_API_URL || 'http://localhost:8000',
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
            require.resolve('./src/css/sidebar-custom.css')
          ],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Physical AI & Humanoid Robotics',
      logo: {
        alt: 'Physical AI Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Chapters',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/panaverse/physical-ai-textbook',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Panaverse. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;