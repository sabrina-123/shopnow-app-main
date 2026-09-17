const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

if (process.env.CHROMEDRIVER_PATH) {
  chrome.setDefaultService(
    new chrome.ServiceBuilder(process.env.CHROMEDRIVER_PATH).setPort(0).build()
  );
}

async function createDriver() {
  const options = new chrome.Options().addArguments(
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--no-sandbox"
  );
  return new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();
}

module.exports = createDriver;
