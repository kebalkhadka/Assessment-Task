// jest.config.js or jest.config.cjs
module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.cjs"],
  testEnvironment: "jsdom",
};
