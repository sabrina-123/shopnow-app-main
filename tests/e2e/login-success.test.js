const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { expect } = require("chai");

describe("Test 4 — Connexion réussie ShopNow", function () {
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

  it("connecte l'utilisateur avec le compte de démonstration", async function () {
    const baseUrl = process.env.BASE_URL || "http://localhost:3000";
    await driver.get(`${baseUrl}/login.html`);

    const loginForm = await driver.wait(
      until.elementLocated(By.css('[data-testid="login-form"]')),
      5000
    );
    expect(await loginForm.isDisplayed()).to.equal(true);

    const emailInput = await driver.findElement(
      By.css('[data-testid="login-email"]')
    );
    const passwordInput = await driver.findElement(
      By.css('[data-testid="login-password"]')
    );
    await emailInput.sendKeys("alice@shopnow.test");
    await passwordInput.sendKeys("Password123!");

    await driver.findElement(By.css('[data-testid="login-submit"]')).click();

    const loggedUser = await driver.wait(
      until.elementLocated(By.css('[data-testid="logged-user"]')),
      5000
    );
    expect(await driver.getTitle()).to.equal("ShopNow — Accueil");
    expect(await loggedUser.getText()).to.contain("Bonjour Alice");
  });
});
