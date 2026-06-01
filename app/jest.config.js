/** @type {import('jest').Config} */
module.exports = {
  projects: [
    {
      // Pure logic tests (utils / data) — fast, no React Native runtime.
      displayName: 'node',
      preset: 'ts-jest',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/src/**/*.test.ts'],
      moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    },
    {
      // Component / screen tests — need the React Native + Expo transform.
      displayName: 'components',
      preset: 'jest-expo',
      testMatch: ['<rootDir>/src/**/*.test.tsx'],
      setupFiles: ['<rootDir>/jest.setup.js'],
      transformIgnorePatterns: [
        'node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/.*|sentry-expo|native-base|react-native-svg|zustand))',
      ],
    },
  ],
  collectCoverageFrom: ['src/data/**/*.ts', 'src/utils/**/*.ts'],
};
