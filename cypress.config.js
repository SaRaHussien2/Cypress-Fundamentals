const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // These settings apply everywhere unless overridden
  defaultCommandTimeout: 5000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  // Viewport settings overridden for component tests

  e2e: {
    defaultCommandTimeout: 10000,
    baseUrl: "http://localhost:4200",

    //without cy-anything.js
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",

    //hide the example from the runner so they willnot create noise when we opwn the file
    //so we only see only the test file that we work with
    excludeSpecPattern: ["**/1-getting-started/*", "**/2-advanced-examples/*"],

    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        if (browser.family === "chromium" && browser.name !== "electron") {
          launchOptions.args.push("--start-fullscreen");
          launchOptions.preferences.default.intl = { accept_languages: "en" };

          return launchOptions;
        }

        if (browser.name === "electron") {
          launchOptions.preferences.fullscreen = true;

          return launchOptions;
        }
      });
    },
  },
});
