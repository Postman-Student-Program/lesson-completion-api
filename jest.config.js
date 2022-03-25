/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  testMatch: ["**/*.test.ts"],
  setupFiles: ["dotenv/config"], // required for Jest to find env vars
};
