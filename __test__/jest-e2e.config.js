/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  rootDir:".",
    preset: "ts-jest",
    testEnvironment: "node",
    testRegex: ".e2e.test.ts$",
  };