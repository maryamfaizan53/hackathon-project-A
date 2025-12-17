module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  transform: {
    '^.+\.(js|jsx|ts|tsx)$': 'babel-jest',
    '^.+\.css$': '<rootDir>/jest-css-transformer.js',
  },
  moduleNameMapper: {
    '^@site/(.*)$': '<rootDir>/$1',
    '^@theme/(.*)$': '<rootDir>/src/theme/$1', // Map @theme to your theme directory
    '^docusaurus-theme-classic$': '<rootDir>/node_modules/@docusaurus/theme-classic',
    '\.(css|less|sass|scss)$': 'identity-obj-proxy', // Handle CSS imports
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.docusaurus/',
    '<rootDir>/build/',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/pages/index.tsx', // Exclude pages if they are mainly content
  ],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
  verbose: true,
};