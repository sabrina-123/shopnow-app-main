const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { expect } = require("chai");

describe("Test 1 — Page d'accueil ShopNow", function () {
  this.timeout(10000);

  let driver;

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
  });

  afterEach(async function () {
    if (driver) {
      await driver.quit();
    }
  });

  it("affiche correctement la page d'accueil", async function () {
    await driver.get(process.env.BASE_URL || "http://localhost:3000");

    const homePage = await driver.wait(
      until.elementLocated(By.css('[data-testid="home-page"]')),
      5000
    );
    const mainTitle = await driver.wait(
      until.elementLocated(By.css("h1")),
      5000
    );

    expect(await driver.getTitle()).to.equal("ShopNow — Accueil");
    expect(await homePage.isDisplayed()).to.equal(true);
    expect(await mainTitle.getText()).to.equal("Bienvenue sur ShopNow");
  });
});
