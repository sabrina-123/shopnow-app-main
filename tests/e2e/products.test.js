const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { expect } = require("chai");

describe("Test 2 — Accès aux produits ShopNow", function () {
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

  it("accède à la page Produits et affiche des produits", async function () {
    await driver.get(process.env.BASE_URL || "http://localhost:3000");

    const productsLink = await driver.wait(
      until.elementLocated(By.css('[data-testid="products-link"]')),
      5000
    );
    await productsLink.click();

    const productsPage = await driver.wait(
      until.elementLocated(By.css('[data-testid="products-page"]')),
      5000
    );
    const productCards = await driver.wait(async function () {
      const cards = await driver.findElements(
        By.css('[data-testid^="product-card-"]')
      );
      return cards.length > 0 ? cards : false;
    }, 5000);

    expect(await driver.getTitle()).to.equal("ShopNow — Produits");
    expect(await productsPage.isDisplayed()).to.equal(true);
    expect(productCards.length).to.be.greaterThan(0);
  });
});
