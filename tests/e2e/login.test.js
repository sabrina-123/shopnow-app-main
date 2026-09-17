const { Builder } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { expect } = require("chai");
const LoginPage = require("../pages/LoginPage");

describe("Page de connexion ShopNow", function () {
  this.timeout(10000);

  let driver;
  let loginPage;

  beforeEach(async function () {
    const options = new chrome.Options().addArguments(
      "--headless",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--no-sandbox"
    );
    const builder = new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options);

    if (process.env.CHROMEDRIVER_PATH) {
      builder.setChromeService(
        new chrome.ServiceBuilder(process.env.CHROMEDRIVER_PATH)
      );
    }

    driver = await builder.build();
    loginPage = new LoginPage(driver, process.env.BASE_URL || "http://localhost:3000");
  });

  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it("ouvre la page de connexion depuis ShopNow", async function () {
    await loginPage.openFromHome();
    const loginForm = await loginPage.waitUntilDisplayed();

    expect(await driver.getTitle()).to.equal("ShopNow — Connexion");
    expect(await loginForm.isDisplayed()).to.equal(true);
  });
});
