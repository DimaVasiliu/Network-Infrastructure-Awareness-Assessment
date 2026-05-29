/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  // Only run tests that don't pull in React Native runtime.
  // UI components and store (AsyncStorage / Zustand persist) need jest-expo
  // and a JSDOM-like environment — out of scope for the v1 test suite.
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  collectCoverageFrom: ['src/data/**/*.ts', 'src/utils/**/*.ts'],
};
