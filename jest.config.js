// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    "src/**/*.ts"
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    "\.d\.ts$"
  ],

  // An array of file extensions your modules use
  moduleFileExtensions: [
    "ts",
    "js"
  ],

  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',

  // The test environment that will be used for testing
  testEnvironment: "./src/TestEnvironment.js",

  // The glob patterns Jest uses to detect test files
  testMatch: ['**/*.spec.ts', '!**/node_modules/**'],
};
