const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { expect } = require("chai");

describe("Test 12 — Déconnexion ShopNow", function () {
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

  it("déconnecte l'utilisateur et rétablit l'état non connecté", async function () {
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    await driver.get(`${baseUrl}/login.html`);

    await driver.wait(
      until.elementLocated(By.css('[data-testid="login-email"]')),
      5000
    );
    await driver.findElement(By.css('[data-testid="login-email"]')).sendKeys(
      "alice@shopnow.test"
    );
    await driver.findElement(By.css('[data-testid="login-password"]')).sendKeys(
      "Password123!"
    );
    await driver.findElement(By.css('[data-testid="login-submit"]')).click();

    const logoutButton = await driver.wait(
      until.elementLocated(By.css('[data-testid="logout-button"]')),
      5000
    );
    const loggedUser = await driver.findElement(
      By.css('[data-testid="logged-user"]')
    );
    expect(await loggedUser.getText()).to.contain("Bonjour Alice");

    await logoutButton.click();

    const loginLink = await driver.wait(
      until.elementLocated(By.css('[data-testid="login-link"]')),
      5000
    );
    expect(await loginLink.isDisplayed()).to.equal(true);
    expect(
      (await driver.findElements(By.css('[data-testid="logged-user"]'))).length
    ).to.equal(0);
  });
});
